
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpenText, ArrowUp, ChartPie, Users } from 'lucide-react';

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
    icon: <BookOpenText className="h-8 w-8 text-wealth-navy" />
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
    icon: <ChartPie className="h-8 w-8 text-wealth-navy" />
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
    icon: <ArrowUp className="h-8 w-8 text-wealth-navy" />
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
    icon: <Users className="h-8 w-8 text-wealth-navy" />
  },
];

const BlogInsights: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wealth-navy mb-4">Investment Insights & Knowledge</h2>
        <p className="text-wealth-gray max-w-2xl mx-auto">
          Stay informed with the latest insights, market trends, and investment strategies
          from our team of financial experts
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div>{post.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                <Badge variant="outline" className="text-xs font-medium text-wealth-teal border-wealth-teal">
                  {post.category}
                </Badge>
                <span className="text-xs text-wealth-gray">{post.readTime} read</span>
              </div>
              <h3 className="text-xl font-semibold text-wealth-navy mb-2">{post.title}</h3>
              <p className="text-wealth-gray text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div>
                  <p className="text-sm font-medium">{post.author}</p>
                  <p className="text-xs text-wealth-gray">{post.date}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button variant="link" className="p-0 text-wealth-teal font-medium">
                <Link to={`/blog/${post.id}`}>Read Article →</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white">
          <Link to="/blog">View All Articles</Link>
        </Button>
      </div>
      
      <div className="mt-16 bg-wealth-navy rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
        <p className="mb-6 max-w-xl mx-auto">
          Get weekly insights, market updates, and investment tips delivered straight to your inbox
        </p>
        <div className="flex max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="rounded-r-none focus-visible:ring-wealth-teal text-black" 
          />
          <Button className="rounded-l-none bg-wealth-teal hover:bg-wealth-teal/90">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogInsights;
