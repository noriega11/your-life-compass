import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Heart, Wallet, Brain, Shield, Activity, Sparkles, Check,
  Lock, Eye, Database, Smartphone, ChevronDown, TrendingDown, AlertCircle,
  CreditCard, Watch, ScanFace, CalendarDays, Target, Zap, Apple, Bell, Repeat, LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LifeScoreOrb } from "@/components/LifeScoreOrb";
import { Counter } from "@/components/Counter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import optimized70 from "@/assets/future-self-optimized-70.jpg";
import current70 from "@/assets/future-self-current-70.jpg";
import optimized90 from "@/assets/future-self-optimized-90.jpg";
import current90 from "@/assets/future-self-current-90.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "LONGEVA — Live your longest life" },
      {
        name: "description",
        content:
          "Your life forecast in 12 minutes. See how long you'll live, how healthy you'll stay, and whether you'll have enough to retire — then improve all three.",
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
      <BodyAgeScan />
      <WearablesModule />
      <AgingPrediction />
      <WalletIntegrations />
      <RoutinesCalendar />
      <AccountabilityModule />
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
  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button variant="lime" size="sm" asChild>
            <Link to="/signup">See your forecast</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center grain overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur text-xs text-muted-foreground mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            Your forecast in 12 minutes · No data sold
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-balance"
          >
            Live your <em className="text-lime not-italic">longest</em> life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty"
          >
            LONGEVA shows you how long you'll live, how healthy you'll stay, and whether you'll
            have enough to retire — then helps you improve all three, one small decision at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button variant="lime" size="xl" asChild>
              <Link to="/signup">See your forecast <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#how">How it works</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> End-to-end encrypted</span>
            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> No ads, ever</span>
            <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> You own your data</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:col-span-5 flex justify-center"
        >
          <LifeScoreOrb value={782} low={758} high={806} size={340} />
        </motion.div>
      </div>
    </section>
  );
}

function PreviewBand() {
  const items = [
    { label: "Projected lifespan", value: "87.2", suffix: " yrs", sub: "82–91 · 80% conf." },
    { label: "Healthy years", value: "71.5", suffix: " yrs", sub: "+3–7 with LONGEVA" },
    { label: "Retirement gap at 67", prefix: "-$", value: 428, suffix: "K", sub: "closeable in 4 yrs" },
  ];
  return (
    <section className="py-24 border-y border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime text-center mb-3">
          What you'll know in 12 minutes
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-center mb-14 text-balance">
          Three numbers that change how you live.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {items.map((it) => (
            <div key={it.label} className="bg-background p-10 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{it.label}</p>
              <p className="font-display text-6xl tabular-nums">
                {it.prefix}
                <Counter to={Number(it.value)} />
                {it.suffix}
              </p>
              <p className="text-xs text-muted-foreground mt-3 font-mono">{it.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreeCrises() {
  const crises = [
    {
      icon: Activity,
      stat: "16 yrs",
      title: "The Healthspan Gap",
      body: "Average Americans live 16 years sick at the end. We extend healthy years, not just total years.",
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
    },
    {
      icon: TrendingDown,
      stat: "57%",
      title: "The Pension Collapse",
      body: "57% of households will not have enough to retire. We auto-route savings on autopilot.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    },
    {
      icon: AlertCircle,
      stat: "$1.6T",
      title: "The Behavioral Gap",
      body: "$1.6T spent on impulse decisions every year. Guardrails block the worst before they happen.",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    },
  ];
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Why now</p>
          <h2 className="font-display text-5xl sm:text-6xl leading-tight text-balance">
            The three crises of 2030.
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
    { n: "01", icon: Database, title: "Connect", body: "Link your bank, wearable, and snap a photo. Read-only, encrypted, revocable." },
    { n: "02", icon: Activity, title: "Forecast", body: "See your lifespan, healthspan, and retirement gap with confidence bands." },
    { n: "03", icon: Sparkles, title: "Act", body: "Three personalized actions per day. Each under 30 minutes. Each explained." },
    { n: "04", icon: TrendingDown, title: "Compound", body: "Every small decision compounds. Watch your forecast bend upward." },
  ];
  return (
    <section id="how" className="py-32 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">How LONGEVA works</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">
            Four steps. One unbroken loop.
          </h2>
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
            Money, body, and behavior — pulled together so we can show you the real trajectory.
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
  const [age, setAge] = useState<70 | 90>(70);
  const imgs = age === 70
    ? { current: current70, optimized: optimized70 }
    : { current: current90, optimized: optimized90 };
  return (
    <section className="py-32 bg-card/40 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">See your future self</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">Two paths. Your choice.</h2>
          <p className="text-muted-foreground mt-4">
            What you do today decides who shows up at 70, 80, 90.
          </p>
        </div>

        <div className="flex justify-center mb-10 gap-2">
          {[70, 90].map((a) => (
            <button
              key={a}
              onClick={() => setAge(a as 70 | 90)}
              className={`px-5 py-2 rounded-full text-sm font-mono transition ${
                age === a ? "bg-lime text-lime-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              At {a}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {([
            { src: imgs.current, label: "Current path", tag: "Without changes" },
            { src: imgs.optimized, label: "Optimized path", tag: "With LONGEVA" },
          ] as const).map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-card border border-border"
            >
              <img
                src={p.src}
                alt={`${p.label} at ${age}`}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-7">
                <p className="text-xs font-mono uppercase tracking-wider text-lime mb-1">{p.tag}</p>
                <p className="font-display text-3xl">{p.label}</p>
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

function Pricing() {
  const tiers = [
    { name: "Free", price: "$0", desc: "See your forecast and start.", features: ["LifeScore + Body Age", "Daily action", "Basic guardrails"], cta: "Start free", highlight: false },
    { name: "Core", price: "$19", desc: "The full longevity loop.", features: ["Everything in Free", "AI Coach (Kairos)", "All guardrails", "Auto-Save retirement", "Future Self"], cta: "Choose Core", highlight: true },
    { name: "Plus", price: "$39", desc: "For households + pros.", features: ["Everything in Core", "Household sharing (4)", "LONGEVA Card", "Premium merchant graph", "Priority human review"], cta: "Choose Plus", highlight: false },
  ];
  return (
    <section id="pricing" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Pricing</p>
          <h2 className="font-display text-5xl sm:text-6xl text-balance">Aligned with your outcomes.</h2>
          <p className="text-muted-foreground mt-4">Never ads. Never data sales. Cancel any time.</p>
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
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How is my data used?", a: "Your data trains models for YOU only — never sold, never used for advertising. Federated learning improves the system without exposing your raw data. You can export or delete everything in one click." },
    { q: "What if the AI is wrong?", a: "Every recommendation has a 'This doesn't fit me' button that retrains the model on your context. We publish accuracy and fairness audits per model in your AI Transparency settings." },
    { q: "Can I export everything?", a: "Yes. One-tap GDPR-grade export of every transaction, signal, and AI rationale. You own your data." },
    { q: "How do you make money?", a: "Subscriptions, card interchange, opt-in merchant cashback, and B2B2C contracts with insurers + employers. Never ads. Never data sales." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-32 bg-card/40 border-y border-border">
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
            Live your longest life — one decision at a time.
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
