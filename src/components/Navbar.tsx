
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 theme-navbar">
      <div className="wealth-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-serif font-bold text-2xl text-wealth-navy">Wealth<span className="text-wealth-teal">Evolve</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/explore-funds" className="text-wealth-gray hover:text-wealth-navy transition-colors">Explore Funds</Link>
            <Link to="/portfolio-overlap" className="text-wealth-gray hover:text-wealth-navy transition-colors">Fund Overlap</Link>
            <Link to="/investment-analyzer" className="text-wealth-gray hover:text-wealth-navy transition-colors">Investment Analyzer</Link>
            <Link to="/risk-profiler" className="text-wealth-gray hover:text-wealth-navy transition-colors">Risk Profiler</Link>
            <Link to="/blog" className="text-wealth-gray hover:text-wealth-navy transition-colors">Insights</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <Link to="/portfolio-health-check">
              <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white">
                Free Portfolio Check
              </Button>
            </Link>
            <Link to="/login" className="mr-2">
              <Button variant="outline" className="border-wealth-teal text-wealth-teal hover:bg-wealth-teal hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-wealth-navy hover:bg-opacity-90 text-white">Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
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
              <Link to="/explore-funds" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Explore Funds</Link>
              <Link to="/portfolio-overlap" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Fund Overlap</Link>
              <Link to="/investment-analyzer" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Investment Analyzer</Link>
              <Link to="/risk-profiler" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Risk Profiler</Link>
              <Link to="/blog" className="text-wealth-gray hover:text-wealth-navy transition-colors py-2">Insights</Link>
              
              <div className="flex flex-col space-y-3 mt-2">
                <Link to="/portfolio-health-check" className="w-full">
                  <Button variant="outline" className="border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white w-full">
                    Free Portfolio Check
                  </Button>
                </Link>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="border-wealth-teal text-wealth-teal hover:bg-wealth-teal hover:text-white w-full">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="bg-wealth-navy hover:bg-opacity-90 text-white w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
