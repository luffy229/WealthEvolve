
import React, { useEffect } from 'react';
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
import { ChartPie, BarChart4, TrendingUp, Clock } from 'lucide-react';

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
  // Disable three.js animations that may be causing WebGL context loss
  useEffect(() => {
    return () => {
      // Cleanup any potential three.js resources when component unmounts
      const threeCanvases = document.querySelectorAll('canvas');
      threeCanvases.forEach(canvas => {
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (context) {
          // @ts-ignore
          context.getExtension('WEBGL_lose_context')?.loseContext();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wealth-light via-white to-wealth-light/30 -z-10"></div>
      
      {/* Simplified animated decorative elements to avoid WebGL issues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[350px] -right-[250px] w-[600px] h-[600px] rounded-full bg-wealth-teal/20"></div>
        <div className="absolute top-[30%] -left-[250px] w-[600px] h-[600px] rounded-full bg-wealth-navy/20"></div>
      </div>
      
      <Navbar />
      <main className="relative z-10">        
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-8 w-8 text-wealth-teal" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-wealth-navy via-wealth-teal to-wealth-navy bg-clip-text text-transparent">
                Portfolio Overlap Analyzer
              </h1>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">PRO</span>
            </div>
            <p className="text-wealth-gray text-lg">
              Compare mutual funds to identify overlapping holdings and ensure better portfolio diversification.
              Avoid redundancy and optimize your investments with our advanced analysis tool.
            </p>
          </div>
          
          <Separator className="mb-10 bg-gradient-to-r from-wealth-navy/20 via-wealth-teal/50 to-wealth-navy/20 h-0.5" />
          
          {/* Feature highlights before the analyzer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
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
            </div>
            
            <div>
              <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-wealth-navy">
                    <BarChart4 className="mr-2 h-5 w-5 text-wealth-teal" />
                    Visual Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wealth-gray">Intuitive charts and visualizations to help you understand portfolio composition.</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
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
            </div>
          </div>
          
          <OverlapAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioOverlap;
