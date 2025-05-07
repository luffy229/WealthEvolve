
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import PerformanceChart from '@/components/PerformanceChart';
import Testimonials from '@/components/Testimonials';
import ProductFeatures from '@/components/ProductFeatures';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ChatbotAgent from '@/components/ChatbotAgent';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <PerformanceChart />
        <Testimonials />
        <ProductFeatures />
        <CallToAction />
      </main>
      <Footer />
      <ChatbotAgent />
    </div>
  );
};

export default Index;
