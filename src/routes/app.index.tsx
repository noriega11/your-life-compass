import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight, Check, Shield, PiggyBank, TrendingUp, Sparkles, Wallet,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from "recharts";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Counter } from "@/components/Counter";
import { Progress } from "@/components/ui/progress";
import { MOCK_USER, TODAY_ACTIONS, RETIREMENT_DATA } from "@/lib/mockData";

export const Route = createFileRoute("/app/")({ component: Today });

function Today() {
  const { user } = useAuth();
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  const profile = useMemo(() => {
    const fullName = (user?.user_metadata as any)?.full_name as string | undefined;
    const display = fullName || MOCK_USER.firstName;
    const first = display.split(" ")[0];
    const initials = display.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
    const avatarUrl =
      ((user?.user_metadata as any)?.avatar_url as string | undefined) ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(display)}&backgroundType=gradientLinear`;
    return { first, display, initials, avatarUrl };
  }, [user]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const toggleDone = (id: string) =>
    setDoneIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const totalActions = TODAY_ACTIONS.length;
  const doneCount = doneIds.size;
  const progressPct = Math.round((doneCount / totalActions) * 100);

  // The 4-step journey, the only thing the user has to follow.
  const journey = [
    {
      n: 1,
      title: "See where you stand",
      body: "Your wealth, retirement gap, and forecast at a glance.",
      cta: "Open forecast",
      to: "/app/wealth",
      done: true,
    },
    {
      n: 2,
      title: "Approve today's 3 actions",
      body: `${doneCount} of ${totalActions} done. Each one closes part of your gap.`,
      cta: "Review actions",
      to: "#actions",
      done: doneCount >= 3,
      active: true,
    },
    {
      n: 3,
      title: "Turn on auto-save",
      body: "Route unused budget into your IRA. One toggle.",
      cta: "Set up",
      to: "/app/retirement",
      done: false,
    },
    {
      n: 4,
      title: "Activate guardrails",
      body: "Block leaks before they happen. Save without thinking.",
      cta: "Enable",
      to: "/app/guardrails",
      done: false,
    },
  ];

  const gapAbs = Math.abs(MOCK_USER.retirementGap);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* HERO: Photo + greeting + single primary number */}
      <header className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-6 sm:p-8">
        <div className="flex items-start gap-5">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-gold/40 shrink-0">
            <AvatarImage src={profile.avatarUrl} alt={profile.display} />
            <AvatarFallback className="bg-gold/20 text-gold font-medium">{profile.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-1">
              Day {MOCK_USER.season.day} of {MOCK_USER.season.total}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-balance">
              {greeting}, {profile.first}.
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              You have <span className="text-foreground font-medium">3 small actions</span> today that move your retirement forecast by{" "}
              <span className="text-teal font-medium">+$13,200</span>.
            </p>
          </div>
        </div>

        {/* One progress bar so the user always knows where they are. */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Today's progress</span>
            <span className="font-mono tabular-nums">
              <span className="text-teal">{doneCount}</span>
              <span className="text-muted-foreground">/{totalActions}</span>
            </span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
      </header>

      {/* JOURNEY: numbered, linear, only one thing to do next */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Your journey</p>
          <h2 className="font-display text-2xl">Start here. Four steps.</h2>
        </div>
        <ol className="grid sm:grid-cols-2 gap-3">
          {journey.map((s) => (
            <JourneyStep key={s.n} step={s} />
          ))}
        </ol>
      </section>

      {/* THREE primary metrics, no more (Hick's Law) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BigMetric
          tag="Wealth Score"
          value={<><Counter to={MOCK_USER.wealthScore} />/100</>}
          delta="+3 this month"
          tone="teal"
        />
        <BigMetric
          tag="Retirement Gap"
          value={<>-$<Counter to={Math.round(gapAbs / 1000)} />K</>}
          delta="−$8.4K closed"
          tone="coral"
        />
        <BigMetric
          tag="Auto-Saved"
          value={<>$<Counter to={MOCK_USER.autoSavedThisMonth} /></>}
          delta="this month"
          tone="gold"
        />
      </section>

      {/* Net worth forecast, the single chart on Home */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Net Worth at 67</p>
          <h2 className="font-display text-2xl sm:text-3xl">
            <span className="text-muted-foreground line-through">${(MOCK_USER.netWorthCurrent67/1000).toFixed(0)}K</span>{" "}
            <ArrowRight className="inline h-5 w-5 text-muted-foreground mx-1" />{" "}
            <span className="text-teal">${(MOCK_USER.netWorthOptimized67/1000).toFixed(0)}K</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            With your current rules active, you're on the optimized path.
          </p>
        </div>
        <div className="h-[240px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RETIREMENT_DATA}>
              <defs>
                <linearGradient id="dash-longeva" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `$${v}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => `$${v}k`} />
              <ReferenceLine x={67} stroke="var(--gold)" strokeDasharray="4 4" label={{ value: "Retire", fill: "var(--gold)", fontSize: 10 }} />
              <Area type="monotone" dataKey="base" stroke="var(--muted-foreground)" strokeWidth={2} fill="transparent" name="Default" />
              <Area type="monotone" dataKey="longeva" stroke="var(--teal)" strokeWidth={2.5} fill="url(#dash-longeva)" name="Optimized" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Today's actions, simplified */}
      <section id="actions">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Step 2</p>
            <h2 className="font-display text-2xl">Today's actions</h2>
          </div>
          <p className="text-xs text-muted-foreground">Tap to mark done</p>
        </div>
        <div className="space-y-3">
          {TODAY_ACTIONS.slice(0, 3).map((a, i) => (
            <ActionRow key={a.id} a={a} delay={i * 0.05} done={doneIds.has(a.id)} onToggle={() => toggleDone(a.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function JourneyStep({ step }: {
  step: { n: number; title: string; body: string; cta: string; to: string; done: boolean; active?: boolean };
}) {
  const Cmp: any = step.to.startsWith("#") ? "a" : Link;
  const linkProps: any = step.to.startsWith("#") ? { href: step.to } : { to: step.to };
  return (
    <li>
      <Cmp
        {...linkProps}
        className={`block rounded-2xl border p-5 transition group ${
          step.done
            ? "border-teal/40 bg-teal/5"
            : step.active
            ? "border-gold bg-gold/5 shadow-sm"
            : "border-border bg-card hover:border-foreground/40"
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-medium shrink-0 ${
            step.done ? "bg-teal text-background" : step.active ? "bg-gold text-background" : "bg-muted text-muted-foreground"
          }`}>
            {step.done ? <Check className="h-4 w-4" strokeWidth={3} /> : step.n}
          </div>
          {step.active && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold">Start here</span>
          )}
        </div>
        <p className="font-medium leading-snug">{step.title}</p>
        <p className="text-sm text-muted-foreground mt-1">{step.body}</p>
        <p className={`text-xs mt-3 inline-flex items-center gap-1 ${step.done ? "text-teal" : "text-foreground"}`}>
          {step.cta} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition" />
        </p>
      </Cmp>
    </li>
  );
}

function BigMetric({ tag, value, delta, tone }: {
  tag: string;
  value: React.ReactNode;
  delta: string;
  tone: "teal" | "coral" | "gold";
}) {
  const cls = tone === "teal" ? "text-teal" : tone === "coral" ? "text-coral" : "text-gold";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{tag}</p>
      <p className={`font-display text-3xl tabular-nums mt-2 ${cls}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{delta}</p>
    </div>
  );
}

function ActionRow({ a, delay, done, onToggle }: {
  a: typeof TODAY_ACTIONS[0]; delay: number; done: boolean; onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition flex items-start gap-4 ${
        done ? "border-teal/50 bg-teal/5" : "border-border bg-card hover:border-foreground/40"
      }`}
    >
      <div className={`h-9 w-9 rounded-full border grid place-items-center shrink-0 transition ${
        done ? "bg-teal border-teal text-background" : "border-border"
      }`}>
        {done && <Check className="h-4 w-4" strokeWidth={3} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-medium leading-snug ${done ? "line-through text-muted-foreground" : ""}`}>{a.title}</p>
        <p className="text-xs text-muted-foreground mt-1">{a.outcome}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-medium text-teal tabular-nums">+${a.dollars}</p>
        <p className="text-[10px] text-muted-foreground">today</p>
      </div>
    </motion.button>
  );
}

// Keep these imports referenced so future sections can re-mount easily.
void Shield; void PiggyBank; void TrendingUp; void Sparkles; void Wallet;
