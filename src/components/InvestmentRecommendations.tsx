import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionnaireResult } from '@/pages/InvestmentAnalyzer';
import { TrendingUp, DollarSign, PieChart, BarChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface InvestmentRecommendationsProps {
  results: QuestionnaireResult;
  onRestart: () => void;
}

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({
  results,
  onRestart
}) => {
  // Generate portfolio allocation based on risk tolerance and investment timeframe
  const getPortfolioAllocation = () => {
    const { riskTolerance, investmentTimeframe } = results;
    let equity = 0;
    let debt = 0;
    let gold = 0;
    let cash = 0;

    // Adjust allocations based on risk tolerance and timeframe
    if (riskTolerance <= 3) { // Conservative
      equity = investmentTimeframe === 'long' ? 30 : (investmentTimeframe === 'medium' ? 20 : 10);
      debt = investmentTimeframe === 'long' ? 50 : (investmentTimeframe === 'medium' ? 55 : 60);
      gold = 10;
      cash = investmentTimeframe === 'long' ? 10 : (investmentTimeframe === 'medium' ? 15 : 20);
    } else if (riskTolerance <= 7) { // Moderate
      equity = investmentTimeframe === 'long' ? 60 : (investmentTimeframe === 'medium' ? 50 : 30);
      debt = investmentTimeframe === 'long' ? 30 : (investmentTimeframe === 'medium' ? 35 : 50);
      gold = 5;
      cash = investmentTimeframe === 'long' ? 5 : (investmentTimeframe === 'medium' ? 10 : 15);
    } else { // Aggressive
      equity = investmentTimeframe === 'long' ? 80 : (investmentTimeframe === 'medium' ? 70 : 50);
      debt = investmentTimeframe === 'long' ? 15 : (investmentTimeframe === 'medium' ? 20 : 30);
      gold = 5;
      cash = investmentTimeframe === 'long' ? 0 : (investmentTimeframe === 'medium' ? 5 : 15);
    }

    return { equity, debt, gold, cash };
  };

  const portfolioAllocation = getPortfolioAllocation();

  // Calculate expected returns based on allocation and standard market expectations
  const projectedReturns = () => {
    // Simplified return projections
    const equityReturn = 12; // expected annual return %
    const debtReturn = 7;
    const goldReturn = 8;
    const cashReturn = 4;

    const { equity, debt, gold, cash } = portfolioAllocation;
    
    // Weighted average return
    const weightedReturn = (
      (equity * equityReturn) +
      (debt * debtReturn) +
      (gold * goldReturn) +
      (cash * cashReturn)
    ) / 100;

    return weightedReturn.toFixed(2);
  };

  // Generate fund recommendations based on user preferences and allocations
  const recommendedFunds = [
    {
      name: "Blue Chip Growth Fund",
      category: "Equity - Large Cap",
      allocation: Math.round(portfolioAllocation.equity * 0.6), // 60% of equity allocation
      risk: "Moderate",
      returns: "12-15%"
    },
    {
      name: "Small Cap Opportunities Fund",
      category: "Equity - Small Cap",
      allocation: Math.round(portfolioAllocation.equity * 0.4), // 40% of equity allocation
      risk: "High",
      returns: "15-18%"
    },
    {
      name: "Government Securities Fund",
      category: "Debt - Government",
      allocation: Math.round(portfolioAllocation.debt * 0.5), // 50% of debt allocation
      risk: "Low",
      returns: "6-8%"
    },
    {
      name: "Corporate Bond Fund",
      category: "Debt - Corporate",
      allocation: Math.round(portfolioAllocation.debt * 0.5), // 50% of debt allocation
      risk: "Low to Moderate",
      returns: "7-9%"
    },
    {
      name: "Gold ETF",
      category: "Commodities - Gold",
      allocation: portfolioAllocation.gold,
      risk: "Moderate",
      returns: "8-10%"
    }
  ];

  const calculateFutureValue = (years: number) => {
    const { initialInvestment, monthlyContribution } = results;
    const returnRate = parseFloat(projectedReturns()) / 100;
    let futureValue = initialInvestment;

    for (let i = 0; i < years * 12; i++) {
      futureValue = (futureValue + monthlyContribution) * (1 + returnRate / 12);
    }

    return Math.round(futureValue);
  };

  // Generate projection data
  const projectionData = [
    { year: 1, value: calculateFutureValue(1) },
    { year: 5, value: calculateFutureValue(5) },
    { year: 10, value: calculateFutureValue(10) },
    { year: 20, value: calculateFutureValue(20) }
  ];

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-wealth-navy">
              Your Investment Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-wealth-gray">Risk Tolerance:</dt>
                <dd className="font-medium">
                  {results.riskTolerance <= 3 
                    ? "Conservative" 
                    : results.riskTolerance <= 7 
                      ? "Moderate" 
                      : "Aggressive"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-wealth-gray">Investment Timeframe:</dt>
                <dd className="font-medium">
                  {results.investmentTimeframe === "short" 
                    ? "Short Term (1-3 years)" 
                    : results.investmentTimeframe === "medium" 
                      ? "Medium Term (3-7 years)" 
                      : "Long Term (7+ years)"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-wealth-gray">Initial Investment:</dt>
                <dd className="font-medium">₹{results.initialInvestment.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-wealth-gray">Monthly Contribution:</dt>
                <dd className="font-medium">₹{results.monthlyContribution.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-wealth-gray">Expected Annual Return:</dt>
                <dd className="font-medium text-wealth-teal">{projectedReturns()}%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-wealth-navy">
              Recommended Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Equity */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Equity</span>
                  <span className="font-medium">{portfolioAllocation.equity}%</span>
                </div>
                <Progress value={portfolioAllocation.equity} className="h-2 bg-gray-200" />
                <div className="h-2 w-full bg-blue-600 rounded-full" style={{ width: `${portfolioAllocation.equity}%` }} />
              </div>
              
              {/* Debt */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Debt</span>
                  <span className="font-medium">{portfolioAllocation.debt}%</span>
                </div>
                <Progress value={portfolioAllocation.debt} className="h-2 bg-gray-200" />
                <div className="h-2 w-full bg-green-600 rounded-full" style={{ width: `${portfolioAllocation.debt}%` }} />
              </div>
              
              {/* Gold */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gold</span>
                  <span className="font-medium">{portfolioAllocation.gold}%</span>
                </div>
                <Progress value={portfolioAllocation.gold} className="h-2 bg-gray-200" />
                <div className="h-2 w-full bg-yellow-500 rounded-full" style={{ width: `${portfolioAllocation.gold}%` }} />
              </div>
              
              {/* Cash */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cash & Equivalents</span>
                  <span className="font-medium">{portfolioAllocation.cash}%</span>
                </div>
                <Progress value={portfolioAllocation.cash} className="h-2 bg-gray-200" />
                <div className="h-2 w-full bg-gray-500 rounded-full" style={{ width: `${portfolioAllocation.cash}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Fund Recommendations */}
      <div>
        <h2 className="text-xl font-semibold text-wealth-navy mb-4">Recommended Funds</h2>
        <div className="space-y-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="equity">Equity</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
              <TabsTrigger value="others">Others</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedFunds.map((fund, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-200 hover:border-wealth-teal transition-colors hover:shadow-md">
                    <div className="p-4">
                      <h3 className="font-medium text-wealth-navy">{fund.name}</h3>
                      <p className="text-sm text-wealth-gray mb-2">{fund.category}</p>
                      <div className="flex justify-between text-sm mt-3">
                        <span>Suggested Allocation:</span>
                        <span className="font-medium">{fund.allocation}%</span>
                      </div>
                      <Progress value={fund.allocation} className="h-1.5 my-1 bg-gray-200" />
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-wealth-gray">Risk Level</p>
                          <p className="font-medium text-sm">{fund.risk}</p>
                        </div>
                        <div>
                          <p className="text-xs text-wealth-gray">Expected Returns</p>
                          <p className="font-medium text-sm text-wealth-teal">{fund.returns}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="equity" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedFunds
                  .filter(fund => fund.category.includes("Equity"))
                  .map((fund, index) => (
                    <Card key={index} className="overflow-hidden border border-gray-200 hover:border-wealth-teal transition-colors hover:shadow-md">
                      <div className="p-4">
                        <h3 className="font-medium text-wealth-navy">{fund.name}</h3>
                        <p className="text-sm text-wealth-gray mb-2">{fund.category}</p>
                        <div className="flex justify-between text-sm mt-3">
                          <span>Suggested Allocation:</span>
                          <span className="font-medium">{fund.allocation}%</span>
                        </div>
                        <Progress value={fund.allocation} className="h-1.5 my-1 bg-gray-200" />
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-wealth-gray">Risk Level</p>
                            <p className="font-medium text-sm">{fund.risk}</p>
                          </div>
                          <div>
                            <p className="text-xs text-wealth-gray">Expected Returns</p>
                            <p className="font-medium text-sm text-wealth-teal">{fund.returns}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="debt" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedFunds
                  .filter(fund => fund.category.includes("Debt"))
                  .map((fund, index) => (
                    <Card key={index} className="overflow-hidden border border-gray-200 hover:border-wealth-teal transition-colors hover:shadow-md">
                      <div className="p-4">
                        <h3 className="font-medium text-wealth-navy">{fund.name}</h3>
                        <p className="text-sm text-wealth-gray mb-2">{fund.category}</p>
                        <div className="flex justify-between text-sm mt-3">
                          <span>Suggested Allocation:</span>
                          <span className="font-medium">{fund.allocation}%</span>
                        </div>
                        <Progress value={fund.allocation} className="h-1.5 my-1 bg-gray-200" />
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-wealth-gray">Risk Level</p>
                            <p className="font-medium text-sm">{fund.risk}</p>
                          </div>
                          <div>
                            <p className="text-xs text-wealth-gray">Expected Returns</p>
                            <p className="font-medium text-sm text-wealth-teal">{fund.returns}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="others" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedFunds
                  .filter(fund => !fund.category.includes("Equity") && !fund.category.includes("Debt"))
                  .map((fund, index) => (
                    <Card key={index} className="overflow-hidden border border-gray-200 hover:border-wealth-teal transition-colors hover:shadow-md">
                      <div className="p-4">
                        <h3 className="font-medium text-wealth-navy">{fund.name}</h3>
                        <p className="text-sm text-wealth-gray mb-2">{fund.category}</p>
                        <div className="flex justify-between text-sm mt-3">
                          <span>Suggested Allocation:</span>
                          <span className="font-medium">{fund.allocation}%</span>
                        </div>
                        <Progress value={fund.allocation} className="h-1.5 my-1 bg-gray-200" />
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-wealth-gray">Risk Level</p>
                            <p className="font-medium text-sm">{fund.risk}</p>
                          </div>
                          <div>
                            <p className="text-xs text-wealth-gray">Expected Returns</p>
                            <p className="font-medium text-sm text-wealth-teal">{fund.returns}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator />
      
      {/* Future Projections */}
      <div>
        <h2 className="text-xl font-semibold text-wealth-navy mb-4">Future Value Projections</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {projectionData.map((data, index) => (
              <Card key={index} className={`border-l-4 ${
                index === 0 ? 'border-l-blue-400' : 
                index === 1 ? 'border-l-green-400' : 
                index === 2 ? 'border-l-purple-400' : 
                'border-l-wealth-teal'
              }`}>
                <CardContent className="p-4">
                  <p className="text-sm text-wealth-gray">In {data.year} {data.year === 1 ? 'year' : 'years'}</p>
                  <p className="text-2xl font-bold text-wealth-navy mt-1">
                    ₹{data.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-wealth-gray mt-1">
                    {data.year === 1 ? 'Short' : data.year <= 5 ? 'Medium' : 'Long'} term projection
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-wealth-gray text-sm mb-4">
              These projections are estimates based on your investment profile and historical market data. 
              Actual returns may vary.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button 
          onClick={onRestart} 
          variant="outline" 
          className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white"
        >
          Restart Questionnaire
        </Button>
        <Button className="bg-wealth-teal hover:bg-opacity-90">
          Schedule a Consultation
        </Button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-wealth-navy font-medium mb-2">Disclaimer</h3>
        <p className="text-sm text-wealth-gray">
          The investment recommendations provided here are based on the information you've shared and general market conditions. 
          They are meant for informational purposes only and do not constitute financial advice. 
          Please consult with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;
