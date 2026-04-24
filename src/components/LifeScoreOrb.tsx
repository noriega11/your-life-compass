import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  value: number;
  low?: number;
  high?: number;
  size?: number;
  label?: string;
}

export function LifeScoreOrb({ value, low, high, size = 280, label = "Your LifeScore" }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, value / 1000);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-radial-lime opacity-60 blur-2xl animate-pulse-glow" />
      <svg width={size} height={size} className="relative">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth={4}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--lime)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
        <p className="font-display text-7xl tabular-nums leading-none">{display}</p>
        <p className="text-xs text-muted-foreground mt-1">/ 1000</p>
        {low && high && (
          <p className="text-[10px] font-mono text-muted-foreground mt-2 px-2 py-0.5 rounded-full bg-muted/40">
            {low}–{high} · 80% conf.
          </p>
        )}
      </div>
    </div>
  );
}
