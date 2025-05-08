
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpenText, 
  ArrowUp, 
  ChartPie, 
  Users, 
  Calendar, 
  LineChart, 
  TrendingUp, 
  DollarSign, 
  Landmark, 
  Percent, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Extended blog posts array with more content
const blogPosts = [
  {
    id: 1,
    title: "Understanding Mutual Fund Categories: A Beginner's Guide",
    excerpt: "Learn about different types of mutual funds and how they fit into your investment strategy based on your risk profile and financial goals.",
    category: "Investing Basics",
    readTime: "5 min",
    date: "May 1, 2025",
    image: "/placeholder.svg",
    author: "Rajiv Sharma",
    role: "Investment Advisor",
    icon: <BookOpenText className="h-8 w-8 text-wealth-navy" />,
    color: "bg-blue-50"
  },
  {
    id: 2,
    title: "The Power of Diversification: Why It Matters",
    excerpt: "Discover how spreading your investments across different assets can help reduce risk and improve the stability of your portfolio returns.",
    category: "Portfolio Strategy",
    readTime: "7 min",
    date: "April 28, 2025",
    image: "/placeholder.svg",
    author: "Priya Mehta",
    role: "Portfolio Manager",
    icon: <ChartPie className="h-8 w-8 text-wealth-navy" />,
    color: "bg-green-50"
  },
  {
    id: 3,
    title: "SIP vs Lump Sum: Which Investment Strategy Works Better?",
    excerpt: "Compare the benefits of systematic investment plans versus one-time investments, and understand which approach might be right for you.",
    category: "Investment Strategy",
    readTime: "6 min",
    date: "April 25, 2025",
    image: "/placeholder.svg",
    author: "Amit Patel",
    role: "Financial Analyst",
    icon: <ArrowUp className="h-8 w-8 text-wealth-navy" />,
    color: "bg-purple-50"
  },
  {
    id: 4,
    title: "How to Analyze Mutual Fund Overlap in Your Portfolio",
    excerpt: "Learn why mutual fund overlap matters and how to identify and reduce redundancies in your investment portfolio for better diversification.",
    category: "Portfolio Analysis",
    readTime: "8 min",
    date: "April 22, 2025",
    image: "/placeholder.svg",
    author: "Sneha Gupta",
    role: "Research Analyst",
    icon: <Users className="h-8 w-8 text-wealth-navy" />,
    color: "bg-yellow-50"
  },
  {
    id: 5,
    title: "Navigating Market Volatility: Strategies for Uncertain Times",
    excerpt: "Explore practical approaches to managing your investments during market downturns and capitalize on opportunities while minimizing risk.",
    category: "Market Trends",
    readTime: "9 min",
    date: "April 19, 2025",
    image: "/placeholder.svg",
    author: "Vikram Malhotra",
    role: "Market Strategist",
    icon: <LineChart className="h-8 w-8 text-wealth-navy" />,
    color: "bg-red-50"
  },
  {
    id: 6,
    title: "Tax-Efficient Investing: Maximizing Your Returns After Tax",
    excerpt: "Understand how different investment vehicles are taxed and strategies to minimize your tax burden while building long-term wealth.",
    category: "Tax Planning",
    readTime: "6 min",
    date: "April 16, 2025",
    image: "/placeholder.svg",
    author: "Neha Sharma",
    role: "Tax Consultant",
    icon: <DollarSign className="h-8 w-8 text-wealth-navy" />,
    color: "bg-indigo-50"
  },
  {
    id: 7,
    title: "Retirement Planning in Your 30s: Creating a Solid Foundation",
    excerpt: "Why starting retirement planning early makes a massive difference and practical steps to take in your 30s for financial freedom later.",
    category: "Retirement",
    readTime: "7 min",
    date: "April 13, 2025",
    image: "/placeholder.svg",
    author: "Arjun Singh",
    role: "Retirement Specialist",
    icon: <Calendar className="h-8 w-8 text-wealth-navy" />,
    color: "bg-teal-50"
  },
  {
    id: 8,
    title: "ESG Investing: Aligning Your Portfolio With Your Values",
    excerpt: "Discover how environmental, social, and governance factors are reshaping investment strategies and creating new opportunities.",
    category: "Investment Trends",
    readTime: "8 min",
    date: "April 10, 2025",
    image: "/placeholder.svg",
    author: "Kavita Reddy",
    role: "ESG Research Lead",
    icon: <TrendingUp className="h-8 w-8 text-wealth-navy" />,
    color: "bg-emerald-50"
  },
  {
    id: 9,
    title: "Understanding P/E Ratios: A Key Metric for Stock Evaluation",
    excerpt: "Learn how to interpret price-to-earnings ratios and use them effectively when analyzing potential stock investments.",
    category: "Stock Analysis",
    readTime: "6 min",
    date: "April 7, 2025",
    image: "/placeholder.svg",
    author: "Rahul Kapoor",
    role: "Equity Analyst",
    icon: <Percent className="h-8 w-8 text-wealth-navy" />,
    color: "bg-orange-50"
  },
  {
    id: 10,
    title: "Small Cap vs Large Cap: Finding the Right Balance for Growth",
    excerpt: "Compare the risk and return profiles of different market capitalization segments and how to incorporate them in your portfolio.",
    category: "Portfolio Strategy",
    readTime: "7 min",
    date: "April 4, 2025",
    image: "/placeholder.svg",
    author: "Suresh Menon",
    role: "Investment Strategist",
    icon: <Landmark className="h-8 w-8 text-wealth-navy" />,
    color: "bg-amber-50"
  },
  {
    id: 11,
    title: "The Psychology of Investing: Overcoming Emotional Biases",
    excerpt: "Explore common psychological traps that impact investment decisions and strategies to maintain a disciplined approach.",
    category: "Behavioral Finance",
    readTime: "9 min",
    date: "April 1, 2025",
    image: "/placeholder.svg",
    author: "Dr. Ananya Das",
    role: "Behavioral Economist",
    icon: <ChartPie className="h-8 w-8 text-wealth-navy" />,
    color: "bg-pink-50"
  },
  {
    id: 12,
    title: "Digital Gold vs Physical Gold: Which Is the Better Investment?",
    excerpt: "Analyze the advantages and drawbacks of different ways to invest in gold and how they can complement your investment portfolio.",
    category: "Alternative Investments",
    readTime: "6 min",
    date: "March 29, 2025",
    image: "/placeholder.svg",
    author: "Varun Agarwal",
    role: "Commodity Analyst",
    icon: <Clock className="h-8 w-8 text-wealth-navy" />,
    color: "bg-cyan-50"
  },
];

