import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, Clock, Ban, Bell, CreditCard, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Counter } from "@/components/Counter";
import { GUARDRAIL_LOG } from "@/lib/mockData";

export const Route = createFileRoute("/app/guardrails")({ component: Guardrails });

const TIER_META = {
  nudge: { label: "Gentle nudge", color: "text-amber", bg: "bg-amber/15", border: "border-amber/30", icon: Bell },
  pause: { label: "60-second pause", color: "text-gold", bg: "bg-gold/15", border: "border-gold/30", icon: Clock },
  block: { label: "Hard block", color: "text-coral", bg: "bg-coral/15", border: "border-coral/30", icon: Ban },
} as const;

const RULES = [
  { id: "delivery", category: "Food delivery", merchants: "DoorDash, UberEats, Grubhub", tier: "pause" as const, threshold: 80, period: "week" },
  { id: "alcohol", category: "Alcohol", merchants: "Total Wine, BevMo, bars", tier: "nudge" as const, threshold: 60, period: "week" },
  { id: "impulse", category: "Impulse electronics", merchants: "Amazon (electronics)", tier: "block" as const, threshold: 150, period: "transaction" },
  { id: "fastfood", category: "Fast food (after 9pm)", merchants: "McDonald's, Taco Bell…", tier: "block" as const, threshold: 0, period: "always" },
  { id: "rideshare", category: "Rideshare under 1 mi", merchants: "Uber, Lyft", tier: "nudge" as const, threshold: 0, period: "always" },
];

function Guardrails() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    delivery: true, alcohol: true, impulse: true, fastfood: false, rideshare: true,
  });
  const [monthlyCap, setMonthlyCap] = useState([1800]);

  const activeCount = Object.values(enabled).filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-coral">Smart Payment Guardrails</p>
        <h1 className="font-display text-5xl text-balance">Stop bad financial decisions before they happen.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Three-tier rules on the LONGEVA Card. Nudge, pause, or hard-block purchases that hurt your retirement — then route the saved cash to your IRA, emergency fund, or goal.
        </p>
      </header>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Active rules</p>
          <p className="font-display text-4xl tabular-nums"><Counter to={activeCount} /></p>
          <p className="text-xs text-muted-foreground mt-1">across {RULES.length} categories</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Saved this month</p>
          <p className="font-display text-4xl text-teal tabular-nums">$<Counter to={612} /></p>
          <p className="text-xs text-muted-foreground mt-1">17 interventions</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Healthspan recovered</p>
          <p className="font-display text-4xl text-gold tabular-nums">+<Counter to={28.4} decimals={1} />h</p>
          <p className="text-xs text-muted-foreground mt-1">est. lifetime gain</p>
        </div>
      </div>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-coral/5 p-6 lg:p-8">
        <div className="flex items-start gap-5">
          <div className="h-14 w-14 rounded-2xl bg-foreground text-background grid place-items-center">
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">LONGEVA Card · •••• 4280</p>
            <h2 className="font-display text-2xl mb-3">Monthly discretionary cap</h2>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm text-muted-foreground">Anything beyond this requires a 24h cool-off.</span>
              <span className="font-mono text-foreground">${monthlyCap[0].toLocaleString()}</span>
            </div>
            <Slider value={monthlyCap} onValueChange={setMonthlyCap} min={500} max={5000} step={50} />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl mb-1">Rule library</h2>
            <p className="text-sm text-muted-foreground">Each rule fires only on the LONGEVA Card or linked accounts.</p>
          </div>
          <Button variant="outline" size="sm"><Plus className="h-4 w-4" /> New rule</Button>
        </div>
        <div className="space-y-3">
          {RULES.map((r) => {
            const meta = TIER_META[r.tier];
            return (
              <motion.div
                key={r.id}
                whileHover={{ y: -2 }}
                className={`rounded-2xl border ${enabled[r.id] ? "border-border" : "border-border/50 opacity-60"} bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4`}
              >
                <div className={`h-10 w-10 rounded-xl ${meta.bg} ${meta.color} grid place-items-center shrink-0`}>
                  <meta.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-medium">{r.category}</p>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {r.merchants}
                    {r.threshold > 0 && ` · over $${r.threshold} / ${r.period}`}
                  </p>
                </div>
                <Switch
                  checked={enabled[r.id]}
                  onCheckedChange={(v) => setEnabled((s) => ({ ...s, [r.id]: v }))}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-1">Recent interventions</h2>
        <p className="text-sm text-muted-foreground mb-5">What we caught for you.</p>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {GUARDRAIL_LOG.map((g) => (
            <div key={g.id} className="p-5 flex items-center gap-4">
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${g.action === "Blocked" ? "bg-coral/15 text-coral" : "bg-amber/15 text-amber"}`}>
                {g.action === "Blocked" ? <Ban className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${g.action === "Blocked" ? "bg-coral/15 text-coral" : "bg-amber/15 text-amber"}`}>
                    {g.action}
                  </span>
                  <p className="font-medium truncate">{g.merchant}</p>
                  <span className="text-xs text-muted-foreground">${g.amount} · {g.date}</span>
                </div>
                <p className="text-xs text-teal mt-1">{g.saved}</p>
              </div>
              <ShieldCheck className="h-4 w-4 text-teal hidden sm:block" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
