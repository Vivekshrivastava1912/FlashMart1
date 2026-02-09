import React from 'react'

const Home = () => {
  // Dummy data for categories
  const categories = [
    { name: "Paan Corner", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_161_v_3_500_1680251741.png" },
    { name: "Dairy & Bread", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_14_v_3_500_1680251143.png" },
    { name: "Fruits & Veg", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_1487_v_3_500_1680251101.png" },
    { name: "Cold Drinks", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_12_v_3_500_1680251151.png" },
    { name: "Snacks", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_123_v_3_500_1680251111.png" },
    { name: "Munchies", image: "https://cdn.grofers.com/app/images/category/cms_images/icon/icon_cat_13_v_3_500_1680251121.png" },
  ];

  return (
    <div className='min-h-screen bg-white'>
      
      {/* 1. HERO BANNER - 3D/Creative Look */}
      <div className='container mx-auto px-4 py-6'>
        <div className='w-full h-48 md:h-80 bg-linear-to-r from-purple-600 to-indigo-600 rounded-3xl overflow-hidden relative flex items-center px-10 shadow-xl'>
          <div className='z-10 text-white max-w-md'>
            <h1 className='text-3xl md:text-5xl font-black leading-tight'>
              Everything delivered in <span className='text-yellow-400'>10 Minutes</span>
            </h1>
            <p className='mt-2 opacity-90 font-medium'>Use code: GEMINI50 for 50% Off</p>
            <button className='mt-4 bg-white text-purple-600 font-bold px-6 py-2 rounded-full hover:scale-105 transition-all shadow-lg'>
              Shop Now
            </button>
          </div>
          {/* Decorative Circle for 3D Feel */}
          <div className='absolute right--50px top--50px w-64 h-64 bg-white opacity-10 rounded-full blur-3xl'></div>
          <div className='absolute right-20 hidden md:block'>
             <img src="https://cdn.grofers.com/layout-engine/2022-01/Group-33704.png" alt="delivery" className="w-64 rotate-3" />
          </div>
        </div>
      </div>

      {/* 2. CATEGORIES SECTION */}
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-xl font-bold mb-6 text-gray-800 flex items-center gap-2'>
          Shop by Category
        </h2>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
          {categories.map((cat, index) => (
            <div key={index} className='group cursor-pointer flex flex-col items-center'>
              <div className='w-full aspect-square bg-purple-50 rounded-2xl p-4 group-hover:bg-purple-100 transition-colors border border-purple-100'>
                <img src={cat.image} alt={cat.name} className='w-full h-full object-contain group-hover:scale-110 transition-transform' />
              </div>
              <p className='mt-2 text-sm font-semibold text-gray-700 text-center'>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT ROW (Bestsellers) */}
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Bestsellers</h2>
          <span className='text-purple-600 font-bold cursor-pointer hover:underline'>See All</span>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {/* Sample Product Card */}
          {[1,2,3,4,5].map((item) => (
            <div key={item} className='border border-gray-100 p-4 rounded-2xl hover:shadow-lg transition-all flex flex-col'>
              <div className='h-32 w-full mb-3'>
                <img src="https://cdn.grofers.com/app/images/products/sliding_image/478149a.jpg" alt="product" className='h-full w-full object-contain' />
              </div>
              <div className='text-xs bg-gray-100 w-fit px-2 py-0.5 rounded text-gray-600 font-bold mb-2'>
                8 MINS
              </div>
              <h3 className='text-sm font-bold text-gray-800 leading-tight'>Fresh Milk & Dairy Product</h3>
              <p className='text-xs text-gray-500 mt-1'>500 ml</p>
              
              <div className='mt-auto pt-4 flex justify-between items-center'>
                <span className='font-black text-gray-900'>₹45</span>
                <button className='border border-green-600 text-green-600 px-4 py-1 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white transition-colors'>
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home