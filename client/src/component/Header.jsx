import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/Search"

 

  return (
    <>
      <header className='h-20 lg:h-18 md:h-18 shadow-lg sticky top-0 z-40 bg-linear-to-r from-purple-50 to-purple-200 flex flex-col justify-center'>

        {/* TOP ROW: Logo and User Icon - Yeh section ab mobile search page par hide ho jayega */}
        { !(isSearchPage && isMobile) && (
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
              <Search />
            </div>

            <div className='lg:hidden flex items-center shrink-0 cursor-pointer'>
              <div className='text-purple-500 transition-all duration-300 ease-in-out
                              hover:text-purple-500 hover:scale-110 hover:-rotate-12 
                              active:scale-95'>
                <FaUserCircle size={30} />
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ROW: Search bar for Mobile only */}
        <div className='lg:hidden mt-2 ml-2 mr-2'>
          <Search />
        </div>

      </header>
    </>
  )
}

export default Header