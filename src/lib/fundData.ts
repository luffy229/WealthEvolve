
// Mock data for demonstration purposes
// In a real application, this would come from an API

export interface MutualFund {
  id: string;
  name: string;
  category: string;
  holdings: Array<{
    name: string;
    allocation: number; // percentage
    sector: string;
  }>;
}

export const mutualFunds: MutualFund[] = [
  {
    id: "hdfc-top-100",
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    holdings: [
      { name: "ICICI Bank", allocation: 8.2, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 7.5, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 7.1, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 5.4, sector: "IT" },
      { name: "ITC Ltd", allocation: 4.2, sector: "Consumer Goods" },
      { name: "Larsen & Toubro", allocation: 4.1, sector: "Construction" },
      { name: "Axis Bank", allocation: 3.8, sector: "Financial Services" },
      { name: "SBI", allocation: 3.6, sector: "Financial Services" },
      { name: "Bharti Airtel", allocation: 2.9, sector: "Telecom" },
      { name: "TCS", allocation: 2.8, sector: "IT" }
    ]
  },
  {
    id: "sbi-bluechip",
    name: "SBI Blue Chip Fund",
    category: "Large Cap",
    holdings: [
      { name: "HDFC Bank", allocation: 8.1, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 7.8, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 6.9, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 5.2, sector: "IT" },
      { name: "Axis Bank", allocation: 4.5, sector: "Financial Services" },
      { name: "TCS", allocation: 3.9, sector: "IT" },
      { name: "Kotak Mahindra Bank", allocation: 3.5, sector: "Financial Services" },
      { name: "HUL", allocation: 3.4, sector: "Consumer Goods" },
      { name: "Bajaj Finance", allocation: 3.0, sector: "Financial Services" },
      { name: "Asian Paints", allocation: 2.6, sector: "Consumer Goods" }
    ]
  },
  {
    id: "axis-midcap",
    name: "Axis Midcap Fund",
    category: "Mid Cap",
    holdings: [
      { name: "Cholamandalam Investment", allocation: 5.2, sector: "Financial Services" },
      { name: "Coforge", allocation: 4.9, sector: "IT" },
      { name: "Max Healthcare", allocation: 4.7, sector: "Healthcare" },
      { name: "Persistent Systems", allocation: 4.5, sector: "IT" },
      { name: "Ashok Leyland", allocation: 4.3, sector: "Automobile" },
      { name: "Brigade Enterprises", allocation: 4.0, sector: "Real Estate" },
      { name: "The Federal Bank", allocation: 3.8, sector: "Financial Services" },
      { name: "Schaeffler India", allocation: 3.6, sector: "Automobile" },
      { name: "Voltas", allocation: 3.5, sector: "Consumer Durables" },
      { name: "Sundaram Finance", allocation: 3.3, sector: "Financial Services" }
    ]
  },
  {
    id: "mirae-emerging",
    name: "Mirae Asset Emerging Bluechip",
    category: "Large & Mid Cap",
    holdings: [
      { name: "ICICI Bank", allocation: 7.9, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 5.8, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 5.2, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 4.3, sector: "IT" },
      { name: "Axis Bank", allocation: 3.9, sector: "Financial Services" },
      { name: "Cholamandalam Investment", allocation: 3.5, sector: "Financial Services" },
      { name: "SBI", allocation: 3.2, sector: "Financial Services" },
      { name: "Persistent Systems", allocation: 2.8, sector: "IT" },
      { name: "Max Healthcare", allocation: 2.6, sector: "Healthcare" },
      { name: "The Federal Bank", allocation: 2.4, sector: "Financial Services" }
    ]
  },
  {
    id: "parag-flexi",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
    holdings: [
      { name: "Alphabet Inc", allocation: 6.8, sector: "Technology" },
      { name: "ICICI Bank", allocation: 5.9, sector: "Financial Services" },
      { name: "Amazon Inc", allocation: 5.7, sector: "Consumer Discretionary" },
      { name: "ITC Ltd", allocation: 5.3, sector: "Consumer Goods" },
      { name: "HDFC Bank", allocation: 4.5, sector: "Financial Services" },
      { name: "Microsoft Corp", allocation: 4.2, sector: "Technology" },
      { name: "Bajaj Holdings", allocation: 3.9, sector: "Financial Services" },
      { name: "Axis Bank", allocation: 3.7, sector: "Financial Services" },
      { name: "HCL Technologies", allocation: 3.4, sector: "IT" },
      { name: "SBI", allocation: 3.2, sector: "Financial Services" }
    ]
  }
];

export function calculateOverlap(fundIds: string[]) {
  // Get the selected funds
  const selectedFunds = mutualFunds.filter(fund => fundIds.includes(fund.id));
  
  // Generate all pairs of funds
  const fundPairs: string[][] = [];
  for (let i = 0; i < selectedFunds.length; i++) {
    for (let j = i + 1; j < selectedFunds.length; j++) {
      fundPairs.push([selectedFunds[i].id, selectedFunds[j].id]);
    }
  }
  
  // Calculate overlap for each pair
  const overlapPercentages: { [key: string]: number } = {};
  const overlapStocks: Array<{
    name: string;
    allocations: { [key: string]: number };
    sector: string;
  }> = [];
  
  // Create a map of stock names to fund allocations
  const stockMap: { 
    [stockName: string]: { 
      allocations: { [fundId: string]: number },
      sector: string,
      funds: Set<string> 
    } 
  } = {};
  
  // Populate the stock map
  selectedFunds.forEach(fund => {
    fund.holdings.forEach(holding => {
      if (!stockMap[holding.name]) {
        stockMap[holding.name] = {
          allocations: {},
          sector: holding.sector,
          funds: new Set()
        };
      }
      stockMap[holding.name].allocations[fund.id] = holding.allocation;
      stockMap[holding.name].funds.add(fund.id);
    });
  });
  
  // Calculate overlap percentages
  fundPairs.forEach(pair => {
    const [fund1Id, fund2Id] = pair;
    const fund1 = selectedFunds.find(f => f.id === fund1Id)!;
    const fund2 = selectedFunds.find(f => f.id === fund2Id)!;
    
    // Find common stocks
    const commonStocks = Object.entries(stockMap)
      .filter(([_, data]) => data.funds.has(fund1Id) && data.funds.has(fund2Id))
      .map(([name, data]) => ({
        name,
        alloc1: data.allocations[fund1Id],
        alloc2: data.allocations[fund2Id]
      }));
    
    // Calculate overlap percentage using minimum allocation
    let overlapPercentage = 0;
    commonStocks.forEach(stock => {
      overlapPercentage += Math.min(stock.alloc1, stock.alloc2);
    });
    
    const key = `${fund1Id}-${fund2Id}`;
    overlapPercentages[key] = overlapPercentage;
  });
  
  // Create overlap stocks array for display
  Object.entries(stockMap)
    .filter(([_, data]) => data.funds.size > 1) // Only include stocks in multiple funds
    .forEach(([name, data]) => {
      overlapStocks.push({
        name,
        allocations: data.allocations,
        sector: data.sector
      });
    });
  
  // Sort by number of funds containing the stock (descending)
  overlapStocks.sort((a, b) => 
    Object.keys(b.allocations).length - Object.keys(a.allocations).length
  );
  
  // Create a map of fund IDs to names
  const fundNames: { [key: string]: string } = {};
  selectedFunds.forEach(fund => {
    fundNames[fund.id] = fund.name;
  });
  
  return {
    overlapPercentages,
    overlapStocks,
    fundPairs,
    fundNames
  };
}
