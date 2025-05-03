
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, BarChart2, Calendar, FileText, Info, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FundPerformance from '@/components/FundPerformance';
import FundHoldings from '@/components/FundHoldings';
import FundRisk from '@/components/FundRisk';
import FundFees from '@/components/FundFees';
import ReturnCalculator from '@/components/ReturnCalculator';
import { getMutualFund } from '@/lib/fundData';

const FundDetail: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const { toast } = useToast();
  
  const { data: fund, isLoading, error } = useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => getMutualFund(fundId || ''),
    enabled: !!fundId,
  });
  
  // Show toast on error
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error loading fund data",
        description: "Unable to load fund details. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-wealth-light to-white">
        <Navbar />
        <div className="wealth-container py-12 md:py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-wealth-navy/20 rounded w-64 mb-4"></div>
              <div className="h-4 bg-wealth-navy/10 rounded w-48"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!fund) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-wealth-light to-white">
        <Navbar />
        <div className="wealth-container py-12 md:py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-serif text-wealth-navy mb-4">Fund Not Found</h2>
            <p className="text-wealth-gray">The fund you're looking for doesn't exist or could not be loaded.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasPositiveReturn = (fund.performance?.['1Y'] || 0) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-wealth-light to-white">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          {/* Fund Header */}
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              className="flex flex-col md:flex-row md:justify-between md:items-start mb-6"
              variants={item}
            >
              <div>
                <h1 className="heading-2 text-wealth-navy mb-2">{fund.name}</h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-block bg-wealth-navy/10 text-wealth-navy text-sm px-3 py-1 rounded-full">
                    {fund.category}
                  </span>
                  <span className="inline-block bg-wealth-light text-wealth-gray text-sm px-3 py-1 rounded-full">
                    {fund.amc}
                  </span>
                </div>
              </div>
              
              <motion.div 
                className="mt-4 md:mt-0 flex flex-col items-start md:items-end"
                variants={item}
              >
                <div className="flex items-center">
                  <span className="text-3xl font-serif font-bold">
                    ₹{fund.nav}
                  </span>
                  <span className="text-sm text-wealth-gray ml-2">NAV</span>
                </div>
                
                <div className={`flex items-center mt-1 ${hasPositiveReturn ? 'text-green-600' : 'text-red-500'}`}>
                  {hasPositiveReturn ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  <span className="font-medium">
                    {hasPositiveReturn ? '+' : ''}{fund.performance?.['1Y']}%
                  </span>
                  <span className="text-sm text-wealth-gray ml-2">1Y Return</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item}>
              <Separator className="mb-8" />
            </motion.div>
            
            {/* Fund Details and Calculator Layout */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content - Fund Details Tabs */}
              <motion.div 
                className="md:col-span-2"
                variants={item}
              >
                <Tabs defaultValue="performance" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="performance" className="flex items-center">
                      <BarChart2 size={16} className="mr-2" />
                      <span className="hidden sm:inline">Performance</span>
                    </TabsTrigger>
                    <TabsTrigger value="holdings" className="flex items-center">
                      <FileText size={16} className="mr-2" />
                      <span className="hidden sm:inline">Holdings</span>
                    </TabsTrigger>
                    <TabsTrigger value="risk" className="flex items-center">
                      <Shield size={16} className="mr-2" />
                      <span className="hidden sm:inline">Risk</span>
                    </TabsTrigger>
                    <TabsTrigger value="fees" className="flex items-center">
                      <Info size={16} className="mr-2" />
                      <span className="hidden sm:inline">Fees</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="performance">
                    <FundPerformance fund={fund} />
                  </TabsContent>
                  
                  <TabsContent value="holdings">
                    <FundHoldings fund={fund} />
                  </TabsContent>
                  
                  <TabsContent value="risk">
                    <FundRisk fund={fund} />
                  </TabsContent>
                  
                  <TabsContent value="fees">
                    <FundFees fund={fund} />
                  </TabsContent>
                </Tabs>
              </motion.div>
              
              {/* Sidebar - Return Calculator */}
              <motion.div
                className="md:col-span-1"
                variants={item}
              >
                <div className="sticky top-24">
                  <ReturnCalculator 
                    fundName={fund.name} 
                    expectedReturn={fund.performance?.['5Y'] || fund.performance?.['3Y'] || fund.performance?.['1Y'] || 12} 
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FundDetail;
