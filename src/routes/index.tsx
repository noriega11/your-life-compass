import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Heart, Wallet, Brain, Shield, Activity, Sparkles, Check,
  Lock, Eye, Database, Smartphone, ChevronDown, TrendingDown, AlertCircle,
  CreditCard, Watch, ScanFace, CalendarDays, Target, Zap, Apple, Bell, Repeat, LineChart,
  PiggyBank, TrendingUp, Banknote, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LifeScoreOrb } from "@/components/LifeScoreOrb";
import { Counter } from "@/components/Counter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { RetirementPlanner } from "@/components/RetirementPlanner";
import { useState } from "react";
import optimized70 from "@/assets/future-self-optimized-70.jpg";
import current70 from "@/assets/future-self-current-70.jpg";
import optimized90 from "@/assets/future-self-optimized-90.jpg";
import current90 from "@/assets/future-self-current-90.jpg";
import heroHuman from "@/assets/hero-human.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "LONGEVA — Control your financial future, automatically." },
      {
        name: "description",
        content:
          "LONGEVA is the behavioral fintech platform that predicts your lifetime financial trajectory and adjusts your daily spending, saving, and investing in real time.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <PreviewBand />
      <ThreeCrises />
      <HowItWorks />
      <FinancialDashboard />
      <RealtimeCapitalActions />
      <AgingPrediction />
      <WalletIntegrations />
      <BodyAgeScan />
      <WearablesModule />
      <RoutinesCalendar />
      <AccountabilityModule />
      <FintechInfra />
      <CompetitivePositioning />
      <DataSources />
      <FutureSelf />
      <ImpactBand />
      <Explainability />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const features = [
    { href: "#prediction", icon: LineChart, label: "Lifetime Forecast Engine", desc: "Project net worth & retirement gap" },
    { href: "#wallet", icon: CreditCard, label: "Autonomous Capital Allocation", desc: "Pause, block, reroute spending" },
    { href: "#routines", icon: CalendarDays, label: "Auto-Save & Investing", desc: "Daily redirects to IRA & index" },
    { href: "#scan", icon: ScanFace, label: "Behavioral Risk Signals", desc: "Biometric inputs improve forecasts" },
    { href: "#wearables", icon: Watch, label: "Connected Data Layer", desc: "Banks, cards, wearables in one stream" },
    { href: "#accountability", icon: Target, label: "Financial Goals & Pacts", desc: "Net worth, retirement, leakage caps" },
  ];
  const topLinks = [
    { href: "#about", label: "About" },
    { href: "#how", label: "How it works" },
  ];
  const tailLinks = [
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="shrink-0"><Logo size="md" /></a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {topLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-foreground transition-colors py-2"
              aria-haspopup="true"
              aria-expanded={featuresOpen}
              onFocus={() => setFeaturesOpen(true)}
            >
              Features
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
            </button>
            {featuresOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]">
                <div className="rounded-2xl border border-border bg-card shadow-card p-3 grid grid-cols-2 gap-1">
                  {features.map((f) => (
                    <a
                      key={f.href}
                      href={f.href}
                      onClick={() => setFeaturesOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <span className="h-9 w-9 rounded-lg bg-lime/15 grid place-items-center shrink-0">
                        <f.icon className="h-4 w-4 text-lime" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{f.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{f.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {tailLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button variant="lime" size="sm" asChild>
            <Link to="/signup">Start optimizing my wealth</Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-lg border border-border"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
            <div className="grid gap-2 text-sm">
              {topLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground py-1">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">Features</p>
              <div className="grid gap-1">
                {features.map((f) => (
                  <a key={f.href} href={f.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2 text-sm">
                    <f.icon className="h-4 w-4 text-lime" /> {f.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4 grid gap-2 text-sm">
              {tailLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground py-1">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-hero">
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT — message column */}
        <div className="lg:col-span-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground mb-7 shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            Behavioral fintech · Real-time capital allocation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-balance"
          >
            Control your financial future—
            <br />
            <em className="text-lime not-italic">automatically.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground text-pretty"
          >
            LONGEVA predicts your lifetime financial trajectory and adjusts your
            daily spending, saving, and investing in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button variant="lime" size="lg" asChild>
              <Link to="/signup">Start optimizing my wealth <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#how">How it works</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Bank-grade encryption</span>
            <span className="flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5" /> Secure banking rails</span>
            <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> You own your data</span>
          </motion.div>
        </div>

        {/* RIGHT — visual column with anchored floating cards (no face overlap) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="lg:col-span-6 relative"
        >
          {/* Decorative ambient ring */}
          <div className="absolute -inset-4 -z-10 rounded-[40px] bg-radial-lime opacity-40 blur-2xl" aria-hidden="true" />

          {/* Photo frame with safe inner gutters for floating chips */}
          <div className="relative pl-0 sm:pl-10 lg:pl-14 pr-0 sm:pr-4 pb-12 lg:pb-16">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-card bg-card">
              <img
                src={heroHuman}
                alt="A family enjoying a healthy morning together"
                className="w-full h-full object-cover aspect-[4/5] sm:aspect-[5/6]"
              />
              {/* soft bottom gradient for chip legibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>

            {/* LifeScore card — anchored to bottom-left, OUTSIDE the photo edge */}
            <motion.div
              initial={{ opacity: 0, y: 12, x: -8 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.65 }}
              className="hidden sm:block absolute bottom-2 left-0 lg:left-2 w-[230px] rounded-2xl bg-card border border-border p-5 shadow-card"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime mb-1">Projected net worth · 67</p>
              <div className="flex items-baseline gap-2">
                <p className="font-display text-4xl tabular-nums leading-none">$1.62M</p>
                <span className="text-xs font-mono text-lime">+$420K</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                vs. $820K default · 80% conf.
              </p>
              {/* tiny sparkline */}
              <svg viewBox="0 0 100 24" className="w-full mt-3 h-6 text-lime">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  points="0,18 12,15 24,17 36,12 48,13 60,9 72,10 84,6 100,4"
                />
              </svg>
            </motion.div>

            {/* Stat pill — anchored top-right OUTSIDE the photo */}
            <motion.div
              initial={{ opacity: 0, y: -8, x: 8 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.55 }}
              className="hidden sm:flex absolute top-4 right-0 lg:-right-2 items-center gap-2.5 rounded-full bg-card border border-border pl-2 pr-4 py-2 shadow-soft"
            >
              <span className="h-7 w-7 rounded-full bg-lime/15 grid place-items-center">
                <CreditCard className="h-3.5 w-3.5 text-lime" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Auto-invested today</p>
                <p className="text-sm font-medium">+$47 → IRA</p>
              </div>
            </motion.div>

            {/* Today's actions — anchored mid-right OUTSIDE the photo */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 }}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-[220px] rounded-2xl bg-card border border-border p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-lime">Live · capital actions</p>
                <span className="text-[10px] font-mono text-muted-foreground">3</span>
              </div>
              <ul className="space-y-2 text-xs">
                {[
                  { t: "+$47 auto-invested", done: true },
                  { t: "$82 impulse blocked", done: true },
                  { t: "$22 rerouted to IRA", done: true },
                ].map((a) => (
                  <li key={a.t} className="flex items-center gap-2">
                    <span className={`h-3.5 w-3.5 rounded-full grid place-items-center shrink-0 ${a.done ? "bg-lime" : "border border-border"}`}>
                      {a.done && <Check className="h-2.5 w-2.5 text-lime-foreground" strokeWidth={3} />}
                    </span>
                    <span>{a.t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mobile-only compact stats row (replaces hidden floating cards) */}
          <div className="sm:hidden mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[9px] font-mono uppercase tracking-wider text-lime">Net worth · 67</p>
              <p className="font-display text-xl mt-0.5">$1.62M</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[9px] font-mono uppercase tracking-wider text-lime">Auto-invest</p>
              <p className="font-display text-xl mt-0.5">+$47</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[9px] font-mono uppercase tracking-wider text-lime">Blocked</p>
              <p className="font-display text-xl mt-0.5">$82</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniChip({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center justify-between gap-3 shadow-soft">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="h-8 w-8 rounded-lg bg-lime/15 grid place-items-center shrink-0">
          <Icon className="h-4 w-4 text-lime" />
        </span>
        <p className="text-sm text-muted-foreground truncate">{label}</p>
      </div>
      <p className="text-sm font-medium tabular-nums whitespace-nowrap">{value}</p>
    </div>
  );
}

function PreviewBand() {
  const items = [
    { label: "Projected net worth at 67", prefix: "$", value: 1.62, suffix: "M", decimals: 2, sub: "with LONGEVA · 80% conf.", tone: "teal" as const },
    { label: "Retirement gap closed", prefix: "+$", value: 620, suffix: "K", sub: "vs. default trajectory", tone: "teal" as const },
    { label: "Spending leakage cut", prefix: "−", value: 22, suffix: "%", sub: "blocked + rerouted to invest", tone: "coral" as const },
  ];
  const toneCls = (t: "neutral" | "teal" | "coral") =>
    t === "teal" ? "text-teal" : t === "coral" ? "text-coral" : "text-foreground";
  return (
    <section className="py-24 border-y border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold text-center mb-3">
          Your financial trajectory, in 12 minutes
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-center mb-14 text-balance">
          Three numbers that change your money.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-12">
          {items.map((it) => (
            <div key={it.label} className="bg-background p-10 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{it.label}</p>
              <p className={`font-display text-6xl tabular-nums ${toneCls(it.tone)}`}>
                {it.prefix}
                <Counter to={it.value} decimals={it.decimals ?? 0} />
                {it.suffix}
              </p>
              <p className="text-xs text-muted-foreground mt-3 font-mono">{it.sub}</p>
            </div>
          ))}
        </div>

        {/* Interactive retirement planner */}
        <RetirementPlanner currentAge={35} />
      </div>
    </section>
  );
}

function ThreeCrises() {
  const crises = [
    {
      icon: TrendingDown,
      stat: "57%",
      title: "The Retirement Shortfall",
      body: "57% of households won't have enough to retire. LONGEVA auto-routes capital into IRAs and index funds on every paycheck.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    },
    {
      icon: AlertCircle,
      stat: "$1.6T",
      title: "The Behavioral Spending Gap",
      body: "$1.6T leaks to impulse decisions every year. Guardrails detect, pause, and block suboptimal transactions before checkout.",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    },
    {
      icon: Activity,
      stat: "16 yrs",
      title: "The Healthcare Cost Curve",
      body: "16 sick years at end-of-life crater retirement portfolios. Behavioral signals lower projected medical liabilities and extend earning years.",
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
    },
  ];
  return (
    <section id="about" className="py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Why now</p>
          <h2 className="font-display text-5xl sm:text-6xl leading-tight text-balance">
            The three financial crises of 2030.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {crises.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden bg-card border border-border group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-7">
                <c.icon className="h-5 w-5 text-lime mb-3" />
                <p className="font-display text-5xl mb-2">{c.stat}</p>
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: Database, title: "Analyze", body: "We ingest your bank, card, investment, wearable, and behavioral data — read-only and encrypted." },
    { n: "02", icon: LineChart, title: "Forecast", body: "The Lifetime Forecast Engine projects your net worth, retirement gap, and financial trajectory to 90." },
    { n: "03", icon: Shield, title: "Intervene", body: "Real-time guardrails pause, block or nudge transactions that hurt your long-term outcome." },
    { n: "04", icon: PiggyBank, title: "Reallocate", body: "Saved capital is auto-routed into your IRA, index funds, and emergency fund — every day." },
  ];
  return (
    <section id="how" className="py-28 bg-card/40 border-y border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">How LONGEVA works</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">
            From daily actions to lifetime wealth—fully automated.
          </h2>
          <p className="text-muted-foreground text-lg mt-5">
            One closed loop: data in, forecast out, capital reallocated in real time.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8 hover:bg-card transition-colors">
              <p className="font-mono text-xs text-lime mb-6">{s.n}</p>
              <s.icon className="h-7 w-7 mb-5" />
              <h3 className="font-display text-2xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataSources() {
  const sources = [
    { icon: Wallet, name: "Banks & cards", note: "Plaid · Chase · Amex" },
    { icon: Heart, name: "Wearables", note: "Oura · Whoop · Apple Health" },
    { icon: Smartphone, name: "Body Age scan", note: "On-device only" },
    { icon: Brain, name: "Calendar", note: "Optional · context only" },
  ];
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">What we read</p>
          <h2 className="font-display text-5xl sm:text-6xl mb-6 text-balance">
            Your full picture, never sold.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Money, body, and behavior, pulled together so we can show you the real trajectory.
            Every signal is encrypted, every connection is revocable, and your data is never sold
            or used for advertising.
          </p>
          <div className="flex flex-wrap gap-2">
            {["SOC 2 Type II", "HIPAA-aligned", "GDPR + CCPA"].map((b) => (
              <span key={b} className="px-3 py-1.5 text-xs rounded-full border border-border bg-card">
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sources.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <s.icon className="h-6 w-6 text-lime mb-4" />
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureSelf() {
  const ages = [70, 80, 90] as const;
  type Age = typeof ages[number];
  const [age, setAge] = useState<Age>(70);

  const data: Record<Age, {
    img: { current: string; optimized: string };
    current: { savings: string; healthy: string; bodyAge: string };
    optimized: { savings: string; healthy: string; bodyAge: string };
  }> = {
    70: {
      img: { current: current70, optimized: optimized70 },
      current: { savings: "$890K", healthy: "4 yrs", bodyAge: "74.2" },
      optimized: { savings: "$2.14M", healthy: "12 yrs", bodyAge: "65.8" },
    },
    80: {
      img: { current: current90, optimized: optimized90 },
      current: { savings: "$240K", healthy: "0 yrs", bodyAge: "86.4" },
      optimized: { savings: "$1.82M", healthy: "8 yrs", bodyAge: "73.1" },
    },
    90: {
      img: { current: current90, optimized: optimized90 },
      current: { savings: "Depleted", healthy: "—", bodyAge: "98.2" },
      optimized: { savings: "$820K", healthy: "3 yrs", bodyAge: "82.4" },
    },
  };

  const cur = data[age];

  return (
    <section className="py-32 bg-card/40 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">See your future self</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">Two paths. Your choice.</h2>
          <p className="text-muted-foreground mt-4">
            What you do today decides who shows up at 70, 80, 90.
          </p>
        </div>

        <div className="flex justify-center mb-10 gap-2">
          {ages.map((a) => (
            <button
              key={a}
              onClick={() => setAge(a)}
              className={`px-5 py-2 rounded-full text-sm font-mono transition ${
                age === a ? "bg-foreground text-background" : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              At {a}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {([
            { src: cur.img.current, label: "Current path", tag: "Without changes", stats: cur.current, accent: "coral" as const },
            { src: cur.img.optimized, label: "With LONGEVA", tag: "Optimized", stats: cur.optimized, accent: "teal" as const },
          ] as const).map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden bg-card border border-border"
            >
              <div className="relative">
                <img
                  src={p.src}
                  alt={`${p.label} at ${age}`}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className={`text-[10px] font-mono uppercase tracking-wider ${p.accent === "teal" ? "text-teal" : "text-coral"} mb-1`}>{p.tag}</p>
                  <p className="font-display text-2xl">{p.label}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-border">
                {[
                  { k: "Savings", v: p.stats.savings },
                  { k: "Healthy yrs left", v: p.stats.healthy },
                  { k: "Body age", v: p.stats.bodyAge },
                ].map((s) => (
                  <div key={s.k} className="bg-card p-4 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.k}</p>
                    <p className={`font-display text-xl tabular-nums mt-1 ${p.accent === "teal" ? "text-teal" : "text-coral"}`}>{s.v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactBand() {
  const stats = [
    { value: 7, prefix: "+", suffix: " yrs", label: "Healthy years added" },
    { value: 420, prefix: "+$", suffix: "K", label: "Retirement, by 67" },
    { value: 22, prefix: "-", suffix: "%", label: "Impulse spending" },
    { value: 50, suffix: "M+", label: "Healthy life-years at scale" },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3 text-center">LONGEVA impact</p>
        <h2 className="font-display text-4xl sm:text-5xl text-center mb-14 text-balance">Outcomes, not promises.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl border border-border bg-card"
            >
              <p className="font-display text-6xl tabular-nums text-lime">
                {s.prefix}<Counter to={s.value} />{s.suffix}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explainability() {
  return (
    <section className="py-32 bg-card/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Explainable AI</p>
          <h2 className="font-display text-5xl sm:text-6xl mb-5 text-balance">
            Every number explains itself.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            No black-box recommendations. Tap "Why this?" on any forecast or action and see the
            top signals, their weight, the confidence level, and the model version that produced it.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Confidence bands on every forecast",
              "What changed? log on every score move",
              "Per-model fairness audits in your settings",
              "Challenge any output to retrain on your context",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-lime mt-0.5 shrink-0" /> {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <p className="text-xs font-mono uppercase tracking-wider text-lime mb-2">Explainability</p>
          <h3 className="font-display text-2xl mb-4">Why we said this</h3>
          <p className="text-sm leading-relaxed mb-5">
            We recommended a morning walk because your glucose variability has been trending high
            (84th percentile this week) and walking before breakfast has been shown to reduce it
            by 25% in similar users.
          </p>
          <div className="space-y-3 mb-5">
            {[
              { name: "Glucose variability (CGM)", w: 42 },
              { name: "Sedentary hours", w: 27 },
              { name: "Calendar gap 10:30–11:00", w: 18 },
              { name: "Past completion rate", w: 13 },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className="font-mono text-muted-foreground">{s.w}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-lime" style={{ width: `${s.w}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-sm">
            <div><p className="text-xs text-muted-foreground">Confidence</p><p className="font-mono text-lg">81%</p></div>
            <div><p className="text-xs text-muted-foreground">Model</p><p className="font-mono text-lg">Kairos v4.1</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Body Age Scan
 * ──────────────────────────────────────────────────────────── */
function BodyAgeScan() {
  return (
    <section id="scan" className="py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Behavioral Risk Signal · 60 sec</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
            Biometrics that <em className="text-lime not-italic">price</em> your future.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-5">
            A 60-second on-device scan reads 38 facial biomarkers to estimate biological age. The signal feeds the
            Forecast Engine — sharper longevity-adjusted retirement planning, lower projected healthcare liabilities,
            tighter confidence bands on your net-worth curve.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { k: "Biological age", v: "31.4", accent: true },
              { k: "Healthcare cost Δ", v: "−18%" },
              { k: "Earning years +", v: "+4.2" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.k}</p>
                <p className={`font-display text-3xl tabular-nums mt-1 ${m.accent ? "text-lime" : ""}`}>{m.v}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 space-y-2.5 text-sm">
            {[
              "On-device CoreML / TFLite, photo never uploaded",
              "Re-scan monthly to watch your age trend reverse",
              "Powers your LifeScore + personalized routines",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <ScanFace className="h-4 w-4 text-lime mt-0.5 shrink-0" />{it}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <div className="relative rounded-[2rem] overflow-hidden border border-border bg-card shadow-card">
            <img
              src="https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=1400&q=85&auto=format&fit=crop"
              alt="Body age facial scan in progress"
              loading="lazy"
              className="w-full aspect-[5/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-[11px] font-mono text-foreground border border-border">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime mr-1.5 animate-pulse" />
                On-device · BioClock v3.2
              </span>
              <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-[11px] font-mono text-muted-foreground border border-border">
                38 / 38 biomarkers
              </span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-background/95 backdrop-blur p-4 border border-border shadow-card min-w-[180px]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Body age</p>
              <p className="font-display text-4xl text-lime tabular-nums">31.4</p>
              <p className="text-[10px] text-muted-foreground">−2.6 yrs vs chronological</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Wearables
 * ──────────────────────────────────────────────────────────── */
function WearablesModule() {
  const devices = [
    { name: "Apple Watch", metric: "HRV · 62 ms", img: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=900&q=85&auto=format&fit=crop" },
    { name: "Oura Ring", metric: "Sleep · 87", img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=85&auto=format&fit=crop" },
    { name: "Whoop 4.0", metric: "Recovery · 74%", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85&auto=format&fit=crop" },
    { name: "Dexcom CGM", metric: "Glucose · 94 mg/dL", img: "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=900&q=85&auto=format&fit=crop" },
  ];
  return (
    <section id="wearables" className="py-28 bg-card/40 border-y border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Wearables · always on</p>
            <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
              Your body, in one stream.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              We unify HRV, sleep, glucose, VO₂ max and recovery from every major device, then translate
              the noise into one number you actually act on.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Apple Health", "Google Fit", "Oura", "Whoop", "Garmin", "Fitbit", "Withings", "Dexcom"].map((b) => (
              <span key={b} className="px-3 py-1.5 text-xs rounded-full border border-border bg-background font-mono">
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-3xl overflow-hidden bg-background border border-border group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{d.metric}</p>
                </div>
                <Watch className="h-4 w-4 text-lime" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Aging Prediction
 * ──────────────────────────────────────────────────────────── */
function AgingPrediction() {
  const drivers = [
    { name: "Sleep consistency", weight: 28, dir: "+1.4 yrs", positive: true },
    { name: "VO₂ max trend", weight: 22, dir: "+1.1 yrs", positive: true },
    { name: "Ultra-processed food %", weight: 19, dir: "−0.8 yrs", positive: false },
    { name: "Social connection", weight: 16, dir: "+0.6 yrs", positive: true },
    { name: "Glucose variability", weight: 15, dir: "−0.5 yrs", positive: false },
  ];
  return (
    <section id="prediction" className="py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-[2rem] overflow-hidden border border-border bg-card shadow-card">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop"
              alt="Aging trajectory analytics dashboard"
              loading="lazy"
              className="w-full aspect-[5/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-mono uppercase tracking-wider text-lime">Aging drivers · live</p>
                <span className="text-[10px] font-mono text-muted-foreground">Kairos v4.1 · 84% conf.</span>
              </div>
              <div className="space-y-2.5">
                {drivers.map((d) => (
                  <div key={d.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{d.name}</span>
                      <span className={`font-mono ${d.positive ? "text-lime" : "text-destructive"}`}>{d.dir}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={d.positive ? "h-full bg-lime" : "h-full bg-destructive/70"}
                        style={{ width: `${d.weight * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Aging Prediction Engine</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
            Today's habits. <em className="text-lime not-italic">Tomorrow's age.</em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-5">
            We continuously analyze your last 90 days of behavior, sleep, movement, food, stress, social -
            and project your biological age curve to 90. Every driver shown. Every weight explainable.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Stat icon={LineChart} label="Drivers tracked" value="120+" />
            <Stat icon={Sparkles} label="Re-forecast" value="Daily" />
            <Stat icon={Target} label="Confidence" value="80%+" />
            <Stat icon={Brain} label="Models" value="4 ensembled" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-lime mb-2" />
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-2xl mt-0.5">{value}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Wallet Integrations
 * ──────────────────────────────────────────────────────────── */
function WalletIntegrations() {
  return (
    <section id="wallet" className="py-28 bg-card/40 border-y border-border overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Wallets · Cards · Banks</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
            One swipe. Every consequence visible.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            Connect Apple Pay, Google Pay, your debit cards and bank accounts. Every purchase scored
            in real time across health, wealth, mind and the planet, with guardrails before you tap.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden border border-border bg-background p-8 sm:p-10">
            <p className="text-xs font-mono uppercase tracking-wider text-lime mb-2">The LONGEVA Card</p>
            <h3 className="font-display text-3xl mb-3">Your guardrails, in titanium.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Tap-to-pay anywhere. Earns LONGV when you spend on what extends your life. Three-tier
              guardrails block the worst before checkout.
            </p>
            <div className="relative aspect-[1.586] rounded-2xl bg-gradient-to-br from-foreground via-foreground to-foreground/80 dark:from-card dark:to-background p-6 shadow-glow-lime overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-radial-lime" />
              <div className="relative flex flex-col h-full justify-between text-background dark:text-foreground">
                <div className="flex items-start justify-between">
                  <span className="font-display text-xl tracking-tight">longeva</span>
                  <CreditCard className="h-5 w-5 opacity-60" />
                </div>
                <div>
                  <p className="font-mono text-sm tracking-[0.2em] opacity-90">•••• •••• •••• 8412</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] font-mono opacity-60">M. CHEN</span>
                    <span className="text-[10px] font-mono opacity-60">12 / 29</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-lime/40 blur-3xl" />
            </div>
          </div>

          <div className="lg:col-span-7 rounded-[2rem] overflow-hidden border border-border bg-background p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-lime">Live · last hour</p>
                <h3 className="font-display text-2xl mt-1">Every tap, scored.</h3>
              </div>
              <div className="flex gap-1.5">
                {["AP", "GP", "VS", "MC"].map((b) => (
                  <span key={b} className="h-7 w-7 grid place-items-center rounded-lg border border-border bg-card font-mono text-[10px]">{b}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { merchant: "Whole Foods Market", amount: "$84.20", impact: "good", note: "+1.2 healthspan hrs", method: "Apple Pay" },
                { merchant: "DoorDash · Late-night", amount: "$34.10", impact: "blocked", note: "Blocked · −2.1 hrs", method: "LONGEVA Card" },
                { merchant: "Equinox", amount: "$215.00", impact: "good", note: "+6.4 healthspan hrs · 80 LONGV", method: "Google Pay" },
                { merchant: "Total Wine · 3rd this wk", amount: "$58.00", impact: "nudged", note: "Reduced order by $22", method: "Visa ••8412" },
                { merchant: "Trader Joe's", amount: "$62.40", impact: "good", note: "+0.9 hrs · routed $5 → IRA", method: "Apple Pay" },
              ].map((t) => (
                <div key={t.merchant} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition">
                  <div className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 ${
                    t.impact === "good" ? "bg-lime/15 text-lime" :
                    t.impact === "blocked" ? "bg-destructive/15 text-destructive" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {t.impact === "good" ? <Check className="h-4 w-4" /> : t.impact === "blocked" ? <Shield className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.merchant}</p>
                    <p className="text-[11px] text-muted-foreground font-mono truncate">{t.method} · {t.note}</p>
                  </div>
                  <p className={`font-mono text-sm tabular-nums shrink-0 ${t.impact === "blocked" ? "line-through text-muted-foreground" : ""}`}>{t.amount}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono">Auto-routed today</span>
              <span className="font-mono text-lime">+$47 → IRA · +210 LONGV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Routines + Calendar
 * ──────────────────────────────────────────────────────────── */
function RoutinesCalendar() {
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const blocks = [
    { time: "06:30", title: "Zone-2 cardio", tag: "Health", color: "lime" },
    { time: "09:00", title: "Deep-work block", tag: "Mind", color: "muted" },
    { time: "12:30", title: "Protein-forward lunch", tag: "Health", color: "lime" },
    { time: "17:00", title: "Strength · push day", tag: "Health", color: "lime" },
    { time: "21:30", title: "Wind-down · breathwork", tag: "Mind", color: "muted" },
  ];
  return (
    <section id="routines" className="py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Routines + Calendar</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
            Your week, <em className="text-lime not-italic">built around</em> your forecast.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-5">
            Two-way sync with Google, Apple and Outlook calendars. We slot in movement, recovery,
            meals and reflection in the gaps you actually have, and adapt when meetings move.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Stat icon={CalendarDays} label="Calendars" value="3 synced" />
            <Stat icon={Repeat} label="Auto-adapt" value="Real-time" />
            <Stat icon={Apple} label="Meal plans" value="Per macro" />
            <Stat icon={Zap} label="Streak" value="12 days" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-card overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-lime">This week</p>
                <p className="font-display text-2xl">Metabolic Spring · day 34/90</p>
              </div>
              <div className="flex gap-1.5">
                {week.map((d, i) => (
                  <span
                    key={i}
                    className={`h-9 w-9 grid place-items-center rounded-xl text-xs font-mono ${
                      i === 2 ? "bg-lime text-lime-foreground font-semibold" : "bg-background border border-border text-muted-foreground"
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border" />
              <div className="space-y-2">
                {blocks.map((b) => (
                  <div key={b.time} className="flex items-stretch gap-4">
                    <span className="font-mono text-[11px] text-muted-foreground w-[44px] pt-3 text-right">{b.time}</span>
                    <span className={`relative h-3 w-3 rounded-full mt-3.5 shrink-0 ${b.color === "lime" ? "bg-lime ring-4 ring-lime/20" : "bg-foreground/40"}`} />
                    <div className="flex-1 rounded-xl border border-border bg-background p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{b.title}</p>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{b.tag}</p>
                      </div>
                      <button className="text-[10px] font-mono text-lime hover:underline">Why?</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-lime" />Google · Apple · Outlook</span>
              <span className="flex items-center gap-1.5"><Bell className="h-3.5 w-3.5 text-lime" />Smart reminders</span>
              <span className="flex items-center gap-1.5"><Repeat className="h-3.5 w-3.5 text-lime" />Adapts to meetings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Accountability
 * ──────────────────────────────────────────────────────────── */
function AccountabilityModule() {
  const goals = [
    { name: "Retirement at 60", current: 142, target: 1620, unit: "K" },
    { name: "Emergency fund", current: 18, target: 25, unit: "K" },
    { name: "Cap delivery $/wk", current: 64, target: 80, unit: "", inverse: true },
  ];
  return (
    <section id="accountability" className="py-28 bg-card/40 border-y border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Accountability</p>
            <h2 className="font-display text-5xl sm:text-6xl text-balance leading-[0.95]">
              Goals you'll <em className="text-lime not-italic">actually</em> hit.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-5">
              Every transaction logged against your financial and longevity goals. Weekly reviews
              from Kairos. Streaks, pacts, and gentle nudges before you drift.
            </p>
            <ul className="mt-8 space-y-2.5 text-sm">
              {[
                "Auto-categorized spending tied to each goal",
                "Pacts with friends, opt-in social accountability",
                "Weekly Sunday review with course-corrections",
                "LONGV rewards redeemable for IRA top-ups",
              ].map((it) => (
                <li key={it} className="flex items-start gap-2.5">
                  <Target className="h-4 w-4 text-lime mt-0.5 shrink-0" />{it}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid gap-4">
            <div className="rounded-3xl border border-border bg-background p-7">
              <div className="flex items-center justify-between mb-5">
                <p className="font-display text-xl">Active goals</p>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Updated 2 min ago</span>
              </div>
              <div className="space-y-5">
                {goals.map((g) => {
                  const pct = Math.min(100, (g.current / g.target) * 100);
                  return (
                    <div key={g.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{g.name}</span>
                        <span className="font-mono text-muted-foreground">
                          ${g.current}{g.unit} <span className="opacity-50">/ ${g.target}{g.unit}</span>
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${pct > 90 && g.inverse ? "bg-warning" : "bg-lime"}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-7">
              <div className="flex items-center justify-between mb-5">
                <p className="font-display text-xl">Consumption journal · today</p>
                <span className="px-2.5 py-1 rounded-full bg-lime/15 text-lime text-[10px] font-mono uppercase tracking-wider">on track</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { k: "Calories", v: "1,840", sub: "of 2,100" },
                  { k: "Protein", v: "128g", sub: "+18g vs goal" },
                  { k: "Steps", v: "9,420", sub: "of 10k" },
                  { k: "Spend", v: "$72", sub: "of $120/d" },
                ].map((m) => (
                  <div key={m.k} className="rounded-xl border border-border bg-card p-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.k}</p>
                    <p className="font-display text-2xl tabular-nums mt-0.5">{m.v}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      desc: "See your forecast and start the loop.",
      features: [
        "LifeScore + Body Age scan",
        "1 daily action",
        "Basic spending guardrails (nudge only)",
        "Read-only wallet & wearables sync",
      ],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Core",
      price: "$19",
      desc: "The full longevity loop.",
      features: [
        "Everything in Free",
        "AI Coach (Kairos) · unlimited",
        "All 3 guardrail tiers (nudge, delay, block)",
        "Auto-Save retirement routing",
        "Future Self projections to 90",
        "LONGV rewards on every healthy purchase",
      ],
      cta: "Choose Core",
      highlight: true,
    },
    {
      name: "Plus",
      price: "$39",
      desc: "Households + power users.",
      features: [
        "Everything in Core",
        "Household sharing (up to 4)",
        "LONGEVA Card · titanium, 1.5% LONGV back",
        "Premium merchant graph (curated longevity)",
        "Priority human longevity coach review",
        "Insurance & retirement credit redemptions",
      ],
      cta: "Choose Plus",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Pricing</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">Aligned with your outcomes.</h2>
          <p className="text-muted-foreground mt-4">No ads. No data sales. Cancel any time.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-8 border ${
                t.highlight
                  ? "border-lime bg-card shadow-glow-lime"
                  : "border-border bg-card"
              }`}
            >
              {t.highlight && (
                <p className="text-[10px] font-mono uppercase tracking-wider text-lime mb-4">Most popular</p>
              )}
              <p className="font-display text-3xl mb-1">{t.name}</p>
              <p className="text-sm text-muted-foreground mb-5">{t.desc}</p>
              <p className="font-display text-5xl mb-6">{t.price}<span className="text-base font-sans text-muted-foreground"> / mo</span></p>
              <ul className="space-y-2.5 text-sm mb-7">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-lime mt-0.5 shrink-0" />{f}</li>
                ))}
              </ul>
              <Button variant={t.highlight ? "lime" : "outline"} className="w-full" asChild>
                <Link to="/signup">{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Revenue model transparency */}
        <div className="mt-14 rounded-3xl border border-border bg-card p-7 sm:p-9">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-md">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime mb-2">How we make money</p>
              <h3 className="font-display text-2xl mb-2">Incentives aligned with your healthspan.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We earn only when you live longer and better. Four streams, all opt-in, all visible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 flex-1 max-w-xl">
              {[
                { icon: Sparkles, t: "Subscriptions", d: "Core & Plus monthly plans" },
                { icon: CreditCard, t: "Card interchange", d: "LONGEVA Card swipe fees" },
                { icon: Apple, t: "Opt-in merchant cashback", d: "Curated longevity brands only" },
                { icon: Shield, t: "B2B2C contracts", d: "Insurers & employers, never your data" },
              ].map((r) => (
                <div key={r.t} className="rounded-xl border border-border bg-background p-4 flex items-start gap-3">
                  <span className="h-8 w-8 rounded-lg bg-lime/15 grid place-items-center shrink-0">
                    <r.icon className="h-4 w-4 text-lime" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{r.t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How is my data used?", a: "Your data trains models for YOU only, never sold, never used for advertising. Federated learning improves the system without exposing your raw data. You can export or delete everything in one click." },
    { q: "What if the AI is wrong?", a: "Every recommendation has a 'This doesn't fit me' button that retrains the model on your context. We publish accuracy and fairness audits per model in your AI Transparency settings." },
    { q: "Can I export everything?", a: "Yes. One-tap GDPR-grade export of every transaction, signal, and AI rationale. You own your data." },
    { q: "How do you make money?", a: "Subscriptions, card interchange, opt-in merchant cashback, and B2B2C contracts with insurers + employers. Never ads. Never data sales." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 bg-card/40 border-y border-border scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3 text-center">FAQ</p>
        <h2 className="font-display text-5xl text-center mb-12 text-balance">Things people ask first.</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="rounded-2xl border border-border bg-background overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-medium">{it.q}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="mb-4"><Logo size="md" /></div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Live your longest life, one decision at a time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Product</p>
            <ul className="space-y-2">
              <li><a href="#how" className="hover:text-lime">How it works</a></li>
              <li><a href="#pricing" className="hover:text-lime">Pricing</a></li>
              <li><Link to="/signup" className="hover:text-lime">Get started</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Trust</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Shield className="inline h-3.5 w-3.5 mr-1.5" />SOC 2 Type II</li>
              <li><Lock className="inline h-3.5 w-3.5 mr-1.5" />HIPAA-aligned</li>
              <li><Eye className="inline h-3.5 w-3.5 mr-1.5" />GDPR + CCPA</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-muted-foreground md:text-right">
          © {new Date().getFullYear()} LONGEVA. No ads. No data sold.
        </p>
      </div>
    </footer>
  );
}
