
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import InvestmentQuestionnaire from '@/components/InvestmentQuestionnaire';
import InvestmentRecommendations from '@/components/InvestmentRecommendations';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, TrendingUp, Award, ChartPie, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Questionnaire result interface
export interface QuestionnaireResult {
  riskTolerance: number; // 1-10 scale
  investmentTimeframe: string; // "short", "medium", "long"
  financialGoals: string[];
  initialInvestment: number;
  monthlyContribution: number;
  preferredSectors: string[];
  existingInvestments: string[];
  esgPreference: boolean; // Environmental, Social, and Governance preference
  preferredAssetClasses: string[];
  investmentKnowledge: string; // "beginner", "intermediate", "advanced"
}

const InvestmentAnalyzer: React.FC = () => {
  const [isQuestionnaireDone, setIsQuestionnaireDone] = useState(false);
  const [results, setResults] = useState<QuestionnaireResult | null>(null);
  const [animateSwitch, setAnimateSwitch] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  // Animated particles data
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // random position
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  useEffect(() => {
    // Show particles after a short delay for a more dramatic entrance
    const timer = setTimeout(() => {
      setParticlesVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleQuestionnaireComplete = (results: QuestionnaireResult) => {
    console.log("Questionnaire completed with results:", results);
    setResults(results);
    setAnimateSwitch(true);
    setShowLoading(true);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Complete the transition after loading finishes
    setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      
      setTimeout(() => {
        setShowLoading(false);
        setIsQuestionnaireDone(true);
        // Scroll to the recommendations section
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    }, 3500);
  };

  const restartQuestionnaire = () => {
    setAnimateSwitch(true);
    
    // Animate transition back to questionnaire
    setTimeout(() => {
      setIsQuestionnaireDone(false);
      setResults(null);
      // Scroll back to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wealth-light/50 via-white to-wealth-light/30 -z-10"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlesVisible && particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-wealth-teal/20 to-wealth-navy/10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Large decorative gradient circles */}
        <motion.div 
          className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-wealth-teal/10 to-wealth-navy/5" 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-wealth-navy/10 to-wealth-teal/5" 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 25, 
            ease: "easeInOut", 
            repeat: Infinity,
            delay: 5
          }}
        />
        
        {/* Animated financial symbols */}
        {["$", "₹", "%", "₿", "€", "¥"].map((symbol, idx) => (
          <motion.div 
            key={idx}
            className="absolute text-wealth-teal/10 font-bold select-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.2, 0],
              rotate: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              ease: "easeInOut",
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {symbol}
          </motion.div>
        ))}
        
        {/* Light beam effect */}
        <motion.div 
          className="absolute top-0 -left-40 h-screen w-80 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 hidden lg:block"
          animate={{
            x: [-800, 2000]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 15
          }}
        />
      </div>
      
      <Navbar />
      <main className="relative z-10">        
        <div className="wealth-container py-12 md:py-20">
          <motion.div 
            className="max-w-4xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="relative mr-2"
                >
                  {isQuestionnaireDone ? (
                    <Trophy className="h-9 w-9 text-wealth-teal" />
                  ) : (
                    <Sparkles className="h-9 w-9 text-wealth-teal" />
                  )}
                  
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-wealth-teal/20"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0, 0.4]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-wealth-navy via-wealth-teal to-wealth-navy bg-clip-text text-transparent">
                  {isQuestionnaireDone ? "Your Investment Plan" : "Investment Analyzer"}
                </h1>
              </div>
              
              {isQuestionnaireDone && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 10,
                    delay: 0.3
                  }}
                >
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 px-3 py-1 text-sm flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Personalized
                  </Badge>
                </motion.div>
              )}
            </div>
            
            <motion.p 
              className="text-wealth-gray text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isQuestionnaireDone 
                ? "Based on your goals and risk tolerance, we've crafted a personalized investment strategy designed to maximize your returns while keeping risk in check."
                : "Discover your perfect investment strategy with our powerful analyzer. Answer a few questions about your financial goals and preferences to get started."}
            </motion.p>
            
            {!isQuestionnaireDone && (
              <motion.div 
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm border border-wealth-teal/20 shadow-sm">
                  <Star className="h-4 w-4 text-amber-500 mr-1.5" />
                  <span className="text-wealth-navy">95% Accuracy Rate</span>
                </div>
                
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm border border-wealth-teal/20 shadow-sm">
                  <ChartPie className="h-4 w-4 text-wealth-teal mr-1.5" />
                  <span className="text-wealth-navy">AI-Powered Analysis</span>
                </div>
                
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm border border-wealth-teal/20 shadow-sm">
                  <Award className="h-4 w-4 text-purple-500 mr-1.5" />
                  <span className="text-wealth-navy">Expert Recommendations</span>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          <Separator className="mb-10 bg-gradient-to-r from-wealth-navy/20 via-wealth-teal/50 to-wealth-navy/20 h-0.5" />
          
          {/* Loading overlay */}
          <AnimatePresence>
            {showLoading && (
              <motion.div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center px-4 md:px-0">
                  <motion.div 
                    className="flex justify-center mb-8"
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <ChartPie className="h-20 w-20 text-wealth-teal" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">Analyzing Your Data</h2>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    Our AI is analyzing your preferences and evaluating thousands of investment opportunities to create your personalized plan...
                  </p>
                  
                  <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-3 mb-6 relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-wealth-teal to-wealth-navy rounded-full"
                      style={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Moving light effect */}
                    <motion.div 
                      className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ 
                        x: [-80, 500]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                  
                  <p className="text-lg font-medium text-white">{Math.round(loadingProgress)}%</p>
                  
                  {/* Animated tasks being completed */}
                  <div className="mt-6 text-sm text-left max-w-md mx-auto">
                    <AnimatePresence>
                      {loadingProgress > 20 && (
                        <motion.div 
                          className="flex items-center text-green-300 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-4 w-4 mr-2" /> Risk profile analysis complete
                        </motion.div>
                      )}
                      
                      {loadingProgress > 50 && (
                        <motion.div 
                          className="flex items-center text-green-300 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-4 w-4 mr-2" /> Asset allocation model generated
                        </motion.div>
                      )}
                      
                      {loadingProgress > 75 && (
                        <motion.div 
                          className="flex items-center text-green-300 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-4 w-4 mr-2" /> Fund selection optimization
                        </motion.div>
                      )}
                      
                      {loadingProgress === 100 && (
                        <motion.div 
                          className="flex items-center text-green-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-4 w-4 mr-2" /> Investment plan ready!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main content with questionnaire or recommendations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isQuestionnaireDone ? "recommendations" : "questionnaire"}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100, 
                damping: 15
              }}
            >
              {isQuestionnaireDone && results ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-wealth-teal/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-wealth-navy to-wealth-teal p-4 flex items-center">
                    <TrendingUp className="h-6 w-6 text-white mr-3" />
                    <h2 className="text-xl font-medium text-white">Your Personalized Investment Plan</h2>
                  </div>
                  
                  <div className="p-6">
                    <InvestmentRecommendations 
                      results={results} 
                      onRestart={restartQuestionnaire} 
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-wealth-teal/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-wealth-navy to-wealth-teal p-4 flex items-center">
                    <Sparkles className="h-6 w-6 text-white mr-3" />
                    <h2 className="text-xl font-medium text-white">Investment Questionnaire</h2>
                  </div>
                  
                  <div className="p-6">
                    <InvestmentQuestionnaire onComplete={handleQuestionnaireComplete} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Investor insights section */}
          {!isQuestionnaireDone && (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-wealth-navy mb-6 flex items-center">
                <Star className="h-5 w-5 text-wealth-gold mr-2" />
                Investor Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Risk Diversification",
                    content: "Balancing investments across different asset classes can reduce overall portfolio volatility and improve risk-adjusted returns.",
                    icon: ChartPie
                  },
                  {
                    title: "Time Horizon",
                    content: "Longer investment horizons allow for more aggressive growth strategies and better recovery from market fluctuations.",
                    icon: Trophy
                  },
                  {
                    title: "Compound Growth",
                    content: "Reinvesting returns creates a compounding effect that significantly accelerates wealth accumulation over time.",
                    icon: TrendingUp
                  }
                ].map((insight, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-br from-white to-wealth-light/20 rounded-xl p-5 shadow-md border border-wealth-teal/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-wealth-navy to-wealth-teal p-2.5 rounded-lg text-white mr-3">
                        <insight.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-lg text-wealth-navy">{insight.title}</h3>
                    </div>
                    <p className="text-wealth-gray">{insight.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentAnalyzer;
