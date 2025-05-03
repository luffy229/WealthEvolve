
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RiskProfiler from '@/components/RiskProfiler';
import { Separator } from '@/components/ui/separator';

const RiskProfilerPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">Investment Risk Profiler</h1>
            <p className="text-wealth-gray text-lg">
              Discover your investment risk tolerance and get personalized asset allocation recommendations 
              based on your financial goals and comfort with market volatility.
            </p>
          </div>
          <Separator className="mb-10" />
          <RiskProfiler />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RiskProfilerPage;
