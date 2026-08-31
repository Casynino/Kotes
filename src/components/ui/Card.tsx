import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Surface card. When `href` is provided the whole card becomes a link target
 * via a stretched overlay, so nested interactive elements stay accessible.
 */
export function Card({
  href,
  className,
  children,
  interactive = true,
  label,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  interactive?: boolean;
  /** Accessible name for the stretched link when the visible text is not enough. */
  label?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-border-subtle",
        "shadow-card transition-all duration-300",
        interactive && "hover:-translate-y-1 hover:shadow-card-hover hover:ring-brand-200",
        "focus-within:ring-2 focus-within:ring-brand-500",
        className,
      )}
    >
      {children}
      {href ? (
        <Link href={href} className="absolute inset-0 z-10 rounded-card" aria-label={label}>
          <span className="sr-only">{label ?? "View details"}</span>
        </Link>
      ) : null}
    </div>
  );
}
