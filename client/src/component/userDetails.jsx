import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FaEnvelope, FaPhone, FaCalendarAlt, FaSignOutAlt, 
    FaShoppingBag, FaMapMarkerAlt, FaEdit, FaTimes, 
    FaCheckCircle, FaExclamationCircle, FaShieldAlt
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

    const getPrimaryAddress = () => {
        if (user?.address_detail && user.address_detail.length > 0) {
            const addr = user.address_detail[0];
            return addr.address || addr.city || addr.state || "View Saved Addresses";
        }
        return "No Address Added";
    };

    if (!user) return null;

    return (
        // OVERLAY - UPDATED BLUR AND BG COLOR
        <div 
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-md animate-fade-in-smooth"
            onClick={handleClose}
        >
            {/* COMPACT CARD - UPDATED POSITION (top-20) */}
            <div 
                className="absolute right-4 top-20 w-84 bg-white rounded-2xl shadow-2xl border border-white/40 animate-spring-entry group/card origin-top-right"
                onClick={(e) => e.stopPropagation()} 
                style={{ boxShadow: '0 10px 40px -5px rgba(100, 50, 200, 0.25)' }}
            >
                {/* --- COMPACT HEADER --- */}
                <div className="relative p-4 bg-linear-to-br from-purple-400 via-purple-800 to-purple-400 text-center rounded-t-2xl">
                    
                    {/* Noise & Gradient Overlay */}
                    <div className="absolute inset-0  opacity-20"></div>
                    
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 p-1 rounded-full transition-all z-20"
                    >
                        <FaTimes size={10} />
                    </button>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Avatar (Compact Size: w-16) */}
                        <div className="relative mb-2 group-hover/card:scale-105 transition-transform duration-300">
                            <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-40 animate-pulse"></div>
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-16 h-16 rounded-full border-[3px] border-white/40 shadow-lg object-cover relative z-10 bg-white"
                            />
                            <span className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center z-20">
                                <span className={`w-2.5 h-2.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}></span>
                            </span>
                        </div>

                        <div className="animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                            <h2 className="text-white font-bold text-lg leading-tight capitalize">{user.name}</h2>
                            <p className="text-purple-100 text-[10px] uppercase font-bold tracking-widest mt-0.5 opacity-80">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT (Tighter Spacing) --- */}
                <div className="p-4 bg-white rounded-b-2xl">
                    
                    {/* STATS (Compact Padding) */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <StatBox icon={<FaShoppingBag/>} value={user.orderHistory?.length || 0} label="Orders" color="text-violet-600" delay="0.1s" />
                        <StatBox icon={<FaShoppingBag/>} value={user.shopping_card?.length || 0} label="Cart" color="text-fuchsia-600" delay="0.2s" />
                        <StatBox icon={<FaMapMarkerAlt/>} value={user.address_detail?.length || 0} label="Saved" color="text-pink-500" delay="0.3s" />
                    </div>

                    {/* INFO LIST */}
                    <div className="space-y-1 mb-4">
                        
                        {/* Email Row */}
                        <InfoRow 
                            icon={<FaEnvelope />} 
                            delay="0.4s"
                            content={
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-gray-700 font-semibold text-xs truncate w-32" title={user.email}>{user.email}</span>
                                    {user.verify_email ? (
                                        <FaCheckCircle className="text-emerald-500" size={12} title="Verified"/>
                                    ) : (
                                        <button onClick={() => navigate('/verifyotp')} className="text-[9px] font-bold text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded-full animate-pulse">
                                            VERIFY
                                        </button>
                                    )}
                                </div>
                            }
                        />

                        {/* Phone Row */}
                        <InfoRow 
                            icon={<FaPhone />} 
                            content={<span className="text-gray-700 font-semibold text-xs">{user.mobile || "N/A"}</span>}
                            delay="0.5s" 
                        />

                        {/* Address Row */}
                        <InfoRow 
                            icon={<FaMapMarkerAlt />} 
                            content={<span className="text-gray-700 font-semibold text-xs truncate w-48">{getPrimaryAddress()}</span>}
                            delay="0.6s" 
                        />

                        {/* Login Row */}
                        <InfoRow 
                            icon={<FaCalendarAlt />} 
                            content={<span className="text-gray-500 font-medium text-[10px]">Last: {user.last_login_date ? new Date(user.last_login_date).toLocaleDateString() : "Today"}</span>}
                            delay="0.7s" 
                        />
                    </div>

                    {/* ACTIONS (Compact Buttons) */}
                    <div className="flex gap-2 opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                       <button 
    onClick={() => navigate('/userdetailupdate')}
    className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2 rounded-xl font-bold text-[10px] transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
>
    <FaEdit size={10} /> EDIT
</button>

                        <button 
                            onClick={handleLogout}
                            className="flex-1 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white py-2 rounded-xl font-bold text-[10px] transition-all flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5"
                        >
                            <FaSignOutAlt size={10} /> LOGOUT
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes springEntry {
                    0% { opacity: 0; transform: scale(0.9) translateY(-10px); }
                    60% { opacity: 1; transform: scale(1.02) translateY(5px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-spring-entry { animation: springEntry 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

                @keyframes slideRightFade {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-right { animation: slideRightFade 0.3s ease-out forwards; }
                
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up-fade { animation: slideUpFade 0.4s ease-out forwards; }
                .animate-fade-in-smooth { animation: fadeIn 0.3s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}

// --- SUB-COMPONENTS (Compact Versions) ---

const StatBox = ({ icon, value, label, color, delay }) => (
    <div 
        className="bg-gray-50 border border-gray-100 rounded-xl p-2 flex flex-col items-center justify-center transition-all hover:bg-white hover:shadow-md hover:border-violet-100 hover:-translate-y-0.5 group opacity-0 animate-slide-up-fade"
        style={{ animationDelay: delay }}
    >
        <div className={`${color} text-xs mb-0.5`}>{icon}</div>
        <span className="font-bold text-gray-800 text-xs">{value}</span>
        <span className="text-[8px] text-gray-400 font-bold uppercase">{label}</span>
    </div>
);

const InfoRow = ({ icon, content, delay }) => (
    <div 
        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors opacity-0 animate-slide-right cursor-default"
        style={{ animationDelay: delay }}
    >
        <div className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 shadow-sm border border-gray-100">
            {React.cloneElement(icon, { size: 10 })}
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
            {content}
        </div>
    </div>
);

export default UserDetails;