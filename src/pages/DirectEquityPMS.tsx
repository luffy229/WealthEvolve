
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, TrendingUp, Briefcase, LineChart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DirectEquityPMS: React.FC = () => {
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
                  Direct Equity <span className="text-wealth-gold">Portfolio Management</span>
                </h1>
                <p className="text-lg opacity-90 mb-8">
                  Personalized investment strategies with direct stock ownership for potentially higher returns and complete transparency.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white">
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy">
                    Download Brochure
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-wealth-teal/10 rounded-full flex items-center justify-center">
                    <BarChart2 size={160} className="text-wealth-teal" />
                  </div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-wealth-gold/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-wealth-teal/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-wealth-light">
          <div className="wealth-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 text-wealth-navy mb-4">Portfolio Management Service Benefits</h2>
              <p className="text-wealth-gray text-lg">
                Our direct equity PMS offers several advantages over traditional mutual fund investments
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Personalized Strategy",
                  description: "Investment strategy tailored specifically to your financial goals, risk tolerance, and time horizon.",
                  icon: Briefcase
                },
                {
                  title: "Direct Ownership",
                  description: "Direct ownership of stocks and securities in your name, providing complete transparency and control.",
                  icon: Users
                },
                {
                  title: "Tax Efficiency",
                  description: "Strategic tax harvesting and optimization to maximize your after-tax returns.",
                  icon: TrendingUp
                },
                {
                  title: "Higher Return Potential",
                  description: "Direct stock selection provides opportunities for higher returns compared to diversified funds.",
                  icon: LineChart
                },
                {
                  title: "Lower Fee Structure",
                  description: "Competitive fee structure with performance-based incentives aligned with your success.",
                  icon: BarChart2
                },
                {
                  title: "Risk Management",
                  description: "Sophisticated risk management protocols to protect your capital during market downturns.",
                  icon: Shield
                }
              ].map((benefit, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-wealth-navy">
                      <benefit.icon className="mr-3 h-6 w-6 text-wealth-teal" />
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-wealth-gray">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="py-16 bg-white">
          <div className="wealth-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 text-wealth-navy mb-4">Performance Track Record</h2>
              <p className="text-wealth-gray text-lg">
                Our strategies have consistently outperformed major market indices
              </p>
            </div>

            <div className="bg-wealth-light rounded-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "5 Year CAGR", value: "18.6%", change: "+3.2% vs Nifty" },
                  { label: "3 Year CAGR", value: "22.4%", change: "+4.7% vs Nifty" },
                  { label: "1 Year Return", value: "15.2%", change: "+2.1% vs Nifty" },
                  { label: "Since Inception", value: "16.8%", change: "+3.8% vs Nifty" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow">
                    <p className="text-wealth-gray text-sm">{stat.label}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-wealth-navy my-2">{stat.value}</h3>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-wealth-gray italic mb-4">
                  Past performance is not indicative of future results. Returns as of May 1, 2025.
                </p>
                <Button variant="outline" className="text-wealth-navy border-wealth-navy hover:bg-wealth-navy hover:text-white">
                  Download Detailed Performance Report
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-wealth-navy text-white">
          <div className="wealth-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Ready to elevate your investment strategy?</h2>
              <p className="text-lg opacity-80 mb-8">
                Our portfolio managers are ready to create a customized investment plan that aligns with your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white">
                  Schedule a Consultation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy">
                  Learn More About Our Process
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

export default DirectEquityPMS;
