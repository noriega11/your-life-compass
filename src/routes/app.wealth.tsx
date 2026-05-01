import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from "recharts";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/Counter";
import { MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/app/wealth")({ component: Wealth });

function Wealth() {
  const [redirect, setRedirect] = useState([50]); // $/week from impulse
  const [annualReturn, setAnnualReturn] = useState([6]);

  const { projection, gapClosed, freedomYears } = useMemo(() => {
    const startAge = MOCK_USER.realAge;
    const yearsToRetire = 67 - startAge;
    const monthlyBase = (MOCK_USER.income * 0.07) / 12; // 7% savings rate
    const extraMonthly = (redirect[0] * 52) / 12;
    const r = annualReturn[0] / 100;
    let base = MOCK_USER.retirementBalance;
    let optimized = MOCK_USER.retirementBalance;
    const data: { age: number; base: number; optimized: number }[] = [];
    for (let i = 0; i <= 51; i++) {
      data.push({ age: startAge + i, base: Math.round(base), optimized: Math.round(optimized) });
      base = base * (1 + 0.05) + monthlyBase * 12;
      optimized = optimized * (1 + r) + (monthlyBase + extraMonthly) * 12;
    }
    const at67 = data.find((d) => d.age === 67)!;
    const gapClosed = at67.optimized - at67.base;
    // Years earlier we hit base@67 number
    const target = at67.base;
    const hit = data.find((d) => d.optimized >= target);
    const freedomYears = hit ? Math.max(0, 67 - hit.age) : 0;
    return { projection: data.filter((d) => d.age <= 85), gapClosed, freedomYears };
  }, [redirect, annualReturn]);

  const at67 = projection.find((d) => d.age === 67)!;
  const at75 = projection.find((d) => d.age === 75)!;
  const at85 = projection.find((d) => d.age === 85)!;

  const newGap = MOCK_USER.retirementGap + gapClosed;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Your Wealth Forecast</p>
        <h1 className="font-display text-5xl text-balance">Net worth, retirement, and the gaps in between.</h1>
        <p className="text-muted-foreground max-w-2xl">
          The financial truth, modeled across your lifetime. Move the sliders to see how small redirects compound.
        </p>
      </header>

      {/* KPI grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Net worth at 67" value={`$${(at67.optimized/1000).toFixed(0)}K`} hint={`vs $${(at67.base/1000).toFixed(0)}K default`} tone="teal" />
        <KPI label="Retirement gap" value={`${newGap < 0 ? "-" : "+"}$${Math.abs(Math.round(newGap/1000))}K`} hint={`Was -$${Math.abs(Math.round(MOCK_USER.retirementGap/1000))}K`} tone={newGap < 0 ? "coral" : "teal"} />
        <KPI label="Savings rate" value={`${MOCK_USER.savingsRate}%`} hint={`Target ${MOCK_USER.targetSavingsRate}%`} tone="gold" />
        <KPI label="Monthly leakage" value={`$${MOCK_USER.impulseLeakage}`} hint="Impulse + waste" tone="coral" />
        <KPI label="Emergency runway" value={`${MOCK_USER.emergencyRunwayMonths}mo`} hint="Target 6 mo" tone="amber" />
        <KPI label="Debt pressure" value={`${MOCK_USER.debtPressure}%`} hint="of income" tone="amber" />
        <KPI label="Auto-save opportunity" value={`+$${(redirect[0]*52/12).toFixed(0)}/mo`} hint="From this simulator" tone="teal" />
        <KPI label="Retirement readiness" value={`${MOCK_USER.retirementReadiness}%`} hint="Income replacement" tone="gold" />
      </section>

      {/* Trajectory chart */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl mb-1">Net worth trajectory · age 34–85</h2>
        <p className="text-sm text-muted-foreground mb-6">Default path vs LONGEVA-optimized with your simulator settings.</p>
        <div className="h-[320px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projection}>
              <defs>
                <linearGradient id="w-opt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `$${Math.round(v/1000)}K`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => `$${v.toLocaleString()}`} />
              <ReferenceLine x={67} stroke="var(--gold)" strokeDasharray="4 4" label={{ value: "67", fill: "var(--gold)", fontSize: 10 }} />
              <Area type="monotone" dataKey="base" stroke="var(--muted-foreground)" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="optimized" stroke="var(--teal)" strokeWidth={2.5} fill="url(#w-opt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
          <Snapshot age={67} v={at67.optimized} />
          <Snapshot age={75} v={at75.optimized} />
          <Snapshot age={85} v={at85.optimized} />
        </div>
      </section>

      {/* Simulator */}
      <section className="rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/5 via-card to-card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-teal" />
          <p className="text-xs font-mono uppercase tracking-wider text-teal">Redirect simulator</p>
        </div>
        <h2 className="font-display text-3xl mb-1">If I redirect ${redirect[0]}/week from impulse spending…</h2>
        <p className="text-sm text-muted-foreground mb-6">Watch your gap, net worth, and freedom date respond.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-7">
            <div>
              <div className="flex justify-between mb-3 text-sm">
                <label className="font-medium">Weekly redirect from impulse</label>
                <span className="font-mono text-teal">${redirect[0]}/wk</span>
              </div>
              <Slider value={redirect} onValueChange={setRedirect} min={0} max={200} step={5} />
            </div>
            <div>
              <div className="flex justify-between mb-3 text-sm">
                <label className="font-medium">Expected annual return</label>
                <span className="font-mono text-gold">{annualReturn[0]}%</span>
              </div>
              <Slider value={annualReturn} onValueChange={setAnnualReturn} min={3} max={10} step={0.5} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            <SimResult label="New retirement gap" value={`${newGap < 0 ? "-" : "+"}$${Math.abs(Math.round(newGap/1000))}K`} tone={newGap < 0 ? "coral" : "teal"} />
            <SimResult label="Net worth uplift at 67" value={`+$${Math.round(gapClosed/1000)}K`} tone="teal" />
            <SimResult label="Years earlier to financial freedom" value={`${freedomYears} yrs`} tone="gold" />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/app/retirement"><Button variant="lime"><TrendingUp className="h-4 w-4" /> Create auto-save rule</Button></Link>
          <Link to="/app/guardrails"><Button variant="outline">Tune guardrails <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </section>
    </div>
  );
}

function KPI({ label, value, hint, tone }: { label: string; value: string; hint: string; tone: "teal" | "coral" | "gold" | "amber" }) {
  const cls = {
    teal: "text-teal", coral: "text-coral", gold: "text-gold", amber: "text-amber",
  }[tone];
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`font-display text-2xl tabular-nums mt-2 ${cls}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>
    </motion.div>
  );
}

function Snapshot({ age, v }: { age: number; v: number }) {
  return (
    <div className="rounded-xl bg-background border border-border p-4 text-center">
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">At {age}</p>
      <p className="font-display text-2xl text-teal tabular-nums mt-1">$<Counter to={Math.round(v/1000)} />K</p>
    </div>
  );
}

function SimResult({ label, value, tone }: { label: string; value: string; tone: "teal" | "coral" | "gold" }) {
  const cls = { teal: "text-teal", coral: "text-coral", gold: "text-gold" }[tone];
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`font-display text-2xl tabular-nums mt-1 ${cls}`}>{value}</p>
    </div>
  );
}
