import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "light" ? "text-brand-700" : "text-brand-300",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", tone === "light" ? "bg-brand-500" : "bg-brand-400")}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  level = 2,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const Tag = `h${level}` as const;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag
        id={id}
        className={cn(
          level === 1 ? "text-h1" : "text-h2",
          tone === "light" ? "text-ink-900" : "text-white",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-lead max-w-2xl",
            tone === "light" ? "text-ink-600" : "text-ink-200",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
