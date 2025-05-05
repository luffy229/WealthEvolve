
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OverlapAnalyzer from '@/components/OverlapAnalyzer';
import { Separator } from '@/components/ui/separator';

const PortfolioOverlap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-wealth-light to-white">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="animate-fade-in">
              <h1 className="heading-2 text-wealth-navy mb-4 flex items-center gap-2">
                <span className="bg-gradient-wealth bg-clip-text text-transparent">
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
          <Separator className="mb-10 bg-gradient-to-r from-wealth-navy/20 via-wealth-teal/50 to-wealth-navy/20" />
          <OverlapAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioOverlap;
