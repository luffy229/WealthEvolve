
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-wealth text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')] opacity-30"></div>
      
      <div className="wealth-container relative z-10 min-h-[90vh] flex items-center">
        <div className="max-w-3xl mx-auto text-center py-24">
          <h1 className="heading-1 mb-6">Your Wealth, <span className="text-wealth-teal">Managed Smarter</span></h1>
          
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Curated portfolios. Transparent fees. Built for modern investors.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg text-lg">Get Started</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy font-medium py-3 px-8 rounded-lg text-lg">
              Talk to an Advisor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-wealth-gold">10K+</span>
              <span className="text-sm opacity-80">Active Clients</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-wealth-gold">₹2,500Cr</span>
              <span className="text-sm opacity-80">Assets Under Management</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-wealth-gold">15%</span>
              <span className="text-sm opacity-80">Avg. Annual Returns</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-wealth-gold">SEBI</span>
              <span className="text-sm opacity-80">Registered Advisory</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
