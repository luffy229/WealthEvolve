
import React, { useState } from 'react';
import { User, FileText, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Complete our detailed risk assessment and financial goals questionnaire to help us understand your needs.',
    icon: User,
  },
  {
    number: '02',
    title: 'Get Personalized Plan',
    description: 'Receive a tailored investment strategy and wealth management plan designed specifically for your goals.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Track & Optimize in Real-Time',
    description: 'Monitor your portfolio performance and make data-driven decisions with our advanced dashboard.',
    icon: BarChart2,
  },
];

const HowItWorks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section 
      id="how-it-works" 
      className="section-padding bg-gradient-to-br from-wealth-navy to-[#0a192f] text-white py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-wealth-teal opacity-10 blur-[80px]"
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-wealth-gold opacity-10 blur-[100px]"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      <div className="wealth-container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 mb-4 font-serif text-5xl font-bold">
            <span className="text-gradient-wealth">Smart Investing</span> Made Simple
          </h2>
          <p className="text-lg opacity-80">
            Our streamlined process takes you from initial assessment to active portfolio management in three simple steps.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className={`relative group rounded-2xl overflow-hidden transition-all duration-500 ${
                hoveredIndex === index ? 'z-20 scale-105' : 'z-10'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-wealth-teal/20 via-wealth-navy/20 to-wealth-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="relative z-10 backdrop-blur-sm p-8 h-full border border-white/10 bg-gradient-to-br from-white/5 to-white/0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-wealth-gold font-serif text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-wealth-gold to-amber-300">{step.number}</span>
                  <motion.div 
                    className="bg-wealth-teal bg-opacity-20 p-4 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <step.icon size={28} className="text-wealth-teal" />
                  </motion.div>
                </div>
                <h3 className="font-serif text-2xl font-medium mb-3">{step.title}</h3>
                <p className="opacity-80 leading-relaxed">{step.description}</p>
              </div>
              
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 p-0.5 bg-gradient-to-r from-wealth-teal via-wealth-gold to-wealth-teal opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-700">
                <div className="bg-wealth-navy h-full w-full rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
          
          {/* Connector lines for desktop */}
          <div className="hidden md:block absolute top-1/3 left-[33%] w-[34%] h-0.5">
            <motion.div 
              className="h-full bg-gradient-to-r from-wealth-teal to-wealth-gold"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
          <div className="hidden md:block absolute top-1/3 left-[67%] w-[34%] h-0.5">
            <motion.div 
              className="h-full bg-gradient-to-r from-wealth-gold to-wealth-teal"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
