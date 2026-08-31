import type { ImageRef } from "./types";

/**
 * Photography registry.
 *
 * One entry per image so alt text is written once and reused everywhere.
 * All files are self-hosted under /public/images/photos — nothing is hotlinked,
 * so there is no third-party dependency at request time.
 *
 * These are licensed stock placeholders (Unsplash License — free for commercial
 * use, no attribution required; see public/images/photos/CREDITS.md). Replace
 * each file with real KOTES site photography as it becomes available: keep the
 * same filename and nothing else needs to change.
 */
export const photos = {
  datacenter: {
    src: "/images/photos/datacenter-racks.jpg",
    alt: "Data centre racks filled with dense structured cabling and status indicators",
    width: 1800,
    height: 1200,
  },
  earthNight: {
    src: "/images/photos/earth-network-night.jpg",
    alt: "Earth seen from orbit at night, city lights forming a connected network",
    width: 1800,
    height: 1200,
  },
  patchPanel: {
    src: "/images/photos/patch-panel.jpg",
    alt: "Structured cabling patch panel with numbered ports and connected patch leads",
    width: 1800,
    height: 1200,
  },
  fibreDistribution: {
    src: "/images/photos/fibre-distribution.jpg",
    alt: "Fibre optic distribution frame with rows of terminated patch cords",
    width: 1800,
    height: 1200,
  },
  switchFibre: {
    src: "/images/photos/switch-fibre-copper.jpg",
    alt: "Network switch with fibre and copper patch cables connected to its ports",
    width: 1800,
    height: 1200,
  },
  circuitBoard: {
    src: "/images/photos/circuit-board.jpg",
    alt: "Close-up of a populated electronic circuit board",
    width: 1800,
    height: 1200,
  },
  monitoring: {
    src: "/images/photos/monitoring-dashboard.jpg",
    alt: "Monitoring dashboard on screen showing live system performance metrics",
    width: 1800,
    height: 1200,
  },
  drawings: {
    src: "/images/photos/technical-drawings.jpg",
    alt: "Technical drawings and design documentation laid out on a desk",
    width: 1800,
    height: 1200,
  },
  engineer: {
    src: "/images/photos/engineer-workstation.jpg",
    alt: "Engineer working at a multi-monitor workstation reviewing system output",
    width: 1800,
    height: 1200,
  },
  team: {
    src: "/images/photos/team-workspace.jpg",
    alt: "Team working together across laptops at a shared desk",
    width: 1800,
    height: 1200,
  },
} satisfies Record<string, ImageRef>;

export type PhotoKey = keyof typeof photos;
