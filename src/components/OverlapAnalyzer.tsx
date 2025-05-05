
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChartPie, ArrowRight, Info } from 'lucide-react';
import OverlapResults from '@/components/OverlapResults';
import { mutualFunds, calculateOverlap } from '@/lib/fundData';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  fund1: z.string({
    required_error: "Please select the first fund."
  }),
  fund2: z.string({
    required_error: "Please select the second fund."
  }),
  fund3: z.string().optional()
}).refine(data => data.fund1 !== data.fund2, {
  message: "Please select different funds to compare",
  path: ["fund2"],
});

const OverlapAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fund1: '',
      fund2: '',
      fund3: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      
      // Mock progress with intervals
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);
      
      // Filter out empty fund selections
      const selectedFunds = [values.fund1, values.fund2];
      if (values.fund3) selectedFunds.push(values.fund3);
      
      // Simulate analysis taking time
      setTimeout(() => {
        // Calculate overlap between selected funds
        const overlapData = calculateOverlap(selectedFunds);
        setResults(overlapData);
        
        clearInterval(progressInterval);
        setAnalysisProgress(100);
        
        setTimeout(() => {
          setIsLoading(false);
          
          toast({
            title: "Analysis Complete",
            description: "Portfolio overlap analysis has been calculated successfully.",
          });
        }, 500);
      }, 2200);
    } catch (error) {
      console.error("Overlap calculation error:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem analyzing the funds. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl font-semibold text-wealth-navy mb-6 flex items-center">
          <ChartPie className="mr-2 text-wealth-teal" />
          Select Funds to Compare
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="fund1"
                render={({ field }) => (
                  <FormItem className="animate-fade-in" style={{ animationDelay: "0ms" }}>
                    <FormLabel>Fund 1</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a fund" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {mutualFunds.map((fund) => (
                            <SelectItem key={fund.id} value={fund.id}>
                              {fund.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fund2"
                render={({ field }) => (
                  <FormItem className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <FormLabel>Fund 2</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a fund" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {mutualFunds.map((fund) => (
                            <SelectItem key={fund.id} value={fund.id}>
                              {fund.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fund3"
                render={({ field }) => (
                  <FormItem className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <FormLabel>Fund 3 (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select a fund (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {mutualFunds.map((fund) => (
                            <SelectItem key={fund.id} value={fund.id}>
                              {fund.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {isLoading && (
              <div className="py-4 animate-fade-in">
                <div className="flex justify-between text-sm mb-1">
                  <span>Analyzing portfolios...</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            )}
            
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-wealth-teal to-wealth-navy hover:from-wealth-navy hover:to-wealth-teal transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Processing</span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    Analyze Portfolio Overlap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      {results && <OverlapResults data={results} />}
      
      {!results && (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-wealth-navy flex items-center justify-center">
              <Info className="mr-2 text-wealth-teal" />
              Why Portfolio Overlap Matters
            </h3>
            <p className="text-wealth-gray">
              High overlap between mutual funds can lead to unintentional concentration risk and reduced diversification.
              A well-diversified portfolio typically has less than 20% overlap between funds.
            </p>
            <div className="flex justify-center mt-6">
              <div className="relative w-2/3">
                <div className="absolute -inset-1 bg-gradient-to-r from-wealth-gold via-wealth-teal to-wealth-navy rounded-lg blur-md opacity-30 animate-pulse-glow"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Portfolio Overlap Illustration" 
                  className="relative rounded-lg shadow-md animate-float"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h4 className="font-medium text-amber-800 mb-2">Risk Concentration</h4>
                <p className="text-sm text-amber-700">Overlapping funds can amplify exposure to specific sectors or stocks</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h4 className="font-medium text-emerald-800 mb-2">Fee Efficiency</h4>
                <p className="text-sm text-emerald-700">Why pay multiple management fees for the same underlying assets?</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <h4 className="font-medium text-blue-800 mb-2">True Diversification</h4>
                <p className="text-sm text-blue-700">Analyze your actual exposure across asset classes and sectors</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlapAnalyzer;
