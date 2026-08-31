import { cn } from "@/lib/utils";

/**
 * Wordmark + globe monogram.
 *
 * Drawn inline so it stays crisp at any size, themes with `currentColor`
 * and costs no network request. To use the official artwork instead, replace
 * the <svg> below with next/image pointing at /images/logo.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={cn("h-10 w-10", className)}>
      <defs>
        <linearGradient id="kotes-globe" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#52bcfd" />
          <stop offset="55%" stopColor="#1ea6ef" />
          <stop offset="100%" stopColor="#0c6ba9" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="url(#kotes-globe)" />
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" fill="none">
        <ellipse cx="24" cy="24" rx="21" ry="9.5" />
        <ellipse cx="24" cy="24" rx="9.5" ry="21" />
        <path d="M3 18.5h42M3 29.5h42" />
      </g>
      <path
        d="M17.5 12.5h5.4v9.1l8-9.1h6.6l-8.8 9.7 9.3 13.3h-6.8l-6.3-9.4-2 2.2v7.2h-5.4V12.5Z"
        fill="#e0393c"
        stroke="#ffffff"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "light",
  showTagline = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-extrabold tracking-tight",
            tone === "light" ? "text-ink-900" : "text-white",
          )}
        >
          KOTES <span className={tone === "light" ? "text-brand-600" : "text-brand-300"}>(T)</span> LIMITED
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
              tone === "light" ? "text-ink-500" : "text-ink-300",
            )}
          >
            ICT Infrastructure &amp; Integration
          </span>
        ) : null}
      </span>
    </span>
  );
}
