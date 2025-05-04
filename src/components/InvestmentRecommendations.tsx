
import React, { useState } from 'react';
import { QuestionnaireResult } from '@/pages/InvestmentAnalyzer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChartContainer, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { RefreshCw, Download, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, Share2 } from 'lucide-react';

interface InvestmentRecommendationsProps {
  results: QuestionnaireResult;
  onRestart: () => void;
}

// Define portfolio distribution based on risk tolerance
const getPortfolioDistribution = (riskTolerance: number) => {
  // Lower risk tolerance = more bonds, less equity
  // Higher risk tolerance = more equity, less bonds
  const equity = 30 + (riskTolerance * 5); // 35-80%
  const bonds = 100 - equity - 10; // 10-55%
  const alternatives = 10; // Fixed 10% for alternatives
  
  return [
    { name: 'Equity', value: equity, color: '#2C9CDA' },
    { name: 'Bonds', value: bonds, color: '#4CAF50' },
    { name: 'Alternatives', value: alternatives, color: '#FFC107' },
  ];
};

// Get recommended funds based on results
const getRecommendedFunds = (results: QuestionnaireResult) => {
  // This would normally come from a more sophisticated algorithm
  // Here we're using a simpler approach for demonstration
  
  // Base recommendations on risk tolerance
  let funds = [];
  
  if (results.riskTolerance <= 3) {
    funds = [
      { name: "Low Volatility Fund", allocation: 25, type: "Equity - Low Volatility", cagr: 8.5, risk: "Low", id: "LVF101" },
      { name: "Government Bond Fund", allocation: 40, type: "Debt - Government", cagr: 6.2, risk: "Very Low", id: "GBF155" },
      { name: "Corporate Bond Fund", allocation: 25, type: "Debt - Corporate", cagr: 7.0, risk: "Low", id: "CBF234" },
      { name: "Gold ETF", allocation: 10, type: "Alternative", cagr: 9.1, risk: "Medium", id: "GETF56" },
    ];
  } else if (results.riskTolerance <= 6) {
    funds = [
      { name: "Balanced Advantage Fund", allocation: 30, type: "Hybrid", cagr: 10.5, risk: "Medium", id: "BAF123" },
      { name: "Large Cap Index Fund", allocation: 25, type: "Equity - Large Cap", cagr: 12.0, risk: "Medium", id: "LCF456" },
      { name: "Short Term Bond Fund", allocation: 30, type: "Debt - Short Term", cagr: 7.5, risk: "Low", id: "STB789" },
      { name: "REITs Index", allocation: 15, type: "Alternative", cagr: 8.5, risk: "Medium-High", id: "REI567" },
    ];
  } else {
    funds = [
      { name: "Multi Cap Fund", allocation: 40, type: "Equity - Multi Cap", cagr: 14.5, risk: "High", id: "MCF989" },
      { name: "Mid & Small Cap Fund", allocation: 25, type: "Equity - Mid & Small", cagr: 16.0, risk: "Very High", id: "MSC876" },
      { name: "Focused Equity Fund", allocation: 15, type: "Equity - Focused", cagr: 15.0, risk: "High", id: "FEF432" },
      { name: "Corporate Bond Fund", allocation: 10, type: "Debt - Corporate", cagr: 7.0, risk: "Low", id: "CBF234" },
      { name: "Gold Fund", allocation: 10, type: "Alternative", cagr: 9.1, risk: "Medium", id: "GF951" },
    ];
  }
  
  // Further refine based on ESG preference
  if (results.esgPreference) {
    const esgFund = { name: "ESG Leaders Fund", allocation: 20, type: "Equity - ESG", cagr: 13.5, risk: "Medium-High", id: "ESG278" };
    
    // Reduce allocation from other funds to make room for ESG fund
    funds = funds.map(fund => ({
      ...fund,
      allocation: Math.floor(fund.allocation * 0.8)  // Reduce allocation by 20%
    }));
    
    // Ensure total allocation is 100%
    const currentTotal = funds.reduce((sum, fund) => sum + fund.allocation, 0);
    const esgAllocation = 100 - currentTotal;
    
    funds.push({
      ...esgFund,
      allocation: esgAllocation
    });
  }
  
  return funds;
};

