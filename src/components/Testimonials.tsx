
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Vikram Mehta',
    position: 'Tech Executive',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120',
    content: 'WealthEvolve transformed my investment approach. Their portfolio strategies have consistently outperformed my expectations, with clear communications and a user-friendly dashboard.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    position: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120',
    content: 'I appreciate the personalized attention and data-driven approach. My portfolio has grown significantly, and their mobile app makes it easy to track performance anywhere.',
    rating: 5
  },
  {
    name: 'Rahul Kapoor',
    position: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120',
    content: 'As someone who values transparency, WealthEvolve has been the perfect fit. Their fee structure is clear, and I can always see exactly how my investments are performing.',
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-wealth text-white">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-4">What Our Clients Say</h2>
          <p className="text-lg opacity-80">
            Join thousands of satisfied investors who trust WealthEvolve with their financial future.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20">
              <CardContent className="p-6 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-wealth-gold"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-medium text-lg">{testimonial.name}</h4>
                      <p className="text-sm opacity-80">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-wealth-gold text-wealth-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-opacity-90 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-12 justify-items-center">
            {['SEBI', 'AMFI', 'BSE', 'NSE'].map((logo, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4 w-full max-w-xs flex items-center justify-center">
                <span className="font-serif font-bold text-xl">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
