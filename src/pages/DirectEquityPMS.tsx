
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, TrendingUp, Briefcase, LineChart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DirectEquityPMS: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const performanceData = [
    { label: "5 Year CAGR", value: "18.6%", change: "+3.2% vs Nifty" },
    { label: "3 Year CAGR", value: "22.4%", change: "+4.7% vs Nifty" },
    { label: "1 Year Return", value: "15.2%", change: "+2.1% vs Nifty" },
    { label: "Since Inception", value: "16.8%", change: "+3.8% vs Nifty" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wealth-light/30">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-wealth-navy to-wealth-navy/90 text-white py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-wealth-teal/20 blur-xl"
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-wealth-gold/10 blur-xl"
              animate={{ 
                y: [0, 20, 0], 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>
          
          <div className="wealth-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="animate-fade-in z-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Direct Equity <span className="text-gradient bg-gradient-to-r from-wealth-gold to-amber-300">Portfolio Management</span>
                </motion.h1>
                <motion.p 
                  className="text-lg opacity-90 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Personalized investment strategies with direct stock ownership for potentially higher returns and complete transparency.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white shadow-lg shadow-wealth-teal/30 hover:shadow-wealth-teal/40 transition-all hover:translate-y-[-2px]">
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" className="border-white text-black hover:bg-white hover:text-wealth-navy transition-all hover:shadow-lg">
                    Download Brochure
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="hidden md:flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-80 h-80 bg-wealth-teal/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-wealth-teal/20 border-dashed"></div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <BarChart2 size={160} className="text-wealth-teal" />
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="absolute -top-6 -right-6 w-24 h-24 bg-wealth-gold/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-wealth-teal/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-wealth-light relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 text-wealth-navy mb-4">Portfolio Management Service Benefits</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-wealth-teal to-wealth-navy mx-auto mb-4"></div>
              <p className="text-wealth-gray text-lg">
                Our direct equity PMS offers several advantages over traditional mutual fund investments
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Personalized Strategy",
                  description: "Investment strategy tailored specifically to your financial goals, risk tolerance, and time horizon.",
                  icon: Briefcase,
                  color: "from-blue-500/20 to-indigo-500/20",
                  iconColor: "text-blue-500"
                },
                {
                  title: "Direct Ownership",
                  description: "Direct ownership of stocks and securities in your name, providing complete transparency and control.",
                  icon: Users,
                  color: "from-purple-500/20 to-violet-500/20",
                  iconColor: "text-purple-500"
                },
                {
                  title: "Tax Efficiency",
                  description: "Strategic tax harvesting and optimization to maximize your after-tax returns.",
                  icon: TrendingUp,
                  color: "from-green-500/20 to-emerald-500/20",
                  iconColor: "text-green-500"
                },
                {
                  title: "Higher Return Potential",
                  description: "Direct stock selection provides opportunities for higher returns compared to diversified funds.",
                  icon: LineChart,
                  color: "from-amber-500/20 to-yellow-500/20",
                  iconColor: "text-amber-500"
                },
                {
                  title: "Lower Fee Structure",
                  description: "Competitive fee structure with performance-based incentives aligned with your success.",
                  icon: BarChart2,
                  color: "from-teal-500/20 to-cyan-500/20",
                  iconColor: "text-teal-500"
                },
                {
                  title: "Risk Management",
                  description: "Sophisticated risk management protocols to protect your capital during market downturns.",
                  icon: Shield,
                  color: "from-red-500/20 to-rose-500/20",
                  iconColor: "text-red-500"
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="group"
                >
                  <Card className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden bg-gradient-to-br ${benefit.color} hover:translate-y-[-5px]`}>
                    <CardHeader className="pb-2 relative">
                      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <benefit.icon size={120} className={benefit.iconColor} />
                      </div>
                      <CardTitle className="flex items-center text-wealth-navy">
                        <div className={`mr-3 p-2 rounded-full ${benefit.iconColor} bg-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <benefit.icon className="h-6 w-6" />
                        </div>
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-wealth-gray">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-wealth-navy/5 transform skew-x-[-15deg] translate-x-1/3"></div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 text-wealth-navy mb-4">Performance Track Record</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-wealth-gold to-amber-500 mx-auto mb-4"></div>
              <p className="text-wealth-gray text-lg">
                Our strategies have consistently outperformed major market indices
              </p>
            </motion.div>

            <motion.div 
              className="bg-wealth-light rounded-lg p-8 shadow-lg border border-wealth-teal/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {performanceData.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-wealth-teal/20 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-wealth-gray text-sm">{stat.label}</p>
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-wealth-navy my-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-wealth-gray italic mb-4">
                  Past performance is not indicative of future results. Returns as of May 1, 2025.
                </p>
                <Button 
                  variant="outline" 
                  className="text-wealth-navy border-wealth-navy hover:bg-wealth-navy hover:text-white transition-all duration-300 hover:shadow-md"
                >
                  Download Detailed Performance Report
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-wealth-navy text-white relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0xaDF2MWgtMXYtMXptLTIuNS0xaDFsMC41IDFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-70"></div>
            <motion.div 
              className="absolute top-10 left-10 w-72 h-72 rounded-full bg-wealth-teal/10 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-wealth-gold/10 blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-6">Ready to elevate your investment strategy?</h2>
              <p className="text-lg opacity-80 mb-8">
                Our portfolio managers are ready to create a customized investment plan that aligns with your financial goals.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Button 
                  size="lg" 
                  className="bg-wealth-teal hover:bg-opacity-90 text-white shadow-lg shadow-wealth-teal/30 hover:shadow-wealth-teal/40 transition-all hover:translate-y-[-2px]"
                >
                  Schedule a Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-black hover:bg-white hover:text-wealth-navy transition-all hover:shadow-lg"
                >
                  Learn More About Our Process
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DirectEquityPMS;
