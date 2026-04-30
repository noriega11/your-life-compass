import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TreePine, Award, Flame, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/app/progress")({ component: ProgressTree });

const BRANCHES = [
  { id: "sleep", label: "Sleep depth", leaves: 23, color: "var(--teal)", x: 22, y: 55, angle: -42 },
  { id: "movement", label: "Daily movement", leaves: 41, color: "var(--gold)", x: 50, y: 30, angle: 0 },
  { id: "nutrition", label: "Glucose stability", leaves: 18, color: "var(--teal)", x: 78, y: 55, angle: 42 },
  { id: "mind", label: "Stress recovery", leaves: 12, color: "var(--gold)", x: 35, y: 70, angle: -25 },
  { id: "wealth", label: "Auto-Save", leaves: 27, color: "var(--gold)", x: 65, y: 70, angle: 25 },
];

const MILESTONES = [
  { date: "Today", title: "30-day movement streak", category: "Health", longv: 100 },
  { date: "Apr 24", title: "First $5K routed to IRA", category: "Wealth", longv: 250 },
  { date: "Apr 18", title: "HRV +12% over baseline", category: "Health", longv: 80 },
  { date: "Apr 12", title: "Joined Silver II league", category: "Quests", longv: 60 },
  { date: "Apr 03", title: "Glucose variability halved", category: "Health", longv: 150 },
];

function ProgressTree() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Progress Tree</p>
        <h1 className="font-display text-5xl text-balance">Every habit, a branch. Every milestone, a leaf.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A living portrait of your trajectory. Screenshot-worthy, share-worthy, you-worthy.
        </p>
      </header>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Branches</p>
          <p className="font-display text-4xl tabular-nums"><Counter to={5} /></p>
          <p className="text-xs text-muted-foreground mt-1">sustained habits</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Leaves</p>
          <p className="font-display text-4xl text-teal tabular-nums"><Counter to={121} /></p>
          <p className="text-xs text-muted-foreground mt-1">milestones earned</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tree health</p>
          <p className="font-display text-4xl text-gold tabular-nums"><Counter to={87} />%</p>
          <p className="text-xs text-muted-foreground mt-1">flourishing</p>
        </div>
      </div>

      <section className="rounded-3xl border border-border bg-gradient-to-b from-card via-card to-teal/5 p-6 lg:p-10 relative overflow-hidden">
        <div className="absolute top-5 right-5">
          <Button size="sm" variant="outline"><Share2 className="h-4 w-4" /> Share</Button>
        </div>

        <div className="relative aspect-[16/10] max-w-3xl mx-auto">
          {/* Trunk + branches SVG */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Trunk */}
            <motion.path
              d="M 50 100 Q 49 80 50 60 Q 51 40 50 25"
              stroke="var(--foreground)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            {BRANCHES.map((b, i) => (
              <motion.path
                key={b.id}
                d={`M 50 ${60 - i * 2} Q ${(50 + b.x) / 2} ${(60 + b.y) / 2 - 5} ${b.x} ${b.y}`}
                stroke="var(--muted-foreground)"
                strokeWidth="0.4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* Leaves clusters */}
          {BRANCHES.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.2, type: "spring", stiffness: 120 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <div
                className="rounded-full grid place-items-center shadow-lg backdrop-blur-sm"
                style={{
                  width: 60 + b.leaves * 0.8,
                  height: 60 + b.leaves * 0.8,
                  background: `radial-gradient(circle at 30% 30%, ${b.color}, color-mix(in oklch, ${b.color} 40%, transparent))`,
                }}
              >
                <span className="font-mono text-xs font-bold text-background mix-blend-overlay">{b.leaves}</span>
              </div>
              <p className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {b.label}
              </p>
            </motion.div>
          ))}

          {/* Soil */}
          <div className="absolute bottom-0 inset-x-0 h-2 rounded-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" /> Health</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold" /> Wealth & Mind</span>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-1 flex items-center gap-2"><Award className="h-5 w-5 text-gold" /> Milestone log</h2>
        <p className="text-sm text-muted-foreground mb-5">Every leaf has a story.</p>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {MILESTONES.map((m, i) => (
            <div key={i} className="p-5 flex items-center gap-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground w-16 shrink-0">{m.date}</div>
              <div className="h-9 w-9 rounded-lg bg-teal/15 text-teal grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.category}</p>
              </div>
              <span className="text-xs font-mono text-gold shrink-0">+{m.longv} LONGV</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
