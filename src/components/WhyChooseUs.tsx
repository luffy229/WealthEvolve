
import React from 'react';
import { PieChart, BarChart2, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Curated Mutual Fund Portfolios',
    description: 'Professionally selected and continuously optimized investment funds based on your risk profile and goals.',
    icon: PieChart,
    link: '/fund/bluechip-equity',
  },
  {
    title: 'Direct Equity PMS',
    description: 'Personalized portfolio management services with direct stocks and securities for higher returns potential.',
    icon: BarChart2,
    link: '/direct-equity-pms',
  },
  {
    title: 'Risk Profiling & Financial Planning',
    description: 'Scientific assessment of your risk appetite paired with comprehensive financial roadmapping.',
    icon: Shield,
    link: '/financial-planning',
  },
  {
    title: 'Wealth Monitor App',
    description: 'Track all your investments in real-time with powerful analytics and performance insights.',
    icon: Activity,
    link: '/wealth-monitor-app',
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="section-padding bg-wealth-light">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-wealth-navy mb-4">Why Choose WealthEvolve</h2>
          <p className="text-wealth-gray text-lg">
            We combine sophisticated investment strategies with cutting-edge technology to help you build and manage wealth efficiently.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card flex flex-col items-center text-center group"
            >
              <div className="bg-wealth-navy bg-opacity-5 p-4 rounded-full mb-6 group-hover:bg-wealth-navy group-hover:text-white transition-all">
                <feature.icon size={32} className="text-wealth-navy group-hover:text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 text-wealth-navy">{feature.title}</h3>
              <p className="text-wealth-gray mb-4">{feature.description}</p>
              
              {feature.link && (
                <Link to={feature.link}>
                  <Button variant="outline" size="sm" className="mt-2">
                    {index === 0 ? 'Explore Funds' : 
                     index === 1 ? 'Learn More' :
                     index === 2 ? 'Get Assessment' : 'Download App'}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
