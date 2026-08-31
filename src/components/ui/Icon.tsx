import type { ReactElement } from "react";

import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Inline stroke icons.
 *
 * Kept as inline SVG rather than an icon package: zero runtime dependency,
 * zero network request, and they inherit `currentColor` so a single class
 * controls colour. Add a new key here and to `IconName` in content/types.ts.
 */
const paths: Record<IconName, ReactElement> = {
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4m0 0-5.2 5m5.2-5 5.2 5" />
    </>
  ),
  fiber: (
    <>
      <path d="M3 12c3.5 0 3.5-6 7-6s3.5 6 7 6 3.5-3 4-3" />
      <path d="M3 18c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-2 4-2" />
      <circle cx="19" cy="9" r="1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6.5" rx="1.8" />
      <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.8" />
      <path d="M7 7.25h.01M7 16.75h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.5 3.5a5 5 0 0 0-4.6 6.9L3.8 17.5a2 2 0 1 0 2.8 2.8l7.1-7.1a5 5 0 0 0 6.2-6.4l-2.8 2.8-2.6-.7-.7-2.6 2.7-2.8Z" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18h9.5a3.75 3.75 0 0 0 .4-7.48A5.5 5.5 0 0 0 6.4 11 3.5 3.5 0 0 0 7 18Z" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10.5 3.5v3m3-3v3m-3 14v-3m3 3v-3M3.5 10.5h3m-3 3h3m14-3h-3m3 3h-3" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <path d="M4.5 13.5h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-4Zm15 0h-2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4Z" />
      <path d="M18 18.5v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6m5 6V6m5 14v-9" />
    </>
  ),
  handshake: (
    <>
      <path d="m3 11 3.5-3.5a2 2 0 0 1 2.8 0L12 10l2.7-2.5a2 2 0 0 1 2.8 0L21 11" />
      <path d="m8 14 2.2 2.2a1.6 1.6 0 0 0 2.3 0l.4-.4.9.9a1.5 1.5 0 0 0 2.2-2l-3.5-3.4" />
      <path d="M3 11v3l3 3m15-6v3l-3 3" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
      <path d="M18.5 16.5 19.3 19l2.2.8-2.2.8-.8 2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6", className)}
    >
      {paths[name]}
    </svg>
  );
}

/** Decorative chevron used on links and buttons. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-4 w-4", className)}
    >
      <path d="M5 12h13m0 0-5-5m5 5-5 5" />
    </svg>
  );
}
