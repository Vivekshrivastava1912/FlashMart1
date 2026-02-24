import React, { useState, useEffect } from 'react'
import uploadImage from '../utils/UploadImage'
import { useSelector } from 'react-redux' 
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

const UploadSubCategoryModel = ({ close }) => {
    const [subCategoryData , setSubCategoryData] = useState({
        name : "",
        image : "",
        category : []
    })

    const [isImageLoading, setIsImageLoading] = useState(false)
    
    // Naya state category data store karne ke liye
    const [categoryData, setCategoryData] = useState([])

    // Redux se allCategory nikalna
    const allCategory = useSelector(state => state.product.allCategory)

    // allCategory update hone pe local state update karna
    useEffect(()=>{
        setCategoryData(allCategory || [])
    }, [allCategory])

    const handleChange = (e)=> {
        const {name , value} = e.target 
        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] :value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        
        setIsImageLoading(true) 

        try {
            const response = await uploadImage(file)
            const { data: ImageResponse } = response

            setSubCategoryData((preve) => {
                return {
                    ...preve,
                    image: ImageResponse.data.url
                }
            })
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setIsImageLoading(false) 
        }
    }

    // Yahan (e) pass kiya aur e.preventDefault() add kiya page refresh rokne ke liye
    const handleSubmitSubCategory =  async(e) => {
        e.preventDefault() 
        try{
            const response = await Axios ({
                ...SummaryApi.createSubCategory,
                data : subCategoryData
            })
            const {data : responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
            }
        }
        catch(error){
              const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
          toast.error(errorMessage)
        }
    }
    
    console.log("Current SubCategory Data:", subCategoryData)

    return (
        <>
            <section className="mt-4 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h1 className="font-bold text-lg text-gray-800 tracking-wide">Add New Sub Category</h1>
                    <button
                        onClick={close} 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <form className="p-6 " onSubmit={handleSubmitSubCategory}>

                    <div className="flex flex-col md:flex-row gap-6">

                        {/* Left Side: Input Fields */}
                        <div className="flex-1 flex flex-col gap-4">
                            
                            {/* Sub Category Name Input */}
                            <div>
                                <label htmlFor='name' className="block text-sm font-semibold text-gray-600 mb-2">Sub Category Name</label>
                                <input
                                    type="text"
                                    id='name'
                                    value={subCategoryData.name}
                                    placeholder='Enter sub category name'
                                    name='name'
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Dynamic Category Selector */}
                            <div>
                                <label htmlFor='category' className="block text-sm font-semibold text-gray-600 mb-2">Select Category</label>
                               
                               <div className="flex flex-wrap gap-2 mt-2 mb-2">
                                    {subCategoryData.category.map((cat, index) => {
                                        return (
                                            <div 
                                                key={cat._id + "selectedValue"} 
                                                className="flex items-center gap-1 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-full border border-purple-200 shadow-sm"
                                            >
                                                <p className="cursor-default">{cat.name}</p>
                                                <div 
                                                    className="cursor-pointer hover:text-red-500 hover:bg-purple-200 rounded-full w-4 h-4 flex items-center justify-center transition-all ml-1"
                                                    onClick={() => {
                                                        setSubCategoryData((preve) => {
                                                            return {
                                                                ...preve,
                                                                category: preve.category.filter(c => c._id !== cat._id)
                                                            }
                                                        })
                                                    }}
                                                >
                                                    ✕
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <select
                                    id='category'
                                    name='category'
                                    onChange={(e)=>{
                                        const value = e.target.value
                                        const categoryDetails = allCategory.find(el => el._id === value)
                                        
                                        setSubCategoryData((preve)=>{
                                            return{
                                                ...preve,
                                                category : [...preve.category, categoryDetails]
                                            }
                                        })
                                    }}
                                    className="w-full  px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                                >
                                    <option value="">-- Choose Category --</option>
                                    
                                    {categoryData?.map((category) => {
                                        return (
                                            <option  className='bg-purple-10 text-xl text-purple-600 rounded-2xl overflow-hidden' value={category._id} key={category._id}>
                                                {category.name}
                                            </option>
                                        )
                                    })}

                                </select>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" // Yahan type="button" ki jagah "submit" kar diya gaya hai
                                disabled={!subCategoryData.name || !subCategoryData.image || isImageLoading}
                                className={`w-full py-3 mt-auto rounded-lg text-white font-semibold transition-all shadow-md ${
                                    (!subCategoryData.name || !subCategoryData.image || isImageLoading) 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
                                }`}
                            >
                                Create Sub Category
                            </button>
                        </div>

                        {/* Right Side: Image Upload */}
                        <div className="flex-1 flex flex-col gap-3">
                            <p className="text-sm font-semibold text-gray-600">Sub Category Image</p>

                            {/* Image Preview Box */}
                            <div className="h-40 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative group hover:border-purple-300 transition-colors">
                                
                                {isImageLoading ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-500 text-xs mt-2 font-medium">Uploading...</p>
                                    </div>
                                ) : !subCategoryData.image ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl">🖼️</span>
                                        <p className="text-gray-400 text-xs mt-2">No image selected</p>
                                    </div>
                                ) : (
                                    <img
                                        alt='subCategory'
                                        src={subCategoryData.image}
                                        className='w-full h-full object-contain p-2'
                                    />
                                )}

                            </div>
                          
                            {/* Upload Button */}
                            <label 
                                htmlFor='uploadeSubCategoryImage' 
                                className={`block ${!subCategoryData.name ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className={`py-2.5 rounded-lg font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 text-white shadow-md ${
                                    !subCategoryData.name 
                                    ? 'bg-gray-400' 
                                    : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                                }`}>
                                    <span>Upload Image</span>
                                </div>

                                <input
                                    type="file"
                                    id='uploadeSubCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadSubCategoryImage}
                                    disabled={!subCategoryData.name || isImageLoading} 
                                />
                            </label>
                            
                        </div>

                    </div>
                </form>
            </section>
        </>
    )
}

export default UploadSubCategoryModel