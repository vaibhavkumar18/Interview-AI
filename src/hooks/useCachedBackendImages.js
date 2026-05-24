import { useEffect, useState } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || ''
const browserImageCache = new Map()
const cacheName = 'resumegen-backend-images-v1'

const buildBackendImageUrl = (relativePath) => `${backendUrl}${relativePath}`

const loadImageAsObjectUrl = async (relativePath) => {
  const imageUrl = buildBackendImageUrl(relativePath)

  if (browserImageCache.has(imageUrl)) {
    return browserImageCache.get(imageUrl)
  }

  if (typeof window !== 'undefined' && 'caches' in window) {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(imageUrl)

    if (cachedResponse) {
      const cachedBlob = await cachedResponse.blob()
      const cachedObjectUrl = URL.createObjectURL(cachedBlob)
      browserImageCache.set(imageUrl, cachedObjectUrl)
      return cachedObjectUrl
    }

    const response = await fetch(imageUrl, { mode: 'cors' })

    if (!response.ok) {
      throw new Error(`Failed to load image: ${imageUrl}`)
    }

    await cache.put(imageUrl, response.clone())
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    browserImageCache.set(imageUrl, objectUrl)
    return objectUrl
  }

  const response = await fetch(imageUrl, { mode: 'cors' })

  if (!response.ok) {
    throw new Error(`Failed to load image: ${imageUrl}`)
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  browserImageCache.set(imageUrl, objectUrl)
  return objectUrl
}

export const useCachedBackendImages = (imageMap) => {
  const [cachedImages, setCachedImages] = useState({})

  useEffect(() => {
    let isMounted = true

    const preloadImages = async () => {
      const loadedEntries = await Promise.all(
        Object.entries(imageMap).map(async ([key, relativePath]) => [key, await loadImageAsObjectUrl(relativePath)]),
      )

      if (isMounted) {
        setCachedImages(Object.fromEntries(loadedEntries))
      }
    }

    preloadImages().catch((error) => {
      console.error('Backend image cache error:', error)
    })

    return () => {
      isMounted = false
    }
  }, [imageMap])

  return cachedImages
}
