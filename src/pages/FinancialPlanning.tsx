
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Landmark, LineChart, Clock, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinancialPlanning: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-wealth-navy to-wealth-navy/80 text-white py-20">
          <div className="wealth-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                  Risk Profiling & <span className="text-wealth-gold">Financial Planning</span>
                </h1>
                <p className="text-lg opacity-90 mb-8">
                  Science-based assessment of your risk tolerance paired with comprehensive financial roadmapping to help you achieve your life goals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white">
                    Take Risk Assessment
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy">
                    Book Consultation
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-wealth-teal/10 rounded-full flex items-center justify-center">
                    <Shield size={160} className="text-wealth-teal" />
                  </div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-wealth-gold/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-wealth-teal/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="wealth-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 text-wealth-navy mb-4">Our Financial Planning Process</h2>
              <p className="text-wealth-gray text-lg">
                A structured approach to understanding your financial needs and creating a plan for success
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-wealth-teal/20 -translate-y-1/2"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "Step 1",
                    title: "Risk Assessment",
                    description: "Complete our scientific risk profiling questionnaire to determine your risk tolerance, capacity, and preferences.",
                    icon: Shield
                  },
                  {
                    step: "Step 2",
                    title: "Goal Setting",
                    description: "Work with our advisors to define your short and long-term financial goals with specific timelines and targets.",
                    icon: Target
                  },
                  {
                    step: "Step 3",
                    title: "Financial Plan",
                    description: "Receive a comprehensive financial plan with investment recommendations and action steps.",
                    icon: Landmark
                  }
                ].map((process, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center">
                      <div className="bg-wealth-navy text-white w-16 h-16 rounded-full flex items-center justify-center z-10 mb-4">
                        <process.icon size={32} />
                      </div>
                      <div className="text-center bg-white p-6 shadow-lg rounded-lg border border-wealth-teal/10 hover:shadow-xl transition-all">
                        <h3 className="text-wealth-teal text-sm font-medium mb-2">{process.step}</h3>
                        <h4 className="font-serif text-xl font-semibold mb-3 text-wealth-navy">{process.title}</h4>
                        <p className="text-wealth-gray">{process.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-wealth-light">
          <div className="wealth-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 text-wealth-navy mb-4">Financial Planning Services</h2>
              <p className="text-wealth-gray text-lg">
                Comprehensive services to address your complete financial picture
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Retirement Planning",
                  description: "Create a strategy to ensure you have enough resources for a comfortable retirement.",
                  icon: Clock
                },
                {
                  title: "Investment Advisory",
                  description: "Expert guidance on asset allocation and investment selection based on your risk profile.",
                  icon: BarChart2
                },
                {
                  title: "Tax Planning",
                  description: "Strategies to minimize tax liability and maximize after-tax returns on your investments.",
                  icon: Landmark
                },
                {
                  title: "Estate Planning",
                  description: "Ensure your assets are distributed according to your wishes with minimal tax implications.",
                  icon: Shield
                },
                {
                  title: "Education Planning",
                  description: "Save efficiently for your children's education with targeted investment strategies.",
                  icon: Target
                },
                {
                  title: "Wealth Creation",
                  description: "Long-term wealth building strategies customized to your risk profile and goals.",
                  icon: LineChart
                }
              ].map((service, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-wealth-teal bg-opacity-10 p-3 rounded-full mr-4">
                        <service.icon className="h-6 w-6 text-wealth-teal" />
                      </div>
                      <h3 className="font-serif text-xl font-medium text-wealth-navy">{service.title}</h3>
                    </div>
                    <p className="text-wealth-gray pl-16">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-wealth-navy text-white">
          <div className="wealth-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Begin Your Financial Journey Today</h2>
              <p className="text-lg opacity-80 mb-8">
                The first step towards financial security is understanding your risk profile and creating a solid plan.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white">
                  Take Free Risk Assessment
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FinancialPlanning;
