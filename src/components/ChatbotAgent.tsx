
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Info, Search } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
  options?: string[];
}

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm Eva, your personal wealth advisor. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
    options: [
      "How do I start investing?",
      "Tell me about your investment plans",
      "What's your average return?",
      "How much do I need to start?"
    ]
  }
];

// Preset responses for demo (will be replaced with AI integration later)
const presetResponses: Record<string, string> = {
  "how do i start investing?": "Starting to invest is easy with WealthEvolve! First, complete your risk profile assessment, then our advisors will help you choose the right investment plan based on your goals and risk tolerance. Would you like me to guide you through the process?",
  "tell me about your investment plans": "We offer several investment plans tailored to different financial goals:\n\n• Growth Portfolio: Higher risk, focused on long-term capital appreciation\n• Balanced Portfolio: Moderate risk with both growth and income objectives\n• Income Portfolio: Lower risk, focused on generating regular income\n• Tax Saver: ELSS funds with tax benefits under Section 80C\n\nWhich one sounds most interesting to you?",
  "what's your average return?": "Our portfolios have delivered impressive returns:\n\n• Growth Portfolio: 15.8% CAGR over 5 years\n• Balanced Portfolio: 12.3% CAGR over 5 years\n• Income Portfolio: 9.5% CAGR over 5 years\n\nThese figures outperform most traditional investment options. Remember, past performance doesn't guarantee future results.",
  "how much do i need to start?": "You can start investing with WealthEvolve with as little as ₹50,000. For our premium wealth management services, we recommend a minimum investment of ₹10 lakhs. Our team can create a customized plan based on your available capital.",
  "default": "Thank you for your message! One of our financial advisors will get back to you soon with more information. In the meantime, is there anything specific you'd like to know about our services?"
};

const ChatbotAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Add loading message from bot
    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: "",
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsTyping(true);
    
    // Simulate AI response with typing delay
    setTimeout(() => {
      // Get preset response or default
      const lowerText = text.toLowerCase().trim();
      const responseText = presetResponses[lowerText] || presetResponses.default;
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          id: Date.now() + 2,
          text: responseText,
          isLoading: false,
          options: ["Tell me more", "Speak to an advisor", "Thank you"]
        } : msg
      ));
      
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleContactAdvisor = () => {
    toast({
      title: "Request Received",
      description: "A financial advisor will contact you shortly.",
      duration: 4000
    });
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
      >
        <Button
          onClick={toggleChatbot}
          className={`w-14 h-14 rounded-full shadow-lg ${
            isOpen ? 'bg-wealth-gold hover:bg-wealth-gold/80' : 'bg-gradient-to-r from-wealth-teal to-wealth-navy hover:from-wealth-navy hover:to-wealth-teal'
          } hover:shadow-xl transition-all duration-300`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {isOpen ? <Search size={24} /> : <Info size={24} />}
          </motion.div>
        </Button>
        
        {/* Ping animation when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-wealth-teal"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        )}
      </motion.div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              height: isMinimized ? "72px" : "auto"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-wealth-navy to-wealth-teal p-4 text-white shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-3">
                  <Info className="h-5 w-5 text-wealth-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Eva | WealthEvolve AI</h3>
                  <div className="flex items-center">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <span className="text-xs opacity-90 ml-1">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white opacity-80 hover:opacity-100 hover:bg-white/10"
                  onClick={minimizeChatbot}
                >
                  {isMinimized ? 
                    <motion.div 
                      initial={{ rotate: 180 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Search className="h-4 w-4" />
                    </motion.div>
                    :
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ 
                        duration: 1,
                        repeat: 2,
                        repeatDelay: 0.1
                      }}
                    >
                      <Search className="h-4 w-4 rotate-90" />
                    </motion.div>
                  }
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white opacity-80 hover:opacity-100 hover:bg-white/10"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Animated container for messages and input */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Messages */}
                  <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-wealth-navy to-wealth-teal text-white rounded-tr-none'
                                : 'bg-white shadow-md rounded-tl-none'
                            }`}
                          >
                            {message.isLoading ? (
                              <div className="flex space-x-1 py-2 px-1">
                                <motion.div
                                  className="w-2 h-2 bg-wealth-teal rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-wealth-teal rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-wealth-teal rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                            ) : (
                              <>
                                <p className="text-sm whitespace-pre-line">{message.text}</p>
                                <p className="text-[10px] opacity-70 text-right mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                
                                {/* Option buttons for bot messages */}
                                {message.sender === 'bot' && message.options && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {message.options.map((option) => (
                                      <Button
                                        key={option}
                                        variant="outline"
                                        size="sm"
                                        className="mt-1 bg-gray-50 text-xs py-0 h-auto border-gray-200 hover:bg-gray-100"
                                        onClick={() => option === "Speak to an advisor" ? 
                                          handleContactAdvisor() : 
                                          handleSuggestionClick(option)
                                        }
                                      >
                                        {option}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Input area */}
                  <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-1">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none text-sm focus:outline-none py-2"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isTyping}
                      />
                      <Button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim() || isTyping}
                        className={`ml-2 h-8 w-8 p-0 ${!inputValue.trim() || isTyping ? 'bg-gray-300' : 'bg-gradient-to-r from-wealth-teal to-wealth-navy hover:from-wealth-navy hover:to-wealth-teal'} text-white rounded-full`}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-[10px] text-gray-400">Powered by WealthEvolve AI Assistant</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAgent;
