
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { getMutualFunds } from '@/lib/fundData';

interface Fund {
  id: string;
  name: string;
  category: string;
  amc: string;
  nav: number;
  performance: { "1Y": number };
}

const FundExplorer: React.FC = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Fund | 'performance.1Y';
    direction: 'asc' | 'desc';
  }>({
    key: 'name',
    direction: 'asc'
  });
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(funds.map(fund => fund.category)))];
  
  useEffect(() => {
    // Load funds
    const loadedFunds = getMutualFunds();
    setFunds(loadedFunds);
    setFilteredFunds(loadedFunds);
  }, []);
  
  useEffect(() => {
    // Filter and sort funds whenever search term or filters change
    let result = [...funds];
    
    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        fund => 
          fund.name.toLowerCase().includes(lowerCaseSearchTerm) || 
          fund.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(fund => fund.category === categoryFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.key === 'performance.1Y') {
        const valueA = a.performance['1Y'];
        const valueB = b.performance['1Y'];
        return sortConfig.direction === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      } else {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortConfig.direction === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortConfig.direction === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        }
        return 0;
      }
    });
    
    setFilteredFunds(result);
  }, [funds, searchTerm, categoryFilter, sortConfig]);
  
  const handleSort = (key: keyof Fund | 'performance.1Y') => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key
          ? sortConfig.direction === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc'
    });
  };
  
  const SortIndicator = ({ columnKey }: { columnKey: string }) => {
    if (columnKey !== sortConfig.key) return null;
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4 inline" /> 
      : <ArrowDown className="ml-1 h-4 w-4 inline" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-wealth-gray mb-1">
            Search Funds
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wealth-gray" />
            <Input 
              type="text"
              placeholder="Search by name or category"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-wealth-gray mb-1">
            Category
          </label>
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center gap-1 border-wealth-navy text-wealth-navy">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('name')}
              >
                Fund Name <SortIndicator columnKey="name" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('category')}
              >
                Category <SortIndicator columnKey="category" />
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('nav')}
              >
                NAV (₹) <SortIndicator columnKey="nav" />
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-gray-50" 
                onClick={() => handleSort('performance.1Y')}
              >
                1Y Return <SortIndicator columnKey="performance.1Y" />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFunds.length > 0 ? (
              filteredFunds.map((fund) => (
                <TableRow key={fund.id}>
                  <TableCell>
                    <div className="font-medium">{fund.name}</div>
                    <div className="text-sm text-wealth-gray">{fund.amc}</div>
                  </TableCell>
                  <TableCell>{fund.category}</TableCell>
                  <TableCell className="text-right">{fund.nav.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={fund.performance['1Y'] >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {fund.performance['1Y'] >= 0 ? '+' : ''}{fund.performance['1Y'].toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" className="text-wealth-teal">
                      <Link to={`/fund/${fund.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No funds found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredFunds.length > 0 && (
        <div className="text-sm text-wealth-gray text-center">
          Showing {filteredFunds.length} of {funds.length} funds
        </div>
      )}
    </div>
  );
};

export default FundExplorer;
