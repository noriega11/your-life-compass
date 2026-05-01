import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Sparkles, TrendingUp, Check, ChevronDown, Info } from "lucide-react";

// Future-value of current savings + monthly contributions
function projectNestEgg(savings: number, monthly: number, years: number, ratePct: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const fvSavings = savings * Math.pow(1 + r, n);
  const fvMonthly = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  return Math.round(fvSavings + fvMonthly);
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

// Spending habits presets. Higher impulse = bigger opportunity for LONGEVA to recover.
const HABIT_PRESETS = [
  {
    label: "Mindful",
    value: "low",
    boost: 180,
    description: "You rarely impulse-buy. LONGEVA fine-tunes the small leaks.",
  },
  {
    label: "Average",
    value: "mid",
    boost: 380,
    description: "A few impulse buys per week. LONGEVA quietly recovers them.",
  },
  {
    label: "Impulsive",
    value: "high",
    boost: 620,
    description: "Frequent impulse spending. LONGEVA blocks and redirects to savings.",
  },
] as const;

// Estimate starting savings from age (priming defaults so the slider feels alive).
function estimateSavings(age: number) {
  if (age < 30) return 8_000;
  if (age < 40) return 45_000;
  if (age < 50) return 120_000;
  return 220_000;
}

export function RetirementPlanner({ currentAge = 35, showChart = true }: Props) {
  const [age, setAge] = useState(currentAge);
  const [monthly, setMonthly] = useState(1_200);
  const [habit, setHabit] = useState<(typeof HABIT_PRESETS)[number]>(HABIT_PRESETS[1]);
  const [advanced, setAdvanced] = useState(false);
  const [retireAge, setRetireAge] = useState(67);
  const [rate, setRate] = useState(6.5);

  const savings = estimateSavings(age);
  const years = Math.max(1, retireAge - age);

  const projected = useMemo(
    () => projectNestEgg(savings, monthly, years, rate),
    [savings, monthly, years, rate],
  );

  const optimizedMonthly = monthly + habit.boost;
  const optimizedProjected = useMemo(
    () => projectNestEgg(savings, optimizedMonthly, years, rate),
    [savings, optimizedMonthly, years, rate],
  );
  const optimizedGain = optimizedProjected - projected;

  const chartData = useMemo(() => {
    const arr: { age: number; current: number; optimized: number }[] = [];
    for (let a = age; a <= retireAge; a++) {
      const yrs = a - age;
      arr.push({
        age: a,
        current: Math.round(projectNestEgg(savings, monthly, yrs, rate) / 1000),
        optimized: Math.round(projectNestEgg(savings, optimizedMonthly, yrs, rate) / 1000),
      });
    }
    return arr;
  }, [savings, monthly, optimizedMonthly, rate, retireAge, age]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-[11px] font-mono mb-4">
          <Sparkles className="h-3 w-3" /> 60-second forecast
        </span>
        <h3 className="font-display text-3xl sm:text-4xl mb-3">
          Move the sliders. See your future.
        </h3>
        <p className="text-sm text-muted-foreground">
          Three inputs: your age, what you save each month, and your spending habits.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Slider 1: Age */}
        <SliderField
          label="Your age today"
          value={`${age} years`}
          min={22}
          max={65}
          step={1}
          v={age}
          set={setAge}
        />

        {/* Slider 2: Monthly savings */}
        <SliderField
          label="What you save every month"
          value={`$${monthly.toLocaleString()}`}
          min={100}
          max={5_000}
          step={50}
          v={monthly}
          set={setMonthly}
        />

        {/* Spending habits  the third variable */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              Your spending habits
            </label>
            <span className="font-mono text-sm tabular-nums text-teal">
              +${habit.boost}/mo recovered
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {HABIT_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setHabit(p)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  habit.value === p.value
                    ? "bg-foreground text-background shadow-soft"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground bg-background border border-border rounded-lg p-3">
            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-teal" />
            <span>{habit.description}</span>
          </div>
        </div>
      </div>

      {/* Headline result */}
      <motion.div
        key={`${projected}-${optimizedProjected}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-2xl bg-gradient-to-br from-lime/10 to-teal/10 border border-lime/30 p-6 sm:p-8 text-center"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-2">
          With LONGEVA, by age {retireAge}
        </p>
        <p className="font-display text-5xl sm:text-6xl tabular-nums text-foreground">
          {fmt(optimizedProjected)}
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-sm">
          <span className="inline-flex items-center gap-1 text-teal font-medium">
            <TrendingUp className="h-4 w-4" />
            +{fmt(optimizedGain)} more
          </span>
          <span className="text-muted-foreground">than your current path</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto leading-relaxed">
          LONGEVA reads your spending habits and quietly recovers ${habit.boost}/month
          from impulse purchases, then invests it for you automatically.
        </p>
      </motion.div>

      {/* Two-column comparison */}
      <div className="grid grid-cols-2 gap-3 mt-4 max-w-xl mx-auto">
        <div className="rounded-xl border border-border bg-background p-3 text-center">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Your path today
          </p>
          <p className="font-display text-xl tabular-nums mt-1">{fmt(projected)}</p>
        </div>
        <div className="rounded-xl border border-teal/30 bg-teal/5 p-3 text-center">
          <p className="text-[10px] font-mono uppercase tracking-wider text-teal flex items-center justify-center gap-1">
            <Check className="h-3 w-3" /> With LONGEVA
          </p>
          <p className="font-display text-xl tabular-nums mt-1 text-teal">{fmt(optimizedProjected)}</p>
        </div>
      </div>

      {/* Advanced */}
      <div className="mt-6 max-w-xl mx-auto">
        <button
          onClick={() => setAdvanced((v) => !v)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
        >
          {advanced ? "Hide" : "Show"} advanced settings
          <ChevronDown
            className={`h-3 w-3 transition-transform ${advanced ? "rotate-180" : ""}`}
          />
        </button>

        {advanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border bg-background">
              <SliderField
                label="Retire at age"
                value={`${retireAge}`}
                min={55}
                max={75}
                step={1}
                v={retireAge}
                set={setRetireAge}
              />
              <SliderField
                label="Expected return"
                value={`${rate.toFixed(1)}%`}
                min={3}
                max={10}
                step={0.1}
                v={rate}
                set={setRate}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Chart */}
      {showChart && years > 2 && (
        <div className="mt-10 pt-8 border-t border-border">
          <div className="text-center mb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Your savings, year by year
            </p>
            <p className="font-display text-lg mt-1">
              Watch the gap close from age {age} to {retireAge}
            </p>
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
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="var(--muted-foreground)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Your current path"
                />
                <Line
                  type="monotone"
                  dataKey="optimized"
                  stroke="var(--teal)"
                  strokeWidth={3}
                  dot={false}
                  name="With LONGEVA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function SliderField({
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
        className="w-full accent-[var(--teal)] h-1.5"
        aria-label={label}
      />
    </div>
  );
}
