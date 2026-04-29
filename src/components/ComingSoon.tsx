import { Construction } from "lucide-react";

export function ComingSoon({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="max-w-3xl mx-auto py-16">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-3">Coming next iteration</p>
      <h1 className="font-display text-5xl mb-4 text-balance">{title}</h1>
      <p className="text-muted-foreground text-lg mb-10 text-pretty">{intro}</p>
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <Construction className="h-8 w-8 text-lime mx-auto mb-4" />
        <p className="font-display text-2xl mb-2">Building this section.</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Forecast, AI Coach, and Spending Impact are live. The next iteration adds guardrails,
          quests, retirement, vault sovereignty, and admin.
        </p>
      </div>
    </div>
  );
}
