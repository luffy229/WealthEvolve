
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
import OverlapResults from '@/components/OverlapResults';
import { mutualFunds, calculateOverlap } from '@/lib/fundData';

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
      // Filter out empty fund selections
      const selectedFunds = [values.fund1, values.fund2];
      if (values.fund3) selectedFunds.push(values.fund3);
      
      // Calculate overlap between selected funds
      const overlapData = calculateOverlap(selectedFunds);
      setResults(overlapData);
      
      toast({
        title: "Analysis Complete",
        description: "Portfolio overlap analysis has been calculated successfully.",
      });
    } catch (error) {
      console.error("Overlap calculation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem analyzing the funds. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-wealth-navy mb-6">Select Funds to Compare</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="fund1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fund 1</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
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
                  <FormItem>
                    <FormLabel>Fund 2</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
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
                  <FormItem>
                    <FormLabel>Fund 3 (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
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
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-wealth-navy hover:bg-wealth-navy/90"
              >
                Analyze Portfolio Overlap
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      {results && <OverlapResults data={results} />}
      
      {!results && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-wealth-navy">Why Portfolio Overlap Matters</h3>
            <p className="text-wealth-gray">
              High overlap between mutual funds can lead to unintentional concentration risk and reduced diversification.
              A well-diversified portfolio typically has less than 20% overlap between funds.
            </p>
            <div className="flex justify-center">
              <img src="/placeholder.svg" alt="Portfolio Overlap Illustration" className="w-2/3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlapAnalyzer;
