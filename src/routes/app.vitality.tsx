import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeartPulse, ShieldAlert, DollarSign, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Counter } from "@/components/Counter";
import { WhyThis } from "@/components/WhyThis";
import { MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/app/vitality")({ component: Vitality });

const COST_CURVE = Array.from({ length: 41 }, (_, i) => {
  const age = 45 + i;
  const base = Math.round(2400 + Math.pow(age - 45, 1.9) * 18);
  const optimized = Math.round(2400 + Math.pow(age - 45, 1.7) * 11);
  return { age, base, optimized };
});

function Vitality() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber">Vitality Risk & Future Cost Forecast</p>
        <h1 className="font-display text-5xl text-balance">Your health signals as financial inputs.</h1>
        <p className="text-muted-foreground max-w-2xl">
          We use your sleep, HRV, glucose, and movement data to estimate <span className="text-foreground">future healthcare-cost pressure</span>, earning resilience, and retirement risk — not to coach you on wellness.
        </p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Vitality Score" value={`${MOCK_USER.vitalityScore}/100`} hint="Drives future cost risk" tone="gold" />
        <Stat label="Projected medical cost @ 67" value="$11.2K/yr" hint="-$3.4K with optimized path" tone="amber" />
        <Stat label="Earning resilience" value="High" hint="Likely to work to 65+" tone="teal" />
        <Stat label="Insurance discount eligible" value="Up to 14%" hint="Through partner carriers" tone="teal" />
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl">Annual healthcare-cost forecast</h2>
            <p className="text-sm text-muted-foreground mt-1">Modeled from your vitality signals + actuarial baselines.</p>
          </div>
          <WhyThis data={{
            summary: "Forecast combines your sleep, cardiovascular, and metabolic signals with cohort-adjusted actuarial curves. Optimized path assumes sustained current behavior.",
            signals: [
              { name: "Cardiovascular markers", weight: 0.34 },
              { name: "Metabolic stability", weight: 0.27 },
              { name: "Sleep + recovery", weight: 0.22 },
              { name: "Cohort baseline", weight: 0.17 },
            ],
            confidence: 0.77,
            modelVersion: "Vitality Risk v2.3",
          }} />
        </div>
        <div className="h-[300px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COST_CURVE}>
              <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="base" stroke="var(--coral)" strokeWidth={2} dot={false} name="Default path" />
              <Line type="monotone" dataKey="optimized" stroke="var(--teal)" strokeWidth={2.5} dot={false} name="LONGEVA path" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <RiskCard icon={ShieldAlert} tone="coral" tag="Risk signal" headline="Glucose variability rising" body="84th percentile this week. Adds ~$340/yr to future cost forecast if sustained 12+ months." />
        <RiskCard icon={TrendingDown} tone="amber" tag="Earnings risk" headline="Sleep debt building" body="-12% productive output last 14 days. Reduces freelance income capacity by $480/mo." />
        <RiskCard icon={DollarSign} tone="teal" tag="Opportunity" headline="Cardio fitness improving" body="VO₂ max +2.1 in 90 days. Unlocks 8% insurance premium discount." />
      </section>
    </div>
  );
}

function Stat({ label, value, hint, tone }: { label: string; value: string; hint: string; tone: "gold" | "amber" | "teal" | "coral" }) {
  const cls = { gold: "text-gold", amber: "text-amber", teal: "text-teal", coral: "text-coral" }[tone];
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`font-display text-2xl tabular-nums mt-2 ${cls}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>
    </motion.div>
  );
}

function RiskCard({ icon: Icon, tone, tag, headline, body }: { icon: React.ComponentType<{ className?: string }>; tone: "coral" | "amber" | "teal"; tag: string; headline: string; body: string }) {
  const cls = { coral: "text-coral bg-coral/15", amber: "text-amber bg-amber/15", teal: "text-teal bg-teal/15" }[tone];
  const txt = { coral: "text-coral", amber: "text-amber", teal: "text-teal" }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className={`h-9 w-9 rounded-lg ${cls} grid place-items-center mb-3`}><Icon className="h-4 w-4" /></div>
      <p className={`text-[10px] font-mono uppercase tracking-wider ${txt}`}>{tag}</p>
      <p className="font-display text-lg mt-1 mb-1">{headline}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
