import React, { useState } from 'react';
import { IoSearchOutline, IoArrowBackOutline, IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const trending = ["Milk", "Curd", "Bread", "Paneer", "Chips", "Cold Drinks", "Atta", "Maggi"];
  
  const categories = [
    { id: 1, name: "Vegetables", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_1487_v_3_500_1680251101.png" },
    { id: 2, name: "Dairy & Eggs", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_14_v_3_500_1680251143.png" },
    { id: 3, name: "Munchies", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_13_v_3_500_1680251121.png" },
    { id: 4, name: "Cold Drinks", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_12_v_3_500_1680251151.png" },
    { id: 5, name: "Instant Food", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_15_v_3_500_1680251161.png" },
    { id: 6, name: "Bakery", img: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_16_v_3_500_1680251171.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- MOBILE HEADER (Sirf Mobile pe dikhega) --- */}
      <div className="md:hidden flex items-center gap-3 p-4 sticky top-0 bg-white z-50 border-b border-gray-100">
        <IoArrowBackOutline size={24} className="text-gray-700" onClick={() => navigate(-1)} />
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <IoSearchOutline className="text-gray-500" size={20} />
          <input 
            autoFocus
            type="text" 
            placeholder="Search for 'chips'" 
            className="bg-transparent border-none outline-none w-full ml-2 text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <IoCloseOutline size={20} onClick={() => setSearchTerm("")} />}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* --- LEFT SIDE: Trending & Recent (Desktop + Mobile) --- */}
          <div className="flex-1">
            <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
              Trending Searches <span className="text-purple-500 text-xs">🔥</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {trending.map((item, idx) => (
                <button 
                  key={idx}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Recent Searches (Hidden if empty) */}
            <div className="mt-10">
              <h2 className="text-lg font-black text-gray-800 mb-4">Recent Searches</h2>
              <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                <div className="p-2 bg-gray-100 rounded-full"><IoSearchOutline /></div>
                <span>Amul Taaza Milk</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Browse Categories (Desktop pe side mein, Mobile pe niche) --- */}
          <div className="md:w-1/3">
            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 shadow-sm">
              <h2 className="text-lg font-black text-purple-900 mb-6 underline decoration-purple-300 underline-offset-4">
                Popular Categories
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex flex-col items-center bg-white p-3 rounded-2xl hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-purple-200 group">
                    <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700 mt-2 text-center uppercase tracking-tighter">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Only Promo Banner */}
            <div className="hidden md:block mt-6 w-full h-40 bg-linear-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-white font-black text-xl leading-tight">Fastest Delivery <br/> in the City</p>
                    <p className="text-purple-100 text-xs mt-2 font-bold">10,000+ Products</p>
                </div>
                <div className="absolute right--20px bottom--20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;