import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi, { baseURL } from '../common/SummaryApi';
import Axios from '../utils/Axios';
import bannerDesktop from '../assets/bannerd.png';
import toast from 'react-hot-toast'; // ✅ react-hot-toast import kiya

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null); 
  
  const navigate = useNavigate();

  // Pagination Calculations
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    if (typeof pageNumber !== 'number') return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Smart Page Numbers for standard website pagination (e.g. 1 2 3 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // ✅ Alert ki jagah Toast laga diya
  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation(); // Card ke click event ko rokne ke liye
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productId = product?._id || product?.id;
    const isAlreadyInCart = existingCart.find(item => (item?._id || item?.id) === productId);

    if (!isAlreadyInCart) {
      localStorage.setItem('cartItems', JSON.stringify([...existingCart, { ...product, quantity: 1 }]));
      toast.success(`${product?.productName || 'Product'} added to cart!`); // ✅ Toast notification
    } else {
      toast.error("Product is already in the cart!"); // ✅ Toast notification
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory
      });
      const data = response?.data;
      if (data?.success) setCategories(data.data || []);
      else if (Array.isArray(data)) setCategories(data);
    } catch (error) { console.error("Category fetch error:", error); }
  };

  const fetchProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct
      });
      const data = response?.data;
      if (data?.success) setProducts(data.data || []);
      else if (Array.isArray(data)) setProducts(data);
    } catch (error) { console.error("Product fetch error:", error); }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategory();
    fetchProduct();
    setLoading(false);
  }, []);

  return (
    <div className="bg-linear-to-r from-purple-50 to-purple-200 min-h-screen pb-20 relative">
      
      {/* --- Banner Section --- */}
      <div className="container mx-auto px-2 md:px-4 pt-4 md:pt-6">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-sm border border-gray-100 group mb-10">
          <div className="w-full h-30 sm:h-52 md:h-80 lg:h-95 bg-slate-200">
            <img 
              src={bannerDesktop} 
              alt="Blinkit Style Banner"
              className="w-full h-full object-cover md:object-fill transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-1">
        
        {/* Categories Section */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3 items-start">
            {categories.map((category, index) => {
              const catKey = category?._id ? `cat-${category._id}` : `cat-idx-${index}`;
              const categoryImg = category?.categoryImage || category?.image || category?.imageUrl;
              const categoryName = category?.categoryName || category?.name || "Category";
              return (
              <div key={catKey} className="bg-white p-1.5 md:p-2 rounded-lg shadow-sm border border-transparent hover:shadow-md hover:border-green-200 transition-all flex flex-col items-center justify-start cursor-pointer h-full" onClick={() => navigate(`/category/${category?._id}`)} >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded flex items-center justify-center overflow-hidden mb-1 p-1">
                  {categoryImg ? <img src={categoryImg} alt={categoryName} className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-transform" /> : <span className="text-[10px] text-slate-400">No Image</span>}
                </div>
                <h3 className="text-center font-medium text-[11px] md:text-xs text-gray-800 line-clamp-2 w-full leading-tight">{categoryName}</h3>
              </div>
            )})}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Featured Products</h2>
          {loading ? (
             <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {currentProducts.map((product, index) => {
                  const prodKey = product?._id ? `prod-${product._id}` : `prod-idx-${index}`;
                  let productImg = Array.isArray(product?.productImage) ? product.productImage[0] : (product?.productImage || product?.image?.[0] || product?.image);
                  const productName = product?.productName || product?.name || "Product Name";
                  const sellingPrice = product?.sellingPrice || product?.price || 0;
                  const originalPrice = product?.price || sellingPrice;

                  return (
                  <div 
                    key={prodKey} 
                    className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-all border border-gray-100 flex flex-col cursor-pointer"
                    onClick={() => { 
                      setSelectedProduct(product); 
                      setActiveImage(productImg); 
                    }}
                  >
                    <div className="w-full h-32 md:h-40 bg-slate-100 flex items-center justify-center mb-3 overflow-hidden p-2">
                       {productImg ? <img src={productImg} alt={productName} className="object-contain h-full w-full mix-blend-multiply" /> : <span className="text-slate-400 text-xs">No Image</span>}
                    </div>
                    <div className="grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{productName}</h3>
                        <p className="text-xs text-gray-500 mb-2 truncate">{product?.brand || "General"}</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3 mt-auto">
                        <span className="text-sm font-bold text-gray-900">₹{sellingPrice}</span>
                        {originalPrice > sellingPrice && <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>}
                      </div>
                    </div>
                    <button className="w-full mt-auto bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-600 font-semibold py-1.5 rounded transition-colors text-sm" onClick={(e) => handleAddToCart(product, e)}> ADD </button>
                  </div>
                )})}
              </div>

              {/* --- PAGINATION CONTROLS --- */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    Showing <span className="font-bold text-gray-800">{indexOfFirstProduct + 1}</span> to <span className="font-bold text-gray-800">{Math.min(indexOfLastProduct, products.length)}</span> of <span className="font-bold text-gray-800">{products.length}</span> products
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((page, idx) => (
                      typeof page === 'number' ? (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            currentPage === page
                              ? "bg-green-600 text-white shadow-md shadow-green-200"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={idx} className="px-2 text-xs font-bold text-gray-400 select-none">
                          {page}
                        </span>
                      )
                    ))}

                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* --- BLINKIT STYLE PRODUCT DETAIL MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            
            <button 
                onClick={() => { setSelectedProduct(null); setActiveImage(null); }}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-r border-gray-100">
                <img 
                    src={activeImage} 
                    alt={selectedProduct?.productName}
                    className="max-h-64 md:max-h-80 object-contain mix-blend-multiply mb-4"
                />
                
                <div className="flex gap-3 overflow-x-auto w-full justify-center px-2 py-1 scrollbar-hide">
                    {(() => {
                        const imagesArray = Array.isArray(selectedProduct?.productImage) ? selectedProduct.productImage : Array.isArray(selectedProduct?.image) ? selectedProduct.image : [selectedProduct?.productImage || selectedProduct?.image].filter(Boolean);
                        return imagesArray.map((img, idx) => (
                            <img
                                key={idx} src={img} alt={`thumb-${idx}`} onClick={() => setActiveImage(img)}
                                className={`w-14 h-14 md:w-16 md:h-16 object-contain cursor-pointer border-2 rounded-lg bg-white p-1 transition-all ${ activeImage === img ? 'border-green-600 shadow-md scale-105' : 'border-gray-200 hover:border-green-300' }`}
                            />
                        ));
                    })()}
                </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-2">{selectedProduct?.category || "General"}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{selectedProduct?.productName || selectedProduct?.name}</h2>
                <p className="text-gray-500 text-sm mb-6">{selectedProduct?.brand || "Premium Quality Product"}</p>
                
                <hr className="my-4" />

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-gray-900">₹{selectedProduct?.sellingPrice || selectedProduct?.price}</span>
                        {selectedProduct?.price > (selectedProduct?.sellingPrice || 0) && (
                            <span className="text-lg text-gray-400 line-through">₹{selectedProduct?.price}</span>
                        )}
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">BEST PRICE</span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedProduct?.description || "This high-quality product is perfect for your daily needs. Get it delivered to your doorstep within minutes."}
                    </p>
                </div>

                <div className="mt-10 space-y-3">
                    <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                        onClick={() => { 
                          handleAddToCart(selectedProduct); 
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
    </div>
  );
};

export default Home;