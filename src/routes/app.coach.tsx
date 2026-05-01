import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ShieldCheck } from "lucide-react";
import { WhyThis, type WhyThisData } from "@/components/WhyThis";

export const Route = createFileRoute("/app/coach")({ component: Coach });

interface Msg {
  id: string;
  role: "user" | "kairos";
  text: string;
  why?: WhyThisData;
}

const SUGGESTIONS = [
  "How can I close my retirement gap faster?",
  "Where am I leaking money this month?",
  "Which purchases hurt my long-term forecast?",
  "How are sleep and stress affecting my spending?",
];

const SEED_REPLIES: Record<string, { text: string; why: WhyThisData }> = {
  default: {
    text: "Your biggest financial leak this month is late-night delivery — $186 across 6 orders, mostly on nights after sub-6h sleep. Capping delivery at $80/wk and routing the difference into your IRA closes ~$1,840 of your retirement gap over time. Want me to enable the guardrail?",
    why: {
      summary: "Built from your last 21 days of transactions, sleep timing, and your current retirement gap. Recommendation prioritizes the highest-dollar leverage point first.",
      signals: [
        { name: "Late-night delivery spend (21d)", weight: 0.41 },
        { name: "Retirement gap velocity", weight: 0.26 },
        { name: "Sleep → impulse spend correlation", weight: 0.21 },
        { name: "Guardrail adherence pattern", weight: 0.12 },
      ],
      confidence: 0.79,
      modelVersion: "Kairos v4.1",
    },
  },
};

const PRESCRIPTIONS = [
  { tag: "Active", title: "Cap delivery at $80/wk", days: "Day 12 of 30", impact: "$118 redirected → IRA so far" },
  { tag: "Active", title: "Round-up on every purchase", days: "Day 4 of 30", impact: "$48/mo auto-invested" },
  { tag: "Pending", title: "10pm wind-down reminder", days: "Starts tomorrow", impact: "Targets late-night impulse spend" },
];

function Coach() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "0",
      role: "kairos",
      text: "Morning, Maya. I reviewed your last 7 days of spending and your retirement trajectory. One financial leak stood out — want me to walk you through it?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = SEED_REPLIES.default;
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "kairos", text: reply.text, why: reply.why }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">Your financial behavior coach</p>
        <h1 className="font-display text-4xl">Kairos</h1>
        <p className="text-muted-foreground text-sm mt-2">Asks where your money is leaking, what to block, and how to close your retirement gap. Every answer shows its rationale.</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Chat */}
        <div className="rounded-3xl border border-border bg-card flex flex-col h-[640px] overflow-hidden">
          {/* Trust bar */}
          <div className="border-b border-border px-5 py-3 flex items-center gap-3 text-xs">
            <div className="h-7 w-7 rounded-full bg-lime/15 grid place-items-center">
              <Sparkles className="h-3.5 w-3.5 text-lime" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Kairos v4.1</p>
              <p className="text-muted-foreground">Moderate confidence on this conversation · trained on your last 90 days</p>
            </div>
            <ShieldCheck className="h-4 w-4 text-success shrink-0" />
          </div>

          <div className="flex-1 overflow-auto px-5 py-6 space-y-5">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[78%] ${m.role === "user" ? "" : "space-y-2"}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-foreground text-background rounded-br-md" : "bg-muted rounded-bl-md"
                  }`}>
                    {m.text}
                  </div>
                  {m.why && (
                    <div className="pl-1">
                      <WhyThis data={m.why} label="Why I said this →" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <AnimatePresence>
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-5 pb-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-foreground transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Kairos anything…"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="h-9 w-9 rounded-full bg-lime text-lime-foreground grid place-items-center disabled:opacity-40"
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Active prescriptions */}
        <aside className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground px-1">Active prescriptions</p>
          {PRESCRIPTIONS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  p.tag === "Active" ? "bg-lime/15 text-lime" : "bg-muted text-muted-foreground"
                }`}>{p.tag}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{p.days}</span>
              </div>
              <p className="text-sm font-medium leading-snug mb-1.5">{p.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.impact}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
