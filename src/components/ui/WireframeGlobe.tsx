"use client";

import { geoGraticule, geoOrthographic, geoPath } from "d3-geo";
import { timer, type Timer } from "d3-timer";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Wireframe halftone globe.
 *
 * Canvas-rendered orthographic projection of world landmass: graticule,
 * coastline outlines and a halftone dot fill, auto-rotating with drag and
 * touch interaction, and a marker on Tanzania.
 *
 * Performance notes — this runs continuously behind the hero, so it is built
 * to stay cheap:
 *
 * - The halftone dot field is pre-computed at build time by
 *   `scripts/generate-globe-dots.mjs`. Point-in-polygon testing over a lat/lng
 *   grid is tens of millions of operations; running it in the browser froze the
 *   main thread for seconds.
 * - Dots are projected with inlined maths (~8 multiplies each) instead of a
 *   d3 projection call per point per frame, after pre-computing each dot's
 *   position on the unit sphere once.
 * - Rendering is capped at ~40fps and pauses entirely when the canvas scrolls
 *   off-screen or the tab is hidden.
 * - Geometry is self-hosted under /geo, so the hero never depends on a
 *   third-party host and the CSP stays closed.
 * - Only `d3-geo` and `d3-timer` are imported, never the full d3 bundle.
 *
 * Auto-rotation never starts for visitors who prefer reduced motion; the globe
 * still renders and can still be dragged.
 *
 * Decorative: hidden from assistive technology, with the surrounding section
 * carrying the meaning.
 */

type LandCollection = { type: "FeatureCollection"; features: unknown[] };

const PALETTE = {
  oceanInner: "#123a63",
  oceanOuter: "#0a1f38",
  oceanEdge: "rgba(139, 212, 255, 0.55)",
  graticule: "rgba(139, 212, 255, 0.16)",
  coastline: "rgba(187, 228, 255, 0.5)",
  dot: "rgba(103, 197, 255, 0.9)",
  marker: "#e0393c",
};

const DEG = Math.PI / 180;
const FRAME_MS = 1000 / 40;

