import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { signOutUser } from '../utils/firebase/firebase.utils';

const Navbar = () => {
    const {currentUser} = useContext(UserContext);
    return(
        <nav className='bg-black p-4 text-white flex justify-between'>
            <Link to="/">Home</Link>
            <div className='hidden lg:block xl:block'>
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
            </div>
            <div className='block lg:hidden xl:hidden' onClick={()=>console.log('BREADCRUM CLICK')}>
                <div className='w-5 h-1 bg-white my-1'></div>
                <div className='w-5 h-1 bg-white my-1'></div>
                <div className='w-5 h-1 bg-white my-1'></div>
            </div>
        </nav>
    )
}

export default Navbar;
