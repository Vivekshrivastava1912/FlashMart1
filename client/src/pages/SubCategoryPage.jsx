import React, { useState } from 'react'
import UploadSubCategoryModel from '../component/UploadSubCategoryModel'

const SubCategoryPage = () => {

const [openAddSubCategory , setOpenAddSubCategory] = useState(false)

  return (
   <> <section className="container m-1 px-2 py-2 relative scrollbar-none overflow-y-auto h-[calc(100vh-100px)]" >


    
       {/* Header Card */}
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-2 border border-gray-100">

          {/* Title */}
          <div className="font-bold text-xl text-gray-800 tracking-tight">
            Sub Category
          </div>

          {/* Modern Button */}
          <button
            onClick={() => setOpenAddSubCategory(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-95"
          >
            Add Sub Category
          </button>
        </div>


        {
          openAddSubCategory && (
          
          <UploadSubCategoryModel
            close={() => setOpenAddSubCategory(false)}
          />

          )
        }
   </section>
   </>
  )
}

export default SubCategoryPage