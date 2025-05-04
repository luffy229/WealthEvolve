
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QuestionnaireResult } from '@/pages/InvestmentAnalyzer';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Form schema for the questionnaire
const questionnaireSchema = z.object({
  riskTolerance: z.number().min(1).max(10),
  investmentTimeframe: z.string().min(1),
  financialGoals: z.array(z.string()).min(1, { message: "Select at least one financial goal" }),
  initialInvestment: z.number().min(0),
  monthlyContribution: z.number().min(0),
  preferredSectors: z.array(z.string()),
  existingInvestments: z.array(z.string()),
  esgPreference: z.boolean().default(false),
  preferredAssetClasses: z.array(z.string()),
  investmentKnowledge: z.string(),
});

interface InvestmentQuestionnaireProps {
  onComplete: (results: QuestionnaireResult) => void;
}

const InvestmentQuestionnaire: React.FC<InvestmentQuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Define the form with default values
  const form = useForm<z.infer<typeof questionnaireSchema>>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      riskTolerance: 5,
      investmentTimeframe: "medium",
      financialGoals: [],
      initialInvestment: 5000,
      monthlyContribution: 500,
      preferredSectors: [],
      existingInvestments: [],
      esgPreference: false,
      preferredAssetClasses: [],
      investmentKnowledge: "beginner",
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitForm = (values: z.infer<typeof questionnaireSchema>) => {
    console.log("Form values:", values);
    onComplete(values as QuestionnaireResult);
  };

  const financialGoalsOptions = [
    { id: "retirement", label: "Retirement Planning" },
    { id: "education", label: "Education Funding" },
    { id: "homebuying", label: "Home Buying" },
    { id: "wealthbuilding", label: "Wealth Building" },
    { id: "incomegeneration", label: "Income Generation" },
    { id: "taxsaving", label: "Tax Saving" },
  ];

  const sectorsOptions = [
    { id: "technology", label: "Technology" },
    { id: "healthcare", label: "Healthcare" },
    { id: "finance", label: "Finance" },
    { id: "consumergoods", label: "Consumer Goods" },
    { id: "realestate", label: "Real Estate" },
    { id: "energy", label: "Energy" },
    { id: "utilities", label: "Utilities" },
    { id: "industrials", label: "Industrials" },
    { id: "materials", label: "Materials" },
  ];

  const assetClassOptions = [
    { id: "equity", label: "Equity/Stocks" },
    { id: "debt", label: "Debt/Bonds" },
    { id: "mutualfunds", label: "Mutual Funds" },
    { id: "etfs", label: "ETFs" },
    { id: "gold", label: "Gold" },
    { id: "realestate", label: "Real Estate" },
    { id: "cryptocurrencies", label: "Cryptocurrencies" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-md border-t-4 border-t-wealth-teal">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-wealth-gray">Progress</span>
              <span className="text-sm font-medium text-wealth-navy">{currentStep} of {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-teal h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-wealth-navy">Your Investment Profile</h2>
                  
                  <FormField
                    control={form.control}
                    name="investmentKnowledge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your investment knowledge level?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="beginner" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Beginner - I'm just getting started with investing
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="intermediate" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Intermediate - I understand basic investment concepts
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="advanced" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Advanced - I have significant investment experience
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="investmentTimeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your investment time horizon?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="short" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Short term (1-3 years)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="medium" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Medium term (3-7 years)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="long" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Long term (7+ years)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Financial Goals and Risk Tolerance */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-wealth-navy">Goals & Risk Tolerance</h2>
                  
                  <FormField
                    control={form.control}
                    name="financialGoals"
                    render={() => (
                      <FormItem>
                        <FormLabel>What are your financial goals? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {financialGoalsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="financialGoals"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="riskTolerance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your risk tolerance level? (1: Very Conservative, 10: Very Aggressive)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Slider
                              min={1}
                              max={10}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-wealth-gray">
                              <span>Conservative</span>
                              <span>Moderate</span>
                              <span>Aggressive</span>
                            </div>
                            <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 h-2 rounded-md mt-1"></div>
                            <div className="text-center font-medium text-wealth-navy">
                              Your selection: <span className="text-wealth-teal">{field.value}</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Higher risk may offer higher potential returns but also comes with greater volatility.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Investment Amount */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-wealth-navy">Investment Amount</h2>
                  
                  <FormField
                    control={form.control}
                    name="initialInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How much are you planning to invest initially?</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">₹</span>
                            <Input
                              type="number"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyContribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How much can you contribute monthly?</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">₹</span>
                            <Input
                              type="number"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Regular investments through Systematic Investment Plans (SIPs) help in averaging your costs.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Investment Preferences */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-wealth-navy">Investment Preferences</h2>
                  
                  <FormField
                    control={form.control}
                    name="preferredAssetClasses"
                    render={() => (
                      <FormItem>
                        <FormLabel>Which asset classes are you interested in? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {assetClassOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="preferredAssetClasses"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredSectors"
                    render={() => (
                      <FormItem>
                        <FormLabel>Which sectors are you interested in? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {sectorsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="preferredSectors"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Final Preferences */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-wealth-navy">Final Preferences</h2>
                  
                  <FormField
                    control={form.control}
                    name="existingInvestments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you already have any investments? (Select all that apply)</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {assetClassOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="existingInvestments"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="esgPreference"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>ESG Preference</FormLabel>
                          <FormDescription>
                            I prefer investments that consider Environmental, Social, and Governance factors.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-wealth-navy hover:bg-opacity-90">
                    Get My Personalized Recommendations
                  </Button>
                </div>
              )}

              {/* Navigation buttons */}
              {currentStep < totalSteps && (
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-wealth-teal hover:bg-opacity-90"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentStep > 1 && currentStep < totalSteps && (
                <div className="flex justify-start pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    className="text-sm text-wealth-gray hover:text-wealth-navy"
                  >
                    Back to Previous Step
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentQuestionnaire;
