
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Smartphone, BarChart2, PieChart, Bell, Lock, Download, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';

// Animated Phone Screen Component
const PhoneScreen = ({ active }: { active: number }) => {
  const screens = [
    { bg: "#2CA6A4", content: "Portfolio" },
    { bg: "#3B82F6", content: "Analytics" },
    { bg: "#8B5CF6", content: "Alerts" },
    { bg: "#F59E0B", content: "Settings" }
  ];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full rounded-lg"
        style={{ backgroundColor: screens[active].bg }}
      >
        <div className="flex items-center justify-center h-full text-white font-bold text-lg">
          {screens[active].content}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// QR Code component with animation
const QRCode: React.FC = () => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white p-6 rounded-xl shadow-lg inline-block relative"
    >
      <div className="absolute -top-3 -right-3 bg-wealth-teal text-white text-xs px-2 py-1 rounded-full">Scan me!</div>
      <div className="w-48 h-48 grid grid-cols-10 grid-rows-10 gap-1">
        {/* This creates a simplified visual representation of a QR code */}
        {Array.from({ length: 100 }).map((_, i) => {
          // Create a pattern that resembles a QR code
          const row = Math.floor(i / 10);
          const col = i % 10;
          
          // Create border pattern
          const isBorder = row === 0 || row === 9 || col === 0 || col === 9;
          
          // Create the three positioning squares in corners
          const isPositioningSquare = 
            (row < 3 && col < 3) || // Top-left
            (row < 3 && col > 6) || // Top-right
            (row > 6 && col < 3);   // Bottom-left
            
          // Random pattern for the rest with some bias toward white
          const isRandom = Math.random() > 0.7;
          
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.001 }}
              className={`
                ${isPositioningSquare || isBorder || isRandom ? 'bg-wealth-navy' : 'bg-white'}
                ${(row === 1 && col === 1) || (row === 1 && col === 8) || (row === 8 && col === 1) ? 'bg-white' : ''}
              `}
            ></motion.div>
          );
        })}
      </div>
      <motion.p 
        className="text-center mt-4 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Scan to Download
      </motion.p>
    </motion.div>
  );
};