interface BlogInsightsProps {
  category?: string;
}

const BlogInsights: React.FC<BlogInsightsProps> = ({ category }) => {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts based on category
  useEffect(() => {
    if (category && category !== 'all') {
      setFilteredPosts(blogPosts.filter(post => post.category === category));
    } else {
      setFilteredPosts(blogPosts);
    }
  }, [category]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {filteredPosts.slice(0, visiblePosts).map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg hover:translate-y-[-5px] group border-none shadow-md">
              <CardHeader className="p-0 relative overflow-hidden">
                <div className={`h-48 ${post.color} flex items-center justify-center relative group-hover:scale-[1.02] transition-transform`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"></div>
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {post.icon}
                  </motion.div>
                </div>
                <Badge 
                  variant="outline" 
                  className="absolute top-4 left-4 text-xs font-medium text-wealth-teal border-wealth-teal bg-white backdrop-blur-sm"
                >
                  {post.category}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-wealth-gray" />
                    <span className="text-xs text-wealth-gray">{post.readTime} read</span>
                  </div>
                  <span className="text-xs text-wealth-gray">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-wealth-navy mb-2 line-clamp-2 group-hover:text-wealth-teal transition-colors">{post.title}</h3>
                <p className="text-wealth-gray text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wealth-navy to-wealth-teal flex items-center justify-center text-white font-bold text-xs">
                    {post.author.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-wealth-gray">{post.role}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="link" className="p-0 text-wealth-teal font-medium group">
                  <Link to={`/blog/${post.id}`} className="flex items-center">
                    Read Article <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {visiblePosts < filteredPosts.length && (
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div 
                className="h-5 w-5 border-2 border-wealth-navy border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      )}
      
      <div className="mt-16 bg-gradient-to-r from-wealth-navy to-wealth-teal rounded-xl p-8 text-white text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
        <p className="mb-6 max-w-xl mx-auto opacity-90">
          Get weekly insights, market updates, and investment tips delivered straight to your inbox
        </p>
        <motion.div 
          className="flex max-w-md mx-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="rounded-r-none border-r-0 focus-visible:ring-wealth-teal text-black" 
          />
          <Button className="rounded-l-none bg-wealth-gold hover:bg-wealth-gold/90">
            Subscribe
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogInsights;
