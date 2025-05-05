
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
import { ChartPie, BarChart, TrendingUp } from 'lucide-react';

const PortfolioOverlap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-wealth-light to-white">
      <Navbar />
      <main className="relative">
        {/* Abstract background elements for visual appeal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[350px] -right-[250px] w-[600px] h-[600px] rounded-full bg-wealth-teal/20 blur-[120px]" />
          <div className="absolute top-[30%] -left-[250px] w-[600px] h-[600px] rounded-full bg-wealth-navy/20 blur-[150px]" />
        </div>
        
        <div className="wealth-container py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto mb-10 animate-fade-in">
            <div className="animate-fade-in">
              <h1 className="heading-2 text-wealth-navy mb-4 flex items-center gap-2">
                <span className="bg-gradient-wealth bg-clip-text text-transparent text-3xl md:text-4xl font-bold">
                  Portfolio Overlap Analyzer
                </span>
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">PRO</span>
              </h1>
              <p className="text-wealth-gray text-lg">
                Compare mutual funds to identify overlapping holdings and ensure better portfolio diversification.
                Avoid redundancy and optimize your investments with our advanced analysis tool.
              </p>
            </div>
          </div>
          
          <Separator className="mb-10 bg-gradient-to-r from-wealth-navy/20 via-wealth-teal/50 to-wealth-navy/20 h-0.5" />
          
          {/* Feature highlights before the analyzer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm" style={{animationDelay: "100ms"}}>
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
            
            <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm" style={{animationDelay: "200ms"}}>
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
            
            <Card className="border-wealth-teal/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm" style={{animationDelay: "300ms"}}>
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
          
          <OverlapAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioOverlap;
