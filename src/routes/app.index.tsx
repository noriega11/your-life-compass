import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, ShieldCheck, Receipt, PiggyBank, TrendingUp, TrendingDown,
  Wallet, Target, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from "recharts";
import { useState } from "react";
import { WhyThis } from "@/components/WhyThis";
import { Counter } from "@/components/Counter";
import { MOCK_USER, TODAY_ACTIONS, RETIREMENT_DATA } from "@/lib/mockData";

export const Route = createFileRoute("/app/")({ component: Today });

function Today() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const toggleDone = (id: string) =>
    setDoneIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  const doneCount = doneIds.size;

  const gapAbs = Math.abs(MOCK_USER.retirementGap);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Hero */}
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold">Your Financial Life Forecast · Day {MOCK_USER.season.day}/{MOCK_USER.season.total}</p>
        <h1 className="font-display text-5xl sm:text-6xl text-balance">{greeting}, {MOCK_USER.firstName}.</h1>
        <p className="text-muted-foreground max-w-2xl">
          Five capital actions today close <span className="text-teal font-medium">$13,200</span> of your retirement gap. Your money is being optimized in real time.
        </p>
      </header>

      {/* 6 hero metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          tag="LifeScore"
          tone="gold"
          value={<><Counter to={MOCK_USER.lifeScore} />/1000</>}
          delta={`+${MOCK_USER.lifeScoreDelta} this week`}
          deltaTone="up"
          hint="Wealth + risk + behavior + vitality"
        />
        <MetricCard
          tag="Wealth Score"
          tone="teal"
          value={<><Counter to={MOCK_USER.wealthScore} />/100</>}
          delta="+3 vs last month"
          deltaTone="up"
          hint="Savings rate, leakage, debt pressure"
        />
        <MetricCard
          tag="Retirement Readiness"
          tone="teal"
          value={<><Counter to={MOCK_USER.retirementReadiness} />%</>}
          delta="Target 85% by 67"
          hint="Income replacement at 67"
        />
        <MetricCard
          tag="Retirement Gap"
          tone="coral"
          value={<>-$<Counter to={Math.round(gapAbs / 1000)} />K</>}
          delta="−$8.4K closed this quarter"
          deltaTone="up"
          hint="Projected shortfall at 67"
        />
        <MetricCard
          tag="Auto-Saved This Month"
          tone="teal"
          value={<>$<Counter to={MOCK_USER.autoSavedThisMonth} /></>}
          delta="+18% vs last month"
          deltaTone="up"
          hint="Routed to IRA & emergency fund"
        />
        <MetricCard
          tag="Spending Leakage Reduced"
          tone="gold"
          value={<><Counter to={MOCK_USER.leakageReduced} />%</>}
          delta="$187 in guardrail saves"
          deltaTone="up"
          hint="vs your baseline 90 days ago"
        />
      </section>

      {/* Net worth trajectory */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Net Worth Forecast</p>
            <h2 className="font-display text-3xl">Current path vs LONGEVA-optimized</h2>
            <p className="text-sm text-muted-foreground mt-1">
              At 67: <span className="text-muted-foreground line-through">${(MOCK_USER.netWorthCurrent67/1000).toFixed(0)}K</span>{" "}
              → <span className="text-teal font-medium">${(MOCK_USER.netWorthOptimized67/1000).toFixed(0)}K</span> with current rules active.
            </p>
          </div>
          <WhyThis data={{
            summary: "Projected from your current savings rate, recurring obligations, guardrail savings, and historical investment returns. The optimized path assumes your 4 active rules continue.",
            signals: [
              { name: "Savings rate trajectory", weight: 0.36 },
              { name: "Guardrail interventions", weight: 0.28 },
              { name: "Auto-save rules", weight: 0.22 },
              { name: "Income trajectory", weight: 0.14 },
            ],
            confidence: 0.83,
            modelVersion: "Wealth Engine v1.4",
          }} />
        </div>
        <div className="h-[280px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RETIREMENT_DATA}>
              <defs>
                <linearGradient id="dash-longeva" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `$${v}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => `$${v}k`} />
              <ReferenceLine x={67} stroke="var(--gold)" strokeDasharray="4 4" label={{ value: "Retire", fill: "var(--gold)", fontSize: 10 }} />
              <Area type="monotone" dataKey="base" stroke="var(--muted-foreground)" strokeWidth={2} fill="transparent" name="Default path" />
              <Area type="monotone" dataKey="longeva" stroke="var(--teal)" strokeWidth={2.5} fill="url(#dash-longeva)" name="LONGEVA path" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Today's Financial Actions */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-3xl">Today's financial actions</h2>
            <p className="text-sm text-muted-foreground">Each one moves your retirement gap. Approve, dismiss, or auto-execute.</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm tabular-nums"><span className="text-teal">{doneCount}</span><span className="text-muted-foreground">/{TODAY_ACTIONS.length} done</span></p>
            <div className="mt-1 h-1 w-24 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal"
                animate={{ width: `${(doneCount / TODAY_ACTIONS.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {TODAY_ACTIONS.map((a, i) => (
            <ActionCard key={a.id} a={a} delay={i * 0.06} done={doneIds.has(a.id)} onToggle={() => toggleDone(a.id)} />
          ))}
        </div>
      </section>

      {/* At a glance */}
      <section className="grid md:grid-cols-3 gap-4">
        <GlanceCard icon={ShieldCheck} tag="Guardrails" headline="$87 saved today" body="2 purchases blocked, 1 nudged." to="/app/guardrails" />
        <GlanceCard icon={Receipt} tag="Spending Impact" headline="22% leakage reduced" body="$186 flagged for review." to="/app/spending" />
        <GlanceCard icon={PiggyBank} tag="Auto-Save" headline="$47 → IRA" body="Routed automatically this morning." to="/app/retirement" />
      </section>

      {/* Wealth & Vitality split */}
      <section className="grid md:grid-cols-2 gap-4">
        <SplitCard
          icon={Wallet}
          tone="teal"
          tag="Wealth"
          headline="Open your full forecast"
          body="Net worth at 67/75/85, savings rate, debt pressure, and a redirect simulator."
          to="/app/wealth"
        />
        <SplitCard
          icon={Activity}
          tone="gold"
          tag="Vitality Risk"
          headline="Health → financial pressure"
          body="How sleep, stress, and movement signals shape your future healthcare-cost forecast."
          to="/app/vitality"
        />
      </section>
    </div>
  );
}

function MetricCard({
  tag, value, delta, deltaTone, hint, tone,
}: {
  tag: string;
  value: React.ReactNode;
  delta?: string;
  deltaTone?: "up" | "down";
  hint?: string;
  tone: "gold" | "teal" | "coral";
}) {
  const toneCls = tone === "gold" ? "text-gold" : tone === "teal" ? "text-teal" : "text-coral";
  const Arrow = deltaTone === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{tag}</p>
      <p className={`font-display text-3xl tabular-nums mt-2 ${toneCls}`}>{value}</p>
      {delta && (
        <p className={`text-xs mt-2 flex items-center gap-1 ${deltaTone === "up" ? "text-teal" : "text-muted-foreground"}`}>
          {deltaTone && <Arrow className="h-3 w-3" />}
          {delta}
        </p>
      )}
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function ActionCard({
  a, delay, done, onToggle,
}: {
  a: typeof TODAY_ACTIONS[0]; delay: number; done: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border p-5 transition-all ${done ? "border-teal/60 bg-teal/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted">{a.category}</span>
        <span className="text-xs text-gold font-mono">+{a.longv} LONGV</span>
      </div>
      <p className={`font-medium leading-snug mb-2 ${done ? "line-through text-muted-foreground" : ""}`}>{a.title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{a.outcome}</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg bg-background border border-border p-2">
          <p className="text-[9px] font-mono uppercase text-muted-foreground">Saved</p>
          <p className="text-sm font-medium text-teal tabular-nums">${a.dollars}</p>
        </div>
        <div className="rounded-lg bg-background border border-border p-2">
          <p className="text-[9px] font-mono uppercase text-muted-foreground">At 67</p>
          <p className="text-sm font-medium text-gold tabular-nums">{a.retirementImpact ? `+$${a.retirementImpact.toLocaleString()}` : "—"}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <WhyThis data={a.why} label="Why?" />
        <button
          onClick={onToggle}
          className={`h-7 w-7 rounded-full border grid place-items-center transition ${
            done ? "bg-teal border-teal text-background" : "border-border hover:border-foreground"
          }`}
          aria-label="Mark complete"
        >
          {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>
      </div>
    </motion.div>
  );
}

function GlanceCard({ icon: Icon, tag, headline, body, to }: { icon: React.ComponentType<{ className?: string }>; tag: string; headline: string; body: string; to: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-border bg-card p-5 hover:border-foreground/40 transition">
      <Icon className="h-4 w-4 text-gold mb-3" />
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{tag}</p>
      <p className="font-display text-2xl mt-1">{headline}</p>
      <p className="text-xs text-muted-foreground mt-1">{body}</p>
    </Link>
  );
}

function SplitCard({ icon: Icon, tone, tag, headline, body, to }: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "teal" | "gold";
  tag: string; headline: string; body: string; to: string;
}) {
  const cls = tone === "teal" ? "text-teal" : "text-gold";
  return (
    <Link to={to} className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 p-6 hover:border-foreground/40 transition group">
      <div className="flex items-start justify-between mb-3">
        <div className={`h-10 w-10 rounded-xl bg-${tone}/15 grid place-items-center ${cls}`}>
          <Icon className="h-4 w-4" />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
      </div>
      <p className={`text-[10px] font-mono uppercase tracking-wider ${cls}`}>{tag}</p>
      <h3 className="font-display text-2xl mt-1 mb-2">{headline}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
