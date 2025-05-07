
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
import { Clock, BarChart4, ArrowRight, Info } from 'lucide-react';
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
      <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-wealth-teal/5 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-wealth-navy/5 rounded-full"></div>
        
        <h2 className="text-xl font-semibold text-wealth-navy mb-6 flex items-center">
          <Clock className="mr-2 text-wealth-teal" />
          Select Funds to Compare
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="fund1"
                render={({ field }) => (
                  <FormItem className="animate-fade-in" style={{ animationDelay: "0ms" }}>
                    <FormLabel className="font-medium text-wealth-navy">Fund 1</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gradient-to-b from-gray-50 to-white border-gray-200 shadow-sm">
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
                    <FormLabel className="font-medium text-wealth-navy">Fund 2</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gradient-to-b from-gray-50 to-white border-gray-200 shadow-sm">
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
                    <FormLabel className="font-medium text-wealth-navy">Fund 3 (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full bg-gradient-to-b from-gray-50 to-white border-gray-200 shadow-sm">
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
              <div className="py-4 animate-fade-in bg-gradient-to-r from-wealth-light to-white p-4 rounded-lg shadow-inner">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-wealth-navy">Analyzing portfolios...</span>
                  <span className="text-wealth-teal font-bold">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress 
                  value={analysisProgress} 
                  className="h-3 bg-gray-100" 
                  color="bg-gradient-to-r from-wealth-teal to-wealth-navy" 
                />
              </div>
            )}
            
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-wealth-teal to-wealth-navy hover:from-wealth-navy hover:to-wealth-teal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-wealth-light/50">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-wealth-navy flex items-center justify-center">
              <Info className="mr-2 text-wealth-teal" />
              Why Portfolio Overlap Matters
            </h3>
            <p className="text-wealth-gray">
              High overlap between mutual funds can lead to unintentional concentration risk and reduced diversification.
              A well-diversified portfolio typically has less than 20% overlap between funds.
            </p>
            
            <div className="flex justify-center mt-6 relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-wealth-teal/20 to-wealth-navy/20 animate-pulse"></div>
              <img 
                src="/lovable-uploads/ad1114d1-2e41-40e1-a591-75b2054adfb1.png" 
                alt="Portfolio Overlap Illustration" 
                className="relative rounded-lg shadow-md animate-float z-10 w-2/3 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" style={{ animationDelay: "100ms" }}>
                <h4 className="font-medium text-amber-800 mb-2">Risk Concentration</h4>
                <p className="text-sm text-amber-700">Overlapping funds can amplify exposure to specific sectors or stocks</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" style={{ animationDelay: "200ms" }}>
                <h4 className="font-medium text-emerald-800 mb-2">Fee Efficiency</h4>
                <p className="text-sm text-emerald-700">Why pay multiple management fees for the same underlying assets?</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" style={{ animationDelay: "300ms" }}>
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
