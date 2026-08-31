/**
 * Pre-computes the halftone dot field for the hero globe.
 *
 * Point-in-polygon testing across a lat/lng grid costs tens of millions of
 * operations — far too slow to run in the browser on every page load. We do it
 * once here at build time and ship the result as a flat array of coordinates.
 *
 * Usage:  node scripts/generate-globe-dots.mjs
 * Input:  public/geo/land-110m.json
 * Output: public/geo/land-dots.json
 */
import { readFileSync, writeFileSync } from "node:fs";

const SPACING_DEG = 1.5;
const IN = "public/geo/land-110m.json";
const OUT = "public/geo/land-dots.json";

const land = JSON.parse(readFileSync(IN, "utf8"));

function pointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointInPolygon(lng, lat, rings) {
  if (!pointInRing(lng, lat, rings[0])) return false;
  for (let i = 1; i < rings.length; i++) {
    if (pointInRing(lng, lat, rings[i])) return false; // hole
  }
  return true;
}

function bounds(geometry) {
  let minLng = 180;
  let minLat = 90;
  let maxLng = -180;
  let maxLat = -90;
  const walk = (coords) => {
    if (typeof coords[0] === "number") {
      const [lng, lat] = coords;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      return;
    }
    for (const child of coords) walk(child);
  };
  walk(geometry.coordinates);
  return [minLng, minLat, maxLng, maxLat];
}

/** Snap to the global grid so features cannot produce near-duplicate dots. */
const snap = (value) => Math.round(value / SPACING_DEG) * SPACING_DEG;

const seen = new Set();
const dots = [];

for (const feature of land.features) {
  const polygons =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;

  const [minLng, minLat, maxLng, maxLat] = bounds(feature.geometry);

  for (let lng = snap(minLng); lng <= maxLng; lng += SPACING_DEG) {
    for (let lat = snap(minLat); lat <= maxLat; lat += SPACING_DEG) {
      const key = `${lng.toFixed(1)}|${lat.toFixed(1)}`;
      if (seen.has(key)) continue;
      if (polygons.some((rings) => pointInPolygon(lng, lat, rings))) {
        seen.add(key);
        dots.push(Math.round(lng * 10) / 10, Math.round(lat * 10) / 10);
      }
    }
  }
}

writeFileSync(OUT, JSON.stringify(dots));

const bytes = Buffer.byteLength(JSON.stringify(dots));
console.log(
  `Generated ${dots.length / 2} dots at ${SPACING_DEG} degree spacing -> ${OUT} (${(bytes / 1024).toFixed(1)} KB)`,
);
