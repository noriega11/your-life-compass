import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Sparkles, TrendingUp, Check, ChevronDown } from "lucide-react";

// Future-value of current savings + monthly contributions
function projectNestEgg(savings: number, monthly: number, years: number, ratePct: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  const fvSavings = savings * Math.pow(1 + r, n);
  const fvMonthly = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  return Math.round(fvSavings + fvMonthly);
}

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

// Hicks Law: limit choices. Three friendly presets per question.
const AGE_PRESETS = [
  { label: "20s", value: 27, monthly: 600, savings: 8_000 },
  { label: "30s", value: 35, monthly: 1_200, savings: 45_000 },
  { label: "40s", value: 45, monthly: 1_800, savings: 120_000 },
  { label: "50s+", value: 55, monthly: 2_400, savings: 220_000 },
];

const SAVE_PRESETS = [
  { label: "A little", value: 400, hint: "$400 / mo" },
  { label: "Steady", value: 1_200, hint: "$1,200 / mo" },
  { label: "Aggressive", value: 2_500, hint: "$2,500 / mo" },
];

export function RetirementPlanner({ currentAge = 35, showChart = true }: Props) {
  // Default to a sane preset based on prop currentAge (priming defaults).
  const initialPreset =
    AGE_PRESETS.find((p) => Math.abs(p.value - currentAge) <= 5) ?? AGE_PRESETS[1];

  const [ageBucket, setAgeBucket] = useState(initialPreset);
  const [savePreset, setSavePreset] = useState(SAVE_PRESETS[1]);
  const [advanced, setAdvanced] = useState(false);
  const [retireAge, setRetireAge] = useState(67);
  const [rate, setRate] = useState(6.5);

  const savings = ageBucket.savings;
  const monthly = savePreset.value;
  const target = 2_000_000;

  const years = Math.max(1, retireAge - ageBucket.value);
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
  const longevaBoost = 380; // Confirmation bias: typical guardrail savings reframed as a win.
  const optimizedMonthly = monthly + longevaBoost;
  const optimizedProjected = projectNestEgg(savings, optimizedMonthly, years, rate);
  const optimizedGain = optimizedProjected - projected;

  const onTrack = gap >= 0;

  const chartData = useMemo(() => {
    const arr: { age: number; current: number; optimized: number }[] = [];
    for (let a = ageBucket.value; a <= retireAge; a++) {
      const yrs = a - ageBucket.value;
      arr.push({
        age: a,
        current: Math.round(projectNestEgg(savings, monthly, yrs, rate) / 1000),
        optimized: Math.round(projectNestEgg(savings, optimizedMonthly, yrs, rate) / 1000),
      });
    }
    return arr;
  }, [savings, monthly, optimizedMonthly, rate, retireAge, ageBucket.value]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
      {/* Header — primes user with the friendly framing */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-[11px] font-mono mb-4">
          <Sparkles className="h-3 w-3" /> 60-second forecast
        </span>
        <h3 className="font-display text-3xl sm:text-4xl mb-3">
          Two questions. Your retirement number.
        </h3>
        <p className="text-sm text-muted-foreground">
          No spreadsheets. No jargon. Just a clear picture of where you're heading.
        </p>
      </div>

      {/* Question 1: Age bucket — Hicks: 4 chips, not a slider */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-center">
          1. How old are you?
        </p>
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {AGE_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setAgeBucket(p)}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                ageBucket.label === p.label
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: Saving style — Hicks: 3 chips, not a slider */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-center">
          2. How much do you save each month?
        </p>
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {SAVE_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setSavePreset(p)}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                savePreset.label === p.label
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <div>{p.label}</div>
              <div className="text-[10px] font-mono mt-0.5 opacity-70">{p.hint}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Headline result — confirmation bias: positive framing */}
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
          {onTrack
            ? "You're already on track. LONGEVA helps you stay there and add a comfortable buffer."
            : `LONGEVA typically frees up ~$${longevaBoost}/month from impulse spending and quietly invests it for you.`}
        </p>
      </motion.div>

      {/* Two simple confirmation chips, not a wall of numbers */}
      <div className="grid grid-cols-2 gap-3 mt-4 max-w-md mx-auto">
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

      {/* Advanced — collapsed by default to reduce cognitive load */}
      <div className="mt-6 max-w-md mx-auto">
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
              <SliderRow
                label="Retire at age"
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
                max={10}
                step={0.1}
                v={rate}
                set={setRate}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Chart — only render when there's enough range */}
      {showChart && years > 2 && (
        <div className="mt-10 pt-8 border-t border-border">
          <div className="text-center mb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Your savings, year by year
            </p>
            <p className="font-display text-lg mt-1">
              Watch the gap close from age {ageBucket.value} to {retireAge}
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
        className="w-full accent-[var(--teal)] h-1.5"
        aria-label={label}
      />
    </div>
  );
}
