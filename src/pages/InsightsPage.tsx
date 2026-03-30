import { TrendingUp, PieChart as PieChartIcon, Target, Lightbulb } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { Footer } from "@/components/Footer";

const rdiTrend = [
  { month: "ספט", value: 1.32 },
  { month: "אוק", value: 1.35 },
  { month: "נוב", value: 1.38 },
  { month: "דצמ", value: 1.41 },
  { month: "ינו", value: 1.45 },
  { month: "פבר", value: 1.49 },
];

const sdiData = [
  { name: "SDI=0", value: 44.6 },
  { name: "SDI=1-7", value: 41.3 },
  { name: "SDI>33", value: 14.1 },
];
const pieColors = ["hsl(207, 95%, 35%)", "hsl(37, 80%, 52%)", "hsl(152, 64%, 29%)"];

const areaData = [
  { month: "ספט", r1: 35, r2: 25, r3: 18, r4: 12, r5: 7, r6: 3 },
  { month: "אוק", r1: 34, r2: 26, r3: 17, r4: 13, r5: 7, r6: 3 },
  { month: "נוב", r1: 33, r2: 26, r3: 18, r4: 13, r5: 7, r6: 3 },
  { month: "דצמ", r1: 33, r2: 25, r3: 19, r4: 13, r5: 7, r6: 3 },
  { month: "ינו", r1: 32, r2: 26, r3: 19, r4: 13, r5: 7, r6: 3 },
  { month: "פבר", r1: 31, r2: 27, r3: 19, r4: 13, r5: 7, r6: 3 },
];

const aiInsights = [
  { title: "עלייה ב-RDI בקרב נשים 85+", desc: "מגמה מדאיגה שנמשכת 3 חודשים", source: "נתונים", date: "1 במרץ 2026" },
  { title: "ירידה בשימוש בשירותי שיקום", desc: "ירידה של 12% בהפניות לשיקום ברמות 1-2", source: "מגמות", date: "28 בפברואר 2026" },
  { title: "פיילוט ירושלים — ממצא חריג", desc: "3 תיקים עם שיפור משמעותי לאחר סל אישי", source: "פיילוט", date: "25 בפברואר 2026" },
  { title: "עלות ממוצעת יורדת ברמה 3", desc: "ירידה של 5% בעלות החודשית ממוצעת", source: "כספים", date: "20 בפברואר 2026" },
  { title: "המלצה: עדכון קריטריוני סף", desc: "מומלץ לשקול עדכון סף RDI מ-1.5 ל-1.4", source: "ניתוח", date: "18 בפברואר 2026" },
];

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-6">תובנות נתונים</h1>

        {/* Top insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* RDI Trend */}
          <div className="bg-card rounded-xl shadow-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" /> מגמת הדרדרות
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-bold">🔴 דורש תשומת לב</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">עלייה של 8% ב-RDI הממוצע</p>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={rdiTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 60%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[1.2, 1.6]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(207, 95%, 35%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SDI Donut */}
          <div className="bg-card rounded-xl shadow-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-secondary" /> מגוון שירותים
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-bold">🟡 לבדיקה</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">44.6% ללא שירותים מעבר לטיפול אישי</p>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={sdiData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {sdiData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pilot progress */}
          <div className="bg-card rounded-xl shadow-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" /> פיילוט ירושלים
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-bold">🟢 בתהליך</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">12 מתוך 20 תיקים הושלמו</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>התקדמות</span>
                <span>65%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full transition-all" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">התפלגות רמות גמלה לאורך זמן</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 60%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="r1" stackId="1" fill="hsl(207, 95%, 35%)" stroke="hsl(207, 95%, 35%)" name="רמה 1" />
              <Area type="monotone" dataKey="r2" stackId="1" fill="hsl(207, 70%, 50%)" stroke="hsl(207, 70%, 50%)" name="רמה 2" />
              <Area type="monotone" dataKey="r3" stackId="1" fill="hsl(37, 80%, 52%)" stroke="hsl(37, 80%, 52%)" name="רמה 3" />
              <Area type="monotone" dataKey="r4" stackId="1" fill="hsl(37, 60%, 65%)" stroke="hsl(37, 60%, 65%)" name="רמה 4" />
              <Area type="monotone" dataKey="r5" stackId="1" fill="hsl(152, 64%, 29%)" stroke="hsl(152, 64%, 29%)" name="רמה 5" />
              <Area type="monotone" dataKey="r6" stackId="1" fill="hsl(152, 40%, 50%)" stroke="hsl(152, 40%, 50%)" name="רמה 6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" /> תובנות AI אחרונות
          </h2>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className="p-4 bg-info/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-foreground">{insight.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">{insight.source}</span>
                </div>
                <p className="text-sm text-muted-foreground">{insight.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{insight.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
