
import React, { useState } from 'react';
import { PieChart, BarChart2, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Curated Mutual Fund Portfolios',
    description: 'Professionally selected and continuously optimized investment funds based on your risk profile and goals.',
    icon: PieChart,
    link: '/fund/bluechip-equity',
    buttonText: 'Explore Funds',
    bgColor: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Direct Equity PMS',
    description: 'Personalized portfolio management services with direct stocks and securities for higher returns potential.',
    icon: BarChart2,
    link: '/direct-equity-pms',
    buttonText: 'Learn More',
    bgColor: 'from-teal-500/10 to-emerald-500/10',
    iconColor: 'text-teal-500'
  },
  {
    title: 'Risk Profiling & Financial Planning',
    description: 'Scientific assessment of your risk appetite paired with comprehensive financial roadmapping.',
    icon: Shield,
    link: '/financial-planning',
    buttonText: 'Get Assessment',
    bgColor: 'from-amber-500/10 to-yellow-500/10',
    iconColor: 'text-amber-500'
  },
  {
    title: 'Wealth Monitor App',
    description: 'Track all your investments in real-time with powerful analytics and performance insights.',
    icon: Activity,
    link: '/wealth-monitor-app',
    buttonText: 'Download App',
    bgColor: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-500'
  }
];

const WhyChooseUs: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="why-choose-us" className="section-padding bg-wealth-light relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-wealth-teal/20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-wealth-gold/20 animate-float"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full bg-wealth-navy/20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-40 w-20 h-20 rounded-full bg-purple-500/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-wealth-navy/5 blur-3xl"></div>
      </div>
      
      <div className="wealth-container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 text-wealth-navy mb-4 relative inline-block">
            Why Choose WealthEvolve
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-wealth-teal to-wealth-gold transform scale-x-0 origin-bottom-left transition-transform group-hover:scale-x-100 duration-300"></span>
          </h2>
          <p className="text-wealth-gray text-lg">
            We combine sophisticated investment strategies with cutting-edge technology to help you build and manage wealth efficiently.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div 
                className={`feature-card flex flex-col h-full items-center text-center relative z-10 backdrop-blur-sm overflow-hidden border border-white/20 bg-gradient-to-br ${feature.bgColor} hover:shadow-lg hover:shadow-${feature.iconColor}/10 transition-all duration-500`}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`relative bg-white p-4 rounded-full mb-6 shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 ${feature.iconColor}`}>
                  <feature.icon size={32} className={`${feature.iconColor} group-hover:text-wealth-teal transition-colors duration-300`} />
                  
                  {hoveredIndex === index && (
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      style={{ 
                        background: `radial-gradient(circle, ${feature.iconColor.includes('blue') ? '#3B82F6' : 
                          feature.iconColor.includes('teal') ? '#14B8A6' : 
                          feature.iconColor.includes('amber') ? '#F59E0B' : '#8B5CF6'} 0%, transparent 70%)` 
                      }}
                    />
                  )}
                </div>
                
                <h3 className="font-serif text-xl font-semibold mb-3 text-wealth-navy">{feature.title}</h3>
                <p className="text-wealth-gray mb-4 flex-grow">{feature.description}</p>
                
                {feature.link && (
                  <Link to={feature.link} className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 border border-wealth-navy/20 hover:bg-wealth-navy hover:text-white group-hover:scale-105 transition-all"
                    >
                      {feature.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
