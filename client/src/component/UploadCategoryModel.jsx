import React, { useState } from 'react'
import uploadImage from '../utils/UploadImage'

const UploadCategoryModel = ({ close }) => {

    const [data, setData] = useState({
        name: "",
        image: ""
    })



    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
 const handleUploadCategoryImage = async(e) => {
    const file = e.target.files[0]
    if(!file){
        return
    }
  
    const response = await uploadImage(file)
   const {data : ImageResponse} = response

   setData((preve)=>{
    return {
        ...preve ,
        image : ImageResponse.data.url
    }
   })

 }

    return (
        <>
<section className="bg-white drop-shadow-lg rounded-xl p-6 mt-4 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
            <h1 className="font-bold text-lg text-gray-800">Add New Category</h1>
            <button 
                onClick={close} 
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
            >
                ✕
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            
            {/* Grid Layout: Mobile pe 1 column, Desktop pe 3 columns (2 for input, 1 for image) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Side: Category Name Input */}
                <div className="md:col-span-2 flex flex-col gap-2">
                    <label id='CategoryName' className="text-sm font-medium text-gray-600">Category Name</label>
                    <input 
                        type="text"
                        id='CategoryName'
                        placeholder='Enter category name'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                </div>

                {/* Right Side: Image Upload Section */}
                <div className="md:col-span-1 flex flex-col gap-3">
                    <p className="text-sm font-medium text-gray-600">Image Preview</p>
                    
                    {/* Image Preview Box */}
                    <div className="h-32 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-purple-400 transition-colors">
                        {
                            data.image ? (
                                <img
                                    alt='category'
                                    src={data.image}
                                    className='w-full h-full object-contain'
                                />
                            ) : (
                                <div className="text-gray-400 text-xs text-center">
                                    No Image
                                </div>
                            )
                        }
                    </div>

                    {/* Upload Button */}
                    <label htmlFor='uploadeCategoryImage' className="cursor-pointer">
                        <div 
                            className={`
                                ${!data.name ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white shadow-md"}
                                w-full py-2 rounded-lg font-medium text-sm text-center transition-all
                            `}
                        >
                            Upload Image
                        </div>
                        
                        <input 
                            disabled={!data.name}
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
