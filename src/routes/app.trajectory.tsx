import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";

interface PlaceholderProps { title: string; intro: string; }

export function ComingSoon({ title, intro }: PlaceholderProps) {
  return (
    <div className="max-w-3xl mx-auto py-16">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Coming next iteration</p>
      <h1 className="font-display text-5xl mb-4 text-balance">{title}</h1>
      <p className="text-muted-foreground text-lg mb-10 text-pretty">{intro}</p>
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <Construction className="h-8 w-8 text-lime mx-auto mb-4" />
        <p className="font-display text-2xl mb-2">Building this section.</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The dashboard, onboarding, and landing are live. The next iteration adds full
          interactivity here — Recharts forecasts, the AI Coach split view, guardrail
          builder, quests, vault sovereignty controls, and admin.
        </p>
      </div>
    </div>
  );
}

// Routes
const make = (path: string, title: string, intro: string) =>
  createFileRoute(path as never)({ component: () => <ComingSoon title={title} intro={intro} /> });

export const Route = make(
  "/app/trajectory",
  "Your Life Forecast",
  "This is where you're headed — and where you could be. Two interactive trajectories with confidence shading and a 'What if I…' simulator.",
);
