import { useState } from "react";
import { Search, FileText, ExternalLink } from "lucide-react";
import { Footer } from "@/components/Footer";

const categories = ["הכל", "מדיניות", "מחקר", "רגולציה", "פיילוטים", "טכנולוגיה"];

const categoryColors: Record<string, string> = {
  "מדיניות": "bg-secondary/10 text-secondary",
  "מחקר": "bg-accent/20 text-accent-foreground",
  "רגולציה": "bg-warning/10 text-warning",
  "פיילוטים": "bg-success/10 text-success",
  "טכנולוגיה": "bg-info text-info-foreground",
};

const documents = [
  { title: "נייר מדיניות סל אישי 1.2025", category: "מדיניות", date: "ינואר 2025", type: "PDF", desc: "מסמך מדיניות מקיף למודל סל תפקוד אישי בסיעוד" },
  { title: "תוצר EY סופי — מחקר שטח", category: "מחקר", date: "דצמבר 2024", type: "PDF", desc: "סיכום מחקר שטח בקרב זכאי סיעוד ומטפלים" },
  { title: "מדדי הדרדרות — RDI + SDI", category: "מחקר", date: "פברואר 2026", type: "XLSX", desc: "טבלאות נתונים מלאות של מדדי הדרדרות ומגוון שירותים" },
  { title: "טיוטת לוח ח-2", category: "רגולציה", date: "מאי 2025", type: "DOCX", desc: "טיוטה מעודכנת ללוח ח-2 של חוק הסיעוד" },
  { title: "קול קורא לרשויות מקומיות גרסה 2", category: "רגולציה", date: "נובמבר 2025", type: "PDF", desc: "מסמך קול קורא לשיתוף פעולה עם רשויות מקומיות" },
  { title: "הצעת פיילוטים גרסה 6", category: "פיילוטים", date: "2025", type: "PDF", desc: "הצעה מעודכנת לפיילוטים בערים שונות" },
  { title: "ספר הפעלה עכשיו אני ירושלים", category: "פיילוטים", date: "2025", type: "PDF", desc: "מדריך הפעלה מלא לפיילוט ירושלים" },
  { title: "אפיון MVP מערכת מתאמות", category: "טכנולוגיה", date: "מרץ 2026", type: "DOCX", desc: "מסמך אפיון למערכת ניהול מתאמות טיפול" },
  { title: "מסמך דרישות עסקיות", category: "טכנולוגיה", date: "2025", type: "PDF", desc: "דרישות עסקיות למערכת סל אישי" },
  { title: "סיכום סדנת עיצוב שירות", category: "מחקר", date: "נובמבר 2024", type: "PDF", desc: "תיעוד סדנת Service Design עם בעלי עניין" },
];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");

  const filtered = documents.filter((doc) => {
    const matchCategory = activeCategory === "הכל" || doc.category === activeCategory;
    const matchSearch = doc.title.includes(search) || doc.desc.includes(search);
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-6">בסיס ידע</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש בבסיס הידע..."
            className="w-full bg-card border border-border rounded-xl pr-10 pl-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="חיפוש בבסיס הידע"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeCategory === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Document grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card border border-border p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-foreground truncate">{doc.title}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${categoryColors[doc.category] || "bg-muted text-muted-foreground"}`}>
                    {doc.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-xs">{doc.type}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{doc.desc}</p>
              </div>
              <button className="p-2 text-secondary hover:bg-info rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0" aria-label={`פתח ${doc.title}`}>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
