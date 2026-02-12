import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
    FaUserEdit, FaCamera, FaBoxOpen, FaMapMarkedAlt, 
    FaSave, FaCloudUploadAlt, FaSpinner, FaArrowLeft, FaTimes, FaShoppingCart 
} from "react-icons/fa";

// --- IMPORTS ---
import MyOrder from './MyOrder'; 
import MyCard from './MyCard'; 

const UserUpdate = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('avatar'); 
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); 

    // --- STATES ---
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("https://via.placeholder.com/150");
    const [userData, setUserData] = useState({ name: "", email: "", mobile: "" });
    const [addressData, setAddressData] = useState({ flat: "", street: "", city: "", state: "", pin: "", mobile: "" });

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user/user-details", { withCredentials: true });
                if (response.data.success) {
                    const user = response.data.data;
                    setUserData({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
                    if (user.avatar) setPreviewUrl(user.avatar);
                    if (user.address_detail?.length > 0) {
                        const savedAddr = user.address_detail[0];
                        setAddressData({
                            flat: savedAddr.flat || "", street: savedAddr.street || "", city: savedAddr.city || "",
                            state: savedAddr.state || "", pin: savedAddr.pin || savedAddr.pincode || "", mobile: savedAddr.mobile || ""
                        });
                    }
                }
            } catch (error) { console.error(error); } finally { setPageLoading(false); }
        };
        fetchUserDetails();
    }, []);

    // --- HANDLERS ---
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) { setAvatarFile(file); setPreviewUrl(URL.createObjectURL(file)); }
    };

    const uploadAvatar = async (e) => {
        e.preventDefault();
        if (!avatarFile) return toast.error("Please select an image first");
        setLoading(true);
        const formData = new FormData(); formData.append('avatar', avatarFile);
        try {
            const response = await axios.put("http://localhost:8000/api/user/upload-avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }, withCredentials: true
            });
            if (response.data.success) toast.success("Avatar update successful");
        } catch (error) { toast.error("Failed to update avatar"); } finally { setLoading(false); }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const response = await axios.put("http://localhost:8000/api/user/update-user", userData, { withCredentials: true });
            if (response.data.success) toast.success("Profile update successful");
        } catch (error) { toast.error("Failed to update profile"); } finally { setLoading(false); }
    };

    const handleAddressUpdate = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const response = await axios.put("http://localhost:8000/api/user/update-user", { address_detail: [addressData] }, { withCredentials: true });
            if (response.data.success) toast.success("Address update successful");
        } catch (error) { toast.error("Failed to update address"); } finally { setLoading(false); }
    };

    // Updated Sidebar Item Design
    const renderSidebarItem = (id, label, icon) => (
        <button onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 font-semibold text-sm group ${
                activeTab === id 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 translate-x-1' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700 hover:translate-x-1'
            }`}>
            <span className={`text-lg ${activeTab === id ? 'text-white' : 'text-gray-400 group-hover:text-purple-600 transition-colors'}`}>
                {icon}
            </span>
            <span>{label}</span>
        </button>
    );

    if (pageLoading) return <div className="fixed inset-0 flex items-center justify-center z-50"><FaSpinner className="animate-spin text-purple-600 text-3xl" /></div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[1px]">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex overflow-hidden relative animate-pop-in border border-white/60 ring-1 ring-black/5">
                
                <button onClick={() => navigate(-1)} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all shadow-sm">
                    <FaTimes size={16} />
                </button>

                {/* --- SIDEBAR --- */}
                <div className="w-1/4 border-r border-gray-100 p-6 flex flex-col bg-gray-100">
                    <h2 className="text-xl font-bold text-purple-500 mb-8 pl-3 tracking-tight">Settings</h2>
                    
                    <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2">
                        {/* Group 1: Personal */}
                        <div className="space-y-1">
                            {renderSidebarItem('avatar', 'Avatar', <FaCamera />)}
                            {renderSidebarItem('details', 'Profile', <FaUserEdit />)}
                            {renderSidebarItem('address', 'Address', <FaMapMarkedAlt />)}
                        </div>

                        
                    
                        
                        {/* Group 2: Shopping */}
                        <div className="space-y-1">
                            {renderSidebarItem('orders', 'My Orders', <FaBoxOpen />)}
                            {renderSidebarItem('mycard', 'My Card', <FaShoppingCart />)}
                        </div>
                    </div>

                </div>

                {/* --- CONTENT AREA --- */}
                <div className="w-3/4 bg-purple-200 h-full overflow-y-auto p-8 relative scroll-smooth">
                    
                    {activeTab === 'avatar' && (
                        <div className="max-w-sm mx-auto mt-6 text-center animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">Update Picture</h3>
                            <form onSubmit={uploadAvatar} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-6">
                                <div className="relative group">
                                    <img src={previewUrl} alt="Preview" className="w-36 h-36 rounded-full object-cover border-4 border-purple-50 shadow-inner" />
                                    <label className="absolute bottom-1 right-1 bg-purple-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-purple-700 shadow-lg active:scale-95 transition-all hover:-translate-y-0.5">
                                        <FaCamera size={16} /><input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
                                    </label>
                                </div>
                                <SubmitButton loading={loading} icon={<FaCloudUploadAlt/>} label="Upload Avatar" />
                            </form>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="max-w-md mx-auto mt-6 animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">Edit Profile</h3>
                            <form onSubmit={handleUserUpdate} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                                <InputGroup label="Full Name" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                                <InputGroup label="Email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} type="email" />
                                <InputGroup label="Mobile" value={userData.mobile} onChange={(e) => setUserData({...userData, mobile: e.target.value})} type="tel" />
                                <div className="pt-3"><SubmitButton loading={loading} icon={<FaSave/>} label="Save Changes" /></div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'address' && (
                        <div className="max-w-xl mx-auto mt-4 animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">Delivery Address</h3>
                            <form onSubmit={handleAddressUpdate} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2"><InputGroup label="Flat / Building" value={addressData.flat} onChange={(e) => setAddressData({...addressData, flat: e.target.value})} /></div>
                                    <div className="col-span-2"><InputGroup label="Street / Area" value={addressData.street} onChange={(e) => setAddressData({...addressData, street: e.target.value})} /></div>
                                    <InputGroup label="City" value={addressData.city} onChange={(e) => setAddressData({...addressData, city: e.target.value})} />
                                    <InputGroup label="State" value={addressData.state} onChange={(e) => setAddressData({...addressData, state: e.target.value})} />
                                    <InputGroup label="Pincode" value={addressData.pin} onChange={(e) => setAddressData({...addressData, pin: e.target.value})} />
                                    <InputGroup label="Contact Mobile" value={addressData.mobile} onChange={(e) => setAddressData({...addressData, mobile: e.target.value})} type="tel" />
                                </div>
                                <div className="pt-3"><SubmitButton loading={loading} icon={<FaSave/>} label="Update Address" /></div>
                            </form>
                        </div>
                    )}

                    {/* --- EMBEDDED MY ORDERS --- */}
                    {activeTab === 'orders' && (
                        <div className="h-full w-full animate-fade-in">
                            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50/95 z-10 pb-4 pt-1 border-b border-gray-200/50 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold text-gray-800">My Orders</h3>
                            </div>
                            <div className="pb-8">
                                <MyOrder />
                            </div>
                        </div>
                    )}

                    {/* --- EMBEDDED MY CARD --- */}
                    {activeTab === 'mycard' && (
                        <div className="h-full w-full animate-fade-in">
                            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50/95 z-10 pb-4 pt-1 border-b border-gray-200/50 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold text-gray-800">My Card</h3>
                            </div>
                            <div className="pb-8">
                                <MyCard />
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <style>{`
                @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}

const InputGroup = ({ label, value, onChange, type = "text" }) => (
    <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 focus:bg-white transition-all" />
    </div>
);

const SubmitButton = ({ loading, icon, label }) => (
    <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 text-sm">
        {loading ? <FaSpinner className="animate-spin"/> : icon} {label}
    </button>
);

export default UserUpdate;