import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WeddingOrganization = () => {
  // Image Carousel State
  const [currentImage, setCurrentImage] = useState(0);
  
  const carouselImages = [
    "/WeddingEvent.avif",
  ];

  // Specific descriptions for each event
  const eventDescriptions = {
    ceremony: "Join us as we exchange our vows and start our new life together. Please arrive by 11:30 AM to be seated.",
    cake: "Sweet moments await! We will be cutting our beautiful multi-tiered wedding cake right after the ceremony.",
    lunch: "Enjoy a delicious catered feast featuring a variety of local and international cuisines to celebrate.",
    party: "Hit the dance floor! Our live DJ will be spinning tracks all evening to keep the celebration going."
  };

  // Reusable scroll animation configuration
  const scrollAnim = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section className="relative w-full py-24 bg-[#FAF9F6] font-['Montserrat',sans-serif] overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div {...scrollAnim} className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-['Great_Vibes',cursive] text-6xl md:text-7xl text-gray-800 mb-6 tracking-wide">
            Organization Wedding
          </h2>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Events 01 & 02 */}
          <div className="flex flex-col space-y-12 lg:pr-8 lg:text-right order-2 lg:order-1">
            {/* Event 01 */}
            <motion.div {...scrollAnim} transition={{ delay: 0.1, duration: 0.8 }} className="relative pb-12 border-b border-gray-200">
              <div className="flex lg:justify-end mb-4">
                <span className="bg-[#9cb08f] text-white text-[10px] font-bold tracking-widest px-4 py-1">01</span>
              </div>
              <h3 className="font-['Great_Vibes',cursive] text-4xl text-gray-800 mb-4">Wedding Ceremony</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm ml-auto">
                {eventDescriptions.ceremony}
              </p>
            </motion.div>

            {/* Event 02 */}
            <motion.div {...scrollAnim} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="flex lg:justify-end mb-4">
                <span className="bg-[#9cb08f] text-white text-[10px] font-bold tracking-widest px-4 py-1">02</span>
              </div>
              <h3 className="font-['Great_Vibes',cursive] text-4xl text-gray-800 mb-4">Cake Cutting</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm ml-auto">
                {eventDescriptions.cake}
              </p>
            </motion.div>
          </div>

          {/* CENTER COLUMN: Image Slider */}
          <motion.div 
            {...scrollAnim} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative h-[500px] w-full max-w-md mx-auto group order-1 lg:order-2"
          >
            <img 
              src={carouselImages[currentImage]} 
              alt="Wedding Event" 
              className="w-full h-full object-cover shadow-lg transition-all duration-500"
            />
            
          </motion.div>

          {/* RIGHT COLUMN: Events 03 & 04 */}
          <div className="flex flex-col space-y-12 lg:pl-8 text-left order-3">
            {/* Event 03 */}
            <motion.div {...scrollAnim} transition={{ delay: 0.4, duration: 0.8 }} className="relative pb-12 border-b border-gray-200">
              <div className="flex mb-4">
                <span className="bg-[#9cb08f] text-white text-[10px] font-bold tracking-widest px-4 py-1">03</span>
              </div>
              <h3 className="font-['Great_Vibes',cursive] text-4xl text-gray-800 mb-4">Lunch Time</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm">
                {eventDescriptions.lunch}
              </p>
            </motion.div>

            {/* Event 04 */}
            <motion.div {...scrollAnim} transition={{ delay: 0.5, duration: 0.8 }}>
              <div className="flex mb-4">
                <span className="bg-[#9cb08f] text-white text-[10px] font-bold tracking-widest px-4 py-1">04</span>
              </div>
              <h3 className="font-['Great_Vibes',cursive] text-4xl text-gray-800 mb-4">Party with Music</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm">
                {eventDescriptions.party}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WeddingOrganization;