// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart
import '../styles/Header.css'
import Logo from './Logo'
import Search from '../Search/Search'


function Header() {
    return (
    <header className="Header">
        <div className="Navigation">
            <Logo />
            <Search />
        </div>
    </header>
    )
}

export default Header