// 3D Phone Model Fallback Component
const PhoneModelFallback = () => {
  return (
    <div className="relative h-[400px] w-[200px] flex items-center justify-center">
      <div className="bg-wealth-navy rounded-[2rem] p-2 shadow-xl h-full w-full">
        <div className="bg-black rounded-[1.5rem] overflow-hidden h-full w-full relative">
          <div className="h-8 bg-wealth-navy flex items-center justify-center">
            <div className="h-2 w-16 bg-black rounded-b-md"></div>
          </div>
          
          <div className="p-4 h-full">
            {/* App Chart Visualization (Static) */}
            <div className="mt-8 mb-6">
              <div className="w-full h-40 bg-wealth-teal/10 rounded-xl p-3">
                <div className="h-6 w-20 bg-wealth-teal/30 rounded-md mb-3"></div>
                <div className="flex items-end h-20 space-x-1 justify-between">
                  {[0.4, 0.25, 0.6, 0.3, 0.5].map((height, i) => (
                    <div 
                      key={i} 
                      className={`w-8 rounded-t ${i % 2 === 0 ? 'bg-wealth-teal' : 'bg-wealth-gold'}`}
                      style={{ height: `${height * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pie chart (Static) */}
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-24 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-wealth-teal" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 0 100%, 0 50%)' }}></div>
                <div className="absolute inset-0 bg-wealth-gold" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}></div>
                <div className="absolute inset-0 bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>
                <div className="absolute inset-0 bg-wealth-navy" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated rings */}
      <motion.div 
        className="absolute -z-10 rounded-full border-4 border-wealth-teal/30 w-[220px] h-[220px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.3, 0.5] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      ></motion.div>
      <motion.div 
        className="absolute -z-10 rounded-full border-2 border-wealth-teal/20 w-[260px] h-[260px]"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.1, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      ></motion.div>
    </div>
  );
};

// Animated Feature Component
const AnimatedFeature = ({ feature, index }: { feature: any; index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-white to-gray-50">
        <CardContent className="pt-6 h-full flex flex-col">
          <div className="flex items-start mb-4">
            <div className="bg-wealth-teal bg-opacity-10 p-3 rounded-full mr-4 shadow-inner">
              <feature.icon className="h-6 w-6 text-wealth-teal" />
            </div>
            <h3 className="font-serif text-xl font-medium text-wealth-navy">{feature.title}</h3>
          </div>
          <p className="text-wealth-gray pl-16 flex-grow">{feature.description}</p>
          
          <motion.div 
            className="mt-4 pl-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" className="p-0 text-wealth-teal hover:text-wealth-navy hover:bg-transparent">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Testimonial Component
const AppReview = ({ review, delay }: { review: any, delay: number }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-wealth-navy to-wealth-teal flex items-center justify-center text-white font-bold text-xl">
          {review.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-medium text-wealth-navy">{review.name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-wealth-gray text-sm italic">"{review.comment}"</p>
    </motion.div>
  );
};

const WealthMonitorApp: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  
  // Auto-rotate phone screens
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Features array
  const features = [
    {
      title: "Real-time Portfolio Tracking",
      description: "Monitor your investments across different platforms in real-time with automated synchronization.",
      icon: Activity
    },
    {
      title: "Performance Analytics",
      description: "Detailed analysis of your investments with customizable metrics and benchmarks.",
      icon: BarChart2
    },
    {
      title: "Asset Allocation Visualization",
      description: "Visual breakdown of your portfolio by asset class, sector, and geography.",
      icon: PieChart
    },
    {
      title: "Smart Alerts",
      description: "Customizable notifications for price movements, rebalancing opportunities, and market events.",
      icon: Bell
    },
    {
      title: "Secure Authentication",
      description: "Bank-grade security with biometric authentication and encrypted data transmission.",
      icon: Lock
    },
    {
      title: "Mobile-First Experience",
      description: "Intuitive interface designed specifically for mobile devices with offline capabilities.",
      icon: Smartphone
    }
  ];
  
  // Reviews
  const reviews = [
    {
      name: "Amit Sharma",
      rating: 5,
      comment: "This app completely changed how I manage my investments. The real-time tracking is flawless!"
    },
    {
      name: "Priya Patel",
      rating: 5,
      comment: "I love the analytics features. It's like having a financial advisor in my pocket!"
    },
    {
      name: "Rahul Gupta",
      rating: 4,
      comment: "Great app! The visualization tools make it easy to understand my portfolio allocation."
    },
    {
      name: "Neha Singh",
      rating: 5,
      comment: "The smart alerts have helped me catch several good investment opportunities. Highly recommend!"
    }
  ];
  
  // Show badge after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero Section with Parallax Effect */}
        <section className="bg-gradient-to-b from-wealth-navy to-wealth-navy/80 text-white py-24 relative">
          <motion.div 
            className="absolute inset-0 overflow-hidden z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full grid grid-cols-8 grid-rows-6">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01, duration: 1 }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Decorative shapes */}
              <motion.div 
                className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-wealth-teal/20 blur-3xl"
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-wealth-gold/10 blur-3xl"
                animate={{ 
                  x: [0, -30, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
          
          <div className="wealth-container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                  Wealth Monitor <span className="text-wealth-gold">Mobile App</span>
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                  Track all your investments in real-time across platforms with powerful analytics and personalized insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white flex items-center group">
                      <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                      Download App
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-white text-black hover:bg-white hover:text-wealth-navy">
                      Watch Demo
                    </Button>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-8 flex gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {[
                    { count: "10,000+", label: "Downloads" },
                    { count: "4.8/5", label: "App Store" },
                    { count: "4.7/5", label: "Google Play" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-wealth-gold">{stat.count}</p>
                      <p className="text-sm text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-[280px] h-[500px]">
                  {/* Phone Model */}
                  <div className="bg-wealth-navy rounded-[3rem] p-2 shadow-2xl h-[90%] w-full">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden h-full w-full relative">
                      <div className="bg-wealth-navy h-10 flex justify-center items-center">
                        <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                      </div>
                      <div className="absolute inset-0 top-10 p-2">
                        <PhoneScreen active={activeScreen} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute -bottom-8 -left-8 w-16 h-16 bg-wealth-gold opacity-30 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -top-8 -right-8 w-24 h-24 bg-wealth-teal opacity-30 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  {/* App Store Badge */}
                  <AnimatePresence>
                    {showBadge && (
                      <motion.div 
                        className="absolute -right-16 top-1/4 bg-white rounded-lg shadow-lg p-2 transform rotate-12"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 12 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <p className="text-xs font-bold">Editor's Choice</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Features with Staggered Animation */}
        <section className="py-24 bg-gray-50">
          <div className="wealth-container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-wealth-navy mb-6">Powerful Features at Your Fingertips</h2>
              <p className="text-wealth-gray text-lg">
                Our app puts sophisticated investment analytics in the palm of your hand, giving you the edge in managing your wealth.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimatedFeature key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Interactive App Preview Section */}
        <section className="py-24 bg-gradient-to-br from-wealth-navy to-wealth-navy/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="w-full h-full"
              animate={{ 
                backgroundPositionX: ["0%", "100%"],
                backgroundPositionY: ["0%", "100%"]
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
              }}
            />
          </div>
          
          <div className="wealth-container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  className="text-4xl font-serif font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Experience Our App
                </motion.h2>
                <motion.p 
                  className="text-lg opacity-90 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Available on iOS and Android devices. Scan the QR code or use the download buttons below to get started.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button className="bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 group">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13 8a1 1 0 0 1-2 0"></path>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on</span>
                      <span className="font-semibold">App Store</span>
                    </div>
                  </Button>
                  
                  <Button className="bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 group">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on</span>
                      <span className="font-semibold">Google Play</span>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <CheckCircle2 className="text-wealth-teal mr-2 h-5 w-5" />
                  <p>Free to download, premium features available</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <QRCode />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Phone Model Fallback Section */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-full w-full bg-gradient-to-br from-wealth-teal/5 to-wealth-gold/5"></div>
          </motion.div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-wealth-navy mb-6">Interactive App Demo</h2>
              <p className="text-wealth-gray text-lg">
                Explore our app's sleek design and powerful features
              </p>
            </motion.div>
            
            <div className="flex justify-center">
              <PhoneModelFallback />
            </div>
          </div>
        </section>
        
        {/* User Reviews Section */}
        <section className="py-24 bg-white">
          <div className="wealth-container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-wealth-navy mb-6">What Our Users Say</h2>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-6 w-6 text-amber-400 fill-amber-400" 
                  />
                ))}
              </div>
              <p className="text-wealth-gray text-lg">
                Join thousands of satisfied users who are transforming their investment experience
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, i) => (
                <AppReview key={i} review={review} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-br from-wealth-navy via-wealth-navy/90 to-wealth-teal/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: Math.random() * 100 + 10,
                  height: Math.random() * 100 + 10,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>
          
          <div className="wealth-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-4xl md:text-5xl font-serif font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Start Managing Your Investments Smarter Today
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Download our app today and take control of your financial future with powerful analytics at your fingertips.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white flex items-center mx-auto group">
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WealthMonitorApp;
