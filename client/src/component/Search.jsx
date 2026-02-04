import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Redirect function
  const handleSearchRedirect = () => {
      navigate('Search');
  };

  return (
    <div className='w-full lg:max-w-lg relative group'>

      {/* Input Field */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
        // --- CHANGE HERE: Click karte hi redirect hoga ---
        onClick={handleSearchRedirect} 
        
        // Placeholder empty rakha hai kyunki hum custom animation dikha rahe hain
        placeholder=""
        className='w-full h-9 lg:h-11 px-4 md:px-6 pr-14 rounded-full border-none bg-gray-100 text-gray-700 outline-none 
                   font-medium
                   ring-2 ring-transparent focus:ring-purple-500 focus:bg-white
                   shadow-sm focus:shadow-purple-300 focus:shadow-md 
                   transition-all duration-300 ease-out z-10 relative'
      />

      {/* Animated Placeholder Layer */}
      {searchTerm === "" && (
        <div className='absolute top-0 left-0 h-full flex items-center pl-4 md:pl-6 pointer-events-none text-gray-400 font-medium w-full overflow-hidden z-20'>
          <TypeAnimation
            sequence={[
              'Search "milk"',
              1000,
              'Search "bread"',
              1000,
              'Search "sugar"',
              1000,
              'Search "panner"',
              1000,
              'Search "Atta"',
              1000,
              'Search "Suji"',
              1000,
              'Search "Ghee"',
              1000,
              'Search "Namak"',
              1000
            ]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
            style={{ fontSize: '1rem', display: 'inline-block' }}
          />
        </div>
      )}

      {/* Search Button */}
      <button 
        onClick={handleSearchRedirect}
        className='absolute right-1 top-1 bottom-1 w-12 rounded-full 
                   bg-linear-to-tr from-purple-600 to-purple-400 text-white 
                   flex items-center justify-center shadow-md
                   hover:shadow-md hover:scale-105 active:scale-95 
                   transition-all duration-300 cursor-pointer group-focus-within:to-purple-700 z-30'>

        <FaSearch className='text-md group-hover:rotate-12 transition-transform duration-300' />

      </button>

    </div>
  )
}

export default Search