import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ajb.svg';
import { UserContext } from '../context/user.context';
import Navitems from './Navitems';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser } = useContext(UserContext);
    //className='hidden lg:block xl:block'
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className='flex flex-col align-middle'>
            <nav className='bg-black p-4 text-white flex justify-between align-middle'>
                <Link to="/"><img src={logo} alt='logo' className='w-12' /></Link>
                <div className='lg:block xl:block align-middle'>
                    <Navitems />
                </div>
            </nav >
        </div >
    )
}

export default Navbar;
