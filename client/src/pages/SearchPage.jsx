import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import toast from 'react-hot-toast'; // ✅ Toast import kiya
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

// Image Slider Component for Card
const ProductImageSlider = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 text-[10px]">No Image</div>;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-white p-1 rounded-t-lg">
      <img
        src={images[currentIndex]}
        alt={productName}
        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
      />
      {images.length > 1 && (
        <>
          <button type="button" onClick={handlePrev} className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 p-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronLeft size={14} /></button>
          <button type="button" onClick={handleNext} className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 p-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronRight size={14} /></button>
        </>
      )}
    </div>
  );
};

const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Modal ke liye states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null); 
  
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Same Home wala Add to cart logic
  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation(); // Card ke click event ko rokne ke liye
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productId = product?._id || product?.id;
    const isAlreadyInCart = existingCart.find(item => (item?._id || item?.id) === productId);

    if (!isAlreadyInCart) {
      localStorage.setItem('cartItems', JSON.stringify([...existingCart, { ...product, quantity: 1 }]));
      toast.success(`${product?.productName || product?.name || 'Product'} added to cart!`); 
    } else {
      toast.error("Product is already in the cart!"); 
    }
  };

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await Axios({ ...SummaryApi.getProduct });
      if (response.data.success) {
        const sortedData = [...response.data.data].sort((a, b) => {
          if (a._id < b._id) return -1;
          if (a._id > b._id) return 1;
          return 0;
        });
        setAllProducts(sortedData);
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

  // Search Logic based on URL Query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";

    if (query.trim() === "") {
      // ✅ Agar kuch search nahi kiya to sirf shuru ke 20 items dikhayega
      setFilteredProducts(allProducts.slice(0, 20));
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [location.search, allProducts]);


  return (
    <section className="w-full h-full flex flex-col p-2 bg-gray-50 overflow-hidden relative">
      
      {/* Top Header */}
   

      {/* Product List Area */}
      <div className="flex-1 overflow-y-auto pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BiLoaderAlt size={36} className="animate-spin text-green-600 mb-4" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-sm">
            No products found for your search.
          </div>
        ) : (
          /* 🔥 ULTRA COMPACT BLINKIT STYLE GRID 🔥 */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredProducts.map((p, index) => {
              const productImg = Array.isArray(p?.image) ? p.image[0] : p?.image;
              
              return (
              /* ✅ Link hata kar onClick lagaya taaki Modal khule */
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-lg flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden cursor-pointer"
                onClick={() => { 
                  setSelectedProduct(p); 
                  setActiveImage(productImg); 
                }}
              >
                
                {/* Image Section (Square) */}
                <div className="w-full pt-[100%] relative bg-white">
                  <div className="absolute inset-0 p-1">
                    <ProductImageSlider images={p.image} productName={p.name} />
                  </div>
                  
                  {/* Discount Badge */}
                  {p.discount > 0 && (
                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-bold px-1 py-0.5 rounded-br-lg shadow-sm z-10 flex flex-col items-center leading-none">
                      <span>{p.discount}%</span>
                      <span>OFF</span>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col flex-1 p-2">
                  
                  {/* Delivery Time Tag */}
                  <div className="bg-gray-100 w-fit rounded px-1 py-0.5 mb-1 flex items-center gap-1">
                    <span className="text-[8px] font-bold text-gray-600 uppercase">⏱ 10 MINS</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-[12px] text-gray-800 leading-tight line-clamp-2 h-8 mb-0.5">
                    {p.name}
                  </h3>

                  {/* Unit/Weight */}
                  <span className="text-gray-500 text-[10px] mb-2">
                    {p.unit || '1 Unit'}
                  </span>

                  {/* Price and Add Button */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      {p.discount > 0 && (
                        <span className="text-[9px] text-gray-400 line-through leading-none mb-px">
                          ₹{Math.round(p.price / (1 - p.discount / 100))}
                        </span>
                      )}
                      <span className="font-bold text-[13px] text-gray-900 leading-none">₹{p.price}</span>
                    </div>
                    
                    {/* ADD Button */}
                    {p.stock > 0 ? (
                      <button 
                        onClick={(e) => handleAddToCart(p, e)} // ✅ Same Add To Cart logic
                        className="border border-green-600 text-green-700 bg-green-50 px-3 py-1 rounded-md text-[11px] font-bold uppercase hover:bg-green-600 hover:text-white transition-colors active:scale-95"
                      >
                        Add
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        disabled 
                        className="border border-gray-200 text-gray-400 bg-gray-50 px-2 py-1 rounded-md text-[9px] font-bold uppercase cursor-not-allowed"
                      >
                        Out of stock
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )})}
          </div>
        )}
      </div>

      {/* --- ✅ EXACT BLINKIT STYLE PRODUCT DETAIL MODAL FROM HOME --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            
            <button 
                onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); setActiveImage(null); }}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-r border-gray-100">
                <img 
                    src={activeImage} 
                    alt={selectedProduct?.name || selectedProduct?.productName}
                    className="max-h-64 md:max-h-80 object-contain mix-blend-multiply mb-4"
                />
                
                <div className="flex gap-3 overflow-x-auto w-full justify-center px-2 py-1 scrollbar-hide">
                    {(() => {
                        const imagesArray = Array.isArray(selectedProduct?.image) ? selectedProduct.image : Array.isArray(selectedProduct?.productImage) ? selectedProduct.productImage : [selectedProduct?.image || selectedProduct?.productImage].filter(Boolean);
                        return imagesArray.map((img, idx) => (
                            <img
                                key={idx} src={img} alt={`thumb-${idx}`} onClick={(e) => { e.stopPropagation(); setActiveImage(img); }}
                                className={`w-14 h-14 md:w-16 md:h-16 object-contain cursor-pointer border-2 rounded-lg bg-white p-1 transition-all ${ activeImage === img ? 'border-green-600 shadow-md scale-105' : 'border-gray-200 hover:border-green-300' }`}
                            />
                        ));
                    })()}
                </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-2">{selectedProduct?.category || "General"}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{selectedProduct?.name || selectedProduct?.productName}</h2>
                <p className="text-gray-500 text-sm mb-6">{selectedProduct?.brand || "Premium Quality Product"}</p>
                
                <hr className="my-4" />

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-gray-900">₹{selectedProduct?.price}</span>
                        {selectedProduct?.discount > 0 && (
                            <span className="text-lg text-gray-400 line-through">₹{Math.round(selectedProduct?.price / (1 - selectedProduct?.discount / 100))}</span>
                        )}
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">BEST PRICE</span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedProduct?.description || selectedProduct?.discription || "This high-quality product is perfect for your daily needs. Get it delivered to your doorstep within minutes."}
                    </p>
                </div>

                <div className="mt-10 space-y-3">
                    <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                        onClick={(e) => { 
                          handleAddToCart(selectedProduct, e); 
                          setSelectedProduct(null); 
                          setActiveImage(null); 
                          navigate('/mycard');
                        }}
                    >
                        ADD TO CART & PAY
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 py-2 opacity-60 grayscale">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="paypal" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="mastercard" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="visa" />
                    </div>
                    <p className="text-[10px] text-center text-gray-400">Secure 256-bit SSL Encrypted Payment</p>
                </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default SearchPage;