import { useState } from "react";
import { Search, Lightbulb, TrendingUp, Clock, Users, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Footer } from "@/components/Footer";

interface UseCase {
  id: number;
  title: string;
  description: string;
  domain: string;
  impact: string;
  timeSaved: string;
  users: string;
  status: "פעיל" | "פיילוט" | "תכנון";
  details: string;
  metrics: { label: string; value: string }[];
  tools: string[];
}

const useCases: UseCase[] = [
  {
    id: 1, title: "סיכום ישיבות אוטומטי", domain: "פרודוקטיביות",
    description: "שימוש ב-AI לסיכום ישיבות צוות ומנהלים עם חילוץ משימות אוטומטי",
    impact: "חיסכון של 2-3 שעות שבועיות לכל מנהל", timeSaved: "~120 שע/חודש", users: "15 מנהלים",
    status: "פעיל",
    details: "המערכת מקבלת פרוטוקול ישיבה (טקסט או הקלטה) ומפיקה סיכום מובנה: נושאים, החלטות, משימות עם אחראים ולוחות זמנים. הוטמע ב-3 צוותים במינהל גמלאות.",
    metrics: [{ label: "ישיבות שסוכמו", value: "87" }, { label: "זמן ממוצע לסיכום", value: "2 דק'" }, { label: "שביעות רצון", value: "4.6/5" }],
    tools: ["Claude", "סיכום ישיבה (בינה)"],
  },
  {
    id: 2, title: "ניתוח תיקי סיעוד", domain: "סיעוד",
    description: "ניתוח אוטומטי של תיקי מטופלים לזיהוי הדרדרות ומיצוי זכויות",
    impact: "זיהוי מוקדם של 23% מקרי הדרדרות שלא אותרו", timeSaved: "~40 שע/חודש", users: "8 עו\"ס",
    status: "פיילוט",
    details: "הכלי מנתח נתוני תיק סיעוד (רמת גמלה, שירותים, משך זמן) ומחשב מדדי RDI ו-SDI. מזהה מטופלים בסיכון להדרדרות ומציע התערבויות. נבדק בפיילוט ירושלים.",
    metrics: [{ label: "תיקים שנותחו", value: "156" }, { label: "חריגים שזוהו", value: "37" }, { label: "דיוק", value: "89%" }],
    tools: ["מחשבון סיעוד 360", "Claude"],
  },
  {
    id: 3, title: "כתיבת מסמכי מדיניות", domain: "מסמכים",
    description: "יצירת טיוטות מסמכי מדיניות, ניירות עמדה וקולות קוראים בסיוע AI",
    impact: "קיצור זמן כתיבה ב-60%", timeSaved: "~30 שע/חודש", users: "6 כותבים",
    status: "פעיל",
    details: "שימוש בפרומפטים מובנים ליצירת טיוטות ראשוניות של מסמכים רשמיים. כולל התאמה לסגנון ממשלתי, מבנה מוגדר, ושילוב נתונים. הכותב מעבד ומשפר את הטיוטה.",
    metrics: [{ label: "מסמכים שנוצרו", value: "24" }, { label: "זמן ממוצע לטיוטה", value: "15 דק'" }, { label: "אחוז אימוץ", value: "85%" }],
    tools: ["Claude", "כתיבת מסמך (בינה)"],
  },
  {
    id: 4, title: "ניתוח נתונים ומגמות", domain: "ניתוח",
    description: "ניתוח אוטומטי של קבצי Excel ומסדי נתונים לחילוץ תובנות",
    impact: "תובנות שלקח שבוע — תוך שעה", timeSaved: "~60 שע/חודש", users: "4 אנליסטים",
    status: "פעיל",
    details: "העלאת קבצי נתונים ל-AI לקבלת ניתוח סטטיסטי, זיהוי מגמות, חריגים, וקורלציות. כולל יצירת גרפים והמלצות פעולה. משמש לניתוח נתוני גמלאות, סיעוד, ותעסוקה.",
    metrics: [{ label: "ניתוחים שבוצעו", value: "38" }, { label: "תובנות שהופקו", value: "142" }, { label: "החלטות שהושפעו", value: "12" }],
    tools: ["Claude", "ניתוח נתונים (בינה)"],
  },
  {
    id: 5, title: "מיצוי זכויות אוטומטי", domain: "שירות",
    description: "כלי שמזהה זכויות נוספות למבוטחים על בסיס הפרופיל שלהם",
    impact: "גילוי ממוצע של 2.3 זכויות נוספות למבוטח", timeSaved: "~20 שע/חודש", users: "12 פקידים",
    status: "פיילוט",
    details: "הכלי מקבל פרמטרים של מבוטח (גיל, רמת סיעוד, מצב משפחתי) ומחזיר רשימת זכויות מותאמת עם הנחיות מימוש. נבדק בסניף ירושלים עם 12 פקידי תביעות.",
    metrics: [{ label: "מבוטחים שנבדקו", value: "340" }, { label: "זכויות שנמצאו", value: "782" }, { label: "שווי ממוצע", value: "4,200 ₪/שנה" }],
    tools: ["מיצוי זכויות 360", "סיעוד 360"],
  },
  {
    id: 6, title: "תרגום מסמכים מקצועיים", domain: "תקשורת",
    description: "תרגום מסמכי OECD, מחקרים ודוחות בינלאומיים לעברית מקצועית",
    impact: "תרגום מסמך 20 עמודים ב-10 דקות במקום 2 ימים", timeSaved: "~25 שע/חודש", users: "5 חוקרים",
    status: "פעיל",
    details: "תרגום מקצועי עם שימור מונחים, הוספת מילון מונחים, והתאמה לסגנון ישראלי. כולל אפשרות לתרגום חלקי (פרקים נבחרים) ותרגום טבלאות.",
    metrics: [{ label: "מסמכים שתורגמו", value: "18" }, { label: "עמודים", value: "~350" }, { label: "דיוק מונחים", value: "94%" }],
    tools: ["Claude", "תרגום מסמך (בינה)"],
  },
];

