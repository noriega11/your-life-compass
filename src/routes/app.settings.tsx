import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, CreditCard, Plug, Shield, Cpu, Bell, ChevronRight, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AI_MODELS, PROVIDERS, MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/app/settings")({ component: Settings });

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Subscription", icon: CreditCard },
  { id: "connections", label: "Connections", icon: Plug },
  { id: "consent", label: "Consent", icon: Shield },
  { id: "ai", label: "AI Transparency", icon: Cpu },
  { id: "notifs", label: "Notifications", icon: Bell },
] as const;

type TabId = typeof TABS[number]["id"];

function Settings() {
  const [tab, setTab] = useState<TabId>("profile");

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Settings</p>
        <h1 className="font-display text-5xl text-balance">Tune everything. Trust nothing by default.</h1>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 lg:mx-0 lg:px-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {tab === "profile" && <ProfilePanel />}
          {tab === "billing" && <BillingPanel />}
          {tab === "connections" && <ConnectionsPanel />}
          {tab === "consent" && <ConsentPanel />}
          {tab === "ai" && <AIPanel />}
          {tab === "notifs" && <NotifsPanel />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 mb-5">
      <h2 className="font-display text-xl mb-1">{title}</h2>
      {sub && <p className="text-sm text-muted-foreground mb-5">{sub}</p>}
      {children}
    </section>
  );
}

function ProfilePanel() {
  return (
    <Section title="Personal details" sub="Used by Kairos to personalize prescriptions.">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>First name</Label><Input defaultValue={MOCK_USER.firstName} className="mt-1.5" /></div>
        <div><Label>Email</Label><Input defaultValue="[email protected]" className="mt-1.5" /></div>
        <div><Label>Date of birth</Label><Input type="date" defaultValue="1991-03-12" className="mt-1.5" /></div>
        <div><Label>Biological sex</Label><Input defaultValue="Female" className="mt-1.5" /></div>
        <div><Label>Height (cm)</Label><Input type="number" defaultValue={168} className="mt-1.5" /></div>
        <div><Label>Weight (kg)</Label><Input type="number" defaultValue={62} className="mt-1.5" /></div>
      </div>
      <div className="mt-6 flex justify-end"><Button variant="lime">Save changes</Button></div>
    </Section>
  );
}

function BillingPanel() {
  return (
    <>
      <Section title="Current plan">
        <div className="flex items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-gold/10 to-teal/10 border border-gold/30">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-gold mb-1">Pro · annual</p>
            <p className="font-display text-2xl">$24/mo · billed yearly</p>
            <p className="text-xs text-muted-foreground mt-1">Renews Mar 12, 2027</p>
          </div>
          <Button variant="outline">Manage</Button>
        </div>
      </Section>
      <Section title="Payment method">
        <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
          <div className="h-9 w-12 rounded-md bg-foreground text-background grid place-items-center text-[10px] font-mono">VISA</div>
          <div className="flex-1"><p className="text-sm">•••• •••• •••• 4280</p><p className="text-xs text-muted-foreground">Expires 09/28</p></div>
          <Button variant="ghost" size="sm">Update</Button>
        </div>
      </Section>
    </>
  );
}

function ConnectionsPanel() {
  const groups = [
    { title: "Banking", items: PROVIDERS.banks, connected: ["plaid", "chase"] },
    { title: "Investments", items: PROVIDERS.investments, connected: ["fidelity"] },
    { title: "Wearables & health", items: PROVIDERS.wearables, connected: ["apple", "oura", "whoop"] },
  ];
  return (
    <>
      {groups.map((g) => (
        <Section key={g.title} title={g.title}>
          <div className="grid sm:grid-cols-2 gap-2">
            {g.items.map((p) => {
              const on = g.connected.includes(p.id);
              return (
                <div key={p.id} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border">
                  <span className="text-sm">{p.name}</span>
                  {on ? (
                    <span className="flex items-center gap-1 text-xs font-mono text-teal"><Check className="h-3 w-3" /> Connected</span>
                  ) : (
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Connect</Button>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      ))}
    </>
  );
}

function ConsentPanel() {
  const consents = [
    { id: "personalization", label: "Personalize recommendations", sub: "Use your data to tailor daily prescriptions.", on: true },
    { id: "research", label: "Anonymized research", sub: "Contribute to longevity studies. Earn cash + LONGV.", on: true },
    { id: "marketing", label: "Product updates by email", sub: "Major releases only. No spam.", on: false },
    { id: "share", label: "Share with healthcare provider", sub: "Off until you explicitly link a clinician.", on: false },
  ];
  const [vals, setVals] = useState(Object.fromEntries(consents.map((c) => [c.id, c.on])));
  return (
    <Section title="Consent" sub="Granular toggles. We never enable anything by default.">
      <div className="space-y-2">
        {consents.map((c) => (
          <motion.div key={c.id} whileHover={{ y: -1 }} className="flex items-center gap-4 p-4 rounded-xl border border-border">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
            <Switch checked={vals[c.id]} onCheckedChange={(v) => setVals((s) => ({ ...s, [c.id]: v }))} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function AIPanel() {
  const [optouts, setOptouts] = useState<Record<string, boolean>>({});
  return (
    <Section title="AI Transparency" sub="Every model that touches your data, with accuracy and fairness audits.">
      <div className="space-y-3">
        {AI_MODELS.map((m) => (
          <motion.div key={m.id} whileHover={{ y: -2 }} className="rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display text-lg">{m.name}</p>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded bg-muted">{m.version}</span>
                </div>
                <p className="text-sm text-muted-foreground">{m.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">{optouts[m.id] ? "Opted out" : "Active"}</span>
                <Switch
                  checked={!optouts[m.id]}
                  onCheckedChange={(v) => setOptouts((s) => ({ ...s, [m.id]: !v }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-background border border-border p-3">
                <p className="text-muted-foreground mb-1">Accuracy</p>
                <p className="font-mono text-teal">{(m.accuracy * 100).toFixed(0)}%</p>
              </div>
              <div className="rounded-lg bg-background border border-border p-3">
                <p className="text-muted-foreground mb-1">Fairness audit</p>
                <p className="font-mono text-gold">{(m.fairness * 100).toFixed(0)}%</p>
              </div>
              <div className="rounded-lg bg-background border border-border p-3">
                <p className="text-muted-foreground mb-1">Updated</p>
                <p className="font-mono">{m.lastUpdated}</p>
              </div>
            </div>
            <button className="mt-3 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Read model card <ExternalLink className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function NotifsPanel() {
  const items = [
    { id: "daily", label: "Daily prescription (8am)", on: true },
    { id: "guardrail", label: "Guardrail interventions", on: true },
    { id: "quest", label: "Quest milestones", on: true },
    { id: "weekly", label: "Weekly LifeScore digest", on: true },
    { id: "friend", label: "Friend pact updates", on: false },
  ];
  const [vals, setVals] = useState(Object.fromEntries(items.map((i) => [i.id, i.on])));
  return (
    <Section title="Notifications" sub="We default to fewer pings, not more.">
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
            <p className="flex-1 text-sm">{i.label}</p>
            <Switch checked={vals[i.id]} onCheckedChange={(v) => setVals((s) => ({ ...s, [i.id]: v }))} />
          </div>
        ))}
      </div>
    </Section>
  );
}
