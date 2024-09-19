import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import Navitems from './Navitems';


const Navbar = () => {
    const {currentUser} = useContext(UserContext);
    //className='hidden lg:block xl:block'
    return(
        <div className='flex flex-col '>
            <nav className='bg-black p-4 text-white flex justify-between'>
                <Link to="/">Home</Link>
                <div className='hidden lg:block xl:block'>
                    <Navitems />
                </div>
                <div className='block lg:hidden xl:hidden' onClick={()=>console.log('BREADCRUM CLICK')}>
                    <div className='w-5 h-1 bg-white my-1'></div>
                    <div className='w-5 h-1 bg-white my-1'></div>
                    <div className='w-5 h-1 bg-white my-1'></div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
