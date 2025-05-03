
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface FundRiskProps {
  fund: any; // Using any for now, would define a proper type in a real project
}

const FundRisk: React.FC<FundRiskProps> = ({ fund }) => {
  // Sample data - in a real app, this would come from the API
  const riskMetrics = fund.riskMetrics || {
    standardDeviation: 14.2,
    beta: 0.95,
    alpha: 2.3,
    sharpeRatio: 1.18,
    riskGrade: "Medium",
    maxDrawdown: -18.5,
    volatility: "Medium",
    riskReturnRatio: 1.2
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="bg-gray-100 h-4 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    riskMetrics.riskGrade === "Low" 
                      ? "bg-green-500 w-1/3" 
                      : riskMetrics.riskGrade === "Medium" 
                        ? "bg-amber-500 w-2/3" 
                        : "bg-red-500 w-full"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Low Risk</span>
                <span>Medium Risk</span>
                <span>High Risk</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center min-w-[120px]">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${getRiskColor(riskMetrics.riskGrade)}`}>
                {riskMetrics.riskGrade} Risk
              </span>
              <p className="text-xs text-wealth-gray mt-1">Overall Risk Grade</p>
            </div>
          </div>
          
          <p className="text-sm text-wealth-gray mt-4">
            This fund has a {riskMetrics.riskGrade.toLowerCase()} risk profile, suitable for investors with a {
              riskMetrics.riskGrade === "Low" 
                ? "conservative approach seeking stability" 
                : riskMetrics.riskGrade === "Medium" 
                  ? "balanced approach seeking moderate growth" 
                  : "high risk tolerance seeking aggressive growth"
            }.
          </p>
        </CardContent>
      </Card>
      
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Standard Deviation</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Measures the dispersion of returns around the average return. 
                          Higher values indicate higher volatility.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{riskMetrics.standardDeviation}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Beta</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Measures the fund's volatility compared to the market. 
                          Beta of 1 means the fund moves with the market.
                          Less than 1 means lower volatility than the market.
                          Greater than 1 means higher volatility than the market.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{riskMetrics.beta}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Alpha</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Measures the excess return of the fund compared to its benchmark.
                          Positive alpha indicates outperformance.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{riskMetrics.alpha}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Sharpe Ratio</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Measures risk-adjusted returns. Higher values indicate better 
                          risk-adjusted performance.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{riskMetrics.sharpeRatio}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Maximum Drawdown</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The maximum observed loss from a peak to a trough of the fund,
                          before a new peak is attained. 
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium text-red-500">{riskMetrics.maxDrawdown}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Volatility</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          How much the fund's returns fluctuate over time.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-sm ${getRiskColor(riskMetrics.volatility)}`}>
                  {riskMetrics.volatility}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>Risk-Return Ratio</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Measures the return per unit of risk. Higher values
                          indicate better returns for the risk taken.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{riskMetrics.riskReturnRatio}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Risk Note */}
      <div className="bg-wealth-light rounded-lg p-4">
        <h3 className="text-wealth-navy font-medium mb-2">Understanding Risk</h3>
        <p className="text-sm text-wealth-gray">
          All investments involve risk, including the potential loss of principal. Past performance is not a guarantee of future results. Before investing, consider the fund's investment objectives, risks, charges, and expenses. 
        </p>
      </div>
    </div>
  );
};

export default FundRisk;
