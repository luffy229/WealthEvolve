
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SIPPlanner from '@/components/SIPPlanner';
import { Separator } from '@/components/ui/separator';

const SIPCalculator: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">SIP Calculator</h1>
            <p className="text-wealth-gray text-lg">
              Plan your financial goals by calculating how much you need to invest monthly to reach your target amount.
              Our smart SIP calculator helps you make informed investment decisions.
            </p>
          </div>
          <Separator className="mb-10" />
          <SIPPlanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SIPCalculator;
