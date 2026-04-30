import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

// Future-value of current savings + monthly contributions
function projectNestEgg(savings: number, monthly: number, years: number, ratePct: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const fvSavings = savings * Math.pow(1 + r, n);
  const fvMonthly = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  return Math.round(fvSavings + fvMonthly);
}

// Reverse: monthly needed to reach a target
function monthlyToReach(target: number, savings: number, years: number, ratePct: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const fvSavings = savings * Math.pow(1 + r, n);
  const remaining = Math.max(0, target - fvSavings);
  if (n === 0) return remaining;
  return r === 0 ? remaining / n : remaining / ((Math.pow(1 + r, n) - 1) / r);
}

const fmt = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
};

interface Props {
  currentAge?: number;
  showChart?: boolean;
}

export function RetirementPlanner({ currentAge = 35, showChart = true }: Props) {
  const [savings, setSavings] = useState(45_000);
  const [monthly, setMonthly] = useState(1_780);
  const [retireAge, setRetireAge] = useState(67);
  const [rate, setRate] = useState(6.5);

  // Target: a comfortable retirement is roughly 25× annual expenses;
  // we anchor on $80K/yr lifestyle → $2M target, scaled by years to retirement.
  const target = 2_000_000;

  const years = Math.max(1, retireAge - currentAge);
  const projected = useMemo(
    () => projectNestEgg(savings, monthly, years, rate),
    [savings, monthly, years, rate],
  );
  const gap = projected - target;
  const monthlyNeeded = useMemo(
    () => monthlyToReach(target, savings, years, rate),
    [savings, years, rate],
  );
  const extraPerMonth = Math.max(0, Math.round(monthlyNeeded - monthly));

  const tone =
    gap >= 0 ? "good" : gap > -250_000 ? "warn" : "bad";

  const toneClass =
    tone === "good"
      ? "bg-teal/15 text-teal border-teal/30"
      : tone === "warn"
        ? "bg-amber/15 text-amber border-amber/30"
        : "bg-coral/15 text-coral border-coral/30";

  const chartData = useMemo(() => {
    const arr: { age: number; current: number; target: number; optimized: number }[] = [];
    for (let a = currentAge; a <= retireAge; a++) {
      const yrs = a - currentAge;
      arr.push({
        age: a,
        current: Math.round(projectNestEgg(savings, monthly, yrs, rate) / 1000),
        target: Math.round(
          (target * Math.pow(1 + rate / 100, yrs - years)) / 1000,
        ),
        optimized: Math.round(
          projectNestEgg(savings, monthly + Math.max(extraPerMonth, monthly * 0.25), yrs, rate) / 1000,
        ),
      });
    }
    return arr;
  }, [savings, monthly, rate, retireAge, currentAge, years, extraPerMonth]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-10 w-10 rounded-xl bg-gold/15 grid place-items-center">
          <Calculator className="h-5 w-5 text-gold" />
        </span>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold">Retirement gap calculator</p>
          <h3 className="font-display text-2xl">Find your number, then close the gap.</h3>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid sm:grid-cols-2 gap-6">
        <SliderRow
          label="Current savings"
          value={fmt(savings)}
          min={0}
          max={200_000}
          step={1_000}
          v={savings}
          set={setSavings}
        />
        <SliderRow
          label="Monthly contribution"
          value={fmt(monthly)}
          min={100}
          max={5_000}
          step={20}
          v={monthly}
          set={setMonthly}
        />
        <SliderRow
          label="Target retirement age"
          value={`${retireAge}`}
          min={55}
          max={75}
          step={1}
          v={retireAge}
          set={setRetireAge}
        />
        <SliderRow
          label="Expected return"
          value={`${rate.toFixed(1)}%`}
          min={3}
          max={12}
          step={0.1}
          v={rate}
          set={setRate}
        />
      </div>

      {/* Result chips */}
      <div className="grid sm:grid-cols-3 gap-3 mt-8">
        <ResultChip label="Projected nest egg" value={fmt(projected)} tone="neutral" />
        <ResultChip label="Target needed" value={fmt(target)} tone="neutral" />
        <ResultChip
          label="Gap"
          value={`${gap >= 0 ? "+" : "−"}${fmt(Math.abs(gap))}`}
          tone={tone}
          toneClass={toneClass}
        />
      </div>

      {/* Tip */}
      <motion.div
        key={`${extraPerMonth}-${gap}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
      >
        <TrendingUp className="h-4 w-4 text-teal mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          {extraPerMonth > 0 ? (
            <>
              Adding <span className="text-foreground font-medium">{fmt(extraPerMonth)}/month</span>{" "}
              over the next {years} years closes the gap.{" "}
              LONGEVA guardrails typically free up <span className="text-teal font-medium">$280–$520/month</span> from impulse spending.
            </>
          ) : (
            <>
              You're on track. Keep your guardrails on and consider increasing your retirement contribution by 1% each year to build a buffer.
            </>
          )}
        </p>
      </motion.div>

      {/* Chart */}
      {showChart && (
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Savings projection</p>
              <h4 className="font-display text-lg">Your nest egg, age {currentAge} → {retireAge}</h4>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
              <LegendDot color="var(--teal)" label="Current pace" />
              <LegendDot color="var(--foreground)" label="Target" dashed />
              <LegendDot color="var(--gold)" label="Optimized" />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" />
                <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickFormatter={(v) => `$${v}k`}
                  width={56}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => `$${v.toLocaleString()}k`}
                />
                <Legend wrapperStyle={{ display: "none" }} />
                <Line type="monotone" dataKey="current" stroke="var(--teal)" strokeWidth={2.5} dot={false} name="Current pace" />
                <Line type="monotone" dataKey="target" stroke="var(--foreground)" strokeWidth={2} strokeDasharray="6 6" dot={false} name="Target" />
                <Line type="monotone" dataKey="optimized" stroke="var(--gold)" strokeWidth={2.5} dot={false} name="Optimized" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function SliderRow({
  label, value, min, max, step, v, set,
}: { label: string; value: string; min: number; max: number; step: number; v: number; set: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        <span className="font-mono text-sm tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-[var(--gold)] h-1.5"
        aria-label={label}
      />
    </div>
  );
}

function ResultChip({
  label, value, tone, toneClass,
}: { label: string; value: string; tone: "good" | "warn" | "bad" | "neutral"; toneClass?: string }) {
  const cls =
    tone === "neutral"
      ? "bg-background border-border text-foreground"
      : toneClass ?? "";
  return (
    <div className={`rounded-2xl border p-5 ${cls}`}>
      <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${tone === "neutral" ? "text-muted-foreground" : "opacity-90"}`}>
        {label}
      </p>
      <p className="font-display text-3xl tabular-nums mt-1">{value}</p>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      {dashed ? (
        <span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: color }} />
      ) : (
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      )}
      {label}
    </span>
  );
}
