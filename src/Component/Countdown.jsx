import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Countdown = () => {
  const targetDate = new Date("June 19, 2026 12:21:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [targetDate]);

  const formatTime = (time) => String(time).padStart(2, '0');

  // Animation configuration object to keep our JSX clean
  const scrollAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <section className="relative w-full py-24 md:py-32 font-['Montserrat',sans-serif] text-white">
      
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/DaysRemain.avif')" }} />
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* Left Side: Title - Slides UP First */}
        <motion.div 
          {...scrollAnimation}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-12 md:mb-0"
        >
          <span className="block text-[13px] font-semibold tracking-[0.2em] uppercase mb-2">
            Missing days to
          </span>
          <h2 className="font-['Great_Vibes',cursive] text-5xl md:text-6xl tracking-wide">
            Our Wedding
          </h2>
        </motion.div>

        {/* Right Side: The Timer - Slides UP slightly later (Staggered) */}
        <motion.div 
          {...scrollAnimation}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Staggered by 0.2s
          className="flex items-center space-x-4 md:space-x-8"
        >
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-[70px] font-serif italic mb-2 md:mb-4 leading-none">{timeLeft.days}</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Days</span>
          </div>

          <div className="w-[1px] h-12 md:h-16 bg-white/30 hidden sm:block"></div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-[70px] font-serif italic mb-2 md:mb-4 leading-none">{formatTime(timeLeft.hours)}</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Hours</span>
          </div>

          <div className="w-[1px] h-12 md:h-16 bg-white/30 hidden sm:block"></div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-[70px] font-serif italic mb-2 md:mb-4 leading-none">{formatTime(timeLeft.minutes)}</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Minutes</span>
          </div>

          <div className="w-[1px] h-12 md:h-16 bg-white/30 hidden sm:block"></div>

          {/* Seconds */}
          <div className="flex flex-col items-center w-[80px]">
            <span className="text-5xl md:text-[70px] font-serif italic mb-2 md:mb-4 leading-none">{formatTime(timeLeft.seconds)}</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Seconds</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;