import { useState } from "react";
import { Search, Copy, ThumbsUp, Plus, X, Tag, Sparkles, CheckCircle } from "lucide-react";
import { Footer } from "@/components/Footer";

const STORAGE_KEY = "btl-bina-prompts";

interface Prompt {
  id: number;
  title: string;
  text: string;
  category: string;
  author: string;
  likes: number;
  tags: string[];
  createdAt: string;
}

const defaultPrompts: Prompt[] = [
  {
    id: 1, title: "סיכום ישיבה מובנה", category: "מסמכים",
    text: "סכם את הישיבה הבאה בפורמט מובנה: נושאים שנדונו, החלטות שהתקבלו, משימות (מי/מה/עד מתי), ונקודות פתוחות. כתוב בעברית תקנית ובסגנון ממשלתי.",
    author: "אביעד י.", likes: 12, tags: ["ישיבות", "סיכום", "מובנה"], createdAt: "2026-02-15"
  },
  {
    id: 2, title: "ניתוח נייר מדיניות", category: "ניתוח",
    text: "נתח את נייר המדיניות הבא והפק: 1) סיכום מנהלים (3-5 משפטים) 2) נקודות מפתח 3) נתונים מספריים 4) המלצות 5) שאלות פתוחות. הצג בטבלאות כשרלוונטי.",
    author: "מיכל ד.", likes: 9, tags: ["מדיניות", "ניתוח", "מנהלים"], createdAt: "2026-01-20"
  },
  {
    id: 3, title: "כתיבת קול קורא", category: "מסמכים",
    text: "כתוב טיוטת קול קורא לנושא [X]. כלול: רקע ומטרות, קהל יעד, תנאי סף, קריטריונים להערכה, לוח זמנים, ואופן ההגשה. שפה רשמית-ממשלתית.",
    author: "רונית כ.", likes: 7, tags: ["קול קורא", "רגולציה"], createdAt: "2026-02-01"
  },
  {
    id: 4, title: "השוואת מודלים בינלאומיים", category: "מחקר",
    text: "השווה בין המודלים של [מדינה 1] ו-[מדינה 2] בתחום [X]. הצג בטבלה: פרמטרים, יתרונות, חסרונות, רלוונטיות לישראל, ומקורות. סכם עם המלצה.",
    author: "אביעד י.", likes: 11, tags: ["בינלאומי", "השוואה", "OECD"], createdAt: "2026-03-01"
  },
  {
    id: 5, title: "אפיון דרישות עסקיות", category: "טכנולוגיה",
    text: "צור מסמך דרישות עסקיות (BRD) עבור [מערכת]. כלול: מטרות עסקיות, בעלי עניין, תהליכים נוכחיים (AS-IS), תהליכים רצויים (TO-BE), דרישות פונקציונליות ולא-פונקציונליות, ו-KPIs.",
    author: "דני ש.", likes: 8, tags: ["אפיון", "BRD", "מערכות"], createdAt: "2026-02-10"
  },
  {
    id: 6, title: "ניתוח נתוני Excel", category: "ניתוח",
    text: "נתח את הנתונים הבאים והפק: 1) סטטיסטיקות תיאוריות 2) מגמות עיקריות 3) חריגים 4) קורלציות 5) תובנות פעולה. הצג בגרפים וטבלאות. כתוב בעברית.",
    author: "שרה ל.", likes: 6, tags: ["נתונים", "Excel", "סטטיסטיקה"], createdAt: "2026-01-28"
  },
  {
    id: 7, title: "הכנת מצגת להנהלה", category: "מסמכים",
    text: "הכן מצגת של [X] שקפים להנהלה בנושא [Y]. כל שקף: כותרת, 3-4 נקודות, ויזואליזציה מומלצת. כלול: שקף פתיחה, רקע, ממצאים, המלצות, צעדים הבאים.",
    author: "מיכל ד.", likes: 5, tags: ["מצגת", "הנהלה"], createdAt: "2026-03-10"
  },
  {
    id: 8, title: "תרגום מקצועי מאנגלית", category: "תקשורת",
    text: "תרגם את המסמך הבא מאנגלית לעברית. שמור על מונחים מקצועיים (ציין באנגלית בסוגריים בפעם הראשונה). התאם לסגנון ממשלתי ישראלי. הוסף מילון מונחים בסוף.",
    author: "רונית כ.", likes: 4, tags: ["תרגום", "אנגלית", "מונחים"], createdAt: "2026-02-20"
  },
];

const categories = ["הכל", "מסמכים", "ניתוח", "מחקר", "טכנולוגיה", "תקשורת"];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPrompts;
  });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: "", text: "", category: "מסמכים", tags: "" });

  const save = (updated: Prompt[]) => {
    setPrompts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleCopy = (p: Prompt) => {
    navigator.clipboard.writeText(p.text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: number) => {
    save(prompts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAdd = () => {
    if (!newPrompt.title.trim() || !newPrompt.text.trim()) return;
    const p: Prompt = {
      id: Date.now(), title: newPrompt.title.trim(), text: newPrompt.text.trim(),
      category: newPrompt.category, author: "אני", likes: 0,
      tags: newPrompt.tags.split(",").map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
    };
    save([p, ...prompts]);
    setNewPrompt({ title: "", text: "", category: "מסמכים", tags: "" });
    setShowAdd(false);
  };

  const filtered = prompts.filter(p => {
    const matchCat = activeCategory === "הכל" || p.category === activeCategory;
    const matchSearch = p.title.includes(search) || p.text.includes(search) || p.tags.some(t => t.includes(search));
    return matchCat && matchSearch;
  }).sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-foreground">ספריית פרומפטים</h1>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors">
            <Plus className="w-4 h-4" /> הוסף פרומפט
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="חפש פרומפט, תגית, או נושא..."
            className="w-full bg-card border border-border rounded-xl pr-10 pl-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto" role="tablist">
          {categories.map(cat => (
            <button key={cat} role="tab" aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-card rounded-xl shadow-card border border-border p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent shrink-0" />
                  <h3 className="font-bold text-sm text-foreground">{p.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary shrink-0">{p.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed">{p.text}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-info text-info-foreground text-xs">
                    <Tag className="w-3 h-3" />{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{p.author} · {p.createdAt}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleLike(p.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground hover:bg-info transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> {p.likes}
                  </button>
                  <button onClick={() => handleCopy(p)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                    {copiedId === p.id ? <><CheckCircle className="w-3.5 h-3.5" /> הועתק</> : <><Copy className="w-3.5 h-3.5" /> העתק</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">לא נמצאו פרומפטים. נסה חיפוש אחר או הוסף חדש.</div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-card rounded-xl shadow-elevated max-w-lg w-full p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground">פרומפט חדש</h2>
              <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={newPrompt.title} onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
                placeholder="שם הפרומפט" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <select value={newPrompt.category} onChange={e => setNewPrompt({...newPrompt, category: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground">
                {categories.filter(c => c !== "הכל").map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea value={newPrompt.text} onChange={e => setNewPrompt({...newPrompt, text: e.target.value})}
                placeholder="תוכן הפרומפט..." className="w-full border border-border rounded-lg px-3 py-2.5 text-sm h-32 resize-none bg-background text-foreground" />
              <input value={newPrompt.tags} onChange={e => setNewPrompt({...newPrompt, tags: e.target.value})}
                placeholder="תגיות (מופרדות בפסיק)" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <button onClick={handleAdd} disabled={!newPrompt.title.trim() || !newPrompt.text.trim()}
                className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 disabled:opacity-50 transition-colors">
                שמור פרומפט
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
