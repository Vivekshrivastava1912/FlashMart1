import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from "react-icons/io";
import { BsCreditCard, BsShieldLockFill } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaMoneyBillWave, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Total amount local storage se calculate karna
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = cartItems.reduce((acc, item) => acc + (item.sellingPrice || item.price || 0), 0);
    setTotalAmount(total);

    // Agar cart khali ho to direct home pe bhej do
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [navigate]);

  const handlePayNow = () => {
    setIsProcessing(true);
    
    // Fake payment processing delay dikhane ke liye
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Successful! Order Placed.");
      
      // ✅ NAYA LOGIC: Cart items ko MyOrders me save karna
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingOrders = JSON.parse(localStorage.getItem('myOrders')) || [];

      // Ek naya order object banaya
      const newOrder = {
        orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000), // Random Order ID
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        totalAmount: totalAmount,
        method: selectedMethod,
        status: "Order Placed",
        items: cartItems
      };

      // Order ko local storage me save kar diya (naye orders upar aayenge)
      localStorage.setItem('myOrders', JSON.stringify([newOrder, ...existingOrders]));

      // Cart khali karke MyOrder page par redirect kar do
      localStorage.removeItem('cartItems');
      navigate('/myorder'); // ✅ Changed redirect path
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 p-4 md:p-6 flex items-center gap-4 sticky top-0 z-10">
          <button 
            onClick={() => navigate('/mycard')} // Wapas Cart me jane ke liye
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdArrowBack size={24} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-500">Choose your payment method</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-semibold">Total to Pay</p>
            <p className="text-xl md:text-2xl font-black text-purple-700">₹{totalAmount}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Payment Options Sidebar */}
          <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col p-4 gap-2">
            <button 
              onClick={() => setSelectedMethod('card')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all font-semibold ${selectedMethod === 'card' ? 'bg-white shadow-sm border border-purple-200 text-purple-700' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
              <BsCreditCard size={20} />
              Card
            </button>
            <button 
              onClick={() => setSelectedMethod('upi')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all font-semibold ${selectedMethod === 'upi' ? 'bg-white shadow-sm border border-purple-200 text-purple-700' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
              <MdOutlineQrCodeScanner size={20} />
              UPI
            </button>
            <button 
              onClick={() => setSelectedMethod('cod')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all font-semibold ${selectedMethod === 'cod' ? 'bg-white shadow-sm border border-purple-200 text-purple-700' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
              <FaMoneyBillWave size={20} />
              Cash on Delivery
            </button>
          </div>

          {/* Right: Payment Details Input Area */}
          <div className="w-full md:w-2/3 p-6 md:p-8">
            
            {/* Card Payment View */}
            {selectedMethod === 'card' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Enter Card Details</h3>
                  <div className="flex gap-2 text-gray-400">
                    <FaCcVisa size={28} />
                    <FaCcMastercard size={28} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" />
                    </div>
                    <div className="w-1/2">
                      <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">CVV</label>
                      <input type="password" placeholder="•••" maxLength="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Name on Card</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment View */}
            {selectedMethod === 'upi' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Pay via UPI</h3>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 text-center mb-6">
                  <MdOutlineQrCodeScanner size={60} className="mx-auto text-purple-600 mb-3" />
                  <p className="text-sm text-purple-800 font-medium">Scan QR Code or Enter UPI ID below</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">UPI ID</label>
                  <input type="text" placeholder="username@upi" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" />
                </div>
              </div>
            )}

            {/* COD Payment View */}
            {selectedMethod === 'cod' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Cash on Delivery</h3>
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 mt-1">
                    <FaMoneyBillWave size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900">Pay at your doorstep</h4>
                    <p className="text-sm text-green-700 mt-1 leading-relaxed">Please keep exact change ready for a smooth delivery experience. Online payments are also accepted at the time of delivery via QR scan.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button Area */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <BsShieldLockFill size={18} />
                    {selectedMethod === 'cod' ? 'PLACE ORDER' : `PAY ₹${totalAmount}`}
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1">
                <BsShieldLockFill /> 100% Secure & Encrypted Payments
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Payment;