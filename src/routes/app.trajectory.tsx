import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, Line, LineChart, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { WhyThis } from "@/components/WhyThis";
import { TRAJECTORY_DATA, RETIREMENT_DATA, MOCK_USER } from "@/lib/mockData";
import current70 from "@/assets/future-self-current-70.jpg";
import optimized70 from "@/assets/future-self-optimized-70.jpg";
import current90 from "@/assets/future-self-current-90.jpg";
import optimized90 from "@/assets/future-self-optimized-90.jpg";

export const Route = createFileRoute("/app/trajectory")({ component: Trajectory });

const TOGGLES = [
  { id: "sleep", label: "Sleep 8h", health: 6, wealth: 0 },
  { id: "walk", label: "Walk 10k steps", health: 8, wealth: 1 },
  { id: "delivery", label: "Cap delivery $80/wk", health: 3, wealth: 9 },
  { id: "save", label: "Save 15% of income", health: 0, wealth: 14 },
  { id: "alcohol", label: "Quit alcohol", health: 7, wealth: 4 },
];

function Trajectory() {
  const [active, setActive] = useState<Record<string, boolean>>({ sleep: true, walk: true });
  const [age, setAge] = useState(70);

  const boost = useMemo(
    () => Object.entries(active).reduce(
      (acc, [id, on]) => on ? acc + (TOGGLES.find((t) => t.id === id)?.health ?? 0) : acc, 0,
    ),
    [active],
  );

  const trajectory = useMemo(
    () => TRAJECTORY_DATA.map((d) => ({
      ...d,
      optimized: Math.min(100, d.optimized + boost * 0.4),
      optimizedHigh: Math.min(100, d.optimizedHigh + boost * 0.4),
      optimizedLow: Math.min(100, d.optimizedLow + boost * 0.4),
    })),
    [boost],
  );

  const portrait = age >= 85 ? { current: current90, optimized: optimized90 } : { current: current70, optimized: optimized70 };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">Financial Life Forecast</p>
        <h1 className="font-display text-5xl text-balance">Will I have enough money to live the life I want?</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Net worth trajectory and retirement readiness, side by side with the health-risk inputs that move them. Toggle behaviors to see how your forecast bends.
        </p>
      </header>

      {/* Trajectory chart */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl">Wellness trajectory · age {trajectory[0].age}–{trajectory.at(-1)!.age}</h2>
            <p className="text-xs text-muted-foreground mt-1">Solid = current path. Lime = optimized with your selected habits.</p>
          </div>
          <WhyThis data={{
            summary: `Built from your last 90 days of sleep, activity, spending, and biometrics. The optimized path assumes 70% adherence to ${Object.values(active).filter(Boolean).length} selected habits.`,
            signals: [
              { name: "Sleep consistency", weight: 0.34 },
              { name: "Cardiovascular load", weight: 0.27 },
              { name: "Metabolic markers", weight: 0.22 },
              { name: "Stress / recovery", weight: 0.17 },
            ],
            confidence: 0.78,
            modelVersion: "LifeScore v5.0",
          }} />
        </div>

        <div className="h-[320px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectory}>
              <defs>
                <linearGradient id="lime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--lime))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--lime))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="optimizedHigh" stroke="none" fill="url(#lime)" />
              <Area type="monotone" dataKey="optimizedLow" stroke="none" fill="hsl(var(--background))" />
              <Line type="monotone" dataKey="current" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="optimized" stroke="hsl(var(--lime))" strokeWidth={2.5} dot={false} />
              <ReferenceLine x={MOCK_USER.realAge} stroke="hsl(var(--border))" label={{ value: "today", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Habit toggles */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">What if I…</p>
          <div className="flex flex-wrap gap-2">
            {TOGGLES.map((t) => {
              const on = !!active[t.id];
              return (
                <button
                  key={t.id}
                  onClick={() => setActive((s) => ({ ...s, [t.id]: !s[t.id] }))}
                  className={`px-4 py-2 rounded-full text-xs border transition ${
                    on ? "bg-lime text-lime-foreground border-lime" : "border-border hover:border-foreground"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {boost > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-lime font-mono">
              +{boost} healthspan years modeled at sustained 70% adherence
            </motion.p>
          )}
        </div>
      </section>

      {/* Future self */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Your future self at {age}</h2>
            <p className="text-xs text-muted-foreground mt-1">Generated with your scan + projected biological aging. Not a prediction, a possibility.</p>
          </div>
          <div className="flex gap-1.5">
            {[50, 70, 90].map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition ${
                  age === a ? "bg-foreground text-background" : "border border-border text-muted-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[{ src: portrait.current, tag: "Current path", label: "If nothing changes" },
            { src: portrait.optimized, tag: "Optimized", label: "With LONGEVA" }].map((p) => (
            <div key={p.tag} className="relative rounded-2xl overflow-hidden">
              <img src={p.src} alt={p.tag} loading="lazy" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] font-mono uppercase tracking-wider text-lime">{p.tag}</p>
                <p className="text-white font-display text-xl">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Retirement */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Net worth projection</h2>
            <p className="text-xs text-muted-foreground mt-1">Base path vs LONGEVA-routed savings, with confidence bands.</p>
          </div>
          <WhyThis data={{
            summary: "Projected from your current savings rate, recurring obligations, and historical investment returns. The LONGEVA path assumes guardrails redirect ~$120/wk into your IRA.",
            signals: [
              { name: "Current savings rate", weight: 0.38 },
              { name: "Discretionary spend pattern", weight: 0.26 },
              { name: "Investment allocation", weight: 0.22 },
              { name: "Income trajectory", weight: 0.14 },
            ],
            confidence: 0.82,
            modelVersion: "Wealth Engine v1.4",
          }} />
        </div>
        <div className="h-[260px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RETIREMENT_DATA}>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `$${v}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => `$${v}k`}
              />
              <Line type="monotone" dataKey="base" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} name="Base" />
              <Line type="monotone" dataKey="longeva" stroke="hsl(var(--lime))" strokeWidth={2.5} dot={false} name="LONGEVA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
