import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Zap, ArrowUpRight, Settings2, Check } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/app/retirement")({ component: AutoSave });

function AutoSave() {
  const [roundUp, setRoundUp] = useState(true);
  const [skipDelivery, setSkipDelivery] = useState(true);
  const [bonusSweep, setBonusSweep] = useState(false);
  const [monthlyBoost, setMonthlyBoost] = useState([320]);
  const [aggressive, setAggressive] = useState([6]);

  const projection = useMemo(() => {
    const years = 33;
    const baseMonthly = 480;
    const extra = monthlyBoost[0];
    const r = aggressive[0] / 100;
    const data: { age: number; base: number; longeva: number }[] = [];
    let base = 18_400;
    let longeva = 18_400;
    for (let i = 0; i <= years; i++) {
      data.push({ age: 34 + i, base: Math.round(base), longeva: Math.round(longeva) });
      base = base * (1 + 0.05) + baseMonthly * 12;
      longeva = longeva * (1 + r) + (baseMonthly + extra) * 12;
    }
    return data;
  }, [monthlyBoost, aggressive]);

  const finalBase = projection[projection.length - 1].base;
  const finalLongeva = projection[projection.length - 1].longeva;
  const delta = finalLongeva - finalBase;

  const rules = [
    { id: "roundup", label: "Round-up every purchase", sub: "~$48/mo, redirected to IRA", icon: Zap, on: roundUp, set: setRoundUp, est: 48 },
    { id: "skip", label: "Skip 1 delivery / week", sub: "~$140/mo when triggered", icon: Check, on: skipDelivery, set: setSkipDelivery, est: 140 },
    { id: "bonus", label: "Sweep paycheck overflow", sub: "Anything above $4.2k → invest", icon: ArrowUpRight, on: bonusSweep, set: setBonusSweep, est: 220 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Auto-Save</p>
        <h1 className="font-display text-5xl text-balance">Your money, redirected toward longevity.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Set rules once. LONGEVA quietly routes spare cash to retirement, health, and resilience accounts.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Projected at 67</p>
          <p className="font-display text-4xl text-teal tabular-nums">
            $<Counter to={Math.round(finalLongeva / 1000)} />K
          </p>
          <p className="text-xs text-muted-foreground mt-1">vs ${Math.round(finalBase / 1000)}K without LONGEVA</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Extra cushion</p>
          <p className="font-display text-4xl text-gold tabular-nums">+${Math.round(delta / 1000)}K</p>
          <p className="text-xs text-muted-foreground mt-1">Closes 92% of your gap</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">This month routed</p>
          <p className="font-display text-4xl tabular-nums">$<Counter to={612} /></p>
          <p className="text-xs text-teal mt-1">↑ 18% vs last month</p>
        </div>
      </div>

      <section className="rounded-3xl border border-border bg-card p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl mb-1">Wealth trajectory</h2>
            <p className="text-sm text-muted-foreground">Compare default savings vs LONGEVA-optimized path.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="inline-block w-3 h-0.5 bg-muted-foreground/50" /> Default
            <span className="inline-block w-3 h-0.5 bg-teal ml-3" /> LONGEVA
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={projection}>
              <defs>
                <linearGradient id="g-longeva" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--teal, 168 64% 47%))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--teal, 168 64% 47%))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `$${Math.round(v / 1000)}K`} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                formatter={(v: number) => `$${v.toLocaleString()}`}
              />
              <ReferenceLine x={67} stroke="var(--gold)" strokeDasharray="4 4" label={{ value: "Retire", fill: "var(--gold)", fontSize: 11 }} />
              <Area type="monotone" dataKey="base" stroke="var(--muted-foreground)" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="longeva" stroke="var(--teal)" strokeWidth={2.5} fill="url(#g-longeva)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl mb-1">Auto-Save rules</h2>
          <p className="text-sm text-muted-foreground mb-5">Toggle the ones that fit your life. We'll handle the rest.</p>
          <div className="space-y-3">
            {rules.map((r) => (
              <motion.div
                key={r.id}
                whileHover={{ y: -2 }}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center ${r.on ? "bg-teal/15 text-teal" : "bg-muted text-muted-foreground"}`}>
                    <r.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-teal">+${r.est}/mo</span>
                  <Switch checked={r.on} onCheckedChange={r.set} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl mb-1">Fine-tune</h2>
          <p className="text-sm text-muted-foreground mb-6">Adjust contribution and risk profile.</p>

          <div className="space-y-7">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-medium">Extra monthly contribution</label>
                <span className="font-mono text-teal">${monthlyBoost[0]}</span>
              </div>
              <Slider value={monthlyBoost} onValueChange={setMonthlyBoost} min={0} max={1500} step={20} />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-medium">Expected annual return</label>
                <span className="font-mono text-gold">{aggressive[0]}%</span>
              </div>
              <Slider value={aggressive} onValueChange={setAggressive} min={3} max={10} step={0.5} />
              <p className="text-xs text-muted-foreground mt-2">
                {aggressive[0] < 5 ? "Conservative · bonds-heavy" : aggressive[0] < 7 ? "Balanced · 60/40 portfolio" : "Aggressive · equity-tilted"}
              </p>
            </div>

            <div className="rounded-xl bg-gold/10 border border-gold/30 p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-gold" />
                <p className="text-xs font-mono uppercase tracking-wider text-gold">Forecast</p>
              </div>
              <p className="text-sm">
                With these settings you reach <span className="font-display text-lg text-gold">${Math.round(finalLongeva / 1000)}K</span> by 67, beating the default by{" "}
                <span className="text-teal font-medium">${Math.round(delta / 1000)}K</span>.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-teal/10 via-card to-card p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-teal/20 grid place-items-center">
            <PiggyBank className="h-5 w-5 text-teal" />
          </div>
          <div>
            <h3 className="font-display text-xl mb-1">Connect your retirement account</h3>
            <p className="text-sm text-muted-foreground">Fidelity, Vanguard, Schwab, Robinhood. Read-only by default.</p>
          </div>
        </div>
        <Button variant="lime" size="lg">
          <Settings2 className="h-4 w-4" /> Connect now
        </Button>
      </section>
    </div>
  );
}
