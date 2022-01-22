// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart


import '../styles/Header.css'
import Logo from './Logo'

function Header() {
    return (
    <header className="Header"><Logo /></header>
    )
}

export default Header