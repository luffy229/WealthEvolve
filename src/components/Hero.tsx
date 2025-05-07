
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const statItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  return (
    <section className="relative bg-gradient-wealth text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')] opacity-30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-wealth-teal/10 blur-xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-wealth-gold/10 blur-xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[15%] w-40 h-40 rounded-full bg-wealth-teal/5 blur-xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      <div className="wealth-container relative z-10 min-h-[90vh] flex items-center">
        <motion.div 
          className="max-w-3xl mx-auto text-center py-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={item} className="heading-1 mb-6">
            Your Wealth, <span className="text-wealth-teal animate-pulse-slow">Managed Smarter</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-xl md:text-2xl opacity-90 mb-8">
            Curated portfolios. Transparent fees. Built for modern investors.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg text-lg animate-pulse-glow">Get Started</Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-wealth-navy font-medium py-3 px-8 rounded-lg text-lg">
              Talk to an Advisor
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10"
          >
            <motion.div variants={statItem} className="flex flex-col">
              <motion.span 
                className="font-serif text-3xl font-bold text-wealth-gold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                10K+
              </motion.span>
              <span className="text-sm opacity-80">Active Clients</span>
            </motion.div>
            <motion.div variants={statItem} className="flex flex-col">
              <motion.span 
                className="font-serif text-3xl font-bold text-wealth-gold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                ₹2,500Cr
              </motion.span>
              <span className="text-sm opacity-80">Assets Under Management</span>
            </motion.div>
            <motion.div variants={statItem} className="flex flex-col">
              <motion.span 
                className="font-serif text-3xl font-bold text-wealth-gold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                15%
              </motion.span>
              <span className="text-sm opacity-80">Avg. Annual Returns</span>
            </motion.div>
            <motion.div variants={statItem} className="flex flex-col">
              <motion.span 
                className="font-serif text-3xl font-bold text-wealth-gold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                SEBI
              </motion.span>
              <span className="text-sm opacity-80">Registered Advisory</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Wave divider with animation */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <motion.path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
