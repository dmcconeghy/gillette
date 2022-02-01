// Header component wraps all top of page components such as the navigation menu, search bar, logo, and cart
import '../styles/Header.css'
import Logo from './Logo'
import SearchForm from '../Search/SearchForm'


function Header() {
    return (
    <header className="Header">
        <div className="Navigation">
        {console.debug("<Header /> rendered")}
            <Logo />
            <SearchForm />
        </div>
    </header>
    )
}

export default Header