import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import DocumentsPage from "@/pages/DocumentsPage";
import InsightsPage from "@/pages/InsightsPage";
import ToolsPage from "@/pages/ToolsPage";
import KnowledgePage from "@/pages/KnowledgePage";
import PromptsPage from "@/pages/PromptsPage";
import UseCasesPage from "@/pages/UseCasesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { FeedbackModal } from "@/components/FeedbackModal";

const queryClient = new QueryClient();

const App = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/bina-ai/">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/prompts" element={<PromptsPage />} />
              <Route path="/usecases" element={<UseCasesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <button
          onClick={() => setFeedbackOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white text-sm font-medium transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "#1B3A5C" }}
          aria-label="משוב פיילוט"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">משוב</span>
        </button>
        <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
