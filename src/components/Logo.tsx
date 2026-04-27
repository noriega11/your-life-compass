import { Link } from "@tanstack/react-router";

/**
 * LONGEVA mark — a modern, geometric "longevity arc".
 * Three stacked arcs = forecast confidence bands.
 * Vertical stroke = the present moment intersecting the trajectory.
 * Designed to read crisply at 20px and feel sculptural at 120px.
 */
export function LogoMark({
  className = "h-8 w-8",
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer arc — projected trajectory */}
      <path
        d="M3.5 24 A 14 14 0 0 1 28.5 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Middle arc — confidence band */}
      <path
        d="M7 24 A 9 9 0 0 1 25 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Inner arc — primary forecast */}
      <path
        d="M10.5 24 A 5.5 5.5 0 0 1 21.5 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* The present — vertical pulse */}
      <line
        x1="16"
        y1="6"
        x2="16"
        y2="24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Accent dot — peak */}
      <circle cx="16" cy="6" r="1.6" fill="var(--lime)" />
    </svg>
  );
}

export function Logo({
  to = "/",
  size = "md",
  showWordmark = true,
}: {
  to?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}) {
  const dims = {
    sm: { mark: "h-6 w-6", text: "text-base", gap: "gap-1.5" },
    md: { mark: "h-8 w-8", text: "text-xl", gap: "gap-2" },
    lg: { mark: "h-10 w-10", text: "text-2xl", gap: "gap-2.5" },
  }[size];

  return (
    <Link to={to} search={(() => ({})) as any} className={`inline-flex items-center ${dims.gap} group`}>
      <span className="text-foreground transition-transform duration-500 group-hover:rotate-[8deg]">
        <LogoMark className={dims.mark} />
      </span>
      {showWordmark && (
        <span
          className={`font-display font-medium tracking-[-0.04em] ${dims.text} text-foreground`}
          style={{ fontFeatureSettings: '"ss01", "ss02"' }}
        >
          longeva
        </span>
      )}
    </Link>
  );
}
