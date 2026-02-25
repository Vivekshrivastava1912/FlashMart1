import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { FiX, FiAlertTriangle, FiLoader } from "react-icons/fi"; // React Icons import kiye

const DeleteSubCategory = ({ close, data, fetchData }) => {
    // Animation trigger aur API loading states
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Component mount hone par entrance animation trigger karega
    useEffect(() => {
        // Chota timeout dene se CSS transition properly apply hota hai
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        // Exit animation trigger karega
        setIsVisible(false);
        // Animation complete hone ke baad component unmount karega
        setTimeout(() => {
            close();
        }, 300); // 300ms Tailwind transition duration ke barabar
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await Axios({
                ...SummaryApi.deleteSubCategory,
                data: {
                    _id: data._id
                }
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchData) {
                    fetchData(); // Table refresh
                }
                handleClose(); // Close smoothly
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        // Overlay - Backdrop Blur & Fade
        <section 
            className= "fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-300 ease-in-out"
                
        >
            {/* Modal Box - Scale & Slide Up Animation */}
            <div 
                className={`relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
                    ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
                `}
            >
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    disabled={isLoading}
                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90 active:scale-90 disabled:opacity-50 flex items-center justify-center"
                >
                    <FiX className="w-5 h-5" />
                </button>

                {/* Content Section */}
                <div className='flex flex-col items-center text-center mt-2'>
                    {/* Warning Icon with Pulse & Ring Animation */}
                    <div className={`w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center relative mb-5 transition-transform duration-500 delay-100
                        ${isVisible ? 'scale-100' : 'scale-50'}
                    `}>
                        {/* Outer animated ring */}
                        <div className="absolute inset-0 border-4 border-red-100 rounded-full animate-ping opacity-75"></div>
                        <FiAlertTriangle className="w-8 h-8 relative z-10" />
                    </div>
                    
                    <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Delete Sub Category</h2>
                    <p className='text-sm text-gray-500 mt-3 leading-relaxed px-4'>
                        Are you sure you want to delete <span className='font-semibold text-gray-800'>"{data?.name}"</span>? 
                        This action is permanent.
                    </p>
                </div>

                {/* Buttons Section */}
                <div className='flex items-center gap-4 mt-8'>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className='flex-1 py-3 px-4 bg-white border-2 border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95 disabled:opacity-50'
                    >
                        Cancel
                    </button>
                    
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className='flex-1 py-3 px-4 bg-red-600 text-white font-semibold rounded-xl shadow-[0_8px_15px_-3px_rgba(220,38,38,0.3)] hover:bg-red-700 hover:shadow-[0_12px_20px_-3px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {isLoading ? (
                            <>
                                {/* React Icon Loading Spinner */}
                                <FiLoader className="animate-spin h-5 w-5 text-white" />
                                Deleting...
                            </>
                        ) : (
                            'Yes, Delete'
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DeleteSubCategory;