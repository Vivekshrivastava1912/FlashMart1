import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'
import NoData from '../component/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { MdEdit, MdDelete } from "react-icons/md";
import EditCategory from '../component/EditCategory'
import ConfirmBox from '../component/ConfirmBox'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CategoryPage = () => {

  const [openUploadCategoryModel, setOpenUploadCategoryModel] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openEdit , setOpenEdit] =useState(false)
  const [editData , setEditData] = useState ({
    name : "",
    image : "" ,
  })
  const [openConfirmBoxDelete , setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory , setDeleteCategory] = useState({
    _id : ""
  })

  const allCategory = useSelector(state => state.product.allCategory)
 
  // Redux se initial data load
  useEffect(()=>{
     setCategoryData(allCategory || [])
  } ,[allCategory])


  // FIX: fetchCategory function ko wapas add kiya hai.
  // Ye server se latest data layega taaki bina reload kiye changes dikhein.
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        // Direct local state update kar rahe hain taaki turant dikhe
        setCategoryData(responseData.data)
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async ()=>{
    try{
      const response = await Axios({
        ...SummaryApi.deleteCategory ,
        data : deleteCategory
      })
      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        setOpenConfirmBoxDelete(false)
        fetchCategory() // FIX: Delete hone ke turant baad list refresh hogi
      }
    }
    catch(error){
        console.error(error)
    }
  }

  return (
    <>
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

      <section className="container m-1 px-2 py-2 relative scrollbar-none overflow-y-auto h-[calc(100vh-100px)]">

        {/* Header Card */}
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-2 border border-gray-100">

          <div className="font-bold text-xl text-gray-800 tracking-tight">
            Category
          </div>

          <button
            onClick={() => setOpenUploadCategoryModel(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-95"
          >
            Add Category
          </button>
        </div>

        {/* Modal Component Logic - Pass updated fetchCategory */}
        {
          openUploadCategoryModel && (
            <div className='fixed inset-0 bg-opacity-30 mt-35 p-1 z-50'>
              <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategoryModel(false)} />
            </div>
          )
        }

        {/* Category List */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3 rounded-sm '>
          {
            categoryData.map((category, index) => {
             
              return (
               <React.Fragment key={index}>  
                <div className='bg-white rounded-md p-1 m-1 shadow-sm flex flex-col items-center justify-center'>
                  <img
                    alt={category.name}
                    src={category.image}
                    className='w-24 h-30 object-contain  mix-blend-multiply ' 
                  />
                  
                  {/* Buttons */}
                  <div className='flex items-center justify-center gap-2 border-t border-gray-300 pt-2 text-2xl'>
                    <button
                      onClick={() => {
                        setOpenEdit(true)
                        setEditData(category)
                      }}
                      className='flex-1 flex items-center justify-center m-1 p-1 bg-green-100 text-green-700 rounded-md 
                                transition-all duration-300 ease-out
                                hover:bg-green-600 hover:text-white hover:scale-110 active:scale-90
                                hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] group'
                      title='Edit'
                    >
                      <MdEdit size={18} className="group-hover:rotate-360 transition-transform duration-500" />
                    </button>

                    <button
                      onClick={() =>
                        {
                          setOpenConfirmBoxDelete(true)
                          setDeleteCategory(category)
                        }}
                      className='flex-1 flex items-center justify-center m-1 p-1 bg-red-100 text-red-700 rounded-md 
                                transition-all duration-300 ease-out
                                hover:bg-red-600 hover:text-white hover:scale-110 active:scale-90
                                hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] group'
                      style={{ animation: 'none' }}
                      onMouseEnter={(e) => e.currentTarget.style.animation = 'wiggle 0.3s infinite'}
                      onMouseLeave={(e) => e.currentTarget.style.animation = 'none'}
                      title='Delete'
                    >
                      <MdDelete size={18} />
                    </button>

                    <style>{`
                      @keyframes wiggle {
                        0%, 100% { transform: rotate(-3deg); }
                        50% { transform: rotate(3deg); }
                      }
                    `}</style>
                  </div>   
                </div>
               </React.Fragment>
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

        {
          openEdit && (
            <div className='fixed inset-0 bg-opacity-30 mt-35 p-1 z-50' > 
              <EditCategory 
                data={editData} 
                close={() => setOpenEdit(false)}
                fetchData={fetchCategory} // FIX: Pass fetchCategory here
              />
            </div>
          )
        }

        {
          openConfirmBoxDelete && (
            <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
          )
        }
      </section>
    </>
  )
}

export default CategoryPage