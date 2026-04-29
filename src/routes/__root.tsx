import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime mb-4">404</p>
        <h1 className="font-display text-5xl text-foreground">Off the trajectory.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This path doesn't exist. Let's get you back to your forecast.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-lime-foreground hover:brightness-110 transition"
          >
            Back to LONGEVA
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LONGEVA, Live your longest life" },
      {
        name: "description",
        content:
          "LONGEVA shows how long you'll live, how healthy you'll stay, and whether you'll have enough to retire, then helps you improve all three.",
      },
      { name: "author", content: "LONGEVA" },
      { property: "og:title", content: "LONGEVA, Live your longest life" },
      {
        property: "og:description",
        content:
          "Your life forecast in 12 minutes. AI coach, smart guardrails, and longevity rewards, based on what you actually buy and do.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LONGEVA, Live your longest life" },
      { name: "description", content: "LONGEVA forecasts your lifespan, healthspan, and retirement readiness, then helps you improve them." },
      { property: "og:description", content: "LONGEVA forecasts your lifespan, healthspan, and retirement readiness, then helps you improve them." },
      { name: "twitter:description", content: "LONGEVA forecasts your lifespan, healthspan, and retirement readiness, then helps you improve them." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d48042f6-11aa-4723-ad96-91e50ce6940f/id-preview-f8a518cb--18afd389-f594-4598-91b5-d0236c8dc43c.lovable.app-1777319914359.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d48042f6-11aa-4723-ad96-91e50ce6940f/id-preview-f8a518cb--18afd389-f594-4598-91b5-d0236c8dc43c.lovable.app-1777319914359.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
