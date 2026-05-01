import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Home, Activity, Receipt, Sparkles, PiggyBank, Shield, Trophy,
  MapPin, Lock, TreePine, Settings, Bell, Flame, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { MOCK_USER } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app")({ component: AppLayout });

const NAV = [
  { to: "/app", label: "Today", icon: Home, exact: true },
  { to: "/app/trajectory", label: "Financial Forecast", icon: Activity },
  { to: "/app/retirement", label: "Retirement", icon: PiggyBank },
  { to: "/app/spending", label: "Spending Impact", icon: Receipt },
  { to: "/app/guardrails", label: "Guardrails", icon: Shield },
  { to: "/app/coach", label: "AI Coach", icon: Sparkles },
  { to: "/app/quests", label: "Quests", icon: Trophy },
  { to: "/app/recommended", label: "Recommended", icon: MapPin },
  { to: "/app/vault", label: "Data Vault", icon: Lock },
  { to: "/app/progress", label: "Progress Tree", icon: TreePine },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function AppLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center bg-background text-muted-foreground text-sm">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar, desktop */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar p-4 sticky top-0 h-screen">
        <div className="px-2 py-3 mb-4">
          <Logo size="md" />
        </div>
        <nav className="flex-1 space-y-0.5">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              {...({ search: () => ({}), params: () => ({}) } as any)}
              activeOptions={{ exact: !!n.exact }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors data-[status=active]:bg-sidebar-accent data-[status=active]:text-foreground"
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => { signOut(); navigate({ to: "/" }); }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border">
          <div className="px-5 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex lg:hidden">
              <Logo size="sm" to="/app" />
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs">
                <Flame className="h-3.5 w-3.5 text-warning" />
                <span className="font-mono">{MOCK_USER.streak}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-lime/30 bg-lime/10 text-xs">
                <span className="font-mono text-lime">{MOCK_USER.longvBalance.toLocaleString()} LONGV</span>
              </div>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
          <Outlet />
        </main>

        {/* Bottom tabs, mobile */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-background/90 border-t border-border">
          <div className="grid grid-cols-5 gap-1 p-2">
            {NAV.slice(0, 5).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                {...({ search: () => ({}), params: () => ({}) } as any)}
                activeOptions={{ exact: !!n.exact }}
                className="flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] text-muted-foreground data-[status=active]:text-lime"
              >
                <n.icon className="h-5 w-5" />
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
