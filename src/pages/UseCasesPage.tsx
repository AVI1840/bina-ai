import { useState } from "react";
import { Search, Lightbulb, Plus, X, TrendingUp, Users, Star, ChevronDown, ChevronUp, Loader2, Copy, CheckCircle } from "lucide-react";
import { Footer } from "@/components/Footer";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwD8CMFoP5XoOwRLwK_OxMMOFKF8fS2CRpbJkNdOHjbnJIepkOLzlGrg3GQNGRqbwB6bA/exec";
const LOCAL_KEY = "btl-bina-shared-usecases";
const NAME_KEY = "btl-bina-platform-feedback-user-name";

interface UseCase {
  id: number;
  title: string;
  description: string;
  domain: string;
  result: string;
  toolUsed: string;
  author: string;
  likes: number;
  createdAt: string;
}

const domains = ["הכל", "סיעוד", "גמלאות", "מסמכים", "ניתוח", "שירות", "פרודוקטיביות", "אחר"];

export default function UseCasesPage() {
  const [cases, setCases] = useState<UseCase[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("הכל");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [sending, setSending] = useState(false);
  const [lastStatus, setLastStatus] = useState<"" | "ok" | "err">("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [savedName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [newCase, setNewCase] = useState({ title: "", description: "", domain: "סיעוד", result: "", toolUsed: "", author: savedName });

  const save = (updated: UseCase[]) => {
    setCases(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  const handleLike = (id: number) => {
    save(cases.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleCopy = (uc: UseCase) => {
    const text = `יוזקייס: ${uc.title}\nתחום: ${uc.domain}\nכלי: ${uc.toolUsed}\n\nתיאור: ${uc.description}\n\nתוצאה: ${uc.result}\n\nשותף ע"י: ${uc.author}`;
    navigator.clipboard.writeText(text);
    setCopiedId(uc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdd = async () => {
    if (!newCase.title.trim() || !newCase.description.trim() || !newCase.author.trim()) return;
    setSending(true);
    setLastStatus("");

    const uc: UseCase = {
      id: Date.now(), title: newCase.title.trim(), description: newCase.description.trim(),
      domain: newCase.domain, result: newCase.result.trim(), toolUsed: newCase.toolUsed.trim(),
      author: newCase.author.trim(), likes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    save([uc, ...cases]);

    try {
      await fetch(SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app: "בינה — שיתוף יוזקייס",
          name: uc.author,
          category: uc.domain,
          severity: uc.toolUsed,
          text: `[${uc.title}] ${uc.description} | תוצאה: ${uc.result}`,
          page: "/usecases",
        }),
      });
      setLastStatus("ok");
    } catch {
      setLastStatus("err");
    }

    localStorage.setItem(NAME_KEY, newCase.author.trim());
    setSending(false);
    setNewCase({ title: "", description: "", domain: "סיעוד", result: "", toolUsed: "", author: newCase.author });
    setTimeout(() => { setLastStatus(""); setShowAdd(false); }, 1500);
  };

  const filtered = cases.filter(uc => {
    const matchDomain = activeDomain === "הכל" || uc.domain === activeDomain;
    const matchSearch = !search || uc.title.includes(search) || uc.description.includes(search);
    return matchDomain && matchSearch;
  }).sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[1200px] mx-auto w-full animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-foreground">יוזקייסים והצלחות</h1>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-colors">
            <Plus className="w-4 h-4" /> שתף הצלחה
          </button>
        </div>
        <p className="text-muted-foreground text-sm mb-6">שתפו שימושי AI שעבדו לכם — מה עשיתם, באיזה כלי, ומה התוצאה. כל שיתוף נשלח לגיליון המשותף.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <Star className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{cases.length}</div>
            <div className="text-xs text-muted-foreground">יוזקייסים ששותפו</div>
          </div>
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <Users className="w-5 h-5 text-secondary mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{new Set(cases.map(c => c.author)).size}</div>
            <div className="text-xs text-muted-foreground">משתפים</div>
          </div>
          <div className="bg-card rounded-xl shadow-card border border-border p-4 text-center">
            <TrendingUp className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{cases.reduce((s, c) => s + c.likes, 0)}</div>
            <div className="text-xs text-muted-foreground">לייקים</div>
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

        {cases.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">עדיין אין יוזקייסים — היו הראשונים!</h3>
            <p className="text-muted-foreground mb-4">שתפו שימוש מוצלח ב-AI ותעזרו לכולם ללמוד</p>
            <button onClick={() => setShowAdd(true)}
              className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm">
              שתף הצלחה ראשונה
            </button>
          </div>
        ) : (
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
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-foreground">{uc.title}</h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary">{uc.domain}</span>
                          {uc.toolUsed && <span className="px-2 py-0.5 rounded-full text-xs bg-info text-info-foreground">{uc.toolUsed}</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{uc.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{uc.author} · {uc.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    {expandedId === uc.id ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                  </div>
                </div>
                {expandedId === uc.id && (
                  <div className="px-5 pb-5 border-t border-border pt-4">
                    {uc.result && (
                      <div className="p-4 bg-success/10 rounded-lg border border-success/20 mb-3">
                        <p className="text-sm font-bold text-success mb-1">תוצאה:</p>
                        <p className="text-sm text-foreground">{uc.result}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleLike(uc.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-info transition-colors border border-border">
                        <ThumbsUp className="w-3.5 h-3.5" /> {uc.likes} מועיל
                      </button>
                      <button onClick={() => handleCopy(uc)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                        {copiedId === uc.id ? <><CheckCircle className="w-3.5 h-3.5" /> הועתק!</> : <><Copy className="w-3.5 h-3.5" /> העתק</>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-card rounded-xl shadow-elevated max-w-lg w-full p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-lg">שתף הצלחה / יוזקייס</h2>
              <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">ספר מה עשית עם AI, באיזה כלי, ומה התוצאה. זה יישלח לגיליון המשותף.</p>
            <div className="space-y-3">
              <input value={newCase.author} onChange={e => setNewCase({...newCase, author: e.target.value})}
                placeholder="השם שלך" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <input value={newCase.title} onChange={e => setNewCase({...newCase, title: e.target.value})}
                placeholder="כותרת (למשל: ניתוח 50 תיקי סיעוד ב-10 דקות)" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <select value={newCase.domain} onChange={e => setNewCase({...newCase, domain: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground">
                {domains.filter(d => d !== "הכל").map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={newCase.toolUsed} onChange={e => setNewCase({...newCase, toolUsed: e.target.value})}
                placeholder="באיזה כלי השתמשת? (Claude, ChatGPT, בינה...)" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground" />
              <textarea value={newCase.description} onChange={e => setNewCase({...newCase, description: e.target.value})}
                placeholder="מה עשית? תאר את השימוש..."
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm h-24 resize-none bg-background text-foreground" />
              <textarea value={newCase.result} onChange={e => setNewCase({...newCase, result: e.target.value})}
                placeholder="מה התוצאה? (חיסכון זמן, תובנה, שיפור...)"
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm h-20 resize-none bg-background text-foreground" />
              <button onClick={handleAdd} disabled={!newCase.title.trim() || !newCase.description.trim() || !newCase.author.trim() || sending}
                className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-secondary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> שולח...</> : "שתף הצלחה"}
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
