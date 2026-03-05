import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { IoMdArrowBack } from "react-icons/io";
import { FiBox, FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi"; 
import { BsCartX } from "react-icons/bs";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage se saved orders load karna
    const savedOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    setOrders(savedOrders);
  }, []);

  // ✅ Order cancel hote hi use list aur local storage se delete karne ka logic
  const executeCancel = (orderIdToCancel) => {
    setOrders(prevOrders => {
      // Map ki jagah filter ka use kiya taaki match hone wala order delete ho jaye
      const updatedOrders = prevOrders.filter(order => order.orderId !== orderIdToCancel);
      localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    toast.success("Order cancelled and removed successfully!");
  };

  // ✅ Browser ke 'localhost' wale alert ki jagah Custom Toast Confirmation
  const confirmCancel = (orderIdToCancel) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <span className="font-semibold text-gray-800">Are you sure you want to cancel this order?</span>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={() => {
              toast.dismiss(t.id); // Toast band karo
              executeCancel(orderIdToCancel); // Order cancel aur delete karo
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors"
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss(t.id)} // Sirf toast band karo
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-xs font-bold transition-colors border border-gray-200"
          >
            No, Keep it
          </button>
        </div>
      </div>
    ), {
      duration: 8000, // 8 seconds tak wait karega user ke click ka
      position: 'top-center',
    });
  };

  // Agar koi order nahi hai
  if (orders.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center p-4">
        <BsCartX className="w-32 h-32 opacity-30 mb-6 text-gray-500" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders placed yet!</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          You haven't placed any orders yet. Add your favorite products to the cart and place an order.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-md shadow-purple-200"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  // Agar orders hain toh list dikhana
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          >
            <IoMdArrowBack size={24} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Order Header (ID, Date, Status) */}
              <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FiBox className="text-purple-600" size={18} />
                    <span className="font-bold text-gray-900 text-sm md:text-base">{order.orderId}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FiCalendar size={12} />
                    <span>Placed on {order.date}</span>
                  </div>
                </div>
                
                {/* Status badge */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit ${order.status === 'Cancelled' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                  {order.status === 'Cancelled' ? (
                    <FiXCircle className="text-red-600" size={14} />
                  ) : (
                    <FiCheckCircle className="text-green-600" size={14} />
                  )}
                  <span className={`text-xs font-bold uppercase ${order.status === 'Cancelled' ? 'text-red-700' : 'text-green-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-5 divide-y divide-gray-100">
                {order.items && order.items.map((item, itemIndex) => {
                  const itemImg = Array.isArray(item?.image) ? item.image[0] : (item?.image || item?.productImage);
                  const price = item?.sellingPrice || item?.price || 0;

                  return (
                    <div key={itemIndex} className="flex py-4 first:pt-0 last:pb-0 gap-4 items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-lg p-2 shrink-0 border border-gray-100">
                        <img src={itemImg} alt={item.name || item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">{item.name || item.productName}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.brand || "General"}</p>
                        <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="font-bold text-gray-900 text-sm md:text-base">
                        ₹{price}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer (Total Amount, Method & Cancel Button) */}
              <div className="bg-gray-50 border-t border-gray-100 p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Paid via {order.method === 'cod' ? 'Cash on Delivery' : order.method}
                  </div>
                  
                  {/* ✅ Custom Toast Wala Cancel Button */}
                  {order.status !== 'Cancelled' && (
                    <button 
                      onClick={() => confirmCancel(order.orderId)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 w-fit"
                    >
                      <FiXCircle size={14} />
                      Cancel Order
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">Total:</span>
                  <span className="text-lg font-black text-purple-700">₹{order.totalAmount}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyOrder;