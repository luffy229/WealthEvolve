
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, Calendar } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface FundPerformanceProps {
  fund: any; // Using any for now, would define a proper type in a real project
}

const FundPerformance: React.FC<FundPerformanceProps> = ({ fund }) => {
  const [chartType, setChartType] = useState<'nav' | 'returns'>('nav');
  
  // Sample data - in a real app, this would come from the API
  const navHistory = fund.navHistory || [
    { date: 'Jan 2023', nav: 10.50 },
    { date: 'Feb 2023', nav: 10.75 },
    { date: 'Mar 2023', nav: 10.25 },
    { date: 'Apr 2023', nav: 11.00 },
    { date: 'May 2023', nav: 11.50 },
    { date: 'Jun 2023', nav: 11.25 },
    { date: 'Jul 2023', nav: 12.00 },
    { date: 'Aug 2023', nav: 12.50 },
    { date: 'Sep 2023', nav: 12.75 },
    { date: 'Oct 2023', nav: 13.00 },
    { date: 'Nov 2023', nav: 13.25 },
    { date: 'Dec 2023', nav: 13.50 },
    { date: 'Jan 2024', nav: 14.00 },
    { date: 'Feb 2024', nav: 14.50 },
    { date: 'Mar 2024', nav: 15.00 },
    { date: 'Apr 2024', nav: 15.50 },
  ];

  const yearlyReturns = fund.yearlyReturns || [
    { year: '2019', returns: 12.5, benchmarkReturns: 10.2 },
    { year: '2020', returns: -5.2, benchmarkReturns: -7.5 },
    { year: '2021', returns: 18.7, benchmarkReturns: 16.3 },
    { year: '2022', returns: 9.4, benchmarkReturns: 8.1 },
    { year: '2023', returns: 15.6, benchmarkReturns: 14.2 },
    { year: 'YTD', returns: 5.8, benchmarkReturns: 4.9 },
  ];

  const performanceData = {
    '1Y': fund.performance?.['1Y'] || 0,
    '3Y': fund.performance?.['3Y'] || 0,
    '5Y': fund.performance?.['5Y'] || 0,
    'YTD': fund.performance?.YTD || 0,
  };

  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  
  return (
    <div className="space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(performanceData).map(([period, value]) => (
          <Card key={period} className={`${value > 0 ? 'border-green-100' : 'border-red-100'}`}>
            <CardContent className="p-4">
              <p className="text-wealth-gray text-sm">{period} Return</p>
              <p className={`text-xl font-bold mt-1 ${value > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatPercentage(value)}
              </p>
              {period !== 'YTD' && (
                <p className="text-xs text-wealth-gray mt-1">
                  vs {formatPercentage(value * 0.9)} benchmark
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Toggles */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md border p-1 bg-wealth-light">
          <button 
            onClick={() => setChartType('nav')} 
            className={`px-3 py-1.5 text-sm rounded-sm ${chartType === 'nav' ? 'bg-white shadow-sm' : ''}`}
          >
            NAV History
          </button>
          <button 
            onClick={() => setChartType('returns')} 
            className={`px-3 py-1.5 text-sm rounded-sm ${chartType === 'returns' ? 'bg-white shadow-sm' : ''}`}
          >
            Yearly Returns
          </button>
        </div>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {chartType === 'nav' ? 'NAV History' : 'Yearly Returns vs Benchmark'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {chartType === 'nav' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={navHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'NAV']} />
                  <Line 
                    type="monotone" 
                    dataKey="nav" 
                    stroke="#0A2342" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={1500}
                    className="animate-chart-line"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(tick) => `${tick}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="returns" name="Fund Returns" fill="#2CA6A4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmarkReturns" name="Benchmark" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* CAGR & Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CAGR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Since Inception</span>
                <span className="font-bold">{formatPercentage(fund.cagr?.sinceInception || 12.5)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>3 Year</span>
                <span className="font-bold">{formatPercentage(fund.cagr?.['3Y'] || 10.2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>5 Year</span>
                <span className="font-bold">{formatPercentage(fund.cagr?.['5Y'] || 11.7)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fund Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Launch Date</span>
                <span>{fund.launchDate || '15 Jan 2010'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fund Manager</span>
                <span>{fund.fundManager || 'Sanjay Kumar'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Benchmark</span>
                <span>{fund.benchmark || 'NIFTY 50 TRI'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundPerformance;
