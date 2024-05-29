import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { signOutUser } from '../utils/firebase/firebase.utils';

const Navbar = () => {
    const {currentUser} = useContext(UserContext);
    return(
        <nav className='bg-black p-4 text-white flex justify-between'>
            <Link to="/">Home</Link>
            <ul className='flex space-x-4'>
                <li><NavLink to="/tickets">Tickets</NavLink></li>
                <li><NavLink to="/help">Ayuda</NavLink></li>
                <li>
                    { (currentUser != null ) ? (
                        <NavLink onClick={signOutUser}>Salir</NavLink>
                    ) : (
                        <NavLink to="/auth">Ingresar</NavLink>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
