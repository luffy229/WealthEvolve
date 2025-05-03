
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface FundFeesProps {
  fund: any; // Using any for now, would define a proper type in a real project
}

const FundFees: React.FC<FundFeesProps> = ({ fund }) => {
  // Sample data - in a real app, this would come from the API
  const fees = fund.fees || {
    expenseRatio: 1.25,
    entryLoad: 0,
    exitLoad: "1% if redeemed within 1 year",
    minInvestment: 5000,
    minSIP: 1000,
    lockInPeriod: "None",
    managementFee: 0.85,
    performanceFee: "None"
  };
  
  return (
    <div className="space-y-6">
      {/* Fees Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span>Total Expense Ratio</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help">
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The annual fee charged by the fund to cover operating costs,
                          management fees, and other expenses.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{fees.expenseRatio}%</span>
              </div>
              
              <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-wealth-teal`}
                  style={{ width: `${Math.min(fees.expenseRatio / 2.5 * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-wealth-gray">
                <span>Lower</span>
                <span>Average</span>
                <span>Higher</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Entry Load</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            One-time fee charged when you purchase fund units.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className={fees.entryLoad === 0 ? "text-green-600 font-medium" : ""}>
                    {fees.entryLoad === 0 ? "None" : `${fees.entryLoad}%`}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Exit Load</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Fee charged when you sell fund units within a specified period.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>{fees.exitLoad}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Management Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Fee paid to the fund manager for managing the fund's portfolio.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>{fees.managementFee}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Performance Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Additional fee charged if the fund outperforms its benchmark.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>{fees.performanceFee}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Minimum Investment (Lumpsum)</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Minimum amount required for a one-time investment.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>₹{fees.minInvestment.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Minimum SIP Amount</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Minimum monthly investment for Systematic Investment Plan.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>₹{fees.minSIP.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Lock-in Period</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Period during which you cannot redeem your investment.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span>{fees.lockInPeriod}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Investor Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Impact of Fees on Your Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-wealth-gray mb-4">
            Here's how the fund's fees could impact a ₹1,00,000 investment over different timeframes, 
            assuming an annual return of 12% before fees:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Time Period</th>
                  <th className="text-left py-3 px-2 font-medium">Before Fees</th>
                  <th className="text-left py-3 px-2 font-medium">After Fees</th>
                  <th className="text-left py-3 px-2 font-medium">Fee Impact</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { period: "1 Year", before: 112000, after: 112000 - (112000 * (fees.expenseRatio / 100)) },
                  { period: "3 Years", before: 140500, after: 140500 * Math.pow(1 - (fees.expenseRatio / 100), 3) },
                  { period: "5 Years", before: 176200, after: 176200 * Math.pow(1 - (fees.expenseRatio / 100), 5) },
                  { period: "10 Years", before: 310600, after: 310600 * Math.pow(1 - (fees.expenseRatio / 100), 10) }
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{row.period}</td>
                    <td className="py-3 px-2">₹{Math.round(row.before).toLocaleString()}</td>
                    <td className="py-3 px-2">₹{Math.round(row.after).toLocaleString()}</td>
                    <td className="py-3 px-2">₹{Math.round(row.before - row.after).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-wealth-gray mt-4">
            This illustration is for educational purposes only. Actual returns may vary.
          </p>
        </CardContent>
      </Card>
      
      <div className="bg-wealth-light rounded-lg p-4">
        <h3 className="text-wealth-navy font-medium mb-2">Fee Transparency</h3>
        <p className="text-sm text-wealth-gray">
          WealthEvolve does not charge any additional advisory fees for investments made through the direct route. You only pay the fund's expense ratio as disclosed above.
        </p>
      </div>
    </div>
  );
};

export default FundFees;
