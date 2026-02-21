import React, { useState } from 'react'
import uploadImage from '../utils/UploadImage'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'

const UploadCategoryModel = ({ close ,fetchData }) => {

    const [data, setData] = useState({
        name: "",
        image: ""
    })

    // Loading state add ki gayi hai
    const [loadingUpload, setLoadingUpload] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
        const response = await Axios({
            ...SummaryApi.addCategory ,
            data : data
        })
        const {data : responseData}= response


if(responseData.success){
   toast.success(responseData.message)
   close()
   fetchData()
}

        }
        catch(error){

              const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
          toast.error(errorMessage)

        }

    }

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }

        try {
            setLoadingUpload(true) // Loading shuru
            const response = await uploadImage(file)
            const { data: ImageResponse } = response

            setData((preve) => {
                return {
                    ...preve,
                    image: ImageResponse.data.url
                }
            })
        } catch (error) {
            console.error("Upload error", error)
        } finally {
            setLoadingUpload(false) // Loading khatam
        }
    }

    return (
        <>
            <section className="mt-4 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h1 className="font-bold text-lg text-gray-800 tracking-wide">Add New Category</h1>
                    <button
                        onClick={close}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6">

                    <div className="flex flex-col md:flex-row gap-6">

                        {/* Left Side: Input Field */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <label htmlFor='CategoryName' className="block text-sm font-semibold text-gray-600 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    id='CategoryName'
                                    placeholder='Enter category name'
                                    value={data.name}
                                    name='name'
                                    onChange={handleOnChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                           {/* Submit Button - Mobile par bhi easily dikhega */}
<button 
    disabled={!(data.name && data.image) || loadingUpload}
    className={`
        w-full py-3 mt-4 rounded-lg text-white font-semibold transition-all shadow-md
        ${data.name && data.image  ? "bg-purple-600 hover:bg-purple-700 active:scale-95" : "bg-gray-300 cursor-not-allowed"}
        /* Mobile touch feedback ke liye active:scale-95 add kiya hai */
    `}
>
 {/* Aap yahan bhi loading check kar sakte hain agar form submit ho raha ho */}
    Create Category
</button>
                        </div>

                        {/* Right Side: Image Upload */}
                        <div className="flex-1 flex flex-col gap-3">
                            <p className="text-sm font-semibold text-gray-600">Category Image</p>

                            {/* Image Preview Box */}
                            <div className="h-40 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative group hover:border-purple-300 transition-colors">
                                {
                                    data.image ? (
                                        <img
                                            alt='category'
                                            src={data.image}
                                            className='w-full h-full object-contain p-2'
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            {loadingUpload ? (
                                                // Modern Spinner for Preview Box
                                                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span className="text-4xl">🖼️</span>
                                                    <p className="text-gray-400 text-xs mt-2">No image selected</p>
                                                </>
                                            )}
                                        </div>
                                    )
                                }
                            </div>

                            {/* Upload Button */}
                            <label htmlFor='uploadeCategoryImage' className="cursor-pointer block">
                                <div
                                    className={`
                                        ${(!data.name || loadingUpload) ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"}
                                        py-2.5 rounded-lg font-medium text-center transition-all duration-300 flex items-center justify-center gap-2
                                    `}
                                >
                                    {
                                        loadingUpload ? (
                                            <span className="flex items-center gap-2">
                                                {/* Modern Spinner for Button */}
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Uploading...
                                            </span>
                                        ) : (
                                            <span>Upload Image</span>
                                        )
                                    }
                                </div>

                                <input
                                    disabled={!data.name || loadingUpload}
                                    onChange={handleUploadCategoryImage}
                                    type="file"
                                    id='uploadeCategoryImage'
                                    className='hidden'
                                />
                            </label>
                        </div>

                    </div>
                </form>
            </section>
        </>
    )
}

export default UploadCategoryModel