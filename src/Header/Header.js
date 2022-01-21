// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart

import Logo from './Logo'
import SearchForm from '../Search/SearchForm'
import Search from '../Search/Search'
import Filter from '../Search/Filter';

import './Header.css'

function Header() {
    return (
    <div className="Header">
        <Logo />
        <div className="Filters">
        <Filter category= "Technology" />
        <Filter category= "Jewelery" />
        <Filter category= "Men's Clothing" />
        <Filter category= "Women's Clothing" />
        </div>
    </div>
    )
}

export default Header