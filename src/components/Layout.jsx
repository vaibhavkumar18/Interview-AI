import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

const Layout = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-shell__main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
