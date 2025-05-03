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

// Expanded list with more funds
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
  },
  // Additional funds start here
  {
    id: "icici-value-discovery",
    name: "ICICI Prudential Value Discovery Fund",
    category: "Value",
    holdings: [
      { name: "Sun Pharmaceutical", allocation: 7.8, sector: "Healthcare" },
      { name: "NTPC Ltd", allocation: 7.2, sector: "Power" },
      { name: "ITC Ltd", allocation: 6.5, sector: "Consumer Goods" },
      { name: "ICICI Bank", allocation: 5.9, sector: "Financial Services" },
      { name: "Bharti Airtel", allocation: 5.1, sector: "Telecom" },
      { name: "Power Grid Corporation", allocation: 4.7, sector: "Power" },
      { name: "Coal India", allocation: 4.3, sector: "Mining" },
      { name: "SBI", allocation: 4.0, sector: "Financial Services" },
      { name: "Infosys", allocation: 3.8, sector: "IT" },
      { name: "Tata Motors", allocation: 3.2, sector: "Automobile" }
    ]
  },
  {
    id: "kotak-small-cap",
    name: "Kotak Small Cap Fund",
    category: "Small Cap",
    holdings: [
      { name: "CIE Automotive India", allocation: 5.8, sector: "Automobile" },
      { name: "JK Lakshmi Cement", allocation: 5.2, sector: "Cement" },
      { name: "Blue Star", allocation: 4.9, sector: "Consumer Durables" },
      { name: "Sonata Software", allocation: 4.6, sector: "IT" },
      { name: "PNC Infratech", allocation: 4.3, sector: "Construction" },
      { name: "KNR Constructions", allocation: 4.0, sector: "Construction" },
      { name: "Aarti Industries", allocation: 3.7, sector: "Chemicals" },
      { name: "Supreme Industries", allocation: 3.4, sector: "Plastics" },
      { name: "City Union Bank", allocation: 3.1, sector: "Financial Services" },
      { name: "Navin Fluorine", allocation: 2.8, sector: "Chemicals" }
    ]
  },
  {
    id: "dsp-tax-saver",
    name: "DSP Tax Saver Fund",
    category: "ELSS",
    holdings: [
      { name: "ICICI Bank", allocation: 8.4, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 7.2, sector: "Financial Services" },
      { name: "SBI", allocation: 6.5, sector: "Financial Services" },
      { name: "Infosys", allocation: 5.8, sector: "IT" },
      { name: "L&T", allocation: 5.1, sector: "Construction" },
      { name: "Axis Bank", allocation: 4.7, sector: "Financial Services" },
      { name: "Bharti Airtel", allocation: 4.3, sector: "Telecom" },
      { name: "Maruti Suzuki", allocation: 3.8, sector: "Automobile" },
      { name: "ITC Ltd", allocation: 3.5, sector: "Consumer Goods" },
      { name: "Tata Steel", allocation: 3.2, sector: "Metals" }
    ]
  },
  {
    id: "invesco-contra",
    name: "Invesco India Contra Fund",
    category: "Contra",
    holdings: [
      { name: "NTPC Ltd", allocation: 6.9, sector: "Power" },
      { name: "ICICI Bank", allocation: 6.4, sector: "Financial Services" },
      { name: "L&T", allocation: 5.8, sector: "Construction" },
      { name: "SBI", allocation: 5.3, sector: "Financial Services" },
      { name: "Hindalco", allocation: 4.9, sector: "Metals" },
      { name: "Power Grid Corporation", allocation: 4.5, sector: "Power" },
      { name: "Bharat Electronics", allocation: 4.1, sector: "Defense" },
      { name: "Infosys", allocation: 3.8, sector: "IT" },
      { name: "ITC Ltd", allocation: 3.5, sector: "Consumer Goods" },
      { name: "Coal India", allocation: 3.2, sector: "Mining" }
    ]
  },
  {
    id: "franklin-india-prima",
    name: "Franklin India Prima Fund",
    category: "Mid Cap",
    holdings: [
      { name: "Crompton Greaves Consumer", allocation: 6.2, sector: "Consumer Durables" },
      { name: "Bharat Forge", allocation: 5.8, sector: "Engineering" },
      { name: "Max Financial Services", allocation: 5.3, sector: "Financial Services" },
      { name: "Federal Bank", allocation: 4.9, sector: "Financial Services" },
      { name: "Emami Ltd", allocation: 4.5, sector: "Consumer Goods" },
      { name: "Aditya Birla Fashion", allocation: 4.1, sector: "Retail" },
      { name: "Apollo Hospitals", allocation: 3.8, sector: "Healthcare" },
      { name: "Supreme Industries", allocation: 3.5, sector: "Plastics" },
      { name: "Coforge", allocation: 3.2, sector: "IT" },
      { name: "City Union Bank", allocation: 2.9, sector: "Financial Services" }
    ]
  },
  {
    id: "motilal-multicap-35",
    name: "Motilal Oswal Multicap 35 Fund",
    category: "Multi Cap",
    holdings: [
      { name: "HDFC Bank", allocation: 7.8, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 6.9, sector: "Financial Services" },
      { name: "HUL", allocation: 6.2, sector: "Consumer Goods" },
      { name: "Infosys", allocation: 5.6, sector: "IT" },
      { name: "L&T", allocation: 5.0, sector: "Construction" },
      { name: "Bajaj Finance", allocation: 4.5, sector: "Financial Services" },
      { name: "Asian Paints", allocation: 4.0, sector: "Consumer Goods" },
      { name: "Bharti Airtel", allocation: 3.6, sector: "Telecom" },
      { name: "Max Financial Services", allocation: 3.2, sector: "Financial Services" },
      { name: "Persistent Systems", allocation: 2.8, sector: "IT" }
    ]
  },
  {
    id: "uti-equity",
    name: "UTI Equity Fund",
    category: "Large Cap",
    holdings: [
      { name: "ICICI Bank", allocation: 8.7, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 8.1, sector: "Financial Services" },
      { name: "Infosys", allocation: 6.8, sector: "IT" },
      { name: "Reliance Industries", allocation: 6.2, sector: "Oil & Gas" },
      { name: "L&T", allocation: 5.4, sector: "Construction" },
      { name: "TCS", allocation: 4.9, sector: "IT" },
      { name: "SBI", allocation: 4.3, sector: "Financial Services" },
      { name: "Bharti Airtel", allocation: 3.8, sector: "Telecom" },
      { name: "HUL", allocation: 3.4, sector: "Consumer Goods" },
      { name: "Asian Paints", allocation: 2.9, sector: "Consumer Goods" }
    ]
  },
  {
    id: "tata-digital-india",
    name: "Tata Digital India Fund",
    category: "Sectoral - Technology",
    holdings: [
      { name: "Infosys", allocation: 12.5, sector: "IT" },
      { name: "TCS", allocation: 11.8, sector: "IT" },
      { name: "HCL Technologies", allocation: 9.6, sector: "IT" },
      { name: "Tech Mahindra", allocation: 8.2, sector: "IT" },
      { name: "Persistent Systems", allocation: 7.4, sector: "IT" },
      { name: "L&T Technology Services", allocation: 6.8, sector: "IT" },
      { name: "Coforge", allocation: 6.2, sector: "IT" },
      { name: "Wipro", allocation: 5.7, sector: "IT" },
      { name: "Mphasis", allocation: 5.1, sector: "IT" },
      { name: "LTI Mindtree", allocation: 4.6, sector: "IT" }
    ]
  },
  {
    id: "aditya-birla-frontline-equity",
    name: "Aditya Birla Sun Life Frontline Equity Fund",
    category: "Large Cap",
    holdings: [
      { name: "ICICI Bank", allocation: 8.0, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 7.2, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 6.5, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 5.8, sector: "IT" },
      { name: "SBI", allocation: 5.1, sector: "Financial Services" },
      { name: "L&T", allocation: 4.5, sector: "Construction" },
      { name: "Axis Bank", allocation: 4.0, sector: "Financial Services" },
      { name: "HUL", allocation: 3.6, sector: "Consumer Goods" },
      { name: "TCS", allocation: 3.2, sector: "IT" },
      { name: "Bharti Airtel", allocation: 2.8, sector: "Telecom" }
    ]
  },
  {
    id: "nippon-pharma",
    name: "Nippon India Pharma Fund",
    category: "Sectoral - Pharma",
    holdings: [
      { name: "Sun Pharmaceutical", allocation: 14.2, sector: "Healthcare" },
      { name: "Dr Reddy's Laboratories", allocation: 12.5, sector: "Healthcare" },
      { name: "Cipla", allocation: 10.8, sector: "Healthcare" },
      { name: "Divis Laboratories", allocation: 8.9, sector: "Healthcare" },
      { name: "Aurobindo Pharma", allocation: 7.4, sector: "Healthcare" },
      { name: "Biocon", allocation: 6.2, sector: "Healthcare" },
      { name: "Lupin", allocation: 5.5, sector: "Healthcare" },
      { name: "Torrent Pharmaceuticals", allocation: 4.8, sector: "Healthcare" },
      { name: "Alkem Laboratories", allocation: 4.1, sector: "Healthcare" },
      { name: "Gland Pharma", allocation: 3.6, sector: "Healthcare" }
    ]
  },
  {
    id: "idfc-focused-equity",
    name: "IDFC Focused Equity Fund",
    category: "Focused",
    holdings: [
      { name: "ICICI Bank", allocation: 9.8, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 9.2, sector: "Financial Services" },
      { name: "Infosys", allocation: 8.5, sector: "IT" },
      { name: "L&T", allocation: 7.9, sector: "Construction" },
      { name: "SBI", allocation: 7.3, sector: "Financial Services" },
      { name: "HUL", allocation: 6.8, sector: "Consumer Goods" },
      { name: "Reliance Industries", allocation: 6.2, sector: "Oil & Gas" },
      { name: "Bharti Airtel", allocation: 5.6, sector: "Telecom" },
      { name: "TCS", allocation: 5.1, sector: "IT" },
      { name: "Asian Paints", allocation: 4.5, sector: "Consumer Goods" }
    ]
  },
  {
    id: "canara-robeco-bluechip",
    name: "Canara Robeco Bluechip Equity Fund",
    category: "Large Cap",
    holdings: [
      { name: "HDFC Bank", allocation: 8.9, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 8.1, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 7.4, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 6.8, sector: "IT" },
      { name: "TCS", allocation: 6.2, sector: "IT" },
      { name: "L&T", allocation: 5.6, sector: "Construction" },
      { name: "SBI", allocation: 5.0, sector: "Financial Services" },
      { name: "Axis Bank", allocation: 4.4, sector: "Financial Services" },
      { name: "HUL", allocation: 3.9, sector: "Consumer Goods" },
      { name: "Asian Paints", allocation: 3.4, sector: "Consumer Goods" }
    ]
  },
  {
    id: "sbi-focused-equity",
    name: "SBI Focused Equity Fund",
    category: "Focused",
    holdings: [
      { name: "HDFC Bank", allocation: 9.5, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 8.8, sector: "Financial Services" },
      { name: "L&T", allocation: 8.1, sector: "Construction" },
      { name: "Infosys", allocation: 7.5, sector: "IT" },
      { name: "SBI", allocation: 6.9, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 6.3, sector: "Oil & Gas" },
      { name: "Axis Bank", allocation: 5.7, sector: "Financial Services" },
      { name: "HUL", allocation: 5.2, sector: "Consumer Goods" },
      { name: "TCS", allocation: 4.7, sector: "IT" },
      { name: "Bharti Airtel", allocation: 4.2, sector: "Telecom" }
    ]
  },
  {
    id: "dsp-midcap",
    name: "DSP Midcap Fund",
    category: "Mid Cap",
    holdings: [
      { name: "Max Healthcare Institute", allocation: 5.4, sector: "Healthcare" },
      { name: "Cholamandalam Investment", allocation: 5.0, sector: "Financial Services" },
      { name: "Federal Bank", allocation: 4.6, sector: "Financial Services" },
      { name: "Persistent Systems", allocation: 4.2, sector: "IT" },
      { name: "Coforge", allocation: 3.9, sector: "IT" },
      { name: "CG Power & Industrial", allocation: 3.6, sector: "Engineering" },
      { name: "Linde India", allocation: 3.3, sector: "Chemicals" },
      { name: "Emami Ltd", allocation: 3.0, sector: "Consumer Goods" },
      { name: "Schaeffler India", allocation: 2.7, sector: "Automobile" },
      { name: "Blue Star", allocation: 2.5, sector: "Consumer Durables" }
    ]
  },
  {
    id: "icici-banking-financial",
    name: "ICICI Prudential Banking and Financial Services Fund",
    category: "Sectoral - Banking",
    holdings: [
      { name: "HDFC Bank", allocation: 18.5, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 16.8, sector: "Financial Services" },
      { name: "SBI", allocation: 14.2, sector: "Financial Services" },
      { name: "Axis Bank", allocation: 12.5, sector: "Financial Services" },
      { name: "Kotak Mahindra Bank", allocation: 9.8, sector: "Financial Services" },
      { name: "Bajaj Finance", allocation: 7.4, sector: "Financial Services" },
      { name: "Cholamandalam Investment", allocation: 6.2, sector: "Financial Services" },
      { name: "Federal Bank", allocation: 5.1, sector: "Financial Services" },
      { name: "HDFC Life Insurance", allocation: 4.5, sector: "Financial Services" },
      { name: "SBI Life Insurance", allocation: 3.8, sector: "Financial Services" }
    ]
  },
  {
    id: "quant-active",
    name: "Quant Active Fund",
    category: "Multi Cap",
    holdings: [
      { name: "Adani Enterprises", allocation: 7.2, sector: "Diversified" },
      { name: "Reliance Industries", allocation: 6.5, sector: "Oil & Gas" },
      { name: "ICICI Bank", allocation: 5.9, sector: "Financial Services" },
      { name: "SBI", allocation: 5.4, sector: "Financial Services" },
      { name: "L&T", allocation: 4.8, sector: "Construction" },
      { name: "Tata Steel", allocation: 4.3, sector: "Metals" },
      { name: "Infosys", allocation: 3.9, sector: "IT" },
      { name: "NTPC Ltd", allocation: 3.5, sector: "Power" },
      { name: "Maruti Suzuki", allocation: 3.1, sector: "Automobile" },
      { name: "Adani Ports", allocation: 2.8, sector: "Infrastructure" }
    ]
  },
  {
    id: "hsbc-large-cap",
    name: "HSBC Large Cap Equity Fund",
    category: "Large Cap",
    holdings: [
      { name: "HDFC Bank", allocation: 9.2, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 8.4, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 7.7, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 7.0, sector: "IT" },
      { name: "TCS", allocation: 6.4, sector: "IT" },
      { name: "L&T", allocation: 5.8, sector: "Construction" },
      { name: "SBI", allocation: 5.2, sector: "Financial Services" },
      { name: "HUL", allocation: 4.7, sector: "Consumer Goods" },
      { name: "Asian Paints", allocation: 4.2, sector: "Consumer Goods" },
      { name: "Bharti Airtel", allocation: 3.8, sector: "Telecom" }
    ]
  },
  {
    id: "uti-mastershare",
    name: "UTI Mastershare Unit Scheme",
    category: "Large Cap",
    holdings: [
      { name: "ICICI Bank", allocation: 8.5, sector: "Financial Services" },
      { name: "HDFC Bank", allocation: 7.9, sector: "Financial Services" },
      { name: "Infosys", allocation: 7.2, sector: "IT" },
      { name: "Reliance Industries", allocation: 6.6, sector: "Oil & Gas" },
      { name: "L&T", allocation: 6.0, sector: "Construction" },
      { name: "SBI", allocation: 5.5, sector: "Financial Services" },
      { name: "TCS", allocation: 5.0, sector: "IT" },
      { name: "Axis Bank", allocation: 4.5, sector: "Financial Services" },
      { name: "HUL", allocation: 4.1, sector: "Consumer Goods" },
      { name: "Bharti Airtel", allocation: 3.7, sector: "Telecom" }
    ]
  },
  {
    id: "sundaram-midcap",
    name: "Sundaram Mid Cap Fund",
    category: "Mid Cap",
    holdings: [
      { name: "Supreme Industries", allocation: 5.4, sector: "Plastics" },
      { name: "Federal Bank", allocation: 4.9, sector: "Financial Services" },
      { name: "Phoenix Mills", allocation: 4.5, sector: "Real Estate" },
      { name: "Coforge", allocation: 4.1, sector: "IT" },
      { name: "Max Healthcare", allocation: 3.8, sector: "Healthcare" },
      { name: "Cholamandalam Investment", allocation: 3.5, sector: "Financial Services" },
      { name: "Blue Star", allocation: 3.2, sector: "Consumer Durables" },
      { name: "CG Power & Industrial", allocation: 2.9, sector: "Engineering" },
      { name: "Sonata Software", allocation: 2.6, sector: "IT" },
      { name: "Schaeffler India", allocation: 2.4, sector: "Automobile" }
    ]
  },
  {
    id: "mirae-large-cap",
    name: "Mirae Asset Large Cap Fund",
    category: "Large Cap",
    holdings: [
      { name: "HDFC Bank", allocation: 8.8, sector: "Financial Services" },
      { name: "ICICI Bank", allocation: 8.2, sector: "Financial Services" },
      { name: "Reliance Industries", allocation: 7.5, sector: "Oil & Gas" },
      { name: "Infosys", allocation: 6.9, sector: "IT" },
      { name: "SBI", allocation: 6.3, sector: "Financial Services" },
      { name: "L&T", allocation: 5.7, sector: "Construction" },
      { name: "TCS", allocation: 5.2, sector: "IT" },
      { name: "Axis Bank", allocation: 4.7, sector: "Financial Services" },
      { name: "HUL", allocation: 4.2, sector: "Consumer Goods" },
      { name: "Bharti Airtel", allocation: 3.8, sector: "Telecom" }
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

// Add function to get a specific mutual fund by ID
export const getMutualFund = (fundId: string) => {
  // In a real application, this would fetch data from an API
  const fund = mutualFunds.find(f => f.id === fundId);
  
  if (fund) {
    return {
      ...fund,
      amc: "WealthEvolve Asset Management",
      fundManager: "Rajiv Sharma",
      nav: 42.65,
      launchDate: "15 Jan 2010",
      benchmark: "NIFTY 50 TRI",
      asOfDate: "30 Apr 2024",
      performance: {
        "1Y": 18.5,
        "3Y": 15.2,
        "5Y": 12.8,
        "YTD": 5.2
      },
      cagr: {
        sinceInception: 14.3,
        "3Y": 15.2,
        "5Y": 12.8
      }
    };
  }
  
  // Default fallback if fund not found
  return {
    id: fundId,
    name: "WealthEvolve Bluechip Equity Fund",
    category: "Large Cap",
    amc: "WealthEvolve Asset Management",
    fundManager: "Rajiv Sharma",
    nav: 42.65,
    launchDate: "15 Jan 2010",
    benchmark: "NIFTY 50 TRI",
    asOfDate: "30 Apr 2024",
    performance: {
      "1Y": 18.5,
      "3Y": 15.2,
      "5Y": 12.8,
      "YTD": 5.2
    },
    cagr: {
      sinceInception: 14.3,
      "3Y": 15.2,
      "5Y": 12.8
    },
    // Other data will be populated from respective component files
  };
};

// Get list of available mutual funds
export const getMutualFunds = () => {
  return mutualFunds.map(fund => ({
    id: fund.id,
    name: fund.name,
    category: fund.category,
    amc: "WealthEvolve Asset Management",
    nav: parseFloat((35 + Math.random() * 15).toFixed(2)),
    performance: { "1Y": parseFloat((8 + Math.random() * 20).toFixed(1)) }
  }));
};
