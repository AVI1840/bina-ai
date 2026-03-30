import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  FileSearch,
  BarChart3,
  Wrench,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { title: "דף הבית", path: "/", icon: Home },
  { title: "עוזר AI", path: "/chat", icon: MessageSquare },
  { title: "ניתוח מסמכים", path: "/documents", icon: FileSearch },
  { title: "תובנות נתונים", path: "/insights", icon: BarChart3 },
  { title: "ארגז כלים", path: "/tools", icon: Wrench },
  { title: "ספריית פרומפטים", path: "/prompts", icon: Sparkles },
  { title: "יוזקייסים", path: "/usecases", icon: Lightbulb },
  { title: "בסיס ידע", path: "/knowledge", icon: BookOpen },
  { title: "הגדרות", path: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-l border-sidebar-border",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border min-h-[64px]">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-extrabold text-sm shrink-0">
          ב״ל
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-sm leading-tight">ביטוח לאומי</div>
            <div className="text-xs text-sidebar-foreground/70">מינהל גמלאות</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1" aria-label="ניווט ראשי">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-1",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-sidebar-border flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        aria-label={collapsed ? "הרחב תפריט" : "כווץ תפריט"}
      >
        {collapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </aside>
  );
}