// Generate projected returns over time
const generateProjections = (initialInvestment: number, monthlySip: number, years: number, expectedReturn: number) => {
  const data = [];
  let investment = initialInvestment;
  let wealth = initialInvestment;
  
  for (let year = 0; year <= years; year++) {
    const yearlyContribution = year > 0 ? monthlySip * 12 : 0;
    
    if (year > 0) {
      investment += yearlyContribution;
      wealth = (wealth * (1 + expectedReturn / 100)) + yearlyContribution;
    }
    
    data.push({
      year: `Year ${year}`,
      investment: Math.round(investment),
      wealth: Math.round(wealth),
    });
  }
  
  return data;
};

// Get a risk profiler assessment based on the questionnaire results
const getRiskProfile = (riskTolerance: number) => {
  if (riskTolerance <= 3) {
    return { 
      type: "Conservative", 
      description: "You prefer stability and income over growth. Your primary goal is to preserve capital while generating consistent returns."
    };
  } else if (riskTolerance <= 6) {
    return {
      type: "Moderate",
      description: "You seek a balance between growth and income, and are comfortable with a moderate level of risk to achieve your financial goals."
    };
  } else if (riskTolerance <= 8) {
    return {
      type: "Growth-oriented",
      description: "You prioritize long-term growth over short-term stability and are willing to accept higher volatility for potentially higher returns."
    };
  } else {
    return {
      type: "Aggressive",
      description: "You aim for maximum long-term growth and can tolerate significant market fluctuations and potential losses in pursuit of higher returns."
    };
  }
};

