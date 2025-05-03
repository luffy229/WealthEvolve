
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioHealthCheck from '@/components/PortfolioHealthCheck';
import { Separator } from '@/components/ui/separator';

const PortfolioHealthCheckPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">Free Portfolio Health Check</h1>
            <p className="text-wealth-gray text-lg">
              Get a comprehensive analysis of your current investments and personalized recommendations 
              from our financial experts to optimize your portfolio.
            </p>
          </div>
          <Separator className="mb-10" />
          <PortfolioHealthCheck />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioHealthCheckPage;
