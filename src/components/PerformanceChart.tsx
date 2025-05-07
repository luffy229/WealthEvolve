import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, BarChart2, Shield } from 'lucide-react';

const performanceData = {
  '1Y': [
    { month: 'Jan', wealthEvolve: 10.2, traditional: 7.1 },
    { month: 'Feb', wealthEvolve: 11.5, traditional: 7.3 },
    { month: 'Mar', wealthEvolve: 10.8, traditional: 7.0 },
    { month: 'Apr', wealthEvolve: 12.3, traditional: 7.2 },
    { month: 'May', wealthEvolve: 13.1, traditional: 7.5 },
    { month: 'Jun', wealthEvolve: 14.2, traditional: 7.8 },
    { month: 'Jul', wealthEvolve: 15.0, traditional: 8.0 },
    { month: 'Aug', wealthEvolve: 14.5, traditional: 7.9 },
    { month: 'Sep', wealthEvolve: 15.8, traditional: 8.1 },
    { month: 'Oct', wealthEvolve: 16.2, traditional: 8.3 },
    { month: 'Nov', wealthEvolve: 16.5, traditional: 8.5 },
    { month: 'Dec', wealthEvolve: 17.2, traditional: 8.7 },
  ],
  '3Y': [
    { month: '2023', wealthEvolve: 17.2, traditional: 8.7 },
    { month: '2022', wealthEvolve: 15.8, traditional: 8.1 },
    { month: '2021', wealthEvolve: 14.5, traditional: 7.5 }
  ],
  '5Y': [
    { month: '2023', wealthEvolve: 17.2, traditional: 8.7 },
    { month: '2022', wealthEvolve: 15.8, traditional: 8.1 },
    { month: '2021', wealthEvolve: 14.5, traditional: 7.5 },
    { month: '2020', wealthEvolve: 13.2, traditional: 7.0 },
    { month: '2019', wealthEvolve: 12.8, traditional: 6.5 }
  ]
};

type TimeFrame = '1Y' | '3Y' | '5Y';

const PerformanceChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1Y');
  const [showComparison, setShowComparison] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [highlightedMonth, setHighlightedMonth] = useState<string | null>(null);
  
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
    setChartLoaded(false);
    setTimeout(() => setChartLoaded(true), 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate the highest and lowest values
  const highestValue = Math.max(...performanceData[timeFrame].map(item => item.wealthEvolve));
  const lowestValue = Math.min(...performanceData[timeFrame].map(item => item.traditional || item.wealthEvolve));

  // Custom tooltip content renderer
  const customTooltipContent = (props: any) => {
    const { active, payload, label } = props;
    
    if (active && payload && payload.length) {
      // Update the highlighted month when tooltip is active
      if (highlightedMonth !== label) {
        setHighlightedMonth(label);
      }
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-wealth-navy">{`Period: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Handle tooltip hide
  const handleMouseLeave = () => {
    setHighlightedMonth(null);
  };

  return (
    <section id="performance" className="section-padding py-24 bg-gradient-to-b from-white to-wealth-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-32 -right-32 w-[400px] h-[400px] text-wealth-teal/5">
          <path fill="currentColor" d="M38.9,-66.7C51.1,-60,62.3,-51.5,69.8,-40.1C77.2,-28.7,80.9,-14.4,79.8,-0.7C78.6,13,72.6,25.9,64.7,38C56.8,50,47.1,61.1,35.4,67.3C23.8,73.4,11.9,74.5,-0.2,74.9C-12.4,75.2,-24.8,74.8,-36.9,70.6C-49.1,66.5,-60.9,58.7,-68.1,47.6C-75.3,36.6,-77.9,22.4,-78.6,8.3C-79.4,-5.7,-78.3,-19.7,-72.8,-32.2C-67.3,-44.6,-57.4,-55.5,-45.4,-62.3C-33.4,-69.1,-19.2,-71.9,-4.1,-65.9C10.9,-59.9,26.7,-73.3,38.9,-66.7Z" transform="translate(100 100)" />
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-16 -left-16 w-[300px] h-[300px] text-wealth-navy/5">
          <path fill="currentColor" d="M45,-77.3C59.2,-69,72.5,-59.2,79.8,-45.8C87.1,-32.5,88.3,-15.7,86.1,-0.3C84,15.2,78.5,29.8,70.4,43.1C62.2,56.3,51.3,68.2,38,76.3C24.8,84.5,9.9,89,0.3,88.5C-9.3,88.1,-18.6,82.9,-27.9,76.5C-37.1,70.1,-46.2,62.7,-54.3,54C-62.3,45.3,-69.1,35.5,-72.5,25.3C-76,15,-76,-0.3,-72.6,-14.2C-69.2,-28.2,-62.4,-40.8,-52.3,-51C-42.2,-61.1,-28.6,-68.7,-14.6,-70C-0.6,-71.3,30.8,-85.5,45,-77.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="wealth-container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 text-wealth-navy mb-4 font-serif text-5xl font-bold relative inline-block">
            Performance 
            <span className="text-wealth-gold">&</span> 
            <span className="relative ml-2">
              Proof
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C45.6228 5.66667 156.123 -4 198 12" stroke="#2CA6A4" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <motion.p 
            className="text-wealth-gray text-lg mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our data-driven strategies consistently outperform traditional investment approaches, 
            delivering superior returns over time.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="flex space-x-2 mb-4 md:mb-0">
              {['1Y', '3Y', '5Y'].map((period) => (
                <Button 
                  key={period}
                  variant={timeFrame === period ? 'default' : 'outline'} 
                  className={`${timeFrame === period 
                    ? 'bg-wealth-navy shadow-lg shadow-wealth-navy/20' 
                    : 'border-wealth-navy text-wealth-navy'} transition-all`} 
                  onClick={() => handleTimeFrameChange(period as TimeFrame)}
                >
                  {period === '1Y' ? '1 Year' : period === '3Y' ? '3 Years' : '5 Years'}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-sm text-wealth-gray">Compare with traditional investing</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={showComparison} onChange={() => setShowComparison(!showComparison)} className="sr-only" />
                <div className={`w-11 h-6 ${showComparison ? 'bg-wealth-teal' : 'bg-gray-200'} rounded-full peer transition-colors`}>
                  <div className={`absolute w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform ${showComparison ? 'translate-x-5' : ''} shadow-md`}></div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="h-80 relative" onMouseLeave={handleMouseLeave}>
            {chartLoaded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData[timeFrame]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="wealthEvolveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2CA6A4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2CA6A4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6B7280" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6B7280" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis 
                      stroke="#6B7280" 
                      tickFormatter={(value) => `${value}%`}
                      domain={[lowestValue * 0.8, highestValue * 1.2]}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, undefined]} 
                      labelFormatter={(label) => `Period: ${label}`}
                      content={customTooltipContent}
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        borderColor: '#e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="wealthEvolve"
                      name="WealthEvolve"
                      stroke="#2CA6A4"
                      strokeWidth={3}
                      fill="url(#wealthEvolveGradient)"
                      activeDot={{ 
                        r: 8, 
                        fill: '#2CA6A4', 
                        stroke: '#fff', 
                        strokeWidth: 2,
                      }}
                      className="animate-chart-line"
                    />
                    {showComparison && (
                      <Area
                        type="monotone"
                        dataKey="traditional"
                        name="Traditional"
                        stroke="#6B7280"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="url(#traditionalGradient)"
                        dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: '#6B7280', strokeWidth: 0, r: 6 }}
                        className="animate-chart-line"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wealth-teal"></div>
              </div>
            )}
            
            {/* Performance highlight */}
            {highlightedMonth && (
              <motion.div 
                className="absolute top-4 right-4 bg-wealth-navy/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-wealth-navy/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-wealth-gold" />
                  Outperforming market by 
                  <span className="font-bold ml-1 text-wealth-teal">
                    {
                      (performanceData[timeFrame].find(d => d.month === highlightedMonth)?.wealthEvolve || 0) - 
                      (performanceData[timeFrame].find(d => d.month === highlightedMonth)?.traditional || 0)
                    }%
                  </span>
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="flex justify-center mt-6 gap-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-wealth-teal rounded-full mr-2"></div>
              <span className="text-wealth-gray text-sm">WealthEvolve Portfolio</span>
            </div>
            {showComparison && (
              <div className="flex items-center">
                <div className="w-4 h-4 bg-wealth-gray rounded-full mr-2"></div>
                <span className="text-wealth-gray text-sm">Traditional Investment</span>
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Superior Returns",
              description: "Our portfolios have consistently delivered 15%+ XIRR over the last 5 years.",
              color: "wealth-gold",
              icon: TrendingUp
            },
            {
              title: "Lower Volatility",
              description: "Risk-adjusted returns with 30% lower volatility than benchmark indices.",
              color: "wealth-teal",
              icon: BarChart2
            },
            {
              title: "Tax Efficiency",
              description: "Smart tax planning incorporated into all investment strategies.",
              color: "wealth-navy",
              icon: Shield
            }
          ].map((card, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300 group"
              style={{ borderLeftColor: `var(--${card.color})` }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <card.icon className={`h-8 w-8 text-${card.color}`} />
              </div>
              <h4 className="font-serif text-xl font-semibold mb-2 text-wealth-navy flex items-center">
                {card.title}
                <motion.span 
                  className="inline-block ml-1"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <ArrowUpRight size={16} className={`text-${card.color}`} />
                </motion.span>
              </h4>
              <p className="text-wealth-gray">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceChart;
