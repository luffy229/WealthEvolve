
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, PieChart, TrendingUp, ChartBar } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you react if your investment dropped by 20% in a month?",
    options: [
      { text: "Sell everything to prevent further losses", score: 1 },
      { text: "Sell some investments to reduce risk", score: 2 },
      { text: "Hold and wait for recovery", score: 3 },
      { text: "Buy more to take advantage of lower prices", score: 4 }
    ]
  },
  {
    id: 2,
    text: "What is your primary investment goal?",
    options: [
      { text: "Preserving capital with minimal risk", score: 1 },
      { text: "Generating stable income", score: 2 },
      { text: "Achieving balanced growth with moderate risk", score: 3 },
      { text: "Maximizing growth with higher risk tolerance", score: 4 }
    ]
  },
  {
    id: 3,
    text: "How long do you plan to keep your money invested?",
    options: [
      { text: "Less than 1 year", score: 1 },
      { text: "1-3 years", score: 2 },
      { text: "3-7 years", score: 3 },
      { text: "More than 7 years", score: 4 }
    ]
  },
  {
    id: 4,
    text: "Which statement best describes your investment knowledge?",
    options: [
      { text: "I have little or no knowledge about investing", score: 1 },
      { text: "I understand basic investment concepts", score: 2 },
      { text: "I have good understanding of different investments", score: 3 },
      { text: "I consider myself an experienced investor", score: 4 }
    ]
  },
  {
    id: 5,
    text: "What percentage of your monthly income can you comfortably save/invest?",
    options: [
      { text: "Less than 5%", score: 1 },
      { text: "5-15%", score: 2 },
      { text: "16-25%", score: 3 },
      { text: "More than 25%", score: 4 }
    ]
  },
  {
    id: 6,
    text: "If you had to choose one investment approach, which would you prefer?",
    options: [
      { text: "Conservative - lower returns with high safety", score: 1 },
      { text: "Moderately Conservative - focus on safety with some growth", score: 2 },
      { text: "Balanced - mix of growth and safety", score: 3 },
      { text: "Aggressive - higher returns with more volatility", score: 4 }
    ]
  },
];

type RiskProfile = {
  type: string;
  description: string;
  assetAllocation: {
    equity: number;
    debt: number;
    gold: number;
  };
  icon: React.ReactNode;
}

const riskProfiles: { [key: string]: RiskProfile } = {
  conservative: {
    type: "Conservative",
    description: "You prefer stability and are uncomfortable with significant market fluctuations. Focus on capital preservation with modest returns.",
    assetAllocation: {
      equity: 20,
      debt: 70,
      gold: 10
    },
    icon: <ShieldCheck className="h-12 w-12 text-blue-600" />
  },
  moderatelyConservative: {
    type: "Moderately Conservative",
    description: "You seek reasonable growth with limited volatility. Willing to accept some market fluctuations for better returns.",
    assetAllocation: {
      equity: 40,
      debt: 50,
      gold: 10
    },
    icon: <PieChart className="h-12 w-12 text-green-600" />
  },
  balanced: {
    type: "Balanced",
    description: "You aim for a balance between growth and stability. Comfortable with moderate market fluctuations for long-term gains.",
    assetAllocation: {
      equity: 60,
      debt: 30,
      gold: 10
    },
    icon: <ChartBar className="h-12 w-12 text-amber-600" />
  },
  aggressive: {
    type: "Aggressive",
    description: "You prioritize growth and can tolerate significant market volatility. Seeking higher returns with a long-term investment horizon.",
    assetAllocation: {
      equity: 80,
      debt: 15,
      gold: 5
    },
    icon: <TrendingUp className="h-12 w-12 text-red-600" />
  }
};

const RiskProfiler: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [profile, setProfile] = useState<RiskProfile | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  const handleOptionSelect = (score: number) => {
    setSelectedOption(score);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    setAnswers({ ...answers, [currentQuestionIndex]: selectedOption });
    setSelectedOption(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateRiskProfile();
    }
  };
  
  const calculateRiskProfile = () => {
    const newAnswers = { ...answers, [currentQuestionIndex]: selectedOption! };
    
    // Calculate average score
    const totalScore = Object.values(newAnswers).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / questions.length;
    
    if (averageScore <= 1.75) {
      setProfile(riskProfiles.conservative);
    } else if (averageScore <= 2.5) {
      setProfile(riskProfiles.moderatelyConservative);
    } else if (averageScore <= 3.25) {
      setProfile(riskProfiles.balanced);
    } else {
      setProfile(riskProfiles.aggressive);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setProfile(null);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-md">
        {profile === null ? (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-wealth-navy mb-2">Investment Risk Profile Quiz</h2>
              <p className="text-wealth-gray mb-4">
                Answer 6 simple questions to determine your investment risk profile
              </p>
              <Progress value={progress} className="h-2 w-full bg-gray-200" />
              <p className="mt-1 text-sm text-wealth-gray">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium text-wealth-navy mb-4">
                  {questions[currentQuestionIndex].text}
                </h3>
                
                <RadioGroup className="space-y-4" value={selectedOption?.toString() || ""} onValueChange={(value) => handleOptionSelect(parseInt(value))}>
                  {questions[currentQuestionIndex].options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value={option.score.toString()} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleNextQuestion} 
                disabled={selectedOption === null}
                size="lg"
                className="bg-wealth-navy hover:bg-wealth-navy/90"
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Show My Risk Profile"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {profile.icon}
            </div>
            <h2 className="text-2xl font-bold text-wealth-navy mb-2">Your Risk Profile: <span className="text-wealth-teal">{profile.type}</span></h2>
            <p className="text-wealth-gray mb-8 max-w-2xl mx-auto">
              {profile.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-wealth-navy mb-4">Recommended Asset Allocation</h3>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 bg-wealth-teal rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {profile.assetAllocation.equity}%
                    </div>
                    <p className="mt-2 font-medium">Equity</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 bg-wealth-navy rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {profile.assetAllocation.debt}%
                    </div>
                    <p className="mt-2 font-medium">Debt</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {profile.assetAllocation.gold}%
                    </div>
                    <p className="mt-2 font-medium">Gold</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
              <h4 className="font-medium text-wealth-navy mb-2">What This Means For You</h4>
              <p className="text-wealth-gray mb-4">
                Based on your risk profile, we recommend a balanced approach to building your investment portfolio.
                Focus on a mix of investment types that align with your risk tolerance and financial goals.
              </p>
              <Button 
                onClick={resetQuiz}
                variant="outline" 
                className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskProfiler;
