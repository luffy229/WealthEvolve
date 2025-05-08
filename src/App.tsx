
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/context/ThemeContext";
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
import Team from "./pages/Team";
import WealthMonitorApp from "./pages/WealthMonitorApp";
import DirectEquityPMS from "./pages/DirectEquityPMS";
import FinancialPlanning from "./pages/FinancialPlanning";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import Subscription from "./pages/Subscription";

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
      <ThemeProvider>
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
                <Route path="/team" element={<Team />} />
                <Route path="/wealth-monitor-app" element={<WealthMonitorApp />} />
                <Route path="/direct-equity-pms" element={<DirectEquityPMS />} />
                <Route path="/financial-planning" element={<FinancialPlanning />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/subscription" element={<Subscription />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SmoothScroll>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
