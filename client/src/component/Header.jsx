import React from 'react'
import logo from '../assets/logo.png' 
import Search from './Search'
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; 

const Header = () => {
  return (
    <>
      <header className='h-24 lg:h-20 md:h-20 shadow-lg sticky top-0 z-40 bg-linear-to-r from-purple-50 to-purple-200 flex flex-col justify-center'>
        
        {/* TOP ROW: Logo and User Icon */}
        <div className='container mx-auto flex items-center justify-between px-4 md:px-4 gap-2 md:gap-4'>
          
          <div className='flex items-center shrink-0 md:pl-20'>
             <Link to="/">
               <img src={logo} 
                    className='w-24 md:w-32 lg:w-40 h-auto object-contain cursor-pointer' 
                    alt='logo' />
             </Link>
          </div>

          {/* Search bar for Desktop only */}
          <div className='hidden lg:flex flex-1 max-w-lg'>
            <Search/>
          </div>

          <div className='flex items-center shrink-0 cursor-pointer'>
            {/* User Icon: Isse 'text-white' hata kar default ya dark rakha hai taaki light bg par dikhe */}
            <div className='text-gray-700 transition-all duration-300 ease-in-out
                            hover:text-purple-500 hover:scale-110 hover:-rotate-12 
                            active:scale-95'>
                <FaUserCircle size={30} />
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Search bar for Mobile only */}
        <div className='lg:hidden mt-2 ml-2 mr-2'>
            <Search/>
        </div>

      </header>
    </>
  )
}

export default Header