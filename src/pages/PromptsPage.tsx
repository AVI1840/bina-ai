import { useState, useEffect } from "react";
import { Search, Copy, ThumbsUp, Plus, X, Tag, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwD8CMFoP5XoOwRLwK_OxMMOFKF8fS2CRpbJkNdOHjbnJIepkOLzlGrg3GQNGRqbwB6bA/exec";
const LOCAL_KEY = "btl-bina-shared-prompts";
const NAME_KEY = "btl-bina-platform-feedback-user-name";

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

const categories = ["הכל", "מסמכים", "ניתוח", "מחקר", "טכנולוגיה", "תקשורת", "סיעוד", "אחר"];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [sending, setSending] = useState(false);
  const [lastStatus, setLastStatus] = useState<"" | "ok" | "err">("");
  const [savedName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [newPrompt, setNewPrompt] = useState({ title: "", text: "", category: "מסמכים", tags: "", author: savedName });

  const save = (updated: Prompt[]) => {
    setPrompts(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  const handleCopy = (p: Prompt) => {
    navigator.clipboard.writeText(p.text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: number) => {
    save(prompts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAdd = async () => {
    if (!newPrompt.title.trim() || !newPrompt.text.trim() || !newPrompt.author.trim()) return;
    setSending(true);
    setLastStatus("");

    const p: Prompt = {
      id: Date.now(), title: newPrompt.title.trim(), text: newPrompt.text.trim(),
      category: newPrompt.category, author: newPrompt.author.trim(), likes: 0,
      tags: newPrompt.tags.split(",").map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
    };

    // שמירה מקומית מיד
    save([p, ...prompts]);

    // שליחה ל-Google Sheet
    try {
      await fetch(SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app: "בינה — שיתוף פרומפט",
          name: p.author,
          category: p.category,
          severity: p.tags.join(", "),
          text: `[${p.title}] ${p.text}`,
          page: "/prompts",
        }),
      });
      setLastStatus("ok");
    } catch {
      setLastStatus("err");
    }

    localStorage.setItem(NAME_KEY, newPrompt.author.trim());
    setSending(false);
    setNewPrompt({ title: "", text: "", category: "מסמכים", tags: "", author: newPrompt.author });
    setTimeout(() => { setLastStatus(""); setShowAdd(false); }, 1500);
  };

  const filtered = prompts.filter(p => {
    const matchCat = activeCategory === "הכל" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.includes(search) || p.text.includes(search) || p.tags.some(t => t.includes(search));
    return matchCat && matchSearch;
  }).sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-foreground">ספריית פרומפטים שיתופית</h1>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors">
            <Plus className="w-4 h-4" /> שתף פרומפט
          </button>
        </div>
        <p className="text-muted-foreground text-sm mb-6">שתפו פרומפטים שעובדים לכם — כולם ירוויחו. כל פרומפט נשלח גם לגיליון המשותף.</p>

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

        {prompts.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">הספרייה ריקה — היו הראשונים!</h3>
            <p className="text-muted-foreground mb-4">שתפו פרומפט שעובד לכם ותעזרו לכולם</p>
            <button onClick={() => setShowAdd(true)}
              className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm">
              שתף פרומפט ראשון
            </button>
          </div>
        ) : (
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
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed whitespace-pre-line">{p.text}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.map(t => (
                      <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-info text-info-foreground text-xs">
                        <Tag className="w-3 h-3" />{t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{p.author} · {p.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleLike(p.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground hover:bg-info transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> {p.likes}
                    </button>
                    <button onClick={() => handleCopy(p)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                      {copiedId === p.id ? <><CheckCircle className="w-3.5 h-3.5" /> הועתק!</> : <><Copy className="w-3.5 h-3.5" /> העתק</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {filtered.length === 0 && prompts.length > 0 && (
          <div className="text-center py-12 text-muted-foreground">לא נמצאו פרומפטים. נסה חיפוש אחר.</div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-card rounded-xl shadow-elevated max-w-lg w-full p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-lg">שתף פרומפט</h2>
              <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">הפרומפט ישמר בספרייה וישלח לגיליון המשותף</p>
            <div className="space-y-3">
              <input value={newPrompt.author} onChange={e => setNewPrompt({...newPrompt, author: e.target.value})}
                placeholder="השם שלך" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <input value={newPrompt.title} onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
                placeholder="שם הפרומפט (למשל: סיכום ישיבה מובנה)" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <select value={newPrompt.category} onChange={e => setNewPrompt({...newPrompt, category: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground">
                {categories.filter(c => c !== "הכל").map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea value={newPrompt.text} onChange={e => setNewPrompt({...newPrompt, text: e.target.value})}
                placeholder="תוכן הפרומפט — מה בדיוק כתבת ל-AI שעבד טוב?"
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm h-36 resize-none bg-background text-foreground" />
              <input value={newPrompt.tags} onChange={e => setNewPrompt({...newPrompt, tags: e.target.value})}
                placeholder="תגיות (מופרדות בפסיק, למשל: ישיבות, סיכום)" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <button onClick={handleAdd} disabled={!newPrompt.title.trim() || !newPrompt.text.trim() || !newPrompt.author.trim() || sending}
                className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> שולח...</> : "שתף פרומפט"}
              </button>
              {lastStatus === "ok" && <p className="text-xs text-green-600 text-center">✅ נשמר ונשלח לגיליון המשותף</p>}
              {lastStatus === "err" && <p className="text-xs text-orange-500 text-center">📱 נשמר מקומית — יישלח כשיהיה חיבור</p>}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
