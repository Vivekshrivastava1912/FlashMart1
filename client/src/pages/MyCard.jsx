import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // ✅ Toast import kiya

const MyCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage se data load karna
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => (item._id || item.id) !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // ✅ Toast notification add kiya
    toast.success("Item removed from cart!"); 
  };

  // Calculations
  const totalItems = cartItems.length;
  const totalOriginalPrice = cartItems.reduce((acc, item) => acc + (item.price || item.sellingPrice || 0), 0);
  const totalSellingPrice = cartItems.reduce((acc, item) => acc + (item.sellingPrice || item.price || 0), 0);
  const totalDiscount = totalOriginalPrice - totalSellingPrice;

  // Delivery Date (Aaj se 2 din baad)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-40 h-40 opacity-50 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT SIDE: Cart Items List */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({totalItems} Items)</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {cartItems.map((item, index) => {
              const itemImg = Array.isArray(item?.productImage) ? item.productImage[0] : (item?.productImage || item?.image?.[0] || item?.image);
              const originalPrice = item?.price || item?.sellingPrice || 0;
              const sellingPrice = item?.sellingPrice || item?.price || 0;

              return (
                <div key={index} className="flex p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-lg p-2 flex items-center justify-center shrink-0">
                    <img src={itemImg} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="ml-4 md:ml-6 grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.productName || item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.brand || "Premium Quality"}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{sellingPrice}</span>
                        {originalPrice > sellingPrice && (
                          <span className="text-sm text-gray-400 line-through mb-1">₹{originalPrice}</span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleRemove(item._id || item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Sidebar (Order Summary & Payment) */}
        <div className="w-full lg:w-1/3 sticky top-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Price ({totalItems} items)</span>
                <span>₹{totalOriginalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>- ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-3 mt-3"></div>
              
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalSellingPrice}</span>
              </div>
              
              {totalDiscount > 0 && (
                <div className="text-xs text-green-700 bg-green-50 p-2 rounded text-center font-medium mt-2">
                  You will save ₹{totalDiscount} on this order
                </div>
              )}
            </div>

            {/* Delivery Date Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-start gap-3">
              <div className="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900">Estimated Delivery</p>
                <p className="text-xs text-blue-700 mt-0.5">By {formattedDeliveryDate} (Express)</p>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 mb-4">
              PROCEED TO PAY
            </button>

            {/* Payment Methods */}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wider">Accepted Payment Methods</p>
              <div className="flex items-center justify-center gap-3 grayscale opacity-70">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-4" alt="UPI" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="MasterCard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default MyCard;