import { useState } from "react";
import { User, Brain, Bell, Info } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function SettingsPage() {
  const [responseStyle, setResponseStyle] = useState("מקצועי");
  const [responseLength, setResponseLength] = useState("בינוני");
  const [emailNotif, setEmailNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 max-w-[800px] mx-auto w-full animate-fade-in">
        <h1 className="text-foreground mb-6">הגדרות</h1>

        {/* Profile */}
        <section className="bg-card rounded-xl shadow-card border border-border p-5 mb-6">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-secondary" /> פרופיל
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">שם</span>
              <span className="text-sm font-medium text-foreground">אביעד יצחקי</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">תפקיד</span>
              <span className="text-sm font-medium text-foreground">ראש תחום חדשנות</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">מחלקה</span>
              <span className="text-sm font-medium text-foreground">מינהל גמלאות</span>
            </div>
          </div>
        </section>

        {/* AI Preferences */}
        <section className="bg-card rounded-xl shadow-card border border-border p-5 mb-6">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-secondary" /> העדפות AI
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1" htmlFor="response-style">סגנון תשובות</label>
              <select
                id="response-style"
                value={responseStyle}
                onChange={(e) => setResponseStyle(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>מקצועי</option>
                <option>ידידותי</option>
                <option>תמציתי</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1" htmlFor="response-length">אורך תשובות</label>
              <select
                id="response-length"
                value={responseLength}
                onChange={(e) => setResponseLength(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>קצר</option>
                <option>בינוני</option>
                <option>מפורט</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">שפת ברירת מחדל</label>
              <input
                type="text"
                value="עברית"
                disabled
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-muted text-muted-foreground"
                aria-label="שפת ברירת מחדל"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-card rounded-xl shadow-card border border-border p-5 mb-6">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-secondary" /> התראות
          </h2>
          <div className="space-y-3">
            {[
              { label: "התראות מייל", value: emailNotif, set: setEmailNotif },
              { label: "התראות במערכת", value: systemNotif, set: setSystemNotif },
              { label: "סיכום יומי", value: dailySummary, set: setDailySummary },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">{item.label}</span>
                <button
                  role="switch"
                  aria-checked={item.value}
                  onClick={() => item.set(!item.value)}
                  className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    item.value ? "bg-secondary" : "bg-muted"
                  }`}
                  aria-label={item.label}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${
                      item.value ? "right-0.5" : "right-[22px]"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="bg-card rounded-xl shadow-card border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-secondary" /> מידע
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">גרסה</span>
              <span className="text-foreground">1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">עדכון אחרון</span>
              <span className="text-foreground">מרץ 2026</span>
            </div>
            <p className="text-muted-foreground pt-2 border-t border-border">
              אביעד יצחקי, מינהל גמלאות | ביטוח לאומי
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
