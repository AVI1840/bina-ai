import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const quickReplies = ["מה מגיע לי?", "סטטוס תביעה", "מידע על סיעוד"];

interface Message {
  role: "bot" | "user";
  text: string;
}

export function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "שלום! 👋 אני גמלבוט, העוזר הדיגיטלי של ביטוח לאומי. איך אפשר לעזור?" },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "bot", text: "תודה על הפנייה! אני מעבד את הבקשה שלך..." },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating button - bottom left (in RTL) */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          open && "scale-0 opacity-0"
        )}
        aria-label="פתח גמלבוט"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-6 left-6 z-50 w-[360px] max-h-[500px] rounded-2xl shadow-2xl border border-border bg-card flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left",
          open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <div className="font-bold text-sm">גמלבוט בשבילך</div>
              <div className="text-xs opacity-80">מוכן לעזור 24/7</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="סגור צ׳אט"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex", msg.role === "user" ? "justify-start" : "justify-end")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "bg-info text-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-2.5 py-1 rounded-full border border-border text-xs font-medium text-foreground hover:bg-info transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-border flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="הקלד הודעה..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none px-2"
            aria-label="הודעה לגמלבוט"
          />
          <button
            onClick={() => sendMessage(input)}
            className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="שלח"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
