import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Download, Eye, Coins, Heart, Wallet, Brain, Activity, Trash2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/app/vault")({ component: Vault });

const CATEGORIES = [
  { id: "health", label: "Health & wearables", icon: Heart, items: 12_480, accesses: 4 },
  { id: "wealth", label: "Financial accounts", icon: Wallet, items: 3_204, accesses: 2 },
  { id: "mind", label: "Mind & sleep", icon: Brain, items: 6_120, accesses: 3 },
  { id: "biomarkers", label: "Lab biomarkers", icon: Activity, items: 84, accesses: 1 },
];

const ACCESS_LOG = [
  { who: "Kairos Coach", what: "Read sleep + HRV", when: "2 min ago", scope: "health" },
  { who: "Purchase DNA", what: "Read transactions (last 30d)", when: "1 hr ago", scope: "wealth" },
  { who: "BioClock", what: "On-device facial scan", when: "Yesterday", scope: "health" },
  { who: "LifeScore", what: "Aggregated forecast inputs", when: "Yesterday", scope: "all" },
  { who: "You", what: "Exported full vault (CSV)", when: "Last week", scope: "all" },
];

const RESEARCH = [
  { id: "p1", name: "Stanford Longevity Cohort", payout: 45, topic: "Sleep × glucose interaction", duration: "8 weeks" },
  { id: "p2", name: "MIT Behavioral Wealth Lab", payout: 28, topic: "Spending patterns × financial stress", duration: "4 weeks" },
  { id: "p3", name: "Function Health × LONGEVA", payout: 60, topic: "CGM-driven dietary triggers", duration: "12 weeks" },
];

function Vault() {
  const [marketplace, setMarketplace] = useState(true);
  const [perCat, setPerCat] = useState<Record<string, boolean>>({
    health: true, wealth: true, mind: true, biomarkers: false,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Data Vault</p>
        <h1 className="font-display text-5xl text-balance">Your data. Your terms. Always.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Encrypted, exportable, deletable. See exactly which model touched what, and when.
        </p>
      </header>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Records stored</p>
          <p className="font-display text-4xl tabular-nums"><Counter to={21_888} /></p>
          <p className="text-xs text-teal mt-1 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> AES-256, on-device keys</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Accesses (30d)</p>
          <p className="font-display text-4xl text-gold tabular-nums"><Counter to={142} /></p>
          <p className="text-xs text-muted-foreground mt-1">all logged below</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Earned from research</p>
          <p className="font-display text-4xl text-teal tabular-nums">$<Counter to={186} /></p>
          <p className="text-xs text-muted-foreground mt-1">+ 480 LONGV</p>
        </div>
      </div>

      <section>
        <h2 className="font-display text-2xl mb-1">Per-category consent</h2>
        <p className="text-sm text-muted-foreground mb-5">Granular toggles. Off means no model can read this category.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <motion.div key={c.id} whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ${perCat[c.id] ? "bg-teal/15 text-teal" : "bg-muted text-muted-foreground"}`}>
                <c.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.items.toLocaleString()} records · {c.accesses} models</p>
              </div>
              <Switch checked={perCat[c.id]} onCheckedChange={(v) => setPerCat((s) => ({ ...s, [c.id]: v }))} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 lg:p-8">
        <h2 className="font-display text-2xl mb-1 flex items-center gap-2"><Eye className="h-5 w-5 text-muted-foreground" /> Recent access</h2>
        <p className="text-sm text-muted-foreground mb-5">Every read, every export. No exceptions.</p>
        <div className="divide-y divide-border">
          {ACCESS_LOG.map((a, i) => (
            <div key={i} className="py-4 flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-teal shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm"><span className="font-medium">{a.who}</span> · <span className="text-muted-foreground">{a.what}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.when} · scope: {a.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-gold/10 via-card to-card p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl mb-1 flex items-center gap-2"><Coins className="h-5 w-5 text-gold" /> Research marketplace</h2>
            <p className="text-sm text-muted-foreground">Opt in to anonymized studies. Get paid in cash + LONGV.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{marketplace ? "On" : "Off"}</span>
            <Switch checked={marketplace} onCheckedChange={setMarketplace} />
          </div>
        </div>
        {marketplace && (
          <div className="space-y-3">
            {RESEARCH.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.topic} · {r.duration}</p>
                </div>
                <span className="text-xs font-mono text-teal">${r.payout}/mo</span>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl mb-1 flex items-center gap-2"><Lock className="h-5 w-5" /> Sovereignty controls</h3>
          <p className="text-sm text-muted-foreground">One-tap export or full erasure. We honor it within 24 hours.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4" /> Export all</Button>
          <Button variant="outline" className="text-coral hover:text-coral border-coral/40 hover:border-coral hover:bg-coral/5"><Trash2 className="h-4 w-4" /> Delete account</Button>
        </div>
      </section>
    </div>
  );
}
