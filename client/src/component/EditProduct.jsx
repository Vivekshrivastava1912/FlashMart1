import React, { useState } from 'react';
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const EditProduct = ({ data: initialData, close, fetchProductData }) => {
  const [loading, setLoading] = useState(false);
  const allCategories = useSelector(state => state.product.allCategory);
  const allSubCategories = useSelector(state => state.product.allSubCategory);

  // State Initialization
  const [data, setData] = useState({
    _id: initialData._id,
    name: initialData.name || "",
    image: initialData.image || [],
    category: initialData.category ? (Array.isArray(initialData.category) ? initialData.category : [initialData.category]) : [],
    subCategory: initialData.subCategory ? (Array.isArray(initialData.subCategory) ? initialData.subCategory : [initialData.subCategory]) : [],
    unit: initialData.unit || "",
    stock: initialData.stock || "",
    price: initialData.price || "",
    discount: initialData.discount || "",
    discription: initialData.description || "",
    more_details: initialData.more_details || {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files);
    // Filter to allow only image files inside the folder
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    setLoading(true);
    try {
      const uploadPromises = imageFiles.map(file => uploadImage(file));
      const responses = await Promise.all(uploadPromises);
      const newImageUrls = responses.map(response => response.data.data.url);
      setData((preve) => ({ ...preve, image: [...preve.image, ...newImageUrls] }));
    } catch (error) {
      console.error("Upload error", error);
      toast.error("Failed to upload one or more images");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setData((preve) => ({ ...preve, image: preve.image.filter((_, i) => i !== index) }));
  };

  // FIX: Push new category to array instead of overwriting
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const categoryDetails = allCategories.find(el => el._id === value);
    // Check if ID exists (handles both object or string ID)
    const isExisted = data.category.some(el => (typeof el === 'object' ? el._id : el) === value);

    if (categoryDetails && !isExisted) {
      setData((preve) => ({ ...preve, category: [...preve.category, categoryDetails] }));
    }
  };

  // FIX: Remove only specific category
  const handleRemoveCategory = (index) => {
    setData((preve) => ({
      ...preve,
      category: preve.category.filter((_, i) => i !== index)
    }));
  };

  // FIX: Push new sub-category to array instead of overwriting
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const subCategoryDetails = allSubCategories.find(el => el._id === value);
    // Check if ID exists (handles both object or string ID)
    const isExisted = data.subCategory.some(el => (typeof el === 'object' ? el._id : el) === value);

    if (subCategoryDetails && !isExisted) {
      setData((preve) => ({ ...preve, subCategory: [...preve.subCategory, subCategoryDetails] }));
    }
  };

  // FIX: Remove only specific sub-category
  const handleRemoveSubCategory = (index) => {
    setData((preve) => ({
      ...preve,
      subCategory: preve.subCategory.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.category.length === 0 || data.subCategory.length === 0) return toast.error("Category/SubCategory required");

    try {
      // FIX: Bhejne se pehle ID ka proper array banana, and removed [0] to allow multiple save
      const payload = {
        ...data,
        category: data.category.map(c => typeof c === 'object' ? c._id : c),
        subCategory: data.subCategory.map(s => typeof s === 'object' ? s._id : s),
        description: data.discription
      };

      const response = await Axios({
        ...SummaryApi.updateProduct,
        data: payload
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (fetchProductData) fetchProductData();
        close();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-fade-in-up">

        <div className="flex items-center justify-between border-b p-4 shrink-0 bg-white">
          <h2 className="font-bold text-lg text-gray-800">Edit Product</h2>
          <button onClick={close} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 md:p-5 flex-1 overflow-y-auto bg-gray-50">
          <form className="flex flex-col gap-4 md:gap-3 bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm" onSubmit={handleSubmit}>

            {/* Row 1: Product Name */}
            <div>
              <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Product Name</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
            </div>

            {/* Row 2: Category & Sub Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Category</label>
                <div className='flex flex-col gap-2'>
                  <select onChange={handleCategoryChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white">
                    <option value="">Select Category</option>
                    {allCategories.map((c, i) => <option key={i} value={c._id}>{c.name}</option>)}
                  </select>
                  <div className='flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-none'>
                    {/* FIX: Map over multiple categories and resolve their names properly */}
                    {data.category.map((cat, i) => {
                      const catName = typeof cat === 'object' ? cat?.name : allCategories?.find(c => c._id === cat)?.name || cat;
                      return (
                        <div key={i} className='flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-200 text-xs font-medium'>
                          {catName}
                          <MdClose className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveCategory(i)} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Sub Category</label>
                <div className='flex flex-col gap-2'>
                  <select onChange={handleSubCategoryChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white">
                    <option value="">Select Sub Category</option>
                    {allSubCategories.map((c, i) => <option key={i} value={c._id}>{c.name}</option>)}
                  </select>
                  <div className='flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-none'>
                    {/* FIX: Map over multiple sub-categories and resolve their names properly */}
                    {data.subCategory.map((sub, i) => {
                      const subName = typeof sub === 'object' ? sub?.name : allSubCategories?.find(s => s._id === sub)?.name || sub;
                      return (
                        <div key={i} className='flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 text-xs font-medium'>
                          {subName}
                          <MdClose className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveSubCategory(i)} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Details Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Unit</label>
                <select name="unit" value={data.unit} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm outline-none focus:ring-1 focus:ring-purple-500">
                  <option value="kg">Kg</option><option value="pcs">Pcs</option><option value="gm">Gram</option><option value="ltr">Liter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Stock</label>
                <input type="number" name="stock" value={data.stock} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                <input type="number" name="price" value={data.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Discount (%)</label>
                <input type="number" name="discount" value={data.discount} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
            </div>

            {/* Row 4: Images & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Product Images (Upload Folder)</label>
                <div className='flex gap-2 flex-wrap'>
                  
                  {/* 🔥 UPDATED: Folder Upload feature added here */}
                  <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    {loading ? (
                      <BiLoaderAlt className='animate-spin text-purple-600' />
                    ) : (
                      <span className="text-[9px] font-bold text-purple-600 uppercase">Folder</span>
                    )}
                    <input 
                       type="file" 
                       webkitdirectory="true" 
                       directory="true" 
                       multiple 
                       accept="image/*" 
                       className="hidden" 
                       onChange={handleUploadImage} 
                       disabled={loading} 
                    />
                  </label>

                  {data.image.map((img, i) => (
                    <div key={i} className='relative w-16 h-16 border rounded bg-white overflow-hidden shadow-sm group'>
                      <img src={img} className='w-full h-full object-contain' alt="product" />
                      <button type="button" onClick={() => handleRemoveImage(i)} className='absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity'>
                        <MdClose size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea name="discription" value={data.discription} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 h-24 resize-none"></textarea>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end gap-3 mt-4 md:mt-2">
              <button type="button" onClick={close} className="px-6 py-2 bg-gray-500 text-white rounded font-bold text-sm hover:bg-gray-600 transition-all">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 transition-all">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;