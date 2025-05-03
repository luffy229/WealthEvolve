
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FundExplorer from '@/components/FundExplorer';
import { Separator } from '@/components/ui/separator';

const ExploreFunds: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">Explore Mutual Funds</h1>
            <p className="text-wealth-gray text-lg">
              Browse our comprehensive collection of mutual funds across various categories.
              Use our advanced search and filtering options to find the perfect funds for your investment goals.
            </p>
          </div>
          <Separator className="mb-10" />
          <FundExplorer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreFunds;
