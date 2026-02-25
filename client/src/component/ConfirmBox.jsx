import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmBox = ({ cancel, confirm, close }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Component mount hone par smooth entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Custom close handler taki exit animation properly play ho
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (cancel) cancel();
            if (close) close();
        }, 300); // Tailwind duration ke barabar wait
    };

    const handleConfirm = () => {
        if (confirm) confirm();
        // Agar aap confirm hone par bhi isko close karna chahte hain
        // toh niche wali line uncomment kar sakte hain:
        // handleClose(); 
    };

    return (
        // Background Overlay with Blur & Fade
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-300 ease-in-out
        "
        >
            {/* Modal Box with Scale & Slide Animation */}
            <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300
                ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
            >
                {/* Close 'X' Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90 active:scale-90"
                >
                    <FiX className="w-5 h-5" />
                </button>

                {/* Top Destructive Accent Line */}
                <div className="h-1.5 w-full bg-red-500"></div>

                <div className="p-7 text-center">
                    
                    {/* Animated Warning Icon */}
                    <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 text-red-500 mb-5 relative transition-transform duration-500 delay-100
                        ${isVisible ? 'scale-100' : 'scale-50'}
                    `}>
                        <div className="absolute inset-0 border-4 border-red-100 rounded-full animate-ping opacity-75"></div>
                        <FiAlertTriangle className="w-8 h-8 relative z-10" />
                    </div>

                    {/* Text Content */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Category?</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed px-2">
                        Are you sure you want to delete this category? This action is permanent and cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 bg-white border-2 border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 shadow-[0_8px_15px_-3px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_20px_-3px_rgba(239,68,68,0.4)] transition-all duration-200 active:scale-95"
                        >
                            Yes, Delete
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;