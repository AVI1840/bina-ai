import {
  MessageSquare,
  FileSearch,
  TrendingUp,
  Lightbulb,
  Wrench,
  ClipboardList,
  FileText,
  BarChart3,
  Languages,
  Presentation,
  GitCompare,
  Clock,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const quickActions = [
  { title: "שאל את הבינה", desc: "התחל שיחה עם העוזר החכם", icon: MessageSquare, path: "/chat", accent: true },
  { title: "ספריית פרומפטים", desc: "פרומפטים מוכחים שעובדים", icon: Sparkles, path: "/prompts" },
  { title: "יוזקייסים", desc: "הוכחות ערך ודוגמאות מהשטח", icon: Lightbulb, path: "/usecases" },
];

const stats = [
  { label: "שיחות AI החודש", value: "142", icon: MessageSquare },
  { label: "מסמכים שנותחו", value: "38", icon: FileSearch },
  { label: "תובנות שנוצרו", value: "17", icon: Lightbulb },
  { label: "כלים בשימוש", value: "8", icon: Wrench },
];

const recentActivity = [
  { text: "ניתוח נייר מדיניות סל אישי", time: "לפני שעתיים", icon: FileSearch },
  { text: "שיחה: מדדי הדרדרות RDI", time: "לפני 5 שעות", icon: MessageSquare },
  { text: "יצירת סיכום ישיבה", time: "אתמול", icon: ClipboardList },
  { text: "ניתוח 3 תיקי סיעוד", time: "אתמול", icon: FileSearch },
  { text: "השוואת מודלים בינלאומיים", time: "לפני יומיים", icon: GitCompare },
  { text: "כתיבת טיוטת קול קורא", time: "לפני 3 ימים", icon: FileText },
  { text: "ניתוח נתוני SDI לפי רמות", time: "לפני 4 ימים", icon: BarChart3 },
  { text: "תרגום מאמר OECD", time: "לפני שבוע", icon: Languages },
];

const quickTools = [
  { title: "סיכום ישיבה", icon: ClipboardList },
  { title: "כתיבת מסמך מדיניות", icon: FileText },
  { title: "ניתוח נתונים", icon: BarChart3 },
  { title: "תרגום מסמך", icon: Languages },
  { title: "יצירת מצגת", icon: Presentation },
  { title: "השוואת מסמכים", icon: GitCompare },
];

export default function HomePage() {
  const hebrewDate = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-foreground mb-1">שלום, אביעד 👋</h1>
          <p className="text-muted-foreground text-sm">{hebrewDate}</p>
          <p className="text-muted-foreground mt-2 text-base">מה תרצה לעשות היום?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className={`bg-card rounded-xl shadow-card p-5 flex items-start gap-4 transition-all hover:shadow-elevated hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                action.accent ? "border-2 border-accent" : "border border-border"
              }`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                action.accent ? "bg-accent/20 text-accent" : "bg-secondary/10 text-secondary"
              }`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl shadow-card p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-secondary" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-card rounded-xl shadow-card p-5 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              פעילות אחרונה
            </h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-info flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-info-foreground" />
                  </div>
                  <span className="text-sm text-foreground flex-1">{item.text}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tools */}
          <div className="bg-card rounded-xl shadow-card p-5 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-secondary" />
              כלים מהירים
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickTools.map((tool) => (
                <Link
                  key={tool.title}
                  to="/tools"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-info/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <tool.icon className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{tool.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
