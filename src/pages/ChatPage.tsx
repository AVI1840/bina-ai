import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Footer } from "@/components/Footer";

const contexts = ["כללי", "סל אישי בסיעוד", "מדדי הדרדרות", "רגולציה וחקיקה", "פיילוט ירושלים"];

const suggestions = [
  "סכם את נייר המדיניות",
  "מה הסטטוס של הפיילוט?",
  "הסבר את מדד SDI",
  "מה הצעדים הבאים?",
];

interface Message {
  role: "bot" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "שלום! אני בינה, העוזר החכם של ביטוח לאומי. אפשר לשאול אותי על מדיניות סיעוד, מדדי הדרדרות, פיילוטים, או כל נושא אחר. במה אוכל לעזור?",
  },
  {
    role: "user",
    text: "מה המצב של מדד ה-RDI אצל נשים מעל 85?",
  },
  {
    role: "bot",
    text: `לפי הנתונים העדכניים (פברואר 2026):

נשים 85+ ברמת גמלה 1:
• RDI = 1.49 (חריג — מעל סף 1.5)
• שהות ממוצעת: 40.3 חודשים
• Benchmark (חציון רמה 1): כ-27 חודשים

זו הקבוצה עם ה-RDI הגבוה ביותר. המשמעות: נשים מבוגרות שוהות זמן רב ברמה 1 לפני שמזהים הדרדרות.

המלצה: הגברת תדירות הערכות בקבוצה זו.`,
  },
];

export default function ChatPage() {
  const [messages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("כללי");

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <h2 className="font-bold text-foreground">בינה — עוזר AI</h2>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="border border-border rounded-lg px-3 py-1.5 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="הקשר שיחה"
        >
          {contexts.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "bot"
                  ? "bg-info text-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="px-6 pb-2 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            className="px-3 py-1.5 rounded-full border border-border text-xs font-medium text-foreground hover:bg-info transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-2">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="צרף קובץ">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="הקלטה">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="הקלד הודעה..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none px-2"
            aria-label="הודעה לעוזר"
          />
          <button className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="שלח">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
