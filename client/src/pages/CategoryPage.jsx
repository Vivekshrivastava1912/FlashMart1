import React, { useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'

const CategoryPage = () => {
  
const [openUploadCategoryModel ,setOpenUploadCategoryModel] = useState(false)



  return (
   <>
  <section className="container m-1 px-2 py-2">
    
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-2 border border-gray-100">
        
        {/* Title */}
        <div className="font-bold text-xl text-gray-800 tracking-tight">
          Category
        </div>

        {/* Modern Button */}
        <button 
          onClick={() => setOpenUploadCategoryModel(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-95"
        > 
          Add Category 
        </button>
      </div>

      {/* Modal Component Logic */}
      {
        openUploadCategoryModel && (
          <UploadCategoryModel close={() => setOpenUploadCategoryModel(false)} />
        )
      }

   </section>

   </>
  )
}

export default CategoryPage
