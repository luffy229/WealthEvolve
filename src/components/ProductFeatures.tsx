
import React from 'react';
import { Phone, Target, Shield, BarChart2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const products = [
  {
    title: 'Wealth Monitor App',
    description: 'Track all your investments in real-time across platforms with our powerful mobile application.',
    icon: Phone
  },
  {
    title: 'Goal-Based Investing',
    description: 'Create and fund specific financial goals with specialized portfolios tailored to your timeline.',
    icon: Target
  },
  {
    title: 'Portfolio Health Score',
    description: 'Get instant insights into your portfolio performance and risk exposure with our proprietary scoring system.',
    icon: BarChart2
  },
  {
    title: 'AI-Powered Rebalancing',
    description: 'Intelligent portfolio rebalancing that adjusts to market conditions and your changing financial goals.',
    icon: Shield
  },
  {
    title: 'Monthly Market Reports',
    description: 'Receive comprehensive market analysis and investment insights from our expert research team.',
    icon: FileText
  }
];

const ProductFeatures: React.FC = () => {
  return (
    <section id="products" className="section-padding bg-wealth-light">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-wealth-navy mb-4">Our Product Suite</h2>
          <p className="text-wealth-gray text-lg">
            Comprehensive wealth management tools and services designed for the modern investor.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-6">
              {products.map((product, index) => (
                <Card key={index} className="feature-card border-none shadow hover:shadow-lg">
                  <CardContent className="flex items-start p-6">
                    <div className="mr-5 mt-1 bg-wealth-teal bg-opacity-10 p-3 rounded-full">
                      <product.icon className="h-6 w-6 text-wealth-teal" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium mb-2 text-wealth-navy">{product.title}</h3>
                      <p className="text-wealth-gray text-sm">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-sm">
              {/* Mockup phone */}
              <div className="bg-wealth-navy rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden h-[580px] w-[280px]">
                  <div className="bg-wealth-navy h-10 flex justify-center items-center">
                    <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=280&h=570" 
                    alt="Wealth Monitor App" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-wealth-gold opacity-30 rounded-full blur-xl"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-wealth-teal opacity-30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
