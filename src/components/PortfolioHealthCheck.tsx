
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  currentInvestments: z.string().optional(),
  investmentGoals: z.string().optional(),
  contactConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to be contacted.",
  }),
});

const PortfolioHealthCheck: React.FC = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentInvestments: "",
      investmentGoals: "",
      contactConsent: false,
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    
    // In a real app, this would be sent to a backend API
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Request submitted!",
        description: "Our financial advisor will contact you soon.",
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-md">
        {submitted ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-wealth-navy mb-2">Thank You!</h2>
            <p className="text-wealth-gray max-w-md mx-auto mb-6">
              Your portfolio health check request has been submitted successfully. 
              Our financial advisor will contact you within 24-48 hours.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg max-w-md mx-auto">
              <h3 className="font-medium text-wealth-navy mb-2">What's next?</h3>
              <ol className="text-left text-wealth-gray list-decimal pl-5 space-y-2">
                <li>Our expert will review your current investment details</li>
                <li>We'll schedule a 30-minute personalized consultation</li>
                <li>You'll receive a detailed portfolio assessment report</li>
                <li>We'll recommend optimizations tailored to your goals</li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-wealth-teal" />
              </div>
              <h2 className="text-2xl font-bold text-wealth-navy mb-2">Free Portfolio Health Check</h2>
              <p className="text-wealth-gray max-w-xl mx-auto">
                Get a comprehensive analysis of your current investments and personalized 
                recommendations from our financial experts
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currentInvestments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Investments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe your current investment portfolio (mutual funds, stocks, etc.)" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="investmentGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Goals (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What are your financial goals? (retirement, education, wealth creation, etc.)" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to be contacted by a financial advisor regarding my portfolio analysis
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex flex-col gap-2">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-wealth-navy hover:bg-wealth-navy/90 w-full"
                  >
                    Get My Free Portfolio Analysis
                  </Button>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-wealth-gray">
                    <ShieldCheck className="h-4 w-4" />
                    Your data is secure and will not be shared with third parties
                  </div>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioHealthCheck;
