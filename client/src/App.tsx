import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import BrandDetail from "./pages/BrandDetail";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AccessDenied from "./pages/AccessDenied";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPortfolio from "./pages/admin/Portfolio";
import AdminPositions from "./pages/admin/Positions";
import AdminApplications from "./pages/admin/Applications";
import AdminNews from "./pages/admin/News";
import AdminContact from "./pages/admin/Contact";
import AdminSettings from "./pages/admin/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:slug" component={BrandDetail} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsArticle} />
      <Route path="/careers" component={Careers} />
      <Route path="/careers/:id" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/apply" component={Apply} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/access-denied" component={AccessDenied} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin/positions" component={AdminPositions} />
      <Route path="/admin/applications" component={AdminApplications} />
      <Route path="/admin/news" component={AdminNews} />
      <Route path="/admin/contact" component={AdminContact} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
