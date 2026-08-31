import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "sunken" | "dark" | "brand";

const toneClass: Record<Tone, string> = {
  default: "bg-surface text-ink-900",
  muted: "bg-surface-muted text-ink-900",
  sunken: "bg-surface-sunken text-ink-900",
  dark: "bg-ink-950 text-ink-100",
  brand: "bg-brand-700 text-white",
};

const spacingClass = {
  sm: "py-14 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
} as const;

export function Section({
  id,
  tone = "default",
  spacing = "md",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  spacing?: keyof typeof spacingClass;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", toneClass[tone], spacingClass[spacing], className)}
    >
      {children}
    </section>
  );
}
