import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import {
  Home, TrendingUp, Shield, Sparkles, PiggyBank, Settings,
  Bell, Flame, LogOut, MoreHorizontal,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { MOCK_USER } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/app")({ component: AppLayout });

// Hick's Law: keep the primary nav to 6 essentials. Everything else lives under "More".
const PRIMARY_NAV = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/wealth", label: "Forecast", icon: TrendingUp },
  { to: "/app/retirement", label: "Retirement", icon: PiggyBank },
  { to: "/app/guardrails", label: "Guardrails", icon: Shield },
  { to: "/app/coach", label: "Coach", icon: Sparkles },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

const SECONDARY_NAV = [
  { to: "/app/spending", label: "Spending Impact" },
  { to: "/app/patterns", label: "Patterns" },
  { to: "/app/balance", label: "Health & Wealth" },
  { to: "/app/vitality", label: "Vitality Risk" },
  { to: "/app/quests", label: "LONGV Rewards" },
  { to: "/app/recommended", label: "Recommended" },
  { to: "/app/vault", label: "Data Vault" },
];

function AppLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const profile = useMemo(() => {
    const fullName = (user?.user_metadata as any)?.full_name as string | undefined;
    const email = user?.email ?? "";
    const display = fullName || MOCK_USER.firstName;
    const initials = display
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const avatarUrl =
      ((user?.user_metadata as any)?.avatar_url as string | undefined) ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(display)}&backgroundType=gradientLinear`;
    return { display, email, initials, avatarUrl };
  }, [user]);

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

        {/* Profile card with photo */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4 rounded-xl border border-border bg-card">
          <Avatar className="h-10 w-10 ring-2 ring-gold/40">
            <AvatarImage src={profile.avatarUrl} alt={profile.display} />
            <AvatarFallback className="bg-gold/20 text-gold text-xs font-medium">{profile.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{profile.display}</p>
            <p className="text-[11px] text-muted-foreground truncate">{profile.email}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5">
          <p className="px-3 mb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Main</p>
          {PRIMARY_NAV.map((n) => (
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

          <details className="group mt-4">
            <summary className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer list-none">
              <MoreHorizontal className="h-4 w-4" /> More
            </summary>
            <div className="mt-1 ml-2 pl-4 border-l border-border space-y-0.5">
              {SECONDARY_NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  {...({ search: () => ({}), params: () => ({}) } as any)}
                  className="block px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors data-[status=active]:text-foreground"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </details>
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
              <Link to="/app/settings" aria-label="Profile" className="shrink-0">
                <Avatar className="h-8 w-8 ring-2 ring-border hover:ring-gold transition">
                  <AvatarImage src={profile.avatarUrl} alt={profile.display} />
                  <AvatarFallback className="bg-gold/20 text-gold text-[10px]">{profile.initials}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
          <Outlet />
        </main>

        {/* Bottom tabs, mobile, 5 max */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-background/90 border-t border-border">
          <div className="grid grid-cols-5 gap-1 p-2">
            {PRIMARY_NAV.slice(0, 5).map((n) => (
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
