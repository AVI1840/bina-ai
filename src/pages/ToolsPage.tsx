import { useState } from "react";
import {
  ClipboardList, FileText, LayoutList, BarChart3, GitCompare, LineChart,
  Globe, Mail, Mic, Brain, Ruler, Target, X
} from "lucide-react";
import { Footer } from "@/components/Footer";

const toolGroups = [
  {
    title: "מסמכים",
    tools: [
      { title: "סיכום ישיבה", desc: "הזן פרוטוקול וקבל סיכום מובנה עם משימות", icon: ClipboardList },
      { title: "כתיבת מסמך", desc: "צור מסמך מדיניות, נייר עמדה, או דוח", icon: FileText },
      { title: "תבנית דוח", desc: "מלא תבנית דוח מנהלים מובנית", icon: LayoutList },
    ],
  },
  {
    title: "ניתוח",
    tools: [
      { title: "ניתוח נתונים", desc: "העלה Excel וקבל תובנות אוטומטיות", icon: BarChart3 },
      { title: "השוואת מסמכים", desc: "השווה שתי גרסאות ומצא הבדלים", icon: GitCompare },
      { title: "יצירת גרפים", desc: "הפוך נתונים לויזואליזציה ברורה", icon: LineChart },
    ],
  },
  {
    title: "תקשורת",
    tools: [
      { title: "תרגום מסמך", desc: "תרגם מסמך מאנגלית לעברית או להפך", icon: Globe },
      { title: "כתיבת מכתב", desc: "צור מכתב רשמי בשפה ממשלתית", icon: Mail },
      { title: "תמלול ישיבה", desc: "העלה הקלטה וקבל תמלול מובנה", icon: Mic },
    ],
  },
  {
    title: "מתקדם",
    tools: [
      { title: "ניתוח תיק סיעוד", desc: "נתח תיק מטופל והפק פרסונה", icon: Brain },
      { title: "אפיון מערכת", desc: "צור מסמך אפיון טכני מובנה", icon: Ruler },
      { title: "תכנית עבודה", desc: "בנה תכנית עבודה עם אבני דרך ולוחות זמנים", icon: Target },
    ],
  },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<{ title: string; desc: string } | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-6">ארגז כלים</h1>

        {toolGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h2 className="text-base font-bold text-muted-foreground mb-3">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.tools.map((tool) => (
                <div
                  key={tool.title}
                  className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <tool.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-bold text-foreground">{tool.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.desc}</p>
                  <button
                    onClick={() => setActiveTool(tool)}
                    className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    הפעל
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeTool && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setActiveTool(null)}>
          <div
            className="bg-card rounded-xl shadow-elevated max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={activeTool.title}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground">{activeTool.title}</h2>
              <button
                onClick={() => setActiveTool(null)}
                className="p-1 hover:bg-muted rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{activeTool.desc}</p>
            <label className="block text-sm font-medium text-foreground mb-1">
              קלט <span className="text-destructive">*</span>
            </label>
            <textarea
              className="w-full border border-border rounded-lg p-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              placeholder="הזן טקסט או תוכן..."
              aria-label="קלט לכלי"
            />
            <button className="mt-4 w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              הפעל כלי
            </button>
            <div className="mt-4 p-4 bg-info rounded-lg text-sm text-foreground">
              <p className="font-bold mb-2">תוצאה:</p>
              <p className="text-muted-foreground">הפלט יופיע כאן לאחר הפעלת הכלי...</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
