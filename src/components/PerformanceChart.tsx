
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

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
  
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <section id="performance" className="section-padding">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-wealth-navy mb-4">Performance & Proof</h2>
          <p className="text-wealth-gray text-lg">
            Our data-driven strategies consistently outperform traditional investment approaches, delivering superior returns over time.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <Button 
                variant={timeFrame === '1Y' ? 'default' : 'outline'} 
                className={timeFrame === '1Y' ? 'bg-wealth-navy' : 'border-wealth-navy text-wealth-navy'} 
                onClick={() => handleTimeFrameChange('1Y')}
              >
                1 Year
              </Button>
              <Button 
                variant={timeFrame === '3Y' ? 'default' : 'outline'} 
                className={timeFrame === '3Y' ? 'bg-wealth-navy' : 'border-wealth-navy text-wealth-navy'} 
                onClick={() => handleTimeFrameChange('3Y')}
              >
                3 Years
              </Button>
              <Button 
                variant={timeFrame === '5Y' ? 'default' : 'outline'} 
                className={timeFrame === '5Y' ? 'bg-wealth-navy' : 'border-wealth-navy text-wealth-navy'} 
                onClick={() => handleTimeFrameChange('5Y')}
              >
                5 Years
              </Button>
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-sm text-wealth-gray">Compare with traditional investing</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={showComparison} onChange={() => setShowComparison(!showComparison)} className="sr-only" />
                <div className={`w-11 h-6 ${showComparison ? 'bg-wealth-teal' : 'bg-gray-200'} rounded-full peer transition-colors`}>
                  <div className={`absolute w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform ${showComparison ? 'translate-x-5' : ''}`}></div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData[timeFrame]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, undefined]} 
                  labelFormatter={(label) => `Period: ${label}`}
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb' }}
                />
                <Line
                  type="monotone"
                  dataKey="wealthEvolve"
                  name="WealthEvolve"
                  stroke="#2CA6A4"
                  strokeWidth={3}
                  dot={{ fill: '#2CA6A4', strokeWidth: 2, r: 4 }}
                  activeDot={{ fill: '#2CA6A4', strokeWidth: 0, r: 6 }}
                  className="animate-chart-line"
                  strokeDasharray="1000"
                />
                {showComparison && (
                  <Line
                    type="monotone"
                    dataKey="traditional"
                    name="Traditional"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: '#6B7280', strokeWidth: 0, r: 6 }}
                    strokeDasharray="5 5"
                    className="animate-chart-line"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-wealth-gold">
            <h4 className="font-serif text-xl font-semibold mb-2 text-wealth-navy">Superior Returns</h4>
            <p className="text-wealth-gray">Our portfolios have consistently delivered 15%+ XIRR over the last 5 years.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-wealth-teal">
            <h4 className="font-serif text-xl font-semibold mb-2 text-wealth-navy">Lower Volatility</h4>
            <p className="text-wealth-gray">Risk-adjusted returns with 30% lower volatility than benchmark indices.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-wealth-navy">
            <h4 className="font-serif text-xl font-semibold mb-2 text-wealth-navy">Tax Efficiency</h4>
            <p className="text-wealth-gray">Smart tax planning incorporated into all investment strategies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceChart;
