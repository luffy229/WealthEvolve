
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import InvestmentQuestionnaire from '@/components/InvestmentQuestionnaire';
import InvestmentRecommendations from '@/components/InvestmentRecommendations';

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

  const handleQuestionnaireComplete = (results: QuestionnaireResult) => {
    console.log("Questionnaire completed with results:", results);
    setResults(results);
    setIsQuestionnaireDone(true);
    // Scroll to the recommendations section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restartQuestionnaire = () => {
    setIsQuestionnaireDone(false);
    setResults(null);
    // Scroll back to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">
              {isQuestionnaireDone ? "Your Personalized Investment Recommendations" : "Investment Analyzer"}
            </h1>
            <p className="text-wealth-gray text-lg">
              {isQuestionnaireDone 
                ? "Based on your answers, we've created a customized investment plan tailored to your goals and risk tolerance."
                : "Answer a few questions about your financial goals, risk tolerance, and investment preferences to receive personalized investment recommendations."}
            </p>
          </div>
          <Separator className="mb-10" />
          
          {isQuestionnaireDone && results ? (
            <div className="animate-fade-in">
              <InvestmentRecommendations 
                results={results} 
                onRestart={restartQuestionnaire} 
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <InvestmentQuestionnaire onComplete={handleQuestionnaireComplete} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentAnalyzer;
