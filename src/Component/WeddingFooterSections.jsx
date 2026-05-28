import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedWeddingFooter() {
  // Function to handle smooth scrolling to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Variants for staggered children reveal in the footer
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Time between each element's animation
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4 } 
    }
  };

  return (
    <div className="w-full flex flex-col font-sans overflow-hidden">
      
      {/* =========================================
          SECTION 1: "Don't Miss it" Hero Banner
          ========================================= */}
      <section 
        className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          // Replace this URL with your actual "dont miss it.jpg" path
          backgroundImage: "url('/EngmentImage6.jpeg')" 
        }}
      >
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl text-white tracking-wide drop-shadow-md"
            style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
          >
            Don't Miss it
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-2xl text-[#c29b70] uppercase tracking-widest font-light mt-2"
          >
            19 June 2026
          </motion.p>
        </div>
      </section>

      {/* =========================================
          SECTION 2: "Thank You" Footer
          ========================================= */}
      <footer className="relative w-full bg-[#303030] py-24 flex flex-col items-center justify-center px-4">
        
        {/* Stagger Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Thank You Text */}
          <motion.p 
            variants={itemVariants}
            className="text-white text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
          >
            Thank You
          </motion.p>

          {/* Names */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl text-[#c29b70] mb-10"
            style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
          >
            Anant & Apurva
          </motion.h1>

          {/* Heart Divider */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {/* Left squiggly line */}
            <svg className="w-8 h-2 text-white fill-current opacity-70" viewBox="0 0 40 10">
              <path d="M0,5 Q10,0 20,5 T40,5" fill="transparent" stroke="currentColor" strokeWidth="2" />
            </svg>
            
            {/* Heart icon with a continuous heartbeat pulse effect */}
            <motion.svg 
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-5 h-5 text-red-500 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>

            {/* Right squiggly line */}
            <svg className="w-8 h-2 text-white fill-current opacity-70" viewBox="0 0 40 10">
              <path d="M0,5 Q10,0 20,5 T40,5" fill="transparent" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Social Icons Container */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-6 text-[#c29b70]"
          >
            {/* Facebook */}
            <motion.a variants={iconVariants} whileHover={{ scale: 1.15 }} href="#" className="hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </motion.a>
            
            {/* Twitter */}
            <motion.a variants={iconVariants} whileHover={{ scale: 1.15 }} href="#" className="hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </motion.a>
            
            {/* Instagram */}
            <motion.a variants={iconVariants} whileHover={{ scale: 1.15 }} href="#" className="hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5 fill-transparent stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </motion.a>
            
            {/* Pinterest */}
            <motion.a variants={iconVariants} whileHover={{ scale: 1.15 }} href="#" className="hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.9 6.44 9.35-.09-.79-.17-2.01.04-2.88.19-.8 1.25-5.3 1.25-5.3s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.57 1.92 1.89 0 3.34-1.99 3.34-4.86 0-2.27-1.63-3.86-4-3.86-2.73 0-4.33 2.05-4.33 4.18 0 .91.35 1.89.79 2.42.09.11.1.2.07.31-.1.4-.32 1.32-.36 1.51-.05.23-.17.27-.41.16-1.54-.72-2.5-2.98-2.5-4.81 0-3.92 2.85-7.52 8.21-7.52 4.3 0 7.64 3.07 7.64 7.16 0 4.28-2.69 7.72-6.43 7.72-1.26 0-2.44-.65-2.85-1.43l-.78 2.95c-.28 1.07-1.04 2.4-1.55 3.22A9.97 9.97 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a variants={iconVariants} whileHover={{ scale: 1.15 }} href="#" className="hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button 
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          viewport={{ once: true }}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 bg-[#4a4a4a] text-[#c29b70] rounded-full flex items-center justify-center hover:bg-[#5a5a5a] hover:text-white transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 fill-transparent stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      </footer>
    </div>
  );
}