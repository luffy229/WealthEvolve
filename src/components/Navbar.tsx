
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="wealth-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-serif font-bold text-2xl text-wealth-navy">Wealth<span className="text-wealth-teal">Evolve</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-choose-us" className="text-wealth-gray hover:text-wealth-navy transition-colors">Why Us</a>
            <a href="#how-it-works" className="text-wealth-gray hover:text-wealth-navy transition-colors">How It Works</a>
            <a href="#performance" className="text-wealth-gray hover:text-wealth-navy transition-colors">Performance</a>
            <Link to="/fund/bluechip-equity" className="text-wealth-gray hover:text-wealth-navy transition-colors">Explore Funds</Link>
            <Link to="/portfolio-overlap" className="text-wealth-gray hover:text-wealth-navy transition-colors">Fund Overlap</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white">Login</Button>
            <Button className="bg-wealth-navy hover:bg-opacity-90 text-white">Get Started</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-wealth-navy p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#why-choose-us" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Why Us</a>
              <a href="#how-it-works" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">How It Works</a>
              <a href="#performance" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Performance</a>
              <Link to="/fund/bluechip-equity" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Explore Funds</Link>
              <Link to="/portfolio-overlap" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Fund Overlap</Link>
              <div className="flex flex-col space-y-3 mt-2">
                <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white w-full">Login</Button>
                <Button className="bg-wealth-navy hover:bg-opacity-90 text-white w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
