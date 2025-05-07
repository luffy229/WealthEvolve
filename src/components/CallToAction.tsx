
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="section-padding bg-wealth-navy text-white">
      <div className="wealth-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-8 lg:mb-0 lg:max-w-2xl">
            <h2 className="heading-2 mb-6">Your wealth deserves expert care. <br className="hidden md:block" /><span className="text-wealth-gold">Start with ₹50,000.</span></h2>
            <p className="text-lg opacity-80 mb-8">
              Join thousands of successful investors who have transformed their financial future with WealthEvolve's expert guidance and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white font-medium py-6 px-8 rounded-lg text-lg">
                Create Your Plan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-wealth-navy font-medium py-6 px-8 rounded-lg text-lg">
                Book a Free Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
              <h3 className="font-serif text-2xl font-medium mb-6">Get Started Today</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-wealth-teal bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-serif font-bold text-xl text-wealth-teal">1</span>
                </div>
                <p>Complete your risk profile assessment</p>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-wealth-teal bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-serif font-bold text-xl text-wealth-teal">2</span>
                </div>
                <p>Schedule a consultation with an advisor</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-wealth-teal bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-serif font-bold text-xl text-wealth-teal">3</span>
                </div>
                <p>Activate your personalized investment plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
