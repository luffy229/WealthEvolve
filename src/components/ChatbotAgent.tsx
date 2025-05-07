
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Bot, Sparkles, ChevronRight } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm Eva, your personal wealth advisor. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
  }
];

const suggestions = [
  "How do I start investing?",
  "Tell me about your investment plans",
  "What's your average return?",
  "How much do I need to start?"
];

const ChatbotAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that! Our team of financial advisors can provide personalized guidance.",
        "Great question! WealthEvolve offers several investment strategies tailored to different risk profiles.",
        "Our portfolios have delivered an average annual return of 15%+ over the past 5 years, significantly outperforming traditional investment options.",
        "You can start investing with WealthEvolve with just ₹50,000. Our experts will help you build a portfolio suited to your goals."
      ];
      
      const responseIndex = Math.floor(Math.random() * botResponses.length);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: botResponses[responseIndex],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
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
            isOpen ? 'bg-wealth-gold' : 'bg-wealth-teal'
          } hover:shadow-xl transition-all duration-300`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-wealth-navy to-wealth-teal p-4 text-white shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-3">
                  <Bot className="h-5 w-5 text-wealth-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Eva | WealthEvolve AI</h3>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    <span className="text-xs opacity-90">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white opacity-80 hover:opacity-100 hover:bg-white/10">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
                          ? 'bg-wealth-navy text-white rounded-tr-none'
                          : 'bg-white shadow-md rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-[10px] opacity-70 text-right mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-white rounded-2xl px-4 py-2 shadow-md rounded-tl-none">
                      <div className="flex space-x-1">
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
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Quick reply suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-wealth-navy flex items-center whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {suggestion}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
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
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="ml-2 h-8 w-8 p-0 bg-wealth-teal text-white hover:bg-wealth-teal/80 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">Powered by WealthEvolve AI Assistant</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAgent;
