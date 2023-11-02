import { NavLink } from 'react-router-dom';
import { getItem, removeItem } from '../../storage';
import './styles.css';

export default function Header() {

    const user = getItem('user');

    function logoff() {
        removeItem('user');
        removeItem('token');
    }

    return (
        <header className='header'>
            <div className=" header-container">
                <h1 className='logo'>Task Manager</h1>
                <nav className='navigation'>
                    <span>{user}  </span>
                    <span>|</span>
                    <NavLink to="/" onClick={logoff} className='navigation_link'>Logout</NavLink>
                </nav>
            </div>
        </header>
    )
}