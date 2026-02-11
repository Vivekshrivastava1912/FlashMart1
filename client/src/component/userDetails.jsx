import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FaEnvelope, FaPhone, FaCalendarAlt, FaSignOutAlt, 
    FaShoppingBag, FaMapMarkerAlt, FaEdit, FaTimes, 
    FaCheckCircle, FaUserCircle
} from "react-icons/fa";
import { toast } from 'react-hot-toast'; 

const UserDetails = () => {
    const [user, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fetch User Details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user/user-details", {
                    withCredentials: true 
                });

                if (response.data.success) {
                    setUserData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching user details", error);
                if (error.response && error.response.status === 401) {
                    localStorage.clear(); 
                    window.location.href = "/Login"; 
                    return;
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, []);

    // 2. Handle Logout Logic
    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/user/logout", {
                withCredentials: true
            });
            if (response.data.success) {
                toast.success("Logged out successfully");
                localStorage.clear();
                window.location.href = "/Login"; 
            }
        } catch (error) {
            console.error("Logout failed", error);
            localStorage.clear();
            window.location.href = "/Login";
        }
    };

    const handleClose = () => { navigate(-1); }

    if (!user) return null;

    return (
        // SCREEN OVERLAY
        <div 
            className="fixed inset-0 z-50 flex items-start justify-end bg-black/5 backdrop-blur-[1px]"
            onClick={handleClose}
        >
            {/* COMPACT PREMIUM CARD */}
            <div 
                className="absolute top-16 right-4 w-22rem bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden animate-pop-in"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* 1. COMPACT HEADER */}
                <div className="bg-linear-to-br from-purple-400 to-purple-600 p-4 relative">
                    <button 
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-white/50 hover:text-white p-1"
                    >
                        <FaTimes size={14} />
                    </button>

                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <img 
                                src={user.avatar || "https://via.placeholder.com/150"} 
                                alt={user.name} 
                                className="w-14 h-14 rounded-full border-2 border-white/50 object-cover shadow-md"
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${user.status === "Active" ? "bg-green-400" : "bg-red-400"}`}></div>
                        </div>

                        {/* Basic Info */}
                        <div className="overflow-hidden">
                            <h2 className="text-white font-bold text-base truncate capitalize">{user.name}</h2>
                            <p className="text-purple-200 text-[10px] uppercase font-bold tracking-widest">{user.role}</p>
                            {user.verify_email && (
                                <div className="flex items-center gap-1 mt-0.5 text-[9px] text-blue-100 font-medium">
                                    <FaCheckCircle /> Verified Account
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. DASHBOARD STATS (Tight Layout) */}
                <div className="p-3 grid grid-cols-3 gap-2 bg-purple-50/30">
                    <CompactStat icon={<FaShoppingBag />} value={user.orderHistory?.length || 0} label="Orders" color="text-purple-600" />
                    <CompactStat icon={<FaShoppingBag />} value={user.shopping_card?.length || 0} label="Cart" color="text-indigo-600" />
                    <CompactStat icon={<FaMapMarkerAlt />} value={user.address_detail?.length || 0} label="Saved" color="text-rose-500" />
                </div>

                {/* 3. DETAILS LIST (No Scroll) */}
                <div className="p-4 space-y-3">
                    <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b pb-1">Information</h3>
                    
                    <div className="space-y-3">
                        <SmallRow icon={<FaEnvelope />} label="Email" value={user.email} />
                        <SmallRow icon={<FaPhone />} label="Phone" value={user.mobile || "N/A"} />
                        <SmallRow icon={<FaCalendarAlt />} label="Last Login" value={user.last_login_date ? new Date(user.last_login_date).toLocaleDateString() : "Today"} />
                    </div>
                </div>

                {/* 4. ACTION BUTTONS */}
                <div className="p-4 pt-0 flex gap-2">
                    <button 
                        onClick={() => toast.success("Feature Coming Soon!")}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        <FaEdit size={12}/> Edit
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex-1 bg-white border border-red-100 text-red-500 hover:bg-red-50 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <FaSignOutAlt size={12}/> Logout
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pop-in {
                    0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-pop-in { animation: pop-in 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
}

// --- Ultra Compact Helpers ---

const CompactStat = ({ icon, value, label, color }) => (
    <div className="bg-white p-2 rounded-xl flex flex-col items-center shadow-sm border border-purple-100">
        <div className={`${color} text-sm mb-0.5`}>{icon}</div>
        <span className="font-black text-gray-800 text-sm leading-tight">{value}</span>
        <span className="text-[8px] text-gray-400 font-bold uppercase">{label}</span>
    </div>
);

const SmallRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="text-purple-400 shrink-0">{React.cloneElement(icon, { size: 12 })}</div>
        <div className="overflow-hidden">
            <p className="text-[8px] text-gray-400 font-bold uppercase leading-none mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-gray-700 truncate w-60" title={value}>{value}</p>
        </div>
    </div>
);

export default UserDetails;