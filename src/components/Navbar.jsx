import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className='bg-black p-4 text-white flex justify-between'>
            <Link to="/">Home</Link>
            <ul className='flex space-x-4'>
                <li>
                    <NavLink to="/help">Ayuda</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">Salir</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
