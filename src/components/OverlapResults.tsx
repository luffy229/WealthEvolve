
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Download, ChartPie, BarChart as BarChartIcon, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  // Set animation complete state immediately
  useEffect(() => {
    setAnimationComplete(true);
    
    // Log data to console for debugging
    console.log("OverlapResults rendered with data:", data);
    
    // This component should stay mounted as long as data is provided
    return () => {
      console.log("OverlapResults unmounting");
    };
  }, [data]);
  
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

  // Function to generate risk level badge
  const getRiskBadge = (overlapPercentage: number) => {
    if (overlapPercentage > 30) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk
        </Badge>
      );
    } else if (overlapPercentage > 15) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Moderate Risk
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Low Risk
        </Badge>
      );
    }
  };

  return (
    <div id="overlap-results" className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-wealth-navy flex items-center">
            <ChartPie className="mr-2 text-wealth-teal" /> 
            Overlap Analysis Results
          </h2>
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-1 bg-wealth-light hover:bg-wealth-light/80">
            <Download size={16} /> Export
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary" className="data-[state=active]:bg-wealth-navy data-[state=active]:text-white">Summary</TabsTrigger>
            <TabsTrigger value="visualizations" className="data-[state=active]:bg-wealth-navy data-[state=active]:text-white">Visualizations</TabsTrigger>
            <TabsTrigger value="holdings" className="data-[state=active]:bg-wealth-navy data-[state=active]:text-white">Common Holdings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6 animate-fade-in">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <p className="font-medium text-amber-800 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {Object.values(data.overlapPercentages)[0] > 30 
                  ? "High overlap detected. Consider diversifying your portfolio with funds that have less overlapping holdings."
                  : "Good diversification. Your selected funds have acceptable overlap levels."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-300">
                <h3 className="font-medium mb-3 flex items-center">
                  <BarChartIcon className="mr-2 h-4 w-4 text-wealth-teal" />
                  Overlap Summary
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fund Combination</TableHead>
                      <TableHead className="text-right">Overlap %</TableHead>
                      <TableHead className="text-right">Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.fundPairs.map((pair, idx) => {
                      const key = `${pair[0]}-${pair[1]}`;
                      const overlapPercentage = data.overlapPercentages[key] || 0;
                      return (
                        <TableRow key={idx}>
                          <TableCell>{data.fundNames[pair[0]]} & {data.fundNames[pair[1]]}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Progress 
                                value={overlapPercentage} 
                                className={cn("w-24 h-2", {
                                  "bg-slate-200": true,
                                })}
                                color={overlapPercentage > 30 ? "bg-red-500" : overlapPercentage > 15 ? "bg-amber-500" : "bg-green-500"}
                              />
                              <span className={`font-medium ${overlapPercentage > 30 ? 'text-red-600' : overlapPercentage > 15 ? 'text-amber-600' : 'text-green-600'}`}>
                                {overlapPercentage.toFixed(2)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {getRiskBadge(overlapPercentage)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-300">
                <h3 className="font-medium mb-3 flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-wealth-teal" />
                  Key Insights
                </h3>
                <div className="mb-4">
                  <div className="text-xl font-bold mb-2 text-wealth-navy">
                    {data.overlapStocks.length}
                    <span className="text-sm text-wealth-teal ml-1">overlapping stocks</span>
                  </div>
                  
                  {Object.values(data.overlapPercentages)[0] > 0 && (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-wealth-light to-white mb-4">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="text-xs text-wealth-gray uppercase">Top Overlapping Stocks</div>
                        <div className="text-xs text-wealth-gray uppercase text-right">Weight</div>
                      </div>
                      {data.overlapStocks.slice(0, 3).map((stock, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-t border-gray-100">
                          <span className="font-medium">{stock.name}</span>
                          <span className="text-wealth-teal">{(Object.values(stock.allocations)[0] as number).toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <ul className="list-disc pl-5 space-y-2 text-wealth-gray">
                  <li>
                    {Object.values(data.overlapPercentages)[0] > 30 
                      ? <span className="text-red-600 font-medium">High overlap suggests you might be paying management fees for similar investments.</span>
                      : <span className="text-green-600 font-medium">Your funds appear to be well-diversified with minimal redundancy.</span>}
                  </li>
                  <li>
                    Consider funds with complementary sector exposures for better diversification.
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualizations" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-300">
                <h3 className="font-medium mb-3 flex items-center">
                  <BarChartIcon className="mr-2 h-4 w-4 text-wealth-teal" />
                  Overlap Percentage
                </h3>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      overlap: {
                        color: '#8B5CF6',
                        label: 'Overlap %'
                      },
                      unique: {
                        color: '#00C49F',
                        label: 'Unique %'
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="overlap" fill="#8B5CF6" name="overlap" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-300">
                <h3 className="font-medium mb-3 flex items-center">
                  <ChartPie className="mr-2 h-4 w-4 text-wealth-teal" />
                  Portfolio Composition
                </h3>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      Overlap: {
                        color: '#0088FE',
                        label: 'Overlapping Holdings',
                      },
                      'Unique Holdings': {
                        color: '#00C49F',
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
          
          <TabsContent value="holdings" className="animate-fade-in">
            <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-300">
              <h3 className="font-medium mb-3 flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-wealth-teal" />
                Common Holdings
              </h3>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
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
                      <TableRow key={idx} className="hover:bg-wealth-light/30 transition-colors duration-150">
                        <TableCell className="font-medium">{stock.name}</TableCell>
                        {Object.keys(data.fundNames).map((fundId, idx) => (
                          <TableCell key={idx} className="text-right">
                            {stock.allocations[fundId] ? (
                              <span className="relative">
                                <span className="absolute inset-y-0 left-0 h-full bg-wealth-teal/20" style={{ width: `${stock.allocations[fundId] * 3}%` }}></span>
                                <span className="relative z-10">
                                  {stock.allocations[fundId] ? stock.allocations[fundId].toFixed(2) : "-"}
                                </span>
                              </span>
                            ) : "-"}
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-gray-100">
                            {stock.sector}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-gradient-to-r from-wealth-navy/5 to-wealth-teal/5 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        <h3 className="text-lg font-medium text-wealth-navy mb-4 flex items-center">
          <TrendingUp className="mr-2 text-wealth-teal" />
          Tips for Better Diversification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="list-none space-y-3 text-wealth-gray">
            <li className="flex items-start animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-wealth-teal text-white mr-2 mt-0.5 shrink-0">1</div>
              <div>
                <span className="font-medium text-wealth-navy">Aim for low overlap:</span> A well-diversified portfolio typically has less than 20% overlap between funds.
              </div>
            </li>
            <li className="flex items-start animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-wealth-teal text-white mr-2 mt-0.5 shrink-0">2</div>
              <div>
                <span className="font-medium text-wealth-navy">Consider complementary sectors:</span> Choose funds that focus on different market segments or industries.
              </div>
            </li>
          </ul>
          <ul className="list-none space-y-3 text-wealth-gray">
            <li className="flex items-start animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-wealth-teal text-white mr-2 mt-0.5 shrink-0">3</div>
              <div>
                <span className="font-medium text-wealth-navy">Mix investment styles:</span> Combine growth, value, and blend approaches to diversify your strategy.
              </div>
            </li>
            <li className="flex items-start animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-wealth-teal text-white mr-2 mt-0.5 shrink-0">4</div>
              <div>
                <span className="font-medium text-wealth-navy">Geographical diversification:</span> Include funds that invest in different regions or countries.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverlapResults;
