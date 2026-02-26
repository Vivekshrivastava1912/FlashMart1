import React, { useState } from 'react';
import uploadImage from '../utils/UploadImage';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    discription: "",
    more_details: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return{
        ...preve,
        [name]: value
      }
    })
  };

  const handleUploadImage = async(e)=>{
    const files = e.target.files[0]
    if(!files) {
      return
    }

    const response = await uploadImage(files)
    const {data : ImageResponse} =  response
    const imageUrl = ImageResponse.data.url

setData((preve)=>{
  return{
    ...preve ,
    image : [...preve.image , imageUrl]
  }
})

  }
  return (

    <section className="w-full h-full flex flex-col md:p-2 p-0 bg-gray-50 md:bg-transparent">
      
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white shadow-sm md:rounded-lg p-3 md:p-4 border-b md:border border-gray-200 mb-0 md:mb-2">
        <div className="font-bold text-lg text-gray-800 tracking-tight">
          Upload Product
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 px-4 text-sm rounded-lg transition-all duration-300 transform active:scale-95">
          View Products
        </button>
      </div>

      {/* Product Form Container */}
      {/* Mobile par full height aur no rounded corners, Desktop par rounded */}
      <div className="bg-white shadow-sm md:rounded-lg p-4 md:p-5 border-none md:border border-gray-200 flex-1 overflow-y-auto">
        <form className="flex flex-col gap-4 md:gap-3">
          
          {/* Row 1: Product Name */}
          <div>
            <label htmlFor='name' className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Product Name</label>
            <input
              id='name'
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Row 2: Category & Sub Category (Mobile: 1 column, Desktop: 2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Category</label>
              <select className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white">
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Sub Category</label>
              <select className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white">
                <option value="">Select Sub Category</option>
                <option value="mobiles">Mobiles</option>
                <option value="mens">Men's Wear</option>
              </select>
            </div>
          </div>

          {/* Row 3: Unit, Stock, Price, Discount (Mobile: 2 columns, Desktop: 4 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Unit</label>
              <select className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white">
                <option value="">Unit</option>
                <option value="kg">Kg</option>
                <option value="pcs">Pcs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Stock</label>
              <input type="number" name="stock" value={data.stock} onChange={handleChange} placeholder="0"  required className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
              <input type="number" name="price" value={data.price} onChange={handleChange} placeholder="0.00"  required className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Discount (%)</label>
              <input type="number" name="discount" value={data.discount} onChange={handleChange} placeholder="0" className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
            </div>
          </div>

          {/* Row 4: Images & Description (Mobile: 1 column, Desktop: 2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 md:h-24">
            <div className="flex flex-col h-28 md:h-full">
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Product Images</label>
              <label  className="flex-1 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <p className="text-sm md:text-xs text-purple-600 font-semibold">Click to upload</p>
                  <p className="text-xs md:text-[10px] text-gray-400 mt-1">Max 3 Images</p>
                </div>
                <input type="file"
                 accept='image/*' 
                 className="hidden" 
                 multiple 
                 onChange={handleUploadImage} />
              </label>
            </div>

            <div className="flex flex-col h-28 md:h-full">
              <label htmlFor='discription' className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                id='discription'
                name="discription"
                value={data.discription}
                onChange={handleChange}
                required
                multiple
                placeholder="Enter short description..."
                className="flex-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4 md:mt-2 pb-6 md:pb-0">
            <button
              type="button"
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 md:py-1.5 px-8 rounded-md shadow-md transition-all duration-300 text-sm md:text-base"
            >
              Upload Product
            </button>
          </div>

        </form>
      </div>

    </section>
  );
};

export default UploadProduct;