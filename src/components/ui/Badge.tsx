import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral" | "success" | "onDark";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-800 ring-brand-200",
  neutral: "bg-ink-50 text-ink-700 ring-ink-200",
  success: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  onDark: "bg-white/10 text-white ring-white/20 backdrop-blur",
};

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
