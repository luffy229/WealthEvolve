
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Landmark, LineChart, Clock, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FinancialPlanning: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
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

  const steps = [
    {
      step: "Step 1",
      title: "Risk Assessment",
      description: "Complete our scientific risk profiling questionnaire to determine your risk tolerance, capacity, and preferences.",
      icon: Shield,
      color: "bg-blue-500"
    },
    {
      step: "Step 2",
      title: "Goal Setting",
      description: "Work with our advisors to define your short and long-term financial goals with specific timelines and targets.",
      icon: Target,
      color: "bg-purple-500"
    },
    {
      step: "Step 3",
      title: "Financial Plan",
      description: "Receive a comprehensive financial plan with investment recommendations and action steps.",
      icon: Landmark,
      color: "bg-teal-500"
    }
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
              className="absolute top-20 right-[15%] w-40 h-40 rounded-full bg-wealth-teal/20 blur-xl"
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-10 left-[10%] w-60 h-60 rounded-full bg-wealth-gold/10 blur-xl"
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
                  Risk Profiling & <span className="text-gradient bg-gradient-to-r from-wealth-gold to-amber-300">Financial Planning</span>
                </motion.h1>
                <motion.p 
                  className="text-lg opacity-90 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Science-based assessment of your risk tolerance paired with comprehensive financial roadmapping to help you achieve your life goals.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-wealth-teal hover:bg-opacity-90 text-white shadow-lg shadow-wealth-teal/30 hover:shadow-wealth-teal/40 transition-all hover:translate-y-[-2px]"
                  >
                    Take Risk Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-wealth-navy transition-all hover:shadow-lg"
                  >
                    Book Consultation
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
                      <Shield size={160} className="text-wealth-teal" />
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

        {/* Process Section - Interactive Steps */}
        <section className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4OTlBQTUiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0xaDF2MWgtMXYtMXptLTIuNS0xaDFsMC41IDFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 text-wealth-navy mb-4">Our Financial Planning Process</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-wealth-teal to-wealth-navy mx-auto mb-4"></div>
              <p className="text-wealth-gray text-lg">
                A structured approach to understanding your financial needs and creating a plan for success
              </p>
            </motion.div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Progress line */}
              <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-gray-200">
                <motion.div 
                  className="h-full bg-wealth-teal"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep + 1) * (100/3)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onHoverStart={() => setActiveStep(index)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center z-10 mb-4 transition-all duration-300 ${index <= activeStep ? 'bg-wealth-navy text-white' : 'bg-gray-200 text-wealth-gray'}`}
                      >
                        <step.icon size={32} />
                      </div>
                      <div 
                        className={`text-center p-6 shadow-lg rounded-lg border transition-all duration-500 
                          ${index === activeStep 
                            ? 'bg-gradient-to-br from-wealth-navy/5 to-wealth-teal/5 border-wealth-teal/20 shadow-wealth-teal/10' 
                            : 'bg-white border-gray-100'}`
                        }
                      >
                        <h3 className="text-wealth-teal text-sm font-medium mb-2">{step.step}</h3>
                        <h4 className="font-serif text-xl font-semibold mb-3 text-wealth-navy">{step.title}</h4>
                        <p className="text-wealth-gray">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Animated highlight for active step */}
                    {index === activeStep && (
                      <motion.div 
                        className="absolute inset-0 rounded-lg border-2 border-wealth-teal/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-wealth-light relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-20 left-[20%] w-40 h-40 rounded-full bg-wealth-navy/5 blur-xl"
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-wealth-gold/5 blur-xl"
              animate={{ 
                y: [0, 20, 0], 
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 text-wealth-navy mb-4">Financial Planning Services</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-wealth-teal to-wealth-navy mx-auto mb-4"></div>
              <p className="text-wealth-gray text-lg">
                Comprehensive services to address your complete financial picture
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
                  title: "Retirement Planning",
                  description: "Create a strategy to ensure you have enough resources for a comfortable retirement.",
                  icon: Clock,
                  color: "from-blue-500/10 to-indigo-500/10",
                  iconColor: "text-blue-500"
                },
                {
                  title: "Investment Advisory",
                  description: "Expert guidance on asset allocation and investment selection based on your risk profile.",
                  icon: BarChart2,
                  color: "from-teal-500/10 to-cyan-500/10",
                  iconColor: "text-teal-500"
                },
                {
                  title: "Tax Planning",
                  description: "Strategies to minimize tax liability and maximize after-tax returns on your investments.",
                  icon: Landmark,
                  color: "from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-500"
                },
                {
                  title: "Estate Planning",
                  description: "Ensure your assets are distributed according to your wishes with minimal tax implications.",
                  icon: Shield,
                  color: "from-purple-500/10 to-violet-500/10",
                  iconColor: "text-purple-500"
                },
                {
                  title: "Education Planning",
                  description: "Save efficiently for your children's education with targeted investment strategies.",
                  icon: Target,
                  color: "from-amber-500/10 to-yellow-500/10",
                  iconColor: "text-amber-500"
                },
                {
                  title: "Wealth Creation",
                  description: "Long-term wealth building strategies customized to your risk profile and goals.",
                  icon: LineChart,
                  color: "from-red-500/10 to-rose-500/10",
                  iconColor: "text-red-500"
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className={`border-none shadow-md hover:shadow-lg transition-all overflow-hidden bg-gradient-to-br ${service.color} h-full`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start mb-4">
                        <div className={`bg-white p-3 rounded-full mr-4 shadow-md group-hover:scale-110 transition-transform duration-300 ${service.iconColor}`}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-wealth-navy pt-2">{service.title}</h3>
                      </div>
                      <p className="text-wealth-gray pl-16">{service.description}</p>
                      
                      {/* Service icon watermark */}
                      <div className="absolute bottom-0 right-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                        <service.icon size={100} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-wealth-navy text-white relative overflow-hidden">
          {/* Animated background */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-wealth-teal/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0xaDF2MWgtMXYtMXptLTIuNS0xaDFsMC41IDFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          </div>
          
          <div className="wealth-container relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-6">Begin Your Financial Journey Today</h2>
              <p className="text-lg opacity-80 mb-8">
                The first step towards financial security is understanding your risk profile and creating a solid plan.
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
                  Take Free Risk Assessment
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-wealth-navy transition-all hover:shadow-lg"
                >
                  Schedule Consultation
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

export default FinancialPlanning;