const domains = ["הכל", "פרודוקטיביות", "סיעוד", "מסמכים", "ניתוח", "שירות", "תקשורת"];
const statusColors = { "פעיל": "bg-success/10 text-success", "פיילוט": "bg-warning/10 text-warning", "תכנון": "bg-info text-info-foreground" };

export default function UseCasesPage() {
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("הכל");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useCases.filter(uc => {
    const matchDomain = activeDomain === "הכל" || uc.domain === activeDomain;
    const matchSearch = uc.title.includes(search) || uc.description.includes(search);
    return matchDomain && matchSearch;
  });

  const totalTimeSaved = "~295 שע/חודש";
  const totalUsers = "50+";
  const activeCount = useCases.filter(u => u.status === "פעיל").length;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-2">יוזקייסים והוכחות ערך</h1>
        <p className="text-muted-foreground mb-6">שימושי AI שעובדים בפועל בארגון — מדדים, תובנות, ודוגמאות</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-foreground">{totalTimeSaved}</div>
            <div className="text-xs text-muted-foreground">חיסכון זמן כולל</div>
          </div>
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-foreground">{totalUsers}</div>
            <div className="text-xs text-muted-foreground">משתמשים פעילים</div>
          </div>
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <Star className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-foreground">{activeCount}</div>
            <div className="text-xs text-muted-foreground">יוזקייסים פעילים</div>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="חפש יוזקייס..."
            className="w-full bg-card border border-border rounded-xl pr-10 pl-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {domains.map(d => (
            <button key={d} onClick={() => setActiveDomain(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeDomain === d ? "bg-secondary text-secondary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}>{d}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(uc => (
            <div key={uc.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === uc.id ? null : uc.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{uc.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[uc.status]}`}>{uc.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{uc.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{uc.timeSaved}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{uc.users}</span>
                        <span className="font-medium text-success">{uc.impact}</span>
                      </div>
                    </div>
                  </div>
                  {expandedId === uc.id ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </div>
              </div>
              {expandedId === uc.id && (
                <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">{uc.details}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {uc.metrics.map(m => (
                      <div key={m.label} className="bg-info/50 rounded-lg p-3 text-center">
                        <div className="text-lg font-extrabold text-foreground">{m.value}</div>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">כלים:</span>
                    {uc.tools.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
