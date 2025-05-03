
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogInsights from '@/components/BlogInsights';
import { Separator } from '@/components/ui/separator';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="wealth-container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-2 text-wealth-navy mb-4">Investment Insights & Blog</h1>
            <p className="text-wealth-gray text-lg">
              Stay informed with the latest insights on mutual funds, investment strategies, 
              market trends, and financial planning tips from our team of experts.
            </p>
          </div>
          <Separator className="mb-10" />
          <BlogInsights />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