// Chart config for better visualization
const chartConfig = {
  equity: { 
    label: "Equity", 
    color: "#2C9CDA" 
  },
  bonds: { 
    label: "Bonds/Debt", 
    color: "#4CAF50" 
  },
  alternatives: { 
    label: "Alternatives", 
    color: "#FFC107" 
  },
  investment: {
    label: "Total Investment",
    color: "#8884d8"
  },
  wealth: {
    label: "Projected Value",
    color: "#82ca9d"
  }
};

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({ results, onRestart }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const portfolioDistribution = getPortfolioDistribution(results.riskTolerance);
  const recommendedFunds = getRecommendedFunds(results);
  const riskProfile = getRiskProfile(results.riskTolerance);
  
  // Calculate expected return based on portfolio distribution and investment horizon
  const baseExpectedReturn = 7 + (results.riskTolerance / 2); // 7-12% expected returns
  const timeHorizonMultiplier = results.investmentTimeframe === "short" ? 0.9 : 
                             results.investmentTimeframe === "medium" ? 1 : 1.1;
  const expectedReturn = baseExpectedReturn * timeHorizonMultiplier;
  
  // Project returns over time
  const projectionYears = results.investmentTimeframe === "short" ? 3 : 
                         results.investmentTimeframe === "medium" ? 7 : 15;
  
  const projectionData = generateProjections(
    results.initialInvestment,
    results.monthlyContribution,
    projectionYears,
    expectedReturn
  );
  
  // Asset allocation data
  const assetAllocationData = portfolioDistribution.map(item => ({
    name: item.name,
    value: item.value
  }));

  // Fund comparison data for bar chart
  const fundComparisonData = recommendedFunds.map(fund => ({
    name: fund.name,
    cagr: fund.cagr,
    allocation: fund.allocation
  }));

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Summary Card */}
      <Card className="mb-8 bg-gradient-wealth text-white overflow-hidden">
        <CardContent className="pt-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Your Investment Profile</h2>
              <div className="space-y-2">
                <p className="text-sm opacity-90">Risk Profile</p>
                <p className="text-xl font-medium">{riskProfile.type}</p>
                <p className="text-sm opacity-80">{riskProfile.description}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-90">Time Horizon</p>
                    <p className="text-lg font-medium capitalize">{results.investmentTimeframe} Term</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Expected Return</p>
                    <p className="text-lg font-medium">{expectedReturn.toFixed(1)}% p.a.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie 
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80} 
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {portfolioDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for more details */}
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid grid-cols-4 w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="projection">Projection</TabsTrigger>
            <TabsTrigger value="funds">Recommended Funds</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onRestart} className="flex gap-2 items-center">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Retake Questionnaire</span>
              <span className="inline md:hidden">Retake</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-2 items-center">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download Report</span>
              <span className="inline md:hidden">Download</span>
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Asset Allocation Strategy</CardTitle>
                <CardDescription>
                  Recommended distribution based on your risk profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ChartContainer
                    config={chartConfig}
                    className="w-full aspect-[4/3]"
                  >
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                      >
                        {portfolioDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={({ payload }) => {
                          if (payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center gap-1">
                                    <div 
                                      className="h-2 w-2 rounded"
                                      style={{ backgroundColor: payload[0].payload.fill || payload[0].color }}
                                    />
                                    <span className="font-medium">{payload[0].name}</span>
                                  </div>
                                  <div>{payload[0].value}%</div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ChartLegend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Projected Growth</CardTitle>
                <CardDescription>
                  Estimated growth over {projectionYears} years based on {expectedReturn.toFixed(1)}% annual returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      data={projectionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <ChartTooltip />
                      <Area 
                        type="monotone" 
                        dataKey="investment" 
                        name="Investment" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        stackId="1" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="wealth" 
                        name="Projected Value" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        stackId="2" 
                      />
                      <Legend />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recommended Funds</CardTitle>
              <CardDescription>Top fund recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2 pl-2">Fund Name</th>
                      <th className="text-left font-medium py-2">Type</th>
                      <th className="text-center font-medium py-2">Allocation %</th>
                      <th className="text-center font-medium py-2">Expected CAGR</th>
                      <th className="text-center font-medium py-2">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedFunds.map((fund, index) => (
                      <tr key={fund.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="py-3 pl-2">{fund.name}</td>
                        <td className="py-3">{fund.type}</td>
                        <td className="py-3 text-center">{fund.allocation}%</td>
                        <td className="py-3 text-center">{fund.cagr}%</td>
                        <td className="py-3 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs
                            ${fund.risk === 'Very Low' ? 'bg-green-100 text-green-800' : ''}
                            ${fund.risk === 'Low' ? 'bg-emerald-100 text-emerald-800' : ''}
                            ${fund.risk === 'Medium' ? 'bg-blue-100 text-blue-800' : ''}
                            ${fund.risk === 'Medium-High' ? 'bg-amber-100 text-amber-800' : ''}
                            ${fund.risk === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                            ${fund.risk === 'Very High' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {fund.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Asset Allocation Tab */}
        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Asset Allocation Breakdown</CardTitle>
                <CardDescription>
                  Detailed breakdown of your recommended portfolio allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={chartConfig}
                    className="w-full aspect-square"
                  >
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {portfolioDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                      <ChartLegend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why This Allocation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>This allocation is tailored to your {riskProfile.type.toLowerCase()} risk profile and {results.investmentTimeframe}-term investment horizon.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Equity: {portfolioDistribution[0].value}%</h4>
                    <p className="text-sm text-muted-foreground">
                      {portfolioDistribution[0].value >= 60 
                        ? "Higher equity allocation to maximize long-term growth potential."
                        : portfolioDistribution[0].value >= 40
                        ? "Balanced equity exposure for growth while managing volatility."
                        : "Conservative equity exposure to reduce portfolio volatility."}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Bonds: {portfolioDistribution[1].value}%</h4>
                    <p className="text-sm text-muted-foreground">
                      {portfolioDistribution[1].value >= 50 
                        ? "Higher bond allocation for income and stability."
                        : portfolioDistribution[1].value >= 30
                        ? "Moderate bond exposure to balance income and stability."
                        : "Lower bond allocation focused on higher-yielding debt instruments."}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Alternatives: {portfolioDistribution[2].value}%</h4>
                    <p className="text-sm text-muted-foreground">
                      Diversification through alternative investments like gold, REITs, and international funds to reduce correlation with traditional markets.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Allocation Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected Return (p.a.)</p>
                      <p className="text-xl font-medium text-wealth-navy">{expectedReturn.toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-xl font-medium text-wealth-navy">{riskProfile.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time Horizon</p>
                      <p className="text-xl font-medium text-wealth-navy capitalize">{results.investmentTimeframe}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tax Efficiency</p>
                      <p className="text-xl font-medium text-wealth-navy">
                        {portfolioDistribution[0].value >= 60 ? "Moderate" : "High"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Projection Tab */}
        <TabsContent value="projection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wealth Projection</CardTitle>
              <CardDescription>
                See how your investment of ₹{results.initialInvestment.toLocaleString()} initial and ₹{results.monthlyContribution.toLocaleString()}/month could grow over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={projectionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="investment" 
                      name="Total Investment" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wealth" 
                      name="Projected Value" 
                      stroke="#82ca9d" 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                  <p className="text-2xl font-medium text-wealth-navy">
                    ₹{projectionData[projectionData.length - 1].investment.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-muted-foreground mb-1">Projected Value</p>
                  <p className="text-2xl font-medium text-wealth-navy">
                    ₹{projectionData[projectionData.length - 1].wealth.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <p className="text-sm text-muted-foreground mb-1">Wealth Created</p>
                  <p className="text-2xl font-medium text-wealth-navy">
                    ₹{(projectionData[projectionData.length - 1].wealth - 
                        projectionData[projectionData.length - 1].investment).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Projection Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This projection is based on an expected annual return of {expectedReturn.toFixed(1)}%, 
                  which aligns with your {riskProfile.type.toLowerCase()} risk profile and 
                  the recommended asset allocation.
                </p>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Initial Investment</p>
                  <p className="text-sm text-muted-foreground">₹{results.initialInvestment.toLocaleString()}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Monthly SIP</p>
                  <p className="text-sm text-muted-foreground">₹{results.monthlyContribution.toLocaleString()}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Projection Period</p>
                  <p className="text-sm text-muted-foreground">{projectionYears} years</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Expected Annual Return</p>
                  <p className="text-sm text-muted-foreground">{expectedReturn.toFixed(1)}% p.a.</p>
                </div>
                
                <Separator />
                
                <p className="text-sm">
                  <strong>Note:</strong> These projections are for illustration purposes only. Actual returns may vary 
                  based on market conditions, fund performance, and other factors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Milestone Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[Math.floor(projectionYears * 0.25), Math.floor(projectionYears * 0.5), Math.floor(projectionYears * 0.75), projectionYears].map(year => {
                    if (year === 0) return null;
                    const yearData = projectionData[year];
                    return (
                      <div key={year} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <p className="font-medium">Year {year}</p>
                          <p className="text-sm text-muted-foreground">
                            {year <= 3 ? "Short term" : year <= 7 ? "Medium term" : "Long term"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{yearData.wealth.toLocaleString()}</p>
                          <p className="text-sm text-green-600">
                            +₹{(yearData.wealth - yearData.investment).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      Create Custom Goal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Funds Tab */}
        <TabsContent value="funds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fund Comparison</CardTitle>
              <CardDescription>
                Expected returns of recommended funds based on historical performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <BarChart
                    data={fundComparisonData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="cagr" name="Expected CAGR (%)" fill="#8884d8" />
                    <Bar dataKey="allocation" name="Allocation (%)" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-4">
            {recommendedFunds.map((fund) => (
              <Card key={fund.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="font-medium text-lg">{fund.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{fund.type}</p>
                      <div className="flex items-center gap-1">
                        <div className={`px-2 py-1 text-xs rounded
                          ${fund.risk === 'Very Low' ? 'bg-green-100 text-green-800' : ''}
                          ${fund.risk === 'Low' ? 'bg-emerald-100 text-emerald-800' : ''}
                          ${fund.risk === 'Medium' ? 'bg-blue-100 text-blue-800' : ''}
                          ${fund.risk === 'Medium-High' ? 'bg-amber-100 text-amber-800' : ''}
                          ${fund.risk === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                          ${fund.risk === 'Very High' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {fund.risk} Risk
                        </div>
                        <div className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">
                          {fund.allocation}% Allocation
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Expected CAGR</p>
                        <p className="font-medium">{fund.cagr}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{fund.type.split(' - ')[0]}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span className="hidden md:inline">Compare</span>
                      </Button>
                      <Button size="sm" className="bg-wealth-teal hover:bg-opacity-90">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentRecommendations;
