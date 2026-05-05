import React from 'react'
import "../style/home.scss"
const Home = () => {
    return (
        <main className='route-container'>
            <header style={{ padding: '1.5rem 0' }}>
                <h1>Welcome to ResumeGen</h1>
                <p className='highlight'>Generate focused interview strategies with AI</p>
            </header>
        </main>
    )
}

export default Home
