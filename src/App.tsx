import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OutstandingItems from "./pages/OutstandingItems";
import CreateThirdPartyPage from "./pages/CreateThirdPartyPage";
import IMSystems from "./components/company/settings/IMSystems";
import { AutomationCenter } from "./components/ai/AutomationCenter";
import CompanySettings from "./components/company/settings/CompanySettings";
import AIIntegrationSettings from "./components/company/settings/AIIntegrationSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company/settings" element={<CompanySettings />} />
          <Route path="/company/settings/ai-integration" element={<AIIntegrationSettings />} />
          <Route path="/company/settings/im-systems" element={<IMSystems />} />
          <Route path="/company/ropa" element={<Index />} />
          <Route path="/company/ropa/outstanding" element={<OutstandingItems />} />
          <Route path="/company/lia/outstanding" element={<OutstandingItems />} />
          <Route path="/company/dpia/outstanding" element={<OutstandingItems />} />
          <Route path="/company/third-parties/create" element={<CreateThirdPartyPage />} />
          <Route path="/company/ai-assist/automation-center" element={<AutomationCenter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
