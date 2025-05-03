
import React from 'react';
import { User, FileText, BarChart2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Complete our detailed risk assessment and financial goals questionnaire to help us understand your needs.',
    icon: User,
  },
  {
    number: '02',
    title: 'Get Personalized Plan',
    description: 'Receive a tailored investment strategy and wealth management plan designed specifically for your goals.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Track & Optimize in Real-Time',
    description: 'Monitor your portfolio performance and make data-driven decisions with our advanced dashboard.',
    icon: BarChart2,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section-padding bg-wealth-navy text-white">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-4">Smart Investing Made Simple</h2>
          <p className="text-lg opacity-80">
            Our streamlined process takes you from initial assessment to active portfolio management in three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-20 transition-all hover:bg-opacity-20"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-wealth-gold font-serif text-5xl font-bold">{step.number}</span>
                <div className="bg-wealth-teal bg-opacity-20 p-3 rounded-full">
                  <step.icon size={24} className="text-wealth-teal" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3">{step.title}</h3>
              <p className="opacity-80">{step.description}</p>
            </div>
          ))}
          
          {/* Connector lines for desktop (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/3 left-[33%] w-[34%] h-0.5 bg-gradient-to-r from-wealth-teal to-wealth-gold opacity-30"></div>
          <div className="hidden md:block absolute top-1/3 left-[67%] w-[34%] h-0.5 bg-gradient-to-r from-wealth-gold to-wealth-teal opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
