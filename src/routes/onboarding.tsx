import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart, Wallet, Sparkles, Users, Compass, ArrowRight, ArrowLeft, Camera,
  Shield, Check, Loader2,
} from "lucide-react";
import { LifeScoreOrb } from "@/components/LifeScoreOrb";
import { Counter } from "@/components/Counter";
import { WhyThis } from "@/components/WhyThis";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PROVIDERS } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const TOTAL = 6;

interface FormData {
  life_goal: string;
  primary_motivation: string;
  full_name: string;
  date_of_birth: string;
  biological_sex: string;
  height_cm: string;
  weight_kg: string;
  city: string;
  household_income_band: string;
  banks: string[];
  wearables: string[];
  facial_scan_completed: boolean;
}

function Onboarding() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    life_goal: "",
    primary_motivation: "",
    full_name: "",
    date_of_birth: "",
    biological_sex: "",
    height_cm: "",
    weight_kg: "",
    city: "",
    household_income_band: "",
    banks: [],
    wearables: [],
    facial_scan_completed: false,
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/signup" });
  }, [user, loading, navigate]);

  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const finalize = async () => {
    if (!user) return;
    const lifeScore = 612;
    await supabase.from("profiles").update({
      full_name: data.full_name || null,
      date_of_birth: data.date_of_birth || null,
      biological_sex: data.biological_sex || null,
      height_cm: data.height_cm ? Number(data.height_cm) : null,
      weight_kg: data.weight_kg ? Number(data.weight_kg) : null,
      city: data.city || null,
      household_income_band: data.household_income_band || null,
      life_goal: data.life_goal || null,
      primary_motivation: data.primary_motivation || null,
    }).eq("id", user.id);
    await supabase.from("onboarding_state").update({
      current_step: TOTAL,
      completed: true,
      facial_scan_completed: data.facial_scan_completed,
      body_age: 31.4,
      life_score: lifeScore,
      life_score_low: 588,
      life_score_high: 638,
      projected_lifespan: 87.2,
      projected_healthspan: 71.5,
      retirement_gap: -428000,
      completed_at: new Date().toISOString(),
    }).eq("user_id", user.id);
    const inserts = [
      ...data.banks.map((p) => ({ user_id: user.id, category: "bank", provider: p })),
      ...data.wearables.map((p) => ({ user_id: user.id, category: "wearable", provider: p })),
    ];
    if (inserts.length) await supabase.from("connections").insert(inserts);
    toast.success("Welcome to LONGEVA.");
    navigate({ to: "/app" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 inset-x-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Logo size="sm" />
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-lime"
              animate={{ width: `${(step / TOTAL) * 100}%` }}
              transition={{ type: "spring", damping: 20 }}
            />
          </div>
          <p className="text-xs font-mono text-muted-foreground tabular-nums">{step}/{TOTAL}</p>
        </div>
      </div>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {step === 1 && <StepNorthStar data={data} setData={setData} />}
              {step === 2 && <StepBasics data={data} setData={setData} />}
              {step === 3 && <StepConnect data={data} setData={setData} category="banks" />}
              {step === 4 && <StepConnect data={data} setData={setData} category="wearables" />}
              {step === 5 && <StepBodyScan data={data} setData={setData} />}
              {step === 6 && <StepReveal data={data} onFinish={finalize} />}
            </motion.div>
          </AnimatePresence>

          {step < TOTAL && (
            <div className="flex justify-between mt-12">
              <Button variant="ghost" onClick={back} disabled={step === 1}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button variant="lime" size="lg" onClick={next}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface StepProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

function StepHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">{kicker}</p>
      <h2 className="font-display text-4xl sm:text-5xl mb-4 text-balance">{title}</h2>
      <p className="text-muted-foreground text-pretty">{intro}</p>
    </div>
  );
}

function StepNorthStar({ data, setData }: StepProps) {
  const motivations = [
    { id: "healthspan", label: "Healthspan", icon: Heart },
    { id: "wealthspan", label: "Wealthspan", icon: Wallet },
    { id: "family", label: "Family", icon: Users },
    { id: "freedom", label: "Freedom", icon: Compass },
    { id: "impact", label: "Impact", icon: Sparkles },
  ];
  return (
    <div>
      <StepHeader
        kicker="Step 1 · Your North Star"
        title="What are you building toward?"
        intro="We tie every recommendation back to this. Be specific — we'll do the rest."
      />
      <div className="space-y-6">
        <div>
          <Label className="mb-2 block">Your goal</Label>
          <Textarea
            value={data.life_goal}
            onChange={(e) => setData({ ...data, life_goal: e.target.value })}
            placeholder="Retire at 60 with $2.5M, hiking every weekend with my grandkids."
            rows={4}
            className="resize-none"
          />
        </div>
        <div>
          <Label className="mb-3 block">Primary motivation</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {motivations.map((m) => (
              <button
                key={m.id}
                onClick={() => setData({ ...data, primary_motivation: m.id })}
                className={`p-4 rounded-2xl border text-center transition ${
                  data.primary_motivation === m.id
                    ? "border-lime bg-lime/10"
                    : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                <m.icon className={`h-5 w-5 mx-auto mb-2 ${data.primary_motivation === m.id ? "text-lime" : ""}`} />
                <p className="text-xs">{m.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBasics({ data, setData }: StepProps) {
  return (
    <div>
      <StepHeader
        kicker="Step 2 · Basics"
        title="A few facts to personalize."
        intro="We use this to calibrate every forecast to your body and household."
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full name</Label>
          <Input value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label>Date of birth</Label>
          <Input type="date" value={data.date_of_birth} onChange={(e) => setData({ ...data, date_of_birth: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label>Biological sex</Label>
          <select
            value={data.biological_sex}
            onChange={(e) => setData({ ...data, biological_sex: e.target.value })}
            className="w-full h-12 rounded-xl bg-card border border-border px-3 text-sm"
          >
            <option value="">Select…</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="intersex">Intersex</option>
            <option value="prefer">Prefer not to say</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} placeholder="San Francisco" className="h-12" />
        </div>
        <div className="space-y-2">
          <Label>Height (cm)</Label>
          <Input type="number" value={data.height_cm} onChange={(e) => setData({ ...data, height_cm: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input type="number" value={data.weight_kg} onChange={(e) => setData({ ...data, weight_kg: e.target.value })} className="h-12" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Household income band</Label>
          <select
            value={data.household_income_band}
            onChange={(e) => setData({ ...data, household_income_band: e.target.value })}
            className="w-full h-12 rounded-xl bg-card border border-border px-3 text-sm"
          >
            <option value="">Select…</option>
            <option value="<50k">Under $50K</option>
            <option value="50-100k">$50–100K</option>
            <option value="100-200k">$100–200K</option>
            <option value="200-500k">$200–500K</option>
            <option value="500k+">$500K+</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StepConnect({ data, setData, category }: StepProps & { category: "banks" | "wearables" }) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const list = category === "banks" ? PROVIDERS.banks : PROVIDERS.wearables;
  const meta = category === "banks"
    ? {
        kicker: "Step 3 · Connect your money",
        title: "Read-only. Encrypted. Revocable.",
        intro: "We never move your money. We read transactions to understand your habits — that's it.",
      }
    : {
        kicker: "Step 4 · Connect your body",
        title: "All optional. All toggleable.",
        intro: "Pair financial data with health signals to see your full trajectory. Pick what you have.",
      };
  const selected = data[category];

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setData({ ...data, [category]: selected.filter((x) => x !== id) });
      return;
    }
    setConnecting(id);
    setTimeout(() => {
      setData({ ...data, [category]: [...selected, id] });
      setConnecting(null);
    }, 1100);
  };

  return (
    <div>
      <StepHeader kicker={meta.kicker} title={meta.title} intro={meta.intro} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {list.map((p) => {
          const active = selected.includes(p.id);
          const isConn = connecting === p.id;
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              disabled={isConn}
              className={`relative p-5 rounded-2xl border text-left transition ${
                active ? "border-lime bg-lime/10" : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isConn ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" /> Connecting…
                  </span>
                ) : active ? (
                  <span className="flex items-center gap-1.5 text-lime">
                    <Check className="h-3 w-3" /> Connected
                  </span>
                ) : (
                  "Tap to connect"
                )}
              </p>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Shield className="h-3 w-3" /> Your data never leaves your vault. Cancel any connection in settings.
      </p>
    </div>
  );
}

function StepBodyScan({ data, setData }: StepProps) {
  const [scanning, setScanning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setRevealed(true);
      setData({ ...data, facial_scan_completed: true });
    }, 2200);
  };

  return (
    <div>
      <StepHeader
        kicker="Step 5 · Body Age scan"
        title="One photo. 40+ biomarkers. On-device only."
        intro="Processed on your device via Apple Neural Engine / Qualcomm AI Hub. Never uploaded. Never stored on our servers."
      />
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <div className="mx-auto h-48 w-48 rounded-full border-2 border-dashed border-border grid place-items-center mb-6 overflow-hidden relative">
          {scanning && <div className="absolute inset-0 animate-shimmer" />}
          <Camera className="h-10 w-10 text-muted-foreground" />
        </div>
        {!revealed && (
          <>
            <Button variant="lime" size="lg" onClick={runScan} disabled={scanning}>
              {scanning ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</> : "Run on-device scan (demo)"}
            </Button>
            <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
              <Shield className="h-3 w-3" /> Privacy: on-device processing. No upload.
            </p>
          </>
        )}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your body age</p>
            <p className="font-display text-7xl tabular-nums text-lime"><Counter to={31.4} decimals={1} /></p>
            <p className="text-sm text-muted-foreground mt-2">2.6 years younger than your real age</p>
            <div className="mt-4 flex justify-center">
              <WhyThis
                data={{
                  summary: "Your body age was estimated from skin elasticity, periorbital signals, jawline definition, and skin texture variance. These features map to a metabolic health score validated on 1.2M faces.",
                  signals: [
                    { name: "Skin elasticity", weight: 0.34 },
                    { name: "Periorbital signals", weight: 0.27 },
                    { name: "Skin texture variance", weight: 0.22 },
                    { name: "Jawline definition", weight: 0.17 },
                  ],
                  confidence: 0.79,
                  modelVersion: "BioClock v3.2",
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StepReveal({ data: _data, onFinish }: { data: FormData; onFinish: () => void }) {
  return (
    <div className="text-center">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Step 6 · Your first forecast</p>
      <h2 className="font-display text-5xl mb-3">Here's where you're headed.</h2>
      <p className="text-muted-foreground mb-10">Every number includes a confidence band. Tap "Why this?" to see the signals behind it.</p>

      <div className="flex justify-center mb-10">
        <LifeScoreOrb value={612} low={588} high={638} size={300} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8 text-left">
        {[
          { label: "Projected lifespan", value: "87.2 yrs", sub: "82–91 · 80% conf." },
          { label: "Healthy years", value: "71.5 yrs", sub: "Gap of 15.7 sick years" },
          { label: "Retirement gap at 67", value: "-$428K", sub: "Closeable in 4 years" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
            <p className="font-display text-3xl">{s.value}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <WhyThis
          label="Why these numbers?"
          data={{
            summary: "Your forecast blends survival-analysis priors for your age/sex/region with your body age and ten high-signal behaviors. The retirement gap is calculated from current spending velocity and projected returns.",
            signals: [
              { name: "Body age vs real age", weight: 0.32 },
              { name: "Sleep + activity baseline", weight: 0.24 },
              { name: "Income & savings rate", weight: 0.22 },
              { name: "Discretionary spending pattern", weight: 0.14 },
              { name: "Region cohort priors", weight: 0.08 },
            ],
            confidence: 0.81,
            modelVersion: "LifeScore v5.0",
          }}
        />
      </div>

      <Button variant="lime" size="xl" onClick={onFinish}>
        Start my first 90-day season <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
