
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OverlapAnalyzer from '@/components/OverlapAnalyzer';
import { Separator } from '@/components/ui/separator';

const PortfolioOverlap: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">Mutual Fund Portfolio Overlap Analyzer</h1>
            <p className="text-wealth-gray text-lg">
              Compare mutual funds to identify overlapping holdings and ensure better portfolio diversification.
              Avoid redundancy and optimize your investments with our advanced analysis tool.
            </p>
          </div>
          <Separator className="mb-10" />
          <OverlapAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioOverlap;
