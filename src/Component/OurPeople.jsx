import React from 'react';
import { motion } from 'framer-motion';

const brideFamily = [
  {
    id: 1,
    name: 'Saurabh Bhutad',
    role: 'Brother',
    description: 'A steadfast protector and lifelong friend, Saurabh has always been the anchor of the family. His unwavering support and warm presence make this special day truly complete.',
    image: '/Saurabh.jpeg'
  },
  {
    id: 2,
    name: 'Pooja Bhutad',
    role: 'Sister-in-law',
    description: 'More than just a sister-in-law, Pooja brings elegance, laughter, and a beautiful warmth to the family. She is a cherished confidante sharing in every moment of this joyous journey.',
    image: '/Pooja.jpeg'
  },
  {
    id: 3,
    name: 'Snehal Bind',
    role: 'Sister',
    description: 'A partner in a keeper of secrets. Snehal and the bride share an unbreakable bond woven with countless memories, endless laughter, and boundless love.',
    image: '/Snehal.jpeg'
  }
];

const groomFamily = [
  {
    id: 1,
    name: 'Shrijit Vitonde',
    role: 'Brother',
    description: 'A brother whose loyalty and vibrant spirit know no bounds. Shrijit has been a lifelong wingman, bringing unmatched energy and joy to this incredible celebration.',
    image: '/Shrijit.jpeg'
  },
  {
    id: 2,
    name: 'Shreya Vitonde',
    role: 'Sister-in-law',
    description: 'Radiating kindness and grace, Shreya has a heart of gold. Her welcoming smile and boundless enthusiasm make her an irreplaceable part of the family and this beautiful union.',
    image: '/Shreya.jpeg'
  },
  {
    id: 3,
    name: 'Aditya Pant',
    role: 'Brother',
    description: 'Always the life of the party and a steadfast pillar of strength. His bond with his brother is built on a lifetime of shared adventures, inside jokes, and unwavering brotherly love.',
    image: '/Aditya.jpeg'
  }
];
// Reusable card component now wrapped in a motion.div
const PersonCard = ({ person, isBrideSide, animationProps }) => {
  return (
    <motion.div 
      {...animationProps}
      className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full ${isBrideSide ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
    >
      {/* Text Content */}
      <div className={`flex-1 text-center ${isBrideSide ? 'sm:text-right' : 'sm:text-left'}`}>
        <h3 className="text-xl font-medium text-gray-800 uppercase tracking-wide">
          {person.name}
        </h3>
        <p className="text-[#9cb08f] font-serif italic text-lg mb-3">
          - {person.role} -
        </p>
        <p className="text-gray-500 text-sm leading-relaxed">
          {person.description}
        </p>
      </div>

      {/* Image */}
      <div className="shrink-0">
        <div className="w-32 h-32 rounded-full p-1 border-2 border-[#C89D70] shadow-sm">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function OurPeople() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-white overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-['Great_Vibes',cursive] text-gray-800 mb-4" >
          Our People
        </h2>
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-gray-300"></span>
          <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="h-px w-8 bg-gray-300"></span>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        
        {/* === Bride's Side === */}
        <div className="flex flex-col gap-10">
          
          {/* Ribbon Header: Animates Down to Up */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-14 bg-[#9cb08f] mb-4 flex items-center justify-center [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,5%_50%)]"
          >
            <div className="absolute left-6 w-3 h-3 bg-white rounded-full opacity-50"></div>
            <h3 className="text-white text-2xl font-['Great_Vibes',cursive] tracking-wide">
              The Bride's Side
            </h3>
          </motion.div>
          
          {/* Bride Family List: Animates Left to Center */}
          <div className="flex flex-col gap-12">
            {brideFamily.map((person, index) => (
              <PersonCard 
                key={person.id} 
                person={person} 
                isBrideSide={true} 
                animationProps={{
                  initial: { opacity: 0, x: -60 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.6, delay: index * 0.15 } // Stagger effect
                }}
              />
            ))}
          </div>
        </div>

        {/* === Groom's Side === */}
        <div className="flex flex-col gap-10">
          
          {/* Ribbon Header: Animates Down to Up */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-14 bg-[#475569] mb-4 flex items-center justify-center [clip-path:polygon(0_0,100%_0,95%_50%,100%_100%,0_100%)]"
          >
            <h3 className="text-white text-2xl font-['Great_Vibes',cursive] tracking-wide">
              The Groom's Side
            </h3>
            <div className="absolute right-6 w-3 h-3 bg-white rounded-full opacity-50"></div>
          </motion.div>

          {/* Groom Family List: Animates Right to Center */}
          <div className="flex flex-col gap-12">
            {groomFamily.map((person, index) => (
              <PersonCard 
                key={person.id} 
                person={person} 
                isBrideSide={false} 
                animationProps={{
                  initial: { opacity: 0, x: 60 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.6, delay: index * 0.15 } // Stagger effect
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}