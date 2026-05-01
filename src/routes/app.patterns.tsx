import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhyThis } from "@/components/WhyThis";
import { FINANCIAL_PATTERNS } from "@/lib/mockData";

export const Route = createFileRoute("/app/patterns")({ component: Patterns });

function Patterns() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold">Financial behavior patterns</p>
        <h1 className="font-display text-5xl text-balance">How your behavior bends your money.</h1>
        <p className="text-muted-foreground max-w-2xl">
          Causal patterns linking sleep, stress, movement, and screen time to your spending and savings outcomes. Each card carries a dollar impact and a recommended financial action.
        </p>
      </header>

      <section className="grid lg:grid-cols-2 gap-5">
        {FINANCIAL_PATTERNS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-gold/15 text-gold grid place-items-center"><Brain className="h-4 w-4" /></div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{p.behavior}</span>
            </div>
            <h3 className="font-display text-xl leading-snug mb-3">{p.title}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Stat label="Est. impact" value={`$${p.dollars}/mo`} tone="teal" />
              <Stat label="Range" value={p.range} />
              <Stat label="Confidence" value={`${Math.round(p.confidence * 100)}%`} tone="gold" />
            </div>
            <div className="rounded-xl bg-background border border-border p-3 mb-4 flex items-start gap-3">
              <TrendingUp className="h-4 w-4 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-teal">Recommended action</p>
                <p className="text-sm mt-0.5">{p.action}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <WhyThis data={{
                summary: `Detected over the last 12 weeks using your spend, sleep, and behavioral telemetry. Confidence ${Math.round(p.confidence*100)}% reflects both signal density and pattern stability.`,
                signals: [
                  { name: p.behavior, weight: 0.45 },
                  { name: "Spend volatility", weight: 0.28 },
                  { name: "Cohort baseline", weight: 0.27 },
                ],
                confidence: p.confidence,
                modelVersion: "Pattern Engine v1.2",
              }} />
              <Button size="sm" variant="outline">Apply rule <ArrowRight className="h-3 w-3" /></Button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "teal" | "gold" }) {
  const cls = tone === "teal" ? "text-teal" : tone === "gold" ? "text-gold" : "text-foreground";
  return (
    <div className="rounded-lg bg-background border border-border p-2">
      <p className="text-[9px] font-mono uppercase text-muted-foreground">{label}</p>
      <p className={`text-sm font-medium tabular-nums ${cls}`}>{value}</p>
    </div>
  );
}
