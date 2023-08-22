import { NavLink } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
import { getItem, removeItem } from '../../storage';
import './styles.css';

export default function Header() {

    const user = getItem('user');
    function handleActiveLink({ isActive }) {
        if (isActive) {
            return 'navigation__item navigation__item--active'
        } else {
            return 'navigation__item'
        }
    }

    function logoff() {
        removeItem('user');
        removeItem('token');
    }

    return (
        <header className='header'>
            <div className="container header-container">
                <img src={logoImage} alt="logotipo" className='logo' />
                <nav className='navigation'>
                    <span>{user} | </span>
                    <NavLink to="/todos" className={handleActiveLink}>Todo</NavLink>
                    <NavLink to="/" onClick={logoff} className={handleActiveLink}>Sair</NavLink>
                </nav>
            </div>
        </header>
    )
}