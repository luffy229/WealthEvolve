
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp, InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const formSchema = z.object({
  goalAmount: z.string().min(1, "Goal amount is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Goal amount must be a positive number",
  }),
  duration: z.string().min(1, "Duration is required").refine(val => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 30, {
    message: "Duration must be between 1 and 30 years",
  }),
  returnRate: z.string().min(1, "Expected return is required").refine(val => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 30, {
    message: "Expected return must be between 1% and 30%",
  }),
});

const SIPPlanner = () => {
  const [sipResult, setSipResult] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalAmount: '',
      duration: '',
      returnRate: '',
    },
  });

  const calculateSIP = (values: z.infer<typeof formSchema>) => {
    const P = Number(values.goalAmount); // Target amount
    const t = Number(values.duration) * 12; // Duration in months
    const r = Number(values.returnRate) / 12 / 100; // Monthly interest rate
    
    // SIP formula: P * r / ((1 + r)^t - 1)
    const monthlyAmount = P * r * Math.pow(1 + r, t) / (Math.pow(1 + r, t) - 1);
    
    return Math.ceil(monthlyAmount);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const sipAmount = calculateSIP(values);
    setSipResult(sipAmount);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-wealth-teal" />
          </div>
          <h2 className="text-2xl font-bold text-wealth-navy mb-2">Smart SIP Calculator</h2>
          <p className="text-wealth-gray">
            Plan your financial goals by calculating how much you need to invest monthly
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="goalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Goal Amount
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 ml-1 text-wealth-gray" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The total amount you want to achieve</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Duration (Years)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 ml-1 text-wealth-gray" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Time period to achieve your goal (in years)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="returnRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Expected Return (%)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 ml-1 text-wealth-gray" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annual expected rate of return on your investments</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-wealth-navy hover:bg-wealth-navy/90"
              >
                Calculate Monthly SIP
              </Button>
            </div>
          </form>
        </Form>

        {sipResult !== null && (
          <Card className="mt-8 p-6 border-2 border-wealth-teal">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-wealth-navy mb-2">Your SIP Result</h3>
              <div className="flex items-center justify-center gap-2 text-wealth-teal">
                <TrendingUp className="h-6 w-6" />
                <span className="text-3xl font-bold">₹{sipResult.toLocaleString()}</span>
                <span className="text-sm text-wealth-gray">per month</span>
              </div>
              <p className="mt-4 text-wealth-gray">
                Invest ₹{sipResult.toLocaleString()} monthly to reach your financial goal
              </p>
            </div>
          </Card>
        )}
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-wealth-navy mb-2">Tips for Successful SIP Investing</h4>
          <ul className="text-wealth-gray list-disc pl-5 space-y-1">
            <li>Start early to benefit from the power of compounding</li>
            <li>Be consistent with your monthly investments</li>
            <li>Increase your SIP amount annually to match inflation</li>
            <li>Diversify your investments across different fund categories</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SIPPlanner;
