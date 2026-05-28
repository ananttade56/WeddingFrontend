import React from 'react';
import { motion } from 'framer-motion';

// ProfileCard Component 
const ProfileCard = ({ imageUrl, role, name, description, floralPosition, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: 0.8, ease: "easeOut", delay: delay }} 
      className="relative bg-white w-full max-w-[480px] mx-auto shadow-[0px_5px_20px_rgba(0,0,0,0.05)] pb-12 font-['Montserrat',sans-serif]"
    >
      
      {/* Top Image Container */}
      <div className="w-full h-[320px] p-5 pb-0">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center mt-10 px-10 relative z-10">
        <span className="text-[#9cb08f] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">{role}</span>
        <h2 className="font-['Great_Vibes',cursive] text-[46px] text-gray-800 mb-5 tracking-wide">{name}</h2>
        <p className="text-gray-500 text-[13px] leading-[1.9] mb-8 max-w-[90%]">{description}</p>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-3">
          <a href="#" className="w-8 h-8 rounded-full bg-[#222222] text-white flex items-center justify-center hover:bg-[#9cb08f] transition duration-300">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          {/* Add remaining icons here */}
        </div>
      </div>

      {/* CONDITIONAL FLORAL OVERLAYS */}
      {floralPosition === 'left' && (
        <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-90">
          <img src="/flower.png" alt="" className="w-full h-full object-contain object-bottom-left" />
        </div>
      )}

      {floralPosition === 'right' && (
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-90">
          <img src="/flower.png" alt="" className="w-full h-full object-contain object-bottom-right -scale-x-100" />
        </div>
      )}

    </motion.div>
  );
};

const CoupleCards = () => {
  // Separate descriptions for the Bride and Groom
  const profileDescriptions = {
    bride: "Meet Apurva, our radiant bride. With her infectious smile and compassionate heart, she brings joy to everyone around her. She is so excited to begin this beautiful new chapter surrounded by loved ones.",
    groom: "Meet Anant, our dashing groom. Known for his unwavering kindness and steady support, he is ready to stand by Apurva's side for all the wonderful adventures and milestones that lie ahead."
  };

  return (
    <section className="bg-[#fcfcfc] py-24 px-4 w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-[1100px]">
        {/* Grid Container for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Bride Card - Flower on the Left, delay = 0s */}
          <ProfileCard 
            imageUrl="/Apurva.jpeg" 
            role="The Bride"
            name="Apurva Bhutad"
            description={profileDescriptions.bride}
            floralPosition="left"
            delay={0} 
          />

          {/* Groom Card - Flower on the Right, delay = 0.2s */}
          <ProfileCard 
            imageUrl="/Anant.jpeg" 
            role="The Groom"
            name="Anant Tade"
            description={profileDescriptions.groom}
            floralPosition="right"
            delay={0.2} 
          />

        </div>
      </div>
    </section>
  );
};

export default CoupleCards;