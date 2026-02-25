import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../component/UploadSubCategoryModel'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import DisplayTable from '../component/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import EditSubCategory from '../component/EditSubCategory'
import DeleteSubCategory from '../component/DeleteSubCategory'
import { FiEdit2, FiTrash2 } from "react-icons/fi" // Added react-icons import

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [openEdit , setOpenEdit] = useState(false)
  const [editDataDelete , setEditDataDelete] = useState({
    _id : ""
  })
  const [editDelete , setEditDelete] = useState(false)
  const [editData , setEditData] = useState({
    _id  : ""
  })

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      toast.error("Something went wrong while fetching data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor("name", {
      header: "Sub Category Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        const categories = row.original.category;
        return (
          <div className="flex flex-col gap-1">
            {categories.map((cat, index) => (
              <div key={cat._id + index} className="flex items-center gap-2">
                {cat.image && <img src={cat.image} className="w-12 h-16 rounded " alt='' />}
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        )
      }
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditData(row.original)
                setOpenEdit(true)
              }}
              className="p-1.5 text-green-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="Edit Sub Category"
            >
              {/* React Icon applied here */}
              <FiEdit2 className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => {
                 setEditDataDelete(row.original)
               setEditDelete(true)
              }}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Sub Category"
            >
              {/* React Icon applied here */}
              <FiTrash2 className="w-4.5 h-4.5" />
            </button>
          </div>
        )
      }
    })
  ]

  return (
    <>
      <section className="container m-1 px-2 py-2 relative scrollbar-none overflow-y-auto h-[calc(100vh-100px)]">
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-2 border border-gray-100">
          <div className="font-bold text-xl text-gray-800 tracking-tight">
            Sub Category
          </div>

          <button
            onClick={() => setOpenAddSubCategory(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-95"
          >
            Add Sub Category
          </button>
        </div>

        <div>
          <DisplayTable
            data={data}
            column={column}
          />
        </div>

       {openAddSubCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center mt-35">
          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-white rounded-xl shadow-2xl">
            <UploadSubCategoryModel
              close={() => setOpenAddSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          </div>
        </div>
      )}
      { openEdit &&(    <EditSubCategory
       data = {editData}
        close = {() => setOpenEdit(false)}
        fetchData={fetchSubCategory} // Pass fetchData here
      />)
    
      }
      {
        editDelete && (
          <DeleteSubCategory data={editDataDelete} close={() => setEditDelete(false)} fetchData={fetchSubCategory}/>
        )
      }
      </section>
    </>
  )
}

export default SubCategoryPage