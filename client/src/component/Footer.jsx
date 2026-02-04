import React, { useState } from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaPaperPlane, FaCcVisa, FaCcMastercard, FaHeadset, FaMapMarkerAlt, FaTimes, FaExpand 
} from 'react-icons/fa';
import { SiPaytm, SiGooglepay } from "react-icons/si"; 
import { motion, AnimatePresence } from 'framer-motion';

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);

  const handleSubscribe = () => {
    if (email) setEmail("");
  };

  return (
    <footer className="bg-linear-to-br from-white via-purple-50 to-purple-200 text-gray-700 font-sans border-t-4 border-purple-600 relative overflow-visible">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Newsletter Section */}
        <motion.div variants={itemVariants} className="mb-16 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-purple-100 flex flex-col md:flex-row items-center justify-between shadow-sm relative z-20">
            <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
                <h3 className="text-2xl font-extrabold text-purple-800">Stay Updated</h3>
                <p className="text-gray-500 mt-2">Get the latest offers and flash sales directly in your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto bg-white p-1 rounded-full border border-purple-200 shadow-inner focus-within:ring-2 focus-within:ring-purple-400 transition-all">
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-3 rounded-full outline-none text-gray-600 bg-transparent min-w-0"
                />
                <motion.button 
                    onClick={handleSubscribe}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 text-white px-6 md:px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                    <span className="hidden md:inline">Subscribe</span> 
                    <FaPaperPlane className="text-xs" />
                </motion.button>
            </div>
        </motion.div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 tracking-tighter italic">
              Flash Mart
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              India's fastest grocery delivery app. From fresh vegetables to daily essentials, get everything delivered in minutes.
            </p>
            <div className="flex space-x-3">
              <SocialBtn icon={<FaFacebookF />} />
              <SocialBtn icon={<FaTwitter />} />
              <SocialBtn icon={<FaInstagram />} />
              <SocialBtn icon={<FaLinkedinIn />} />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold uppercase text-purple-900 mb-6 tracking-wider">Top Categories</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <FooterLink text="Fruits & Vegetables" />
              <FooterLink text="Dairy & Breakfast" />
              <FooterLink text="Munchies & Snacks" />
              <FooterLink text="Cold Drinks & Juices" />
              <FooterLink text="Instant Food" />
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold uppercase text-purple-900 mb-6 tracking-wider">Company</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <FooterLink text="About Us" />
              <FooterLink text="Partner with us" />
              <FooterLink text="Terms & Conditions" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Refund Policy" />
            </ul>
          </motion.div>

          {/* Customer Support & Location */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start relative z-30">
            <h3 className="text-sm font-bold uppercase text-purple-900 mb-6 tracking-wider">Customer Support</h3>
            <div className="flex flex-col space-y-3 w-full max-w-xs">
                <ContactCard icon={<FaHeadset />} title="Call Us" subtitle="+91 1800-FLASH-00" />
                
                {/* Mobile: Simple Card (Hidden on Desktop) */}
                <div className="block md:hidden w-full">
                  <ContactCard icon={<FaMapMarkerAlt />} title="Locate Us" subtitle="Indore, Madhya Pradesh" />
                </div>

                {/* Desktop: Interactive Map Card (Hidden on Mobile) */}
                <div className="hidden md:block w-full">
                  <LocationCard onExpand={() => setShowMapModal(true)} />
                </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <div className="h-px w-full bg-linear-to-r from-transparent via-purple-300 to-transparent my-8"></div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} Flash Mart Technologies.</p>
            <div className="flex items-center space-x-4 text-2xl text-gray-400">
               <FaCcVisa className="hover:text-purple-700 transition-colors cursor-pointer" />
               <FaCcMastercard className="hover:text-purple-700 transition-colors cursor-pointer" />
               <SiGooglepay className="hover:text-purple-700 transition-colors cursor-pointer" />
               <SiPaytm className="hover:text-purple-700 transition-colors cursor-pointer" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Large Map Modal (Desktop Only) */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            // FIX: Z-Index increased to 9999 to show above everything
            className="fixed inset-0 z-9999  items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden md:flex"
            onClick={() => setShowMapModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowMapModal(false)} className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"><FaTimes /></button>
              <iframe 
                src="https://maps.google.com/maps?q=Indore,Madhya+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Indore Large Map"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

// --- Reusable Sub-Components ---

const SocialBtn = ({ icon }) => (
  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 border border-purple-100 shadow-sm">{icon}</motion.button>
);

const FooterLink = ({ text }) => (
  <motion.li whileHover={{ x: 5 }} className="text-sm text-gray-600 cursor-pointer flex items-center transition-colors hover:text-purple-700">
    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2 opacity-0 hover:opacity-100"></span>{text}
  </motion.li>
);

const ContactCard = ({ icon, title, subtitle }) => (
    <div className="flex items-center bg-white/60 p-3 rounded-xl border border-purple-100 shadow-sm w-full">
        <div className="text-xl text-purple-600 mr-3 bg-purple-50 p-2 rounded-lg shrink-0">{icon}</div>
        <div className="text-left flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-800">{title}</div>
            <div className="text-xs text-gray-500 font-medium break-all">{subtitle}</div>
        </div>
    </div>
);

const LocationCard = ({ onExpand }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onExpand}>
            <div className="flex items-center bg-white/60 p-3 rounded-xl border border-purple-100 shadow-sm w-full cursor-pointer group">
                <div className="text-xl text-purple-600 mr-3 bg-purple-50 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0"><FaMapMarkerAlt /></div>
                <div className="text-left flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-800">Locate Us</div>
                    <div className="text-xs text-gray-500 font-medium break-all">Indore, Madhya Pradesh</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 text-purple-400 text-xs transition-opacity pl-2 shrink-0"><FaExpand /></div>
            </div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 w-64 h-48 mb-3 bg-white p-2 rounded-2xl shadow-2xl border border-purple-200 z-50 overflow-hidden pointer-events-none"
                    >
                        <div className="w-full h-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center p-2">
                           <iframe src="https://maps.google.com/maps?q=Indore,Madhya+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                   width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="mini-map" className="rounded-lg"></iframe>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Footer;