import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'
import NoData from '../component/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const CategoryPage = () => {

  const [openUploadCategoryModel, setOpenUploadCategoryModel] = useState(false)

  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        setCategoryData(responseData.data)
      }
    }
    catch (error) {
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <>
      {/* Ye style tag scrollbar ko hide karega par scrolling chalu rakhega */}
      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>

      {/* "scrollbar-none" class yahan add ki gayi hai */}
      <section className="container m-1 px-2 py-2 relative scrollbar-none overflow-y-auto h-[calc(100vh-100px)]">

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
            <div className='fixed inset-0 bg-opacity-30 mt-35 p-1 z-50'>
              <UploadCategoryModel fetchData ={fetchCategory} close={() => setOpenUploadCategoryModel(false)} />
            </div>
          )
        }

        {/* Category List */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3 rounded-sm '>
          {
            categoryData.map((category, index) => {
              // YAHAN CHANGES KIYE HAIN: Comment ko return ke upar rakha hai taaki error na aaye
              return (
            
                 <div key={index} className='bg-white rounded-md p-1 m-1 shadow-sm flex flex-col items-center justify-center'>
                  <img
                    alt={category.name}
                    src={category.image}
                    className='w-24 h-30 object-contain  mix-blend-multiply ' 
                  />
                   {/* Ye comment div ke andar hai isliye safe hai */}
                </div>
          
              )
            })
          }
        </div>

        {/* No Data State */}
        {
          !categoryData[0] && !loading && (
            <div className='bg-gray-50 h-90 w-full p-2.5 rounded- mr-5 mt-5 relative z-10'>
              <NoData />
            </div>)
        }

      </section>

    </>
  )
}

export default CategoryPage