import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaShoppingCart } from "react-icons/fa";
import login from '../pages/login';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/Search"



  return (
    <>
      <header className='overflow-y-auto scrollbar-hide h-25 lg:h-20 md:h-20 shadow-lg sticky top-0 z-40 bg-linear-to-r from-purple-50 to-purple-200 flex flex-col justify-center'>

        {/* TOP ROW: Logo and User Icon - Yeh section ab mobile search page par hide ho jayega */}
        {!(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center justify-between px-4 md:px-4 py-1 pt-1 gap-2 md:gap-4'>


            {/* ye logo ka section hai */}
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



            {/* ye login or card botton ka section hai for desktop */}
            <div className='hidden md:flex items-center gap-5 shrink-0'>
              
              {/* login button */}
              <Link
                to={"Login"}
                className="relative px-3 py-1.5 bg-purple-500 text-white font-black  uppercase rounded-md
             transition-all duration-300 
             hover:bg-purple-500  group inline-block text-center"
                onClick={(e) => {
                  e.preventDefault(); // Turant redirect hone se rokta hai
                  const target = e.currentTarget;
                  const destination = target.getAttribute('href');

                  // Intense Shaking Animation
                  target.style.animation = "superShake 1s cubic-bezier(.36,.07,.19,.97) both";

                  // 2 second baad redirect
                  setTimeout(() => {
                    window.location.href = destination;
                  }, 800);
                }}
              >
                <div className="relative inline-block">
                  Login
                  {/* Animated Underline */}
                  <div className="absolute left-0 w-0 h-1 bg-purple-50 transition-all duration-500 group-hover:w-full"></div>
                </div>

                <style>{`
    @keyframes superShake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-3deg); }
      20%, 40%, 60%, 80% { transform: translateX(10px) rotate(3deg); }
    }
  `}</style>
              </Link>

              {/* ye card or item ala botton */}
              <button className="flex items-center gap-3 bg-purple-500 text-white px-2 py-0.5 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md group active:scale-95">
                {/* react ka gadi wala icon */}
                <div className="flex items-center justify-center">
                  <FaShoppingCart size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>


                {/* ye jaya card or item likhe hua hai  */}
                <div className="text-left border-l border-purple-800 pl-2">
                  <p className="text-sm font-bold leading-tight">
                    1 item
                  </p>
                  <p className="text-xs font-medium opacity-90 leading-tight">
                    Total Price
                  </p>
                </div>

              </button>
            </div>




            {/* user icon only displayin mobile version */}
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