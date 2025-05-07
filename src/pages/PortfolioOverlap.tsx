
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OverlapAnalyzer from '@/components/OverlapAnalyzer';
import { Separator } from '@/components/ui/separator';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChartPie, BarChart, TrendingUp, Info } from 'lucide-react';

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

const PortfolioOverlap: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wealth-light via-white to-wealth-light/30 -z-10"></div>
      
      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[350px] -right-[250px] w-[600px] h-[600px] rounded-full bg-wealth-teal/20" 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute top-[30%] -left-[250px] w-[600px] h-[600px] rounded-full bg-wealth-navy/20" 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ 
            duration: 10, 
            ease: "easeInOut", 
            repeat: Infinity,
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, idx) => (
          <motion.div 
            key={idx}
            className="absolute rounded-full bg-wealth-teal/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              ease: "easeInOut",
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <Navbar />
      <main className="relative z-10">        
        <div className="wealth-container py-12 md:py-20">
          <motion.div 
            className="max-w-4xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-wealth-teal"
              >
                <Info className="h-8 w-8" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-wealth-navy via-wealth-teal to-wealth-navy bg-clip-text text-transparent">
                Portfolio Overlap Analyzer
              </h1>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">PRO</span>
            </div>
            <p className="text-wealth-gray text-lg">
              Compare mutual funds to identify overlapping holdings and ensure better portfolio diversification.
              Avoid redundancy and optimize your investments with our advanced analysis tool.
            </p>
          </motion.div>
          
          <Separator className="mb-10 bg-gradient-to-r from-wealth-navy/20 via-wealth-teal/50 to-wealth-navy/20 h-0.5" />
          
          {/* Feature highlights before the analyzer */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-wealth-navy">
                    <ChartPie className="mr-2 h-5 w-5 text-wealth-teal" />
                    Smart Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wealth-gray">Instantly analyze overlapping holdings between multiple mutual funds.</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-wealth-navy">
                    <BarChart className="mr-2 h-5 w-5 text-wealth-teal" />
                    Visual Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wealth-gray">Intuitive charts and visualizations to help you understand portfolio composition.</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-wealth-navy">
                    <TrendingUp className="mr-2 h-5 w-5 text-wealth-teal" />
                    Optimization Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wealth-gray">Get personalized recommendations to improve your portfolio diversification.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <OverlapAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioOverlap;
