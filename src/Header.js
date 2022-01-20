// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart
import React from 'react'
import Navbar from './Navbar'
import Search from './Search'

import './Header.css'

function Header() {
    return (
    <div className="Header">
        <Navbar />
        <Search />
    </div>
    )
}

export default Header