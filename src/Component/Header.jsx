import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  "/EngmentImage3.jpeg", 
  "/EngmentImge2.jpeg",
  "/AnantAndApurva.jpeg"
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  // Check if admin is logged in
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Set up the automated scroll timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full font-['Montserrat',sans-serif]">
      {/* 3. Framer Motion Animated Background Slider */}
      {/* 3. STRICT Background Wrapper to prevent scrollbars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }} 
            animate={{ opacity: 1, scale: 1 }}    
            exit={{ opacity: 0 }}                
            transition={{ duration: 1.5, ease: "easeInOut" }} 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[currentIndex]}')` }}
          />
        </AnimatePresence>

        {/* Dark Overlay moved INSIDE the hidden wrapper */}
        <div className="absolute inset-0 bg-black/40"></div>
        
      </div>

      {/* Sticky Header Container */}
      <header className="absolute top-0 left-0 w-full z-50 pt-[24px] pr-[30px] pl-[60px] transition-all duration-500">
        <div className="flex items-center justify-between w-full">
          
          {/* Logo (Left) */}
          <div className="w-auto lg:w-1/4">
            <a href="/" className="flex flex-col items-center justify-center group cursor-pointer text-white">
              {/* Lotus SVG Placeholder */}
              <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <path d="M12 22s-3-4.5-3-9.5A5.5 5.5 0 0 1 12 7a5.5 5.5 0 0 1 3 5.5c0 5-3 9.5-3 9.5z" />
              </svg>
              <span className="text-3xl font-['Great_Vibes',cursive] tracking-wider">Love well</span>
            </a>
          </div>

          {/* Navigation Menu (Center) */}
          <nav className="hidden lg:flex flex-grow justify-center">
            <ul className="flex items-center space-x-10 text-white text-[13px] font-semibold tracking-[0.1em] uppercase">
              
              {/* Home */}
              <li className="relative group py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
                <ul className="absolute top-[70px] left-0 w-48 bg-white text-gray-800 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Home Version 01</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Home Version 02</a></li>
                </ul>
              </li>

              {/* About */}
              <li className="relative group py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">About</a>
                <ul className="absolute top-[70px] left-0 w-48 bg-white text-gray-800 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Our Story</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Gallery</a></li>
                </ul>
              </li>

              {/* Service */}
              <li className="relative group py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">Service</a>
                <ul className="absolute top-[70px] left-0 w-48 bg-white text-gray-800 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Services</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#9cb08f] hover:text-white transition">Portfolio</a></li>
                </ul>
              </li>

              {/* Shop */}
              <li className="relative group py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">Shop</a>
              </li>

              {/* Blog */}
              <li className="relative group py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
              </li>

              {/* Contact */}
              <li className="relative py-6 cursor-pointer">
                <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
              </li>

            </ul>
          </nav>

          {/* Right Action Button */}
          <div className="w-auto lg:w-1/4 flex justify-end items-center gap-4 relative z-50">
            
            {/* ADMIN BUTTON CONDITIONALLY RENDERED HERE */}
            {isAdmin && (
              <div>
                <button 
                  onClick={() => navigate("/admin")}
                  className="bg-gray-800 text-white text-[13px] font-semibold tracking-widest uppercase px-6 py-4 hover:bg-gray-700 transition duration-300"
                >
                  Admin Approval
                </button>
              </div>
            )}

            <a 
              href="#" 
              className="bg-[#9cb08f] text-white text-[13px] font-semibold tracking-widest uppercase px-10 py-4 hover:bg-opacity-90 transition duration-300"
            >
              Wedding
            </a>
          </div>
        </div>
      </header>

      {/* Hero Content Center */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-screen text-center text-white px-4 pointer-events-none">
        
        {/* Top Part: Animates from Top to Down */}
        <motion.div
          key={`top-text-${currentIndex}`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-lg md:text-xl font-medium tracking-wide mb-6">
            Save the date for the wedding of June 19, 2026
          </p>
          
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-['Great_Vibes',cursive] mb-12 drop-shadow-lg">
            Anant & Apurva
          </h1>
        </motion.div>
        
        {/* Bottom Part: Animates from Down to Up */}
        <motion.div
          key={`bottom-text-${currentIndex}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="flex items-center space-x-4 pointer-events-auto"
        >
          <a 
            href="#" 
            className="bg-[#9cb08f] text-white text-[13px] font-semibold tracking-widest uppercase px-8 py-4 hover:bg-opacity-90 transition duration-300"
          >
            Wedding
          </a>
          <button className="bg-black/60 hover:bg-black/80 text-white w-[52px] h-[52px] flex items-center justify-center transition duration-300">
            {/* Play Icon */}
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Header;