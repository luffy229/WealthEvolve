import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogInsights from '@/components/BlogInsights';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Filter, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section with Parallax Effect */}
        <div className="relative overflow-hidden bg-gradient-to-b from-wealth-navy to-wealth-navy/90 text-white py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden z-0">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full grid grid-cols-8 grid-rows-4">
                  {Array.from({ length: 32 }).map((_, i) => (
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
          </div>

          <div className="wealth-container relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-wealth-teal/20 text-wealth-teal px-3 py-1 rounded-full mb-4 text-sm font-medium">
                Wealth Evolution Blog
              </div>
              <h1 className="heading-2 text-5xl md:text-6xl font-serif font-bold mb-6">
                Investment Insights & Knowledge
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Stay informed with cutting-edge perspectives on mutual funds, investment strategies, 
                market trends, and expert financial planning tips.
              </p>
              
              {/* Search bar with animation */}
              <motion.div 
                className="relative max-w-2xl mx-auto mt-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative">
                  <Input 
                    type="text"
                    placeholder="Search for investment topics..." 
                    className="pl-12 pr-4 py-6 rounded-full bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:ring-wealth-teal focus:border-wealth-teal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 h-5 w-5" />
                  <Button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-wealth-teal hover:bg-wealth-teal/90 text-white px-4 py-2 h-auto"
                  >
                    Search
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        <div className="wealth-container py-12 md:py-20">
          {/* Category tabs */}
          <Tabs defaultValue="all" className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                className="text-2xl font-bold text-wealth-navy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Popular Categories
              </motion.h2>
              
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" /> Trending
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </motion.div>
            </div>
            
            <TabsList className="bg-gray-100 p-1 rounded-full mb-8 overflow-x-auto flex-wrap justify-start">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                All Topics
              </TabsTrigger>
              <TabsTrigger value="investing" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                Investing Basics
              </TabsTrigger>
              <TabsTrigger value="mutual" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                Mutual Funds
              </TabsTrigger>
              <TabsTrigger value="tax" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                Tax Planning
              </TabsTrigger>
              <TabsTrigger value="retirement" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                Retirement
              </TabsTrigger>
              <TabsTrigger value="market" className="rounded-full data-[state=active]:bg-wealth-teal data-[state=active]:text-white">
                Market Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {/* Featured post */}
              <motion.div 
                className="mb-12" 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-5 gap-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                    <Badge variant="outline" className="text-xs font-medium text-wealth-teal border-wealth-teal w-fit mb-4">
                      Featured Article
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-wealth-navy mb-4">
                      2025 Investment Outlook: Navigating Uncertainty with Smart Diversification
                    </h2>
                    <p className="text-wealth-gray text-lg mb-6 line-clamp-3">
                      As markets continue to face volatility, our experts analyze emerging trends and provide strategic insights to help investors position their portfolios for long-term success.
                    </p>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wealth-navy to-wealth-teal flex items-center justify-center text-white font-bold">
                        MS
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dr. Mohan Singh</p>
                        <p className="text-xs text-wealth-gray">Chief Investment Strategist • May 5, 2025</p>
                      </div>
                    </div>
                    <Button className="bg-wealth-navy hover:bg-wealth-navy/90 text-white w-fit group">
                      Read Full Analysis
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="md:col-span-2 bg-gradient-to-br from-wealth-teal/80 to-wealth-navy flex items-center justify-center p-12">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            strokeOpacity="0.2"
                          />
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.8 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="60"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            strokeOpacity="0.3"
                          />
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="60"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.65 }}
                            transition={{ duration: 2.2, ease: "easeInOut" }}
                          />
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="40"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            strokeOpacity="0.4"
                          />
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="40"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.5 }}
                            transition={{ duration: 2.4, ease: "easeInOut" }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
                            
              {/* Blog Insights Component */}
              <BlogInsights />
            </TabsContent>
            
            {/* Other tab contents would be similar but with filtered posts */}
            <TabsContent value="investing">
              <BlogInsights category="Investing Basics" />
            </TabsContent>
            <TabsContent value="mutual">
              <BlogInsights category="Mutual Funds" />
            </TabsContent>
            <TabsContent value="tax">
              <BlogInsights category="Tax Planning" />
            </TabsContent>
            <TabsContent value="retirement">
              <BlogInsights category="Retirement" />
            </TabsContent>
            <TabsContent value="market">
              <BlogInsights category="Market Trends" />
            </TabsContent>
          </Tabs>

          {/* Floating scroll-to-top button */}
          <motion.div 
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              className="h-10 w-10 rounded-full bg-wealth-teal shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowRight className="rotate-270 h-5 w-5 text-white" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
