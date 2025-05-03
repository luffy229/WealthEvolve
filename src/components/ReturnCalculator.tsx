
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, IndianRupee } from 'lucide-react';

interface ReturnCalculatorProps {
  fundName: string;
  expectedReturn: number;
}

const ReturnCalculator: React.FC<ReturnCalculatorProps> = ({ fundName, expectedReturn }) => {
  const [calculatorType, setCalculatorType] = useState<'sip' | 'lumpsum'>('sip');
  const [amount, setAmount] = useState<string>('1000');
  const [period, setPeriod] = useState<string>('1');
  const [periodUnit, setPeriodUnit] = useState<string>('Years');
  const [stepUp, setStepUp] = useState<string>('10');
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [xirr, setXirr] = useState<number>(0);

  useEffect(() => {
    calculateReturns();
  }, [amount, period, calculatorType, stepUp, periodUnit]);

  const calculateReturns = () => {
    const monthlyAmount = parseFloat(amount) || 0;
    const years = parseFloat(period) || 0;
    const annualStepUp = parseFloat(stepUp) || 0;
    const monthlyReturnRate = expectedReturn / 12 / 100;
    
    let totalInvestment = 0;
    let totalValue = 0;
    
    if (calculatorType === 'sip') {
      // Convert years to months
      const months = periodUnit === 'Years' ? years * 12 : years;
      let currentMonthlyAmount = monthlyAmount;
      
      for (let i = 0; i < months; i++) {
        // Apply step-up annually
        if (i > 0 && i % 12 === 0) {
          currentMonthlyAmount *= (1 + annualStepUp / 100);
        }
        
        totalInvestment += currentMonthlyAmount;
        totalValue = (totalValue + currentMonthlyAmount) * (1 + monthlyReturnRate);
      }
      
      // Calculate XIRR approximation
      const estXirr = (Math.pow((totalValue / totalInvestment), 1 / years) - 1) * 100;
      setXirr(parseFloat(estXirr.toFixed(2)));
    } else {
      // Lumpsum calculation
      const annualReturnRate = expectedReturn / 100;
      const lumpAmount = parseFloat(amount) || 0;
      totalInvestment = lumpAmount;
      totalValue = lumpAmount * Math.pow(1 + annualReturnRate, years);
      setXirr(expectedReturn);
    }
    
    setTotalInvestment(Math.round(totalInvestment));
    setFinalAmount(Math.round(totalValue));
    setReturns(Math.round(totalValue - totalInvestment));
  };

  return (
    <motion.div 
      className="calculator-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Calculator Tabs */}
      <div className="bg-black/20 rounded-full flex p-1 mb-4">
        <button 
          onClick={() => setCalculatorType('sip')}
          className={`calculator-tab w-1/2 ${calculatorType === 'sip' ? 'calculator-tab-active' : 'text-white/70'}`}
        >
          SIP
        </button>
        <button 
          onClick={() => setCalculatorType('lumpsum')}
          className={`calculator-tab w-1/2 ${calculatorType === 'lumpsum' ? 'calculator-tab-active' : 'text-white/70'}`}
        >
          Lumpsum
        </button>
      </div>

      {/* Calculator Inputs */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-white/80 mb-1 block">
            {calculatorType === 'sip' ? 'Monthly amount' : 'One-time investment'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-white/70">₹</span>
            <Input 
              type="text"
              className="calculator-input pl-8"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {calculatorType === 'sip' && (
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/80 mb-1 block">Step-up</label>
              <button className="text-xs text-wealth-teal" title="Annual increase in your SIP amount">
                <span className="flex items-center">
                  <TrendingUp size={12} className="mr-1" /> Info
                </span>
              </button>
            </div>
            <Select value={stepUp} onValueChange={setStepUp}>
              <SelectTrigger className="calculator-select">
                <SelectValue placeholder="Select step-up percentage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="15">15%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/80 mb-1 block">Period</label>
            <Input 
              type="text" 
              className="calculator-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-white/80 mb-1 block">&nbsp;</label>
            <Select value={periodUnit} onValueChange={setPeriodUnit}>
              <SelectTrigger className="calculator-select">
                <SelectValue placeholder="Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Years">Years</SelectItem>
                <SelectItem value="Months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="text-sm text-white/80 pt-2">
          Total investment of <span className="font-medium text-white">₹{totalInvestment.toLocaleString()}</span>
        </div>
        
        {/* Results */}
        <div className="calculator-result">
          <div className="text-sm text-white/70">Would have become</div>
          <div className="text-2xl font-bold mt-1">₹{finalAmount.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            <span className="text-green-400 text-sm font-medium">₹{returns.toLocaleString()}</span>
            <span className="text-green-400 text-xs ml-1">(+{xirr}% XIRR)</span>
          </div>
        </div>
        
        {/* Summary description */}
        <div className="text-xs text-white/60 mt-2">
          {calculatorType === 'sip' ? (
            <>A monthly SIP of ₹{parseInt(amount).toLocaleString()} in this fund over the past {period} {periodUnit.toLowerCase()} with a yearly stepup of {stepUp}% would be valued at ₹{finalAmount.toLocaleString()} today.</>
          ) : (
            <>A one-time investment of ₹{parseInt(amount).toLocaleString()} in this fund {period} {periodUnit.toLowerCase()} ago would be valued at ₹{finalAmount.toLocaleString()} today.</>
          )}
        </div>
        
        <div className="text-[10px] text-white/40 pt-2">
          Disclaimer: Past performance does not guarantee future results
        </div>
      </div>
    </motion.div>
  );
};

export default ReturnCalculator;
