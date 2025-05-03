
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FundHoldingsProps {
  fund: any; // Using any for now, would define a proper type in a real project
}

const FundHoldings: React.FC<FundHoldingsProps> = ({ fund }) => {
  const [viewMode, setViewMode] = useState<'stocks' | 'sectors'>('stocks');
  
  // Sample data - in a real app, this would come from the API
  const topHoldings = fund.topHoldings || [
    { name: "HDFC Bank", allocation: 9.8, sector: "Financial Services" },
    { name: "ICICI Bank", allocation: 8.5, sector: "Financial Services" },
    { name: "Reliance Industries", allocation: 7.2, sector: "Oil & Gas" },
    { name: "Infosys", allocation: 6.5, sector: "Information Technology" },
    { name: "TCS", allocation: 5.8, sector: "Information Technology" },
    { name: "Axis Bank", allocation: 4.2, sector: "Financial Services" },
    { name: "Larsen & Toubro", allocation: 3.9, sector: "Construction" },
    { name: "Bharti Airtel", allocation: 3.5, sector: "Telecom" },
    { name: "HUL", allocation: 3.2, sector: "Consumer Goods" },
    { name: "SBI", allocation: 2.8, sector: "Financial Services" }
  ];

  const sectorAllocations = fund.sectorAllocations || [
    { name: "Financial Services", value: 28.5 },
    { name: "Information Technology", value: 14.3 },
    { name: "Oil & Gas", value: 9.2 },
    { name: "Consumer Goods", value: 8.7 },
    { name: "Automobiles", value: 7.5 },
    { name: "Construction", value: 6.9 },
    { name: "Pharma", value: 6.2 },
    { name: "Telecom", value: 4.8 },
    { name: "Others", value: 13.9 }
  ];

  const assetAllocation = fund.assetAllocation || [
    { name: "Equity", value: 94.5 },
    { name: "Cash & Equivalents", value: 3.5 },
    { name: "Debt", value: 2 }
  ];

  // Colors for the pie charts
  const SECTOR_COLORS = [
    '#0A2342', '#2CA6A4', '#D4AF37', '#8B5CF6', '#1E293B', 
    '#3CAEA3', '#F2D024', '#8E9196', '#E5DEFF', '#FDE1D3'
  ];
  
  const ASSET_COLORS = ['#2CA6A4', '#D4AF37', '#8B5CF6'];
  
  return (
    <div className="space-y-6">
      {/* Holdings View Toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md border p-1 bg-wealth-light">
          <button 
            onClick={() => setViewMode('stocks')} 
            className={`px-3 py-1.5 text-sm rounded-sm ${viewMode === 'stocks' ? 'bg-white shadow-sm' : ''}`}
          >
            Top Stocks
          </button>
          <button 
            onClick={() => setViewMode('sectors')} 
            className={`px-3 py-1.5 text-sm rounded-sm ${viewMode === 'sectors' ? 'bg-white shadow-sm' : ''}`}
          >
            Sector Allocation
          </button>
        </div>
      </div>

      {viewMode === 'stocks' ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top 10 Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Stock</th>
                      <th className="text-left py-3 px-2 font-medium">Sector</th>
                      <th className="text-right py-3 px-2 font-medium">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topHoldings.map((holding, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{holding.name}</td>
                        <td className="py-3 px-2 text-wealth-gray">{holding.sector}</td>
                        <td className="py-3 px-2 text-right font-medium">{holding.allocation}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-wealth-gray mt-4">
                Total allocation in top 10 holdings: {topHoldings.reduce((sum, item) => sum + item.allocation, 0).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorAllocations}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {sectorAllocations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ASSET_COLORS[index % ASSET_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Asset Breakdown Card for Stocks View */}
      {viewMode === 'stocks' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asset Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ASSET_COLORS[index % ASSET_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="bg-wealth-light rounded-lg p-4 mt-4">
        <p className="text-sm text-wealth-gray">
          <span className="font-medium text-wealth-navy">Note:</span> Portfolio composition data as of {fund.asOfDate || '30 Apr 2024'}. Holdings and allocations are subject to change.
        </p>
      </div>
    </div>
  );
};

export default FundHoldings;
