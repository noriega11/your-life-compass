import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Flame, Users, Coins, ArrowRight, CheckCircle2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Counter } from "@/components/Counter";
import { MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/app/quests")({ component: Quests });

const LEAGUE = [
  { rank: 1, name: "Eli M.", xp: 4820, you: false },
  { rank: 2, name: "Nora K.", xp: 4515, you: false },
  { rank: 3, name: "You", xp: 4280, you: true },
  { rank: 4, name: "Aiko T.", xp: 4102, you: false },
  { rank: 5, name: "Marcus J.", xp: 3970, you: false },
];

const REWARDS = [
  { id: "r1", title: "Cashback to checking", cost: 500, sub: "$5 transfer", icon: Coins },
  { id: "r2", title: "IRA top-up", cost: 1000, sub: "$15 contribution", icon: Target },
  { id: "r3", title: "Insurance premium discount", cost: 1500, sub: "Up to 8% off", icon: CheckCircle2 },
  { id: "r4", title: "Merchant discount, partner network", cost: 2500, sub: "$40 credit", icon: Trophy },
];

const FIN_QUESTS = [
  { id: "fq1", title: "No delivery for 5 weekdays", category: "Spending", longv: 200, progress: 60, why: "Avg savings $112/wk → emergency fund." },
  { id: "fq2", title: "Move $100 to emergency fund", category: "Auto-Save", longv: 150, progress: 35, why: "Lifts your runway from 2.4 → 2.8 months." },
  { id: "fq3", title: "Reduce convenience spend by 15%", category: "Spending", longv: 180, progress: 48, why: "Closes 0.4% of your retirement gap this month." },
  { id: "fq4", title: "Set up a retirement contribution rule", category: "Auto-Save", longv: 220, progress: 80, why: "Auto-routes $50/wk to your IRA." },
  { id: "fq5", title: "Complete 3 workouts → unlock 6% insurance discount", category: "Vitality", longv: 160, progress: 67, why: "Partner carrier rewards measured movement." },
];

function Quests() {
  const seasonProgress = (MOCK_USER.season.day / MOCK_USER.season.total) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold">Quests · Season 3</p>
        <h1 className="font-display text-5xl text-balance">{MOCK_USER.season.name}.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          90-day arcs. Anonymous leagues. LONGV redeemable for real value.
        </p>
      </header>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-gold/10 via-card to-card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-gold mb-1">Season progress</p>
            <p className="font-display text-2xl">Day {MOCK_USER.season.day} of {MOCK_USER.season.total}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">League</p>
            <p className="font-display text-2xl text-gold">{MOCK_USER.league}</p>
          </div>
        </div>
        <Progress value={seasonProgress} className="h-2" />
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Streak</p>
            <p className="font-display text-2xl flex items-center gap-1.5"><Flame className="h-4 w-4 text-amber" /><Counter to={MOCK_USER.streak} /></p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">LONGV</p>
            <p className="font-display text-2xl text-gold tabular-nums"><Counter to={MOCK_USER.longvBalance} /></p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Quests done</p>
            <p className="font-display text-2xl tabular-nums"><Counter to={12} /></p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-5">Active quests</h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {FIN_QUESTS.map((q) => (
            <motion.div
              key={q.id}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{q.category}</span>
                <span className="text-xs font-mono text-gold">+{q.longv} LONGV</span>
              </div>
              <h3 className="font-display text-xl mb-3 leading-tight">{q.title}</h3>
              <p className="text-xs text-muted-foreground mb-5 flex-1">{q.why}</p>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono">{q.progress}%</span>
                </div>
                <Progress value={q.progress} className="h-1.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-teal" />
            <h2 className="font-display text-2xl">Your league</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">Anonymous · top 3 advance to Gold next season.</p>
          <div className="space-y-1.5">
            {LEAGUE.map((p) => (
              <div
                key={p.rank}
                className={`flex items-center gap-4 p-3 rounded-xl ${p.you ? "bg-gold/10 border border-gold/30" : "border border-transparent"}`}
              >
                <span className={`font-mono text-sm w-6 ${p.rank <= 3 ? "text-gold" : "text-muted-foreground"}`}>#{p.rank}</span>
                <p className={`flex-1 text-sm ${p.you ? "font-semibold" : ""}`}>{p.name}</p>
                <span className="font-mono text-sm tabular-nums">{p.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="h-4 w-4 text-gold" />
            <h2 className="font-display text-2xl">LONGV wallet</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">Redeem your balance for real-world value.</p>
          <div className="space-y-3">
            {REWARDS.map((r) => {
              const canAfford = MOCK_USER.longvBalance >= r.cost;
              return (
                <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background">
                  <div className="h-9 w-9 rounded-lg bg-gold/15 text-gold grid place-items-center shrink-0">
                    <r.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.sub}</p>
                  </div>
                  <Button size="sm" variant={canAfford ? "lime" : "outline"} disabled={!canAfford}>
                    {r.cost} <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
