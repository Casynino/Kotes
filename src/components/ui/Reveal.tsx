"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reveals children once they scroll into view.
 *
 * Uses a single IntersectionObserver per instance and disconnects immediately
 * after firing, so there is no scroll listener and no layout thrash. Falls back
 * to visible content when IntersectionObserver is unavailable or the user
 * prefers reduced motion.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    // Safety net: content must never stay invisible because an observer
    // callback was delayed or suppressed (backgrounded tab, throttled frames,
    // unusual embedding contexts). Reveal unconditionally after a short grace
    // period — by then a genuine on-screen element has already animated in.
    const failsafe = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
