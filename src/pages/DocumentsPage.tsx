import { useState } from "react";
import { Upload, FileText, CheckCircle, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";

const tabs = ["סיכום", "נקודות מפתח", "נתונים", "המלצות", "שאלות"];

const summaryText = `נייר המדיניות מציג את מודל סל התפקוד האישי כתפיסה חדשנית למתן שירותי סיעוד. המודל מבוסס על הערכה אישית של צרכי המטופל ומאפשר גמישות בבחירת השירותים.

המסמך סוקר את הרקע לרפורמה, כולל נתונים על אוכלוסיית הזכאים, עלויות נוכחיות, ופערים בין הצרכים בפועל לשירותים הניתנים. מוצגים נתונים מהשטח שנאספו על ידי EY.

בנוסף, מוצגים מדדים כמותיים חדשים (RDI, SDI) למדידת הדרדרות ומגוון שירותים, ומוצעת תוכנית פיילוט בירושלים כשלב ראשון ליישום.`;

const keyPoints = [
  "מעבר ממודל שעות לסל תפקוד אישי המותאם לצרכי המטופל",
  "44.6% מהזכאים מקבלים רק טיפול אישי (SDI=0)",
  "מדד RDI חושף עיכוב בזיהוי הדרדרות, במיוחד בנשים 85+",
  "פיילוט ירושלים — 20 תיקים, 12 הושלמו עד כה",
  "המלצה להגדלת סל השירותים ברמות 1-2",
  "שיתוף פעולה עם רשויות מקומיות ליישום הרפורמה",
];

const dataRows = [
  { metric: "SDI=0", value: "44.6%", source: "מחקר EY 2024" },
  { metric: "RDI נשים 85+", value: "1.49", source: "נתוני בל״ל 2026" },
  { metric: "שהות ממוצעת רמה 1", value: "40.3 חודשים", source: "נתוני בל״ל 2026" },
  { metric: "תיקי פיילוט שהושלמו", value: "12/20", source: "דוח פיילוט ירושלים" },
  { metric: "עלות שנתית ממוצעת", value: "₪78,000", source: "אומדן 2025" },
];

const recommendations = [
  "להרחיב את סל השירותים ברמות גמלה 1-2 כדי לאפשר מגוון רחב יותר של שירותים מונעים",
  "להגביר תדירות הערכות בקבוצת נשים 85+ עם RDI גבוה",
  "להשלים את פיילוט ירושלים ולפרסם דוח ביניים עד אפריל 2026",
  "לפתח מערכת דיגיטלית לניהול סל אישי עם ממשק למתאמות טיפול",
];

const questions = [
  "מה ההשפעה הצפויה של הרפורמה על תקציב גמלת הסיעוד?",
  "כיצד ייבחרו השירותים בסל האישי — ע״י המטופל, מתאמת, או שניהם?",
  "האם יש תכנית להרחבת הפיילוט לערים נוספות?",
  "מה הקשר בין SDI נמוך לשביעות רצון המטופלים?",
  "האם נבחנו מודלים דומים במדינות OECD אחרות?",
];

const recentDocs = [
  { name: "נייר מדיניות סל אישי", type: "PDF", date: "15 בינואר 2025", status: "נותח" },
  { name: "תוצר EY סופי", type: "PDF", date: "20 בדצמבר 2024", status: "נותח" },
  { name: "נתוני RDI פברואר", type: "XLSX", date: "1 בפברואר 2026", status: "נותח" },
  { name: "טיוטת לוח ח-2", type: "DOCX", date: "10 במאי 2025", status: "ממתין" },
  { name: "דוח פיילוט ירושלים", type: "PDF", date: "5 במרץ 2026", status: "בתהליך" },
];

export default function DocumentsPage() {
  const [uploaded, setUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState("סיכום");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-6">ניתוח מסמכים</h1>

        {!uploaded ? (
          <button
            onClick={() => setUploaded(true)}
            className="w-full border-2 border-dashed border-secondary/40 rounded-xl p-12 flex flex-col items-center gap-4 hover:border-secondary/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-card"
            aria-label="העלאת מסמך"
          >
            <Upload className="w-12 h-12 text-secondary" />
            <div className="text-center">
              <p className="font-bold text-foreground">גרור מסמך לכאן או לחץ להעלאה</p>
              <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, XLSX, PPTX</p>
            </div>
          </button>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Document preview */}
            <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">נייר מדיניות סל תפקוד אישי 1.2025</h3>
                  <p className="text-xs text-muted-foreground">PDF • 12 עמודים</p>
                </div>
              </div>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <FileText className="w-16 h-16 text-muted-foreground/30" />
              </div>
            </div>

            {/* Analysis tabs */}
            <div className="lg:col-span-3 bg-card rounded-xl shadow-card border border-border p-5">
              <div className="flex gap-1 mb-4 overflow-x-auto" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeTab === tab
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-sm leading-relaxed text-foreground" role="tabpanel">
                {activeTab === "סיכום" && (
                  <div className="whitespace-pre-line">{summaryText}</div>
                )}
                {activeTab === "נקודות מפתח" && (
                  <ul className="space-y-2">
                    {keyPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "נתונים" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-2 font-bold">מדד</th>
                          <th className="text-right py-2 font-bold">ערך</th>
                          <th className="text-right py-2 font-bold">מקור</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataRows.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            <td className="py-2">{row.metric}</td>
                            <td className="py-2 font-semibold">{row.value}</td>
                            <td className="py-2 text-muted-foreground">{row.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === "המלצות" && (
                  <ol className="space-y-3">
                    {recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {r}
                      </li>
                    ))}
                  </ol>
                )}
                {activeTab === "שאלות" && (
                  <ul className="space-y-2">
                    {questions.map((q, i) => (
                      <li key={i} className="p-3 bg-info rounded-lg">{q}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recent documents table */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5 mt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">מסמכים אחרונים</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-2 font-bold">שם מסמך</th>
                  <th className="text-right py-2 font-bold">סוג</th>
                  <th className="text-right py-2 font-bold">תאריך</th>
                  <th className="text-right py-2 font-bold">סטטוס</th>
                </tr>
              </thead>
              <tbody>
                {recentDocs.map((doc, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2 font-medium">{doc.name}</td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded-full bg-info text-info-foreground text-xs font-bold">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-2 text-muted-foreground">{doc.date}</td>
                    <td className="py-2">
                      <span className="flex items-center gap-1 text-xs">
                        {doc.status === "נותח" && <CheckCircle className="w-3.5 h-3.5 text-success" />}
                        {doc.status === "ממתין" && <Clock className="w-3.5 h-3.5 text-warning" />}
                        {doc.status === "בתהליך" && <Clock className="w-3.5 h-3.5 text-secondary" />}
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
