import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Home, TrendingUp, Shield, Sparkles, PiggyBank, Settings,
  Bell, Flame, LogOut, MoreHorizontal, HelpCircle, Zap, Search, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { MOCK_USER } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  // Heuristic 1: visibility of system status — show user where they are.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentPage = useMemo(() => {
    const all = [...PRIMARY_NAV, ...SECONDARY_NAV.map((n) => ({ ...n, icon: undefined as any }))];
    const match = all
      .filter((n) => (n.to === "/app" ? pathname === "/app" : pathname.startsWith(n.to)))
      .sort((a, b) => b.to.length - a.to.length)[0];
    return match?.label ?? "Home";
  }, [pathname]);

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
          <div className="px-5 lg:px-8 h-14 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex lg:hidden">
                <Logo size="sm" to="/app" />
              </div>
              {/* Heuristic 1 + 6: visible "you are here" breadcrumb */}
              <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link to="/app" className="hover:text-foreground transition">Longeva</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">{currentPage}</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              {/* Heuristic 7: Quick Actions for frequent tasks */}
              <QuickActions />
              {/* Heuristic 10: Help & Documentation, contextual, no leaving the page */}
              <HelpDrawer page={currentPage} />

              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs">
                <Flame className="h-3.5 w-3.5 text-warning" />
                <span className="font-mono" aria-label={`${MOCK_USER.streak} day streak`}>{MOCK_USER.streak}</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border border-lime/30 bg-lime/10 text-xs">
                <span className="font-mono text-lime">{MOCK_USER.longvBalance.toLocaleString()} LONGV</span>
              </div>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Link to="/app/settings" aria-label="Profile and settings" className="shrink-0">
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

// ---------------------------------------------------------------------------
// QuickActions: Hick's Law-friendly menu of the 4 most frequent shortcuts.
// Heuristic 7 (Flexibility & efficiency).
// ---------------------------------------------------------------------------
function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5 h-8">
          <Zap className="h-3.5 w-3.5 text-gold" />
          <span className="text-xs">Quick action</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Frequent shortcuts
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/retirement" className="cursor-pointer">
            <PiggyBank className="h-4 w-4 mr-2 text-teal" /> Boost retirement
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/guardrails" className="cursor-pointer">
            <Shield className="h-4 w-4 mr-2 text-coral" /> Add a guardrail
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/coach" className="cursor-pointer">
            <Sparkles className="h-4 w-4 mr-2 text-gold" /> Ask the coach
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/wealth" className="cursor-pointer">
            <TrendingUp className="h-4 w-4 mr-2 text-lime" /> Run a forecast
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// HelpDrawer: contextual FAQ that opens in a side sheet, never leaves the page.
// Heuristic 9 (recovery) + Heuristic 10 (help & docs).
// ---------------------------------------------------------------------------
const FAQ: { q: string; a: string; tags: string[] }[] = [
  {
    q: "How does Longeva forecast my retirement?",
    a: "We project your current savings rate, expected returns and spending patterns 30+ years forward. The 'Optimized' line shows what happens when guardrails and auto-save are active.",
    tags: ["forecast", "retirement", "home"],
  },
  {
    q: "What are 'guardrails'?",
    a: "Rules you set once that quietly prevent overspending — like capping food delivery to $200/mo. They run in the background; you can pause them anytime.",
    tags: ["guardrails", "rules"],
  },
  {
    q: "Is my financial data safe?",
    a: "Bank connections use read-only tokens via our partner. We never store credentials. You can disconnect any source from Settings → Data Vault.",
    tags: ["security", "data", "vault"],
  },
  {
    q: "Why does the coach recommend a specific action?",
    a: "Tap 'Why this?' next to any AI suggestion to see the top signals, weights, model version and confidence behind the call.",
    tags: ["coach", "ai", "explainability"],
  },
  {
    q: "Can I undo an action I just approved?",
    a: "Yes. Every action shows an Undo toast for 6 seconds, and the activity log on Settings lets you reverse anything from the last 30 days.",
    tags: ["undo", "control"],
  },
];

function HelpDrawer({ page }: { page: string }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return FAQ;
    return FAQ.filter(
      (f) => f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term) || f.tags.some((t) => t.includes(term)),
    );
  }, [q]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Help and FAQ">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <p className="text-[10px] font-mono uppercase tracking-wider text-lime mb-1">Help · {page}</p>
          <SheetTitle className="font-display text-2xl">How can we help?</SheetTitle>
          <SheetDescription>Search the FAQ or browse common questions. You won't lose your place.</SheetDescription>
        </SheetHeader>
        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search help…"
            className="pl-9 h-10"
            aria-label="Search help"
          />
        </div>
        <div className="mt-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-5 text-center">
              <p className="text-sm font-medium">No results for "{q}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different keyword or ask the coach.</p>
              <Button asChild variant="lime" size="sm" className="mt-3">
                <Link to="/app/coach">Ask the coach</Link>
              </Button>
            </div>
          ) : (
            filtered.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-4 open:bg-card">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3 text-sm font-medium">
                  <span>{f.q}</span>
                  <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground transition group-open:rotate-90" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-6">
          Still stuck? Email <a className="text-lime hover:underline" href="mailto:hello@longeva.app">hello@longeva.app</a>.
        </p>
      </SheetContent>
    </Sheet>
  );
}
