// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart

import Navbar from './Navbar'
import Search from '../Search/Search'
import Filter from '../Search/Filter';

import './Header.css'

function Header() {
    return (
    <div className="Header">
        <Navbar />
        <Filter category= "Technology" />
        <Filter category= "Jewelery" />
        <Filter category= "Men's Clothing" />
        <Filter category= "Women's Clothing" />
    </div>
    )
}

export default Header