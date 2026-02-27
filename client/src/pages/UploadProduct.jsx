import React, { useState, useEffect } from 'react';
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import { MdClose, MdEdit, MdDelete, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi"; 
import toast from 'react-hot-toast'; 
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

import EditProduct from '../component/EditProduct';
import DeleteProduct from '../component/DeleteProduct';

// Image Slider Component for individual products
const ProductImageSlider = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-50 rounded-xl border border-gray-100 p-2">
      <img 
        src={images[currentIndex]} 
        alt={`${productName} - ${currentIndex + 1}`} 
        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110" 
      />
      
      {images.length > 1 && (
        <>
          <button 
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <MdChevronLeft size={20} />
          </button>
          <button 
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <MdChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-purple-600' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};


const UploadProduct = () => {
  const [showForm, setShowForm] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const allCategories = useSelector(state => state.product.allCategory);
  const allSubCategories = useSelector(state => state.product.allSubCategory);
  
  const [allProducts, setAllProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [], 
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    discription: "",
    more_details: {},
  });

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct 
      });
      if (response.data.success) {
        setAllProducts(response.data.data);
      }
    } catch (error) {
      console.error("Fetch Product Error:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadImage(file);
      const { data: ImageResponse } = response;
      const imageUrl = ImageResponse.data.url;

      setData((preve) => ({
        ...preve,
        image: [...preve.image, imageUrl]
      }));
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setData((preve) => ({
      ...preve,
      image: preve.image.filter((_, i) => i !== index)
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const categoryDetails = allCategories.find(el => el._id === value);
    const isExisted = data.category.some(el => el._id === value);

    if(!isExisted && categoryDetails) {
        setData((preve) => ({
            ...preve,
            category: [...preve.category, categoryDetails]
        }));
    }
  };

  const handleRemoveCategory = (index) => {
    setData((preve) => ({
      ...preve,
      category: preve.category.filter((_, i) => i !== index)
    }));
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const subCategoryDetails = allSubCategories.find(el => el._id === value);
    const isExisted = data.subCategory.some(el => el._id === value);

    if(!isExisted && subCategoryDetails) {
        setData((preve) => ({
            ...preve,
            subCategory: [...preve.subCategory, subCategoryDetails]
        }));
    }
  };

  const handleRemoveSubCategory = (index) => {
    setData((preve) => ({
      ...preve,
      subCategory: preve.subCategory.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.category.length === 0){
      toast.error("Please select at least one Category");
      return;
    }
    if(data.subCategory.length === 0){
      toast.error("Please select at least one Sub Category");
      return;
    }
    if(data.image.length === 0){
      toast.error("Please upload at least one Image");
      return;
    }

    try{
        const response = await Axios({
          ...SummaryApi.addProduct,
            data : data
        });
        
        if(response.data.success){
           toast.success(response.data.message);
           setShowForm(false); 
           fetchProductData(); 
           setData({
              name: "", image: [], category: [], subCategory: [],
              unit: "", stock: "", price: "", discount: "", discription: "", more_details: {}
           });
        }
    }
    catch(error){
        const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
        toast.error(errorMessage);
    }
  };

  return (
    <section className="w-full h-full flex flex-col md:p-2 p-0 bg-gray-50 md:bg-transparent overflow-hidden">
      
      {/* Header Card */}
      <div className="flex items-center justify-between bg-white shadow-sm md:rounded-lg p-3 md:p-4 border-b md:border border-gray-200 mb-0 md:mb-2 shrink-0">
        <div className="font-bold text-lg text-gray-800 tracking-tight">
          {showForm ? 'Upload Product' : 'Manage Products'}
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 px-4 text-sm rounded-lg transition-all duration-300 transform active:scale-95"
          >
            + Add New Product
          </button>
        )}
      </div>

      {/* Product Display List - Displaying existing products */}
      {!showForm && (
        <div className="bg-white shadow-sm md:rounded-lg p-4 md:p-5 border-none md:border border-gray-200 flex-1 overflow-y-auto">
          {allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="text-gray-300 mb-4"><BiLoaderAlt size={48} className="animate-spin" /></div>
               <p className="text-gray-500 font-medium">No Products Found</p>
               <p className="text-xs text-gray-400 mt-1">Click on "Add New Product" to create one.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {allProducts.map((p, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden w-full"
                >
                  
                  {/* Left Side: Image Slider */}
                  <div className="w-full md:w-56 h-48 shrink-0 relative">
                    <ProductImageSlider images={p.image} productName={p.name} />
                    {p.discount > 0 && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-xl shadow-sm z-10">
                        {p.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Right Side: Product Details - ADDED min-w-0 TO FIX OVERFLOW */}
                  <div className="flex flex-col flex-1 py-1 min-w-0">
                    
                    {/* Title & Actions */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight group-hover:text-purple-700 transition-colors duration-300 wrap-break-word line-clamp-2">
                        {p.name}
                      </h3>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1.5 shrink-0">
                        <button 
                          onClick={() => setEditProduct(p)}
                          className="bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white rounded-lg p-1.5 transition-all duration-200"
                          title="Edit Product"
                        >
                          <MdEdit size={16}/>
                        </button>
                        <button 
                          onClick={() => setDeleteProduct(p)}
                          className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg p-1.5 transition-all duration-200"
                          title="Delete Product"
                        >
                          <MdDelete size={16}/>
                        </button>
                      </div>
                    </div>

                    {/* Categories Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded uppercase wrap-break-word max-w-full">
                         {p.category?.name || "Category"}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded uppercase wrap-break-word max-w-full">
                         {p.subCategory?.name || "Sub Category"}
                      </span>
                    </div>

                    {/* Description - ADDED break-all TO PREVENT LONG STRING OVERFLOW */}
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2 md:line-clamp-3 break-all md:wrap-break-word whitespace-normal">
                      {p.description || "No description available."}
                    </p>

                    {/* Bottom Stats */}
                    <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                      
                      {/* Price */}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Selling Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-extrabold text-xl text-gray-900">₹{p.price}</span>
                          {p.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through font-medium">
                              ₹{Math.round(p.price / (1 - p.discount / 100))}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stock & Unit */}
                      <div className="flex items-center gap-3">
                         <span className="bg-purple-50 text-purple-700 text-xs px-2.5 py-1 rounded border border-purple-100 font-bold uppercase truncate max-w-20">
                           {p.unit || 'N/A'}
                         </span>
                         <span className={`text-xs px-2.5 py-1 rounded border font-bold uppercase ${p.stock > 0 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                           {p.stock > 0 ? `Stock: ${p.stock}` : 'Out of Stock'}
                         </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Form Container - Reverted to OLD DESIGN */}
      {showForm && (
        <div className="bg-white shadow-sm md:rounded-lg p-4 md:p-5 border-none md:border border-gray-200 flex-1 overflow-y-auto">
          <form className="flex flex-col gap-4 md:gap-3" onSubmit={handleSubmit}>
            
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

            {/* Row 2: Category & Sub Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Category</label>
                <div className='flex flex-col gap-2'>
                  <select 
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white"
                  >
                    <option value="">Select Category</option>
                    {allCategories.map((c,index) => (
                      <option key={index} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <div className='flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-none'>
                     {data.category.map((cat, index) => (
                          <div key={index} className='flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-200 text-xs font-medium'>
                              {cat.name}
                              <MdClose className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveCategory(index)} />
                          </div>
                      ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Sub Category</label>
                <div className='flex flex-col gap-2'>
                  <select 
                    onChange={handleSubCategoryChange}
                    className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white"
                  >
                    <option value="">Select Sub Category</option>
                    {allSubCategories.map((c,index) => (
                      <option key={index} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <div className='flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-none'>
                     {data.subCategory.map((sub, index) => (
                          <div key={index} className='flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 text-xs font-medium'>
                              {sub.name}
                              <MdClose className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveSubCategory(index)} />
                          </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Unit, Stock, Price, Discount */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Unit</label>
                <select 
                  name="unit" 
                  value={data.unit} 
                  onChange={handleChange} 
                  required
                  className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-600 bg-white"
                >
                  <option value="">Unit</option>
                  <option value="kg">Kg</option>
                  <option value="pcs">Pcs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Stock</label>
                <input type="number" name="stock" value={data.stock} onChange={handleChange} placeholder="0" required className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                <input type="number" name="price" value={data.price} onChange={handleChange} placeholder="0.00" required className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Discount (%)</label>
                <input type="number" name="discount" value={data.discount} onChange={handleChange} placeholder="0" required className="w-full border border-gray-300 rounded-md p-2 md:p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
            </div>

            {/* Row 4: Image & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
              <div className="flex flex-col min-h-30">
                <label className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Product Images</label>
                <div className='flex gap-2 flex-wrap'>
                  <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden">
                    {loading ? (
                      <div className='flex flex-col items-center justify-center'>
                        <BiLoaderAlt className='animate-spin text-purple-600' size={20} />
                        <p className='text-[10px] text-gray-500 mt-1'>Uploading...</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-[10px] text-purple-600 font-bold uppercase">Upload</p>
                        <input type="file" accept='image/*' className="hidden" onChange={handleUploadImage} disabled={loading} />
                      </>
                    )}
                  </label>
                  {data.image.map((img, index) => (
                    <div key={index} className='relative group w-20 h-20 bg-gray-100 border rounded-md overflow-hidden flex items-center justify-center shadow-sm'>
                      <img src={img} alt="product" className='w-full h-full object-contain bg-white' />
                      <button type="button" onClick={() => handleRemoveImage(index)} className='absolute top-0 right-0 bg-red-500 text-white rounded-bl-md p-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <MdClose size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col min-h-30">
                <label htmlFor='discription' className="block text-sm md:text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  id='discription'
                  name="discription"
                  value={data.discription}
                  onChange={handleChange}
                  required
                  placeholder="Enter short description..."
                  className="flex-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit & Back Buttons */}
            <div className="flex justify-end gap-3 mt-4 md:mt-2 pb-6 md:pb-0">
              <button
                type="button" 
                onClick={() => setShowForm(false)}
                className="w-full md:w-auto bg-gray-500 hover:bg-red-600 text-white font-bold py-2.5 md:py-1.5 px-8 rounded-md shadow-md transition-all duration-300 text-sm md:text-base"
              >
                Back
              </button>
              <button
                type="submit" 
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 md:py-1.5 px-8 rounded-md shadow-md transition-all duration-300 text-sm md:text-base"
              >
                Upload Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Component Modal */}
      {editProduct && (
        <EditProduct 
          data={editProduct} 
          close={() => setEditProduct(null)} 
          fetchProductData={fetchProductData} 
        />
      )}

      {/* Delete Component Modal */}
      {deleteProduct && (
        <DeleteProduct 
          data={deleteProduct} 
          close={() => setDeleteProduct(null)} 
          fetchProductData={fetchProductData} 
        />
      )}

    </section>
  );
};

export default UploadProduct;