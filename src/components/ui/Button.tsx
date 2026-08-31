import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outlineOnDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 " +
  "active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgba(13,135,208,0.9)] hover:bg-brand-700 hover:shadow-[0_12px_32px_-10px_rgba(13,135,208,0.95)] focus-visible:outline-brand-800",
  secondary:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-brand-400 hover:text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
  ghost:
    "text-ink-700 hover:text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
  onDark:
    "bg-white text-ink-900 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-white",
  outlineOnDark:
    "text-white ring-1 ring-inset ring-white/35 hover:bg-white/10 hover:ring-white/60 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
