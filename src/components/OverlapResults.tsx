
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OverlapResultsProps {
  data: {
    overlapPercentages: { [key: string]: number };
    overlapStocks: any[];
    fundPairs: string[][];
    fundNames: { [key: string]: string };
  };
}

const OverlapResults: React.FC<OverlapResultsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>("summary");

  const handleExport = () => {
    // In a real app, implement PDF/CSV export functionality
    alert("Export functionality would generate a PDF/CSV file");
  };
  
  // Prepare data for the bar chart
  const barChartData = data.fundPairs.map(pair => {
    const key = `${pair[0]}-${pair[1]}`;
    return {
      name: `${data.fundNames[pair[0]].split(' ').slice(0, 2).join(' ')} & ${data.fundNames[pair[1]].split(' ').slice(0, 2).join(' ')}`,
      overlap: data.overlapPercentages[key] || 0,
    };
  });
  
  // Prepare data for the Venn diagram (using a Pie chart as substitute)
  const pieData = [
    { name: 'Overlap', value: data.overlapPercentages[Object.keys(data.overlapPercentages)[0]] || 0 },
    { name: 'Unique Holdings', value: 100 - (data.overlapPercentages[Object.keys(data.overlapPercentages)[0]] || 0) }
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-wealth-navy">Overlap Analysis Results</h2>
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-1">
            <Download size={16} /> Export
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="holdings">Common Holdings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <p className="font-medium text-amber-800">
                {Object.values(data.overlapPercentages)[0] > 30 
                  ? "High overlap detected. Consider diversifying your portfolio with funds that have less overlapping holdings."
                  : "Good diversification. Your selected funds have acceptable overlap levels."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Overlap Summary</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fund Combination</TableHead>
                      <TableHead className="text-right">Overlap %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.fundPairs.map((pair, idx) => {
                      const key = `${pair[0]}-${pair[1]}`;
                      return (
                        <TableRow key={idx}>
                          <TableCell>{data.fundNames[pair[0]]} & {data.fundNames[pair[1]]}</TableCell>
                          <TableCell className="text-right">
                            <span className={`font-medium ${data.overlapPercentages[key] > 30 ? 'text-red-600' : 'text-green-600'}`}>
                              {data.overlapPercentages[key].toFixed(2)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Key Insights</h3>
                <ul className="list-disc pl-5 space-y-2 text-wealth-gray">
                  <li>You have <strong>{data.overlapStocks.length}</strong> overlapping stocks across selected funds.</li>
                  <li>
                    {Object.values(data.overlapPercentages)[0] > 30 
                      ? "High overlap suggests you might be paying management fees for similar investments."
                      : "Your funds appear to be well-diversified with minimal redundancy."}
                  </li>
                  <li>Consider funds with complementary sector exposures for better diversification.</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualizations">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Overlap Percentage</h3>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      overlap: {
                        color: '#0088FE',
                      },
                      unique: {
                        color: '#00C49F',
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="overlap" fill="#0088FE" name="Overlap %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Portfolio Composition</h3>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      overlap: {
                        theme: {
                          light: '#0088FE',
                          dark: '#0088FE', 
                        },
                        label: 'Overlapping Holdings',
                      },
                      unique: {
                        theme: {
                          light: '#00C49F',
                          dark: '#00C49F',
                        },
                        label: 'Unique Holdings',
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="holdings">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Common Holdings</h3>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      {Object.values(data.fundNames).map((name, idx) => (
                        <TableHead key={idx} className="text-right">{name.split(' ').slice(0, 2).join(' ')} (%)</TableHead>
                      ))}
                      <TableHead className="text-right">Sector</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.overlapStocks.map((stock, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{stock.name}</TableCell>
                        {Object.keys(data.fundNames).map((fundId, idx) => (
                          <TableCell key={idx} className="text-right">
                            {stock.allocations[fundId] ? stock.allocations[fundId].toFixed(2) : "-"}
                          </TableCell>
                        ))}
                        <TableCell className="text-right">{stock.sector}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-medium text-wealth-navy mb-4">Tips for Better Diversification</h3>
        <ul className="list-disc pl-5 space-y-3 text-wealth-gray">
          <li>
            <span className="font-medium">Aim for low overlap:</span> A well-diversified portfolio typically has less than 20% overlap between funds.
          </li>
          <li>
            <span className="font-medium">Consider complementary sectors:</span> Choose funds that focus on different market segments or industries.
          </li>
          <li>
            <span className="font-medium">Mix investment styles:</span> Combine growth, value, and blend approaches to diversify your strategy.
          </li>
          <li>
            <span className="font-medium">Geographical diversification:</span> Include funds that invest in different regions or countries.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverlapResults;
