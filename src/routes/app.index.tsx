import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Wallet, Brain, ArrowRight, Check, ShieldCheck, Receipt, PiggyBank } from "lucide-react";
import { LifeScoreOrb } from "@/components/LifeScoreOrb";
import { WhyThis } from "@/components/WhyThis";
import { MOCK_USER, TODAY_ACTIONS, RECOMMENDED_MERCHANTS, RECENT_TRANSACTIONS } from "@/lib/mockData";
import { useState } from "react";
import optimized70 from "@/assets/future-self-optimized-70.jpg";
import current70 from "@/assets/future-self-current-70.jpg";

export const Route = createFileRoute("/app/")({ component: Today });

function Today() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Hero */}
      <section className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">Today · Day {MOCK_USER.season.day} of {MOCK_USER.season.total}</p>
          <h1 className="font-display text-5xl sm:text-6xl text-balance">{greeting}, {MOCK_USER.firstName}.</h1>
          <p className="text-muted-foreground mt-3">Your forecast moved <span className="text-lime font-medium">+{MOCK_USER.lifeScoreDelta}</span> this week. Three actions below keep you on the optimized path.</p>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { label: "Health", value: MOCK_USER.health, icon: Heart },
              { label: "Wealth", value: MOCK_USER.wealth, icon: Wallet },
              { label: "Mind", value: MOCK_USER.mind, icon: Brain },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                <s.icon className="h-4 w-4 text-muted-foreground mb-3" />
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-3xl tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <LifeScoreOrb value={MOCK_USER.lifeScore} low={MOCK_USER.lifeScoreLow} high={MOCK_USER.lifeScoreHigh} size={300} />
        </div>
      </section>

      {/* 3 actions */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-3xl">Your 3 actions today</h2>
            <p className="text-sm text-muted-foreground">Each under 30 minutes. Each explained.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {TODAY_ACTIONS.map((a, i) => <ActionCard key={a.id} a={a} delay={i * 0.08} />)}
        </div>
      </section>

      {/* Today at a glance */}
      <section className="grid md:grid-cols-3 gap-4">
        <GlanceCard
          icon={ShieldCheck}
          tag="Guardrails"
          headline="$87 saved today"
          body="2 purchases blocked, 1 nudged."
        />
        <GlanceCard
          icon={Receipt}
          tag="Spending Impact"
          headline={`${RECENT_TRANSACTIONS.filter((t) => t.impact === "good").length}/${RECENT_TRANSACTIONS.length} purchases scored well`}
          body="Latest: Whole Foods +1.2 healthspan hrs"
        />
        <GlanceCard
          icon={PiggyBank}
          tag="Auto-Save"
          headline="$47 → IRA"
          body="Routed automatically this morning."
        />
      </section>

      {/* Future Self teaser */}
      <section className="rounded-3xl overflow-hidden border border-border bg-card p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">See your future self</p>
          <h2 className="font-display text-4xl mb-3">Two paths. Your choice.</h2>
          <p className="text-muted-foreground mb-5">What you do today decides who shows up at 70.</p>
          <a href="/app/trajectory" className="inline-flex items-center gap-1.5 text-sm text-lime hover:underline">
            Open your forecast <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ src: current70, tag: "Without changes" }, { src: optimized70, tag: "With LONGEVA" }].map((p) => (
            <div key={p.tag} className="relative rounded-2xl overflow-hidden">
              <img src={p.src} alt={p.tag} loading="lazy" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <p className="absolute bottom-3 left-3 text-xs font-mono text-lime">{p.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-3xl">Recommended for you</h2>
            <p className="text-sm text-muted-foreground">Places that move your forecast forward.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {RECOMMENDED_MERCHANTS.map((m) => (
            <div key={m.id} className="rounded-2xl overflow-hidden border border-border bg-card group">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.category}</p>
                <p className="text-sm font-medium truncate">{m.name}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-lime font-mono">+{m.impact}</span>
                  <span className="text-muted-foreground">{m.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionCard({ a, delay }: { a: typeof TODAY_ACTIONS[0]; delay: number }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border p-5 transition-all ${done ? "border-lime bg-lime/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted">{a.category}</span>
        <span className="text-xs text-lime font-mono">+{a.longv} LONGV</span>
      </div>
      <p className="font-medium leading-snug mb-2">{a.title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{a.outcome}</p>
      <div className="flex items-center justify-between">
        <WhyThis data={a.why} />
        <button
          onClick={() => setDone(!done)}
          className={`h-7 w-7 rounded-full border grid place-items-center transition ${
            done ? "bg-lime border-lime text-lime-foreground" : "border-border hover:border-foreground"
          }`}
          aria-label="Mark complete"
        >
          {done && <Check className="h-3.5 w-3.5" />}
        </button>
      </div>
    </motion.div>
  );
}

function GlanceCard({ icon: Icon, tag, headline, body }: { icon: React.ComponentType<{ className?: string }>; tag: string; headline: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-4 w-4 text-lime mb-3" />
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{tag}</p>
      <p className="font-display text-2xl mt-1">{headline}</p>
      <p className="text-xs text-muted-foreground mt-1">{body}</p>
    </div>
  );
}
