import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

// Image Slider Component for Card
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

  if (!images || images.length === 0) return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-50 rounded-xl border border-gray-100 p-2">
      <img
        src={images[currentIndex]}
        alt={productName}
        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
      />
      {images.length > 1 && (
        <>
          <button type="button" onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronLeft size={20} /></button>
          <button type="button" onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronRight size={20} /></button>
        </>
      )}
    </div>
  );
};

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await Axios({ ...SummaryApi.getProduct });
      if (response.data.success) {
        // 🔥 FIX: Frontend par bhi _id se ASCENDING sort taaki exact DB sequence aaye
        const sortedData = [...response.data.data].sort((a, b) => {
          if (a._id < b._id) return -1;
          if (a._id > b._id) return 1;
          return 0;
        });
        setAllProducts(sortedData);
        setFilteredProducts(sortedData);
      }
    } catch (error) {
      console.error("Fetch Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Search Logic (Case Insensitive)
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <section className="w-full h-full flex flex-col p-2 bg-gray-50 md:bg-transparent overflow-hidden">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-sm rounded-lg p-3 md:p-4 border border-gray-200 mb-2 shrink-0 gap-3">
        <div className="font-bold text-lg text-gray-800 tracking-tight whitespace-nowrap">All Products</div>
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search product (e.g. FORTUNE or fortune)" 
            value={searchQuery} 
            onChange={handleSearch} 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
          />
        </div>
      </div>

      {/* Product List Area */}
      <div className="bg-white shadow-sm rounded-lg p-4 md:p-5 border border-gray-200 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BiLoaderAlt size={48} className="animate-spin text-purple-600 mb-4" />
            <p className="text-gray-500 font-medium">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">No products found.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProducts.map((p, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Image Section */}
                <div className="w-full md:w-52 h-48 shrink-0 relative">
                  <ProductImageSlider images={p.image} productName={p.name} />
                  
                  {/* Discount Display on Image */}
                  {p.discount > 0 && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-xl shadow-sm z-10">
                      {p.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col flex-1 py-1 min-w-0">
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight line-clamp-2">{p.name}</h3>

                  <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-3 md:line-clamp-4">
                    {p.description || p.discription || "No description available for this product."}
                  </p>

                  {/* Price and Stock Footer */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Price</span>
                      <div className="flex items-baseline gap-2">
                        {/* Discounted Price & Original Strike-through */}
                        <span className="font-extrabold text-xl text-gray-900">₹{p.price}</span>
                        {p.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through font-medium">
                            ₹{Math.round(p.price / (1 - p.discount / 100))}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded font-bold uppercase">
                        {p.unit || 'Unit'}
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
    </section>
  );
};

export default Product;