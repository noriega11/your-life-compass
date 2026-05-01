import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { WhyThis } from "@/components/WhyThis";
import { RECENT_TRANSACTIONS } from "@/lib/mockData";

export const Route = createFileRoute("/app/spending")({ component: Spending });

const FILTERS = ["All", "good", "blocked", "neutral"] as const;

function Spending() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  const txs = useMemo(
    () => filter === "All" ? RECENT_TRANSACTIONS : RECENT_TRANSACTIONS.filter((t) => t.impact === filter),
    [filter],
  );

  const radarData = useMemo(() => {
    const axes = ["metabolic", "mental", "financial", "environmental"] as const;
    return axes.map((axis) => ({
      axis: axis[0].toUpperCase() + axis.slice(1),
      score: Math.round(
        RECENT_TRANSACTIONS.reduce((s, t) => s + t.scores[axis], 0) / RECENT_TRANSACTIONS.length * 10,
      ) / 10,
    }));
  }, []);

  const totalHealthHours = RECENT_TRANSACTIONS.reduce((s, t) => s + t.healthHours, 0);
  const totalSpend = RECENT_TRANSACTIONS.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">Spending Impact & Leakage</p>
        <h1 className="font-display text-5xl text-balance">Where your money is leaking — and how to redirect it.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Every transaction scored for financial impact, with health and behavioral signals as supporting intelligence. Read-only. Never sold.
        </p>
      </header>

      {/* Overview */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl">7-day impact radar</h2>
              <p className="text-xs text-muted-foreground mt-1">Average across {RECENT_TRANSACTIONS.length} transactions</p>
            </div>
            <WhyThis data={{
              summary: "Each merchant is scored across four axes using a causal classifier trained on nutrition, behavioral, and lifecycle datasets. Scores are merchant-specific, not category averages.",
              signals: [
                { name: "Merchant catalog signals", weight: 0.39 },
                { name: "Item-level enrichment", weight: 0.28 },
                { name: "Time-of-day pattern", weight: 0.18 },
                { name: "Cohort baseline", weight: 0.15 },
              ],
              confidence: 0.85,
              modelVersion: "Purchase DNA v2.0",
            }} />
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Radar dataKey="score" stroke="hsl(var(--lime))" fill="hsl(var(--lime))" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <Stat label="Total spend (7d)" value={`$${totalSpend.toFixed(0)}`} hint="Across all categories" />
          <Stat
            label="Healthspan effect"
            value={`${totalHealthHours > 0 ? "+" : ""}${totalHealthHours.toFixed(1)} hrs`}
            hint={totalHealthHours > 0 ? "Net positive this week" : "Net negative, rebalance suggested"}
            tone={totalHealthHours > 0 ? "good" : "warn"}
          />
          <Stat label="Blocked / nudged" value="3" hint="Saved $87 + 4.6 healthspan hrs" />
        </div>
      </section>

      {/* Insight banner */}
      <section className="rounded-3xl border border-lime/30 bg-lime/5 p-6 flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-lime/15 grid place-items-center shrink-0">
          <TrendingUp className="h-5 w-5 text-lime" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-mono uppercase tracking-wider text-lime mb-1">Pattern of the week</p>
          <p className="font-display text-xl mb-1">You spend 34% more on ultra-processed food on Fridays.</p>
          <p className="text-sm text-muted-foreground">Three Trader Joe's swaps would save $42/wk and recover ~3.1 healthspan hrs.</p>
        </div>
        <WhyThis data={{
          summary: "Friday transactions in 'ultra-processed' category averaged $58 vs $43 on other weekdays over the last 8 weeks. The pattern correlates with sub-6h Thursday sleep.",
          signals: [
            { name: "Friday spend delta", weight: 0.45 },
            { name: "Thursday sleep duration", weight: 0.31 },
            { name: "Category enrichment", weight: 0.24 },
          ],
          confidence: 0.71,
          modelVersion: "Pattern Engine v1.2",
        }} />
      </section>

      {/* Transactions */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-3xl">Recent transactions</h2>
          <div className="flex gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition ${
                  filter === f ? "bg-foreground text-background" : "border border-border text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {txs.map((t, i) => <TxRow key={t.id} t={t} delay={i * 0.04} />)}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, hint, tone }: { label: string; value: string; hint: string; tone?: "good" | "warn" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-display text-3xl mt-1 ${tone === "good" ? "text-lime" : tone === "warn" ? "text-warning" : ""}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{hint}</p>
    </div>
  );
}

function TxRow({ t, delay }: { t: typeof RECENT_TRANSACTIONS[number]; delay: number }) {
  const Icon = t.healthHours > 0 ? TrendingUp : t.healthHours < 0 ? TrendingDown : Minus;

  // Badge config per impact
  const badge = (() => {
    if (t.impact === "blocked") {
      return { label: "BLOCKED", cls: "bg-coral/15 text-coral border-coral/30" };
    }
    if (t.impact === "good" && t.healthHours > 0) {
      return { label: `+${t.healthHours.toFixed(1)} HRS`, cls: "bg-teal/15 text-teal border-teal/30" };
    }
    if (t.impact === "neutral" && t.healthHours < 0) {
      return { label: "REDUCED", cls: "bg-amber/15 text-amber border-amber/30" };
    }
    return { label: t.impact.toUpperCase(), cls: "bg-muted text-muted-foreground border-border" };
  })();

  const iconCls =
    t.impact === "blocked" ? "text-coral" :
      t.impact === "good" ? "text-teal" :
        "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4"
    >
      <div className={`h-10 w-10 rounded-full grid place-items-center bg-muted ${iconCls}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-medium truncate">{t.merchant}</p>
          <p className={`font-mono tabular-nums text-sm ${t.impact === "blocked" ? "line-through text-muted-foreground" : ""}`}>
            ${t.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.cls}`}>
            {badge.label}
          </span>
          <p className="text-xs text-muted-foreground">{t.date}</p>
          {t.impact !== "blocked" && (
            <span className="text-xs text-muted-foreground">
              {t.healthHours > 0 ? "+" : ""}{t.healthHours} healthspan hrs
            </span>
          )}
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5">
        {(["metabolic", "mental", "financial", "environmental"] as const).map((axis) => (
          <div key={axis} className="text-center">
            <div className="h-1 w-8 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${t.impact === "blocked" ? "bg-coral" : "bg-teal"}`}
                style={{ width: `${t.scores[axis] * 10}%` }}
              />
            </div>
            <p className="text-[9px] font-mono uppercase text-muted-foreground mt-0.5">{axis[0]}</p>
          </div>
        ))}
      </div>
      <WhyThis
        data={{
          summary: `${t.merchant} scored across four axes. Item-level enrichment indicates this purchase ${t.healthHours > 0 ? "supports" : "detracts from"} your healthspan trajectory.`,
          signals: (["metabolic", "mental", "financial", "environmental"] as const).map((a) => ({
            name: a[0].toUpperCase() + a.slice(1), weight: t.scores[a] / 10,
          })),
          confidence: 0.82,
          modelVersion: "Purchase DNA v2.0",
        }}
        label="Why?"
      />
    </motion.div>
  );
}
