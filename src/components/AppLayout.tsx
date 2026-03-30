import { AppSidebar } from "@/components/AppSidebar";
import { ChatBotWidget } from "@/components/ChatBotWidget";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main id="main-content" className="flex-1 min-w-0">
        <Outlet />
      </main>
      <ChatBotWidget />
    </div>
  );
}
