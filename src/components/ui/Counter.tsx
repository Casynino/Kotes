"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` when scrolled into view.
 *
 * The initial state is the final value, so the server-rendered HTML — and any
 * visitor without JavaScript or with reduced motion enabled — always shows the
 * real number. The count-up is purely an enhancement applied afterwards.
 *
 * `started` is deliberately a ref rather than state: as state it would change
 * the effect's dependencies, re-running the effect and tearing down the very
 * animation it had just started.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  displayOverride,
  durationMs = 1600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const frameRef = useRef(0);
  const failsafeRef = useRef(0);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (displayOverride) return;

    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (startedRef.current) return;
        startedRef.current = true;

        const start = performance.now();

        const tick = () => {
          const progress = Math.min(1, (performance.now() - start) / durationMs);
          // easeOutExpo — fast start, gentle settle.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.round(eased * value));
          if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };

        setDisplay(0);
        frameRef.current = requestAnimationFrame(tick);

        // Failsafe: animation frames are suspended entirely in a background
        // tab, which would otherwise strand a partly-counted number on screen.
        // Snap to the real figure once the animation window has passed,
        // whatever happened to the frame loop.
        failsafeRef.current = window.setTimeout(() => {
          cancelAnimationFrame(frameRef.current);
          setDisplay(value);
        }, durationMs + 400);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(failsafeRef.current);
    };
  }, [value, durationMs, displayOverride]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayOverride ?? `${prefix}${display}${suffix}`}
    </span>
  );
}