export function WireframeGlobe({
  className,
  /** Degrees of rotation per second. */
  speed = 5,
}: {
  className?: string;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let disposed = false;
    let land: LandCollection | null = null;
    let rotationTimer: Timer | null = null;
    let onScreen = true;

    /** Unit-sphere coordinates per dot, pre-computed once. */
    let dotA0 = new Float32Array(0);
    let dotB0 = new Float32Array(0);
    let dotC = new Float32Array(0);

    const rotation: [number, number] = [-20, -12];
    let dragging = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const projection = geoOrthographic().clipAngle(90).precision(0.6);
    const path = geoPath(projection, context);
    const graticule = geoGraticule().step([20, 20]);

    let size = 0;

    /* -------------------------------------------------------------- sizing */

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const next = Math.max(220, Math.round(rect.width));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      size = next;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.scale(size / 2.32).translate([size / 2, size / 2]);
      render();
    };

    /* ---------------------------------------------------------- projection */

    /**
     * Orthographic projection of a pre-computed unit-sphere point, matching
     * d3.geoOrthographic().rotate([L, P]) so dots land exactly on the
     * d3-drawn coastlines.
     *
     * With a = cos(lat)cos(lng + L), b = cos(lat)sin(lng + L), c = sin(lat):
     *   screen x = centre + scale * b
     *   screen y = centre - scale * (c cos P + a sin P)
     *   visible when a cos P - c sin P > 0   (clipAngle 90)
     */
    const drawDots = () => {
      const count = dotC.length;
      if (count === 0) return;

      const scale = projection.scale();
      const centre = size / 2;
      const L = rotation[0] * DEG;
      const P = rotation[1] * DEG;
      const cosL = Math.cos(L);
      const sinL = Math.sin(L);
      const cosP = Math.cos(P);
      const sinP = Math.sin(P);
      const radius = Math.max(0.65, scale / 200);
      const tau = Math.PI * 2;

      context.fillStyle = PALETTE.dot;
      context.beginPath();

      for (let i = 0; i < count; i++) {
        const a0 = dotA0[i]!;
        const b0 = dotB0[i]!;
        const c = dotC[i]!;

        const a = a0 * cosL - b0 * sinL;
        if (a * cosP - c * sinP <= 0) continue; // far side of the sphere

        const b = a0 * sinL + b0 * cosL;
        const x = centre + scale * b;
        const y = centre - scale * (c * cosP + a * sinP);

        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, tau);
      }

      context.fill();
    };

    /* -------------------------------------------------------------- render */

    const render = () => {
      if (!size) return;
      const scale = projection.scale();
      const centre = size / 2;

      context.clearRect(0, 0, size, size);

      // Ocean sphere with a soft rim light.
      context.beginPath();
      context.arc(centre, centre, scale, 0, Math.PI * 2);
      const fill = context.createRadialGradient(
        centre - scale * 0.35,
        centre - scale * 0.4,
        scale * 0.1,
        centre,
        centre,
        scale,
      );
      fill.addColorStop(0, PALETTE.oceanInner);
      fill.addColorStop(1, PALETTE.oceanOuter);
      context.fillStyle = fill;
      context.fill();
      context.lineWidth = 1.4;
      context.strokeStyle = PALETTE.oceanEdge;
      context.stroke();

      // Graticule.
      context.beginPath();
      path(graticule());
      context.lineWidth = 0.7;
      context.strokeStyle = PALETTE.graticule;
      context.stroke();

      // Coastlines.
      if (land) {
        context.beginPath();
        for (const feature of land.features) path(feature as never);
        context.lineWidth = 0.85;
        context.strokeStyle = PALETTE.coastline;
        context.stroke();
      }

      drawDots();

      // Tanzania — the company's home base.
      const home = projection([39.22, -6.71]);
      if (home) {
        const [x, y] = home;
        const r = Math.max(2, scale / 90);
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fillStyle = PALETTE.marker;
        context.fill();
        context.beginPath();
        context.arc(x, y, r * 2.4, 0, Math.PI * 2);
        context.strokeStyle = "rgba(224, 57, 60, 0.5)";
        context.lineWidth = 1.2;
        context.stroke();
      }
    };

    /* ----------------------------------------------------------- animation */

    let lastElapsed = 0;
    let lastFrame = 0;

    const tick = (elapsed: number) => {
      const delta = elapsed - lastElapsed;
      lastElapsed = elapsed;

      if (prefersReducedMotion || dragging || !onScreen || document.hidden) return;
      if (elapsed - lastFrame < FRAME_MS) return;
      lastFrame = elapsed;

      // Clamp delta so a backgrounded tab does not spin on return.
      rotation[0] = (rotation[0] + (speed * Math.min(delta, 100)) / 1000) % 360;
      projection.rotate(rotation);
      render();
    };

    /* --------------------------------------------------------- interaction */

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startRotation: [number, number] = [0, 0];

    const onPointerDown = (event: PointerEvent) => {
      pointerId = event.pointerId;
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startRotation = [rotation[0], rotation[1]];
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const sensitivity = 220 / projection.scale();
      rotation[0] = startRotation[0] + (event.clientX - startX) * sensitivity;
      rotation[1] = Math.max(
        -75,
        Math.min(75, startRotation[1] - (event.clientY - startY) * sensitivity),
      );
      projection.rotate(rotation);
      render();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(wrapper);

    /* ---------------------------------------------------------------- boot */

    projection.rotate(rotation);
    resize();

    const loadJson = async <T,>(url: string): Promise<T | null> => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as T;
      } catch {
        return null;
      }
    };

    void Promise.all([
      loadJson<LandCollection>("/geo/land-110m.json"),
      loadJson<number[]>("/geo/land-dots.json"),
    ]).then(([collection, flatDots]) => {
      if (disposed) return;

      land = collection;

      if (flatDots && flatDots.length >= 2) {
        const count = Math.floor(flatDots.length / 2);
        dotA0 = new Float32Array(count);
        dotB0 = new Float32Array(count);
        dotC = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const lng = flatDots[i * 2]! * DEG;
          const lat = flatDots[i * 2 + 1]! * DEG;
          const cosLat = Math.cos(lat);
          dotA0[i] = cosLat * Math.cos(lng);
          dotB0[i] = cosLat * Math.sin(lng);
          dotC[i] = Math.sin(lat);
        }
      }

      render();
      // The sphere alone still looks intentional if either file failed to load,
      // so reveal regardless.
      setReady(true);
      rotationTimer = timer(tick);
    });

    return () => {
      disposed = true;
      rotationTimer?.stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [speed]);

  return (
    <div ref={wrapperRef} className={cn("relative aspect-square w-full", className)}>
      {/* Atmospheric halo behind the canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4%] rounded-full bg-brand-500/25 blur-3xl"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "relative mx-auto block cursor-grab touch-none rounded-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      {!ready ? (
        <div
          aria-hidden="true"
          className="absolute inset-[6%] animate-pulse rounded-full bg-white/5 ring-1 ring-inset ring-white/10"
        />
      ) : null}
    </div>
  );
}

export default WireframeGlobe;
