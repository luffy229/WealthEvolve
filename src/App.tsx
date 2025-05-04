
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PortfolioOverlap from "./pages/PortfolioOverlap";
import FundDetail from "./pages/FundDetail";
import SIPCalculator from "./pages/SIPCalculator";
import RiskProfiler from "./pages/RiskProfiler";
import PortfolioHealthCheck from "./pages/PortfolioHealthCheck";
import Blog from "./pages/Blog";
import ExploreFunds from "./pages/ExploreFunds";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvestmentAnalyzer from "./pages/InvestmentAnalyzer";

const App = () => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScroll>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio-overlap" element={<PortfolioOverlap />} />
              <Route path="/fund/:fundId" element={<FundDetail />} />
              <Route path="/sip-calculator" element={<SIPCalculator />} />
              <Route path="/risk-profiler" element={<RiskProfiler />} />
              <Route path="/portfolio-health-check" element={<PortfolioHealthCheck />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/explore-funds" element={<ExploreFunds />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/investment-analyzer" element={<InvestmentAnalyzer />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
