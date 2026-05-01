import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Scale, AlertTriangle, CheckCircle2 } from "lucide-react";
import { HEALTH_WEALTH_TRADEOFFS } from "@/lib/mockData";

export const Route = createFileRoute("/app/balance")({ component: Balance });

function Balance() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Health-Wealth Balance</p>
        <h1 className="font-display text-5xl text-balance">When one goal silently sabotages another.</h1>
        <p className="text-muted-foreground max-w-2xl">
          LONGEVA catches the trade-offs between earning more, spending less, and living longer — and quantifies the real cost of each.
        </p>
      </header>

      <section className="rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/5 via-card to-card p-6 sm:p-8 flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-teal/15 grid place-items-center shrink-0">
          <Scale className="h-5 w-5 text-teal" />
        </div>
        <div>
          <h2 className="font-display text-2xl mb-2">"LONGEVA catches when one goal silently sabotages another."</h2>
          <p className="text-sm text-muted-foreground">Every trade-off is scored across short-term cash, long-term net worth, future medical-cost risk, and earning capacity.</p>
        </div>
      </section>

      <section className="space-y-4">
        {HEALTH_WEALTH_TRADEOFFS.map((t, i) => {
          const positive = t.verdict.toLowerCase().includes("positive");
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 grid md:grid-cols-[1fr_auto] gap-5 items-start"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-8 w-8 rounded-lg grid place-items-center ${positive ? "bg-teal/15 text-teal" : "bg-coral/15 text-coral"}`}>
                    {positive ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <p className="font-display text-xl">{t.tension}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{t.detail}</p>
                <p className={`text-sm font-medium ${positive ? "text-teal" : "text-coral"}`}>{t.verdict}</p>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
