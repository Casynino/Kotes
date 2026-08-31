import type { Client } from "./types";

/**
 * Global technology partners and vendors.
 *
 * The company profile states that KOTES maintains "extensive partnerships with
 * global technology vendors" and "strategic alliances with industry leaders".
 * This list names the enterprise brands an ICT integrator of this profile
 * sources and deploys.
 *
 * BEFORE GOING LIVE — two things to confirm with the KOTES team:
 *   1. Trim this list to the vendors you actually hold a reseller, partner or
 *      authorised-channel relationship with. Remove any you do not.
 *   2. Vendor logos are trademarks. Use the official artwork from each vendor's
 *      brand-assets page and only where your partner agreement permits it. Drop
 *      the file into /public/images/partners and set `logo` below; until then a
 *      clean typographic wordmark renders instead, which carries no trademark
 *      risk.
 *
 * The section copy deliberately says "we source and deploy" rather than
 * claiming certified-partner status for every brand.
 */
export const technologyPartners: Client[] = [
  { id: "pt-cisco", name: "Cisco", monogram: "CISCO", industry: "Networking & security", kind: "partner", order: 1, active: true, featured: true },
  { id: "pt-dell", name: "Dell Technologies", shortName: "DELL", monogram: "DELL", industry: "Servers & endpoints", kind: "partner", order: 2, active: true, featured: true },
  { id: "pt-hpe", name: "Hewlett Packard Enterprise", shortName: "HPE", monogram: "HPE", industry: "Servers & storage", kind: "partner", order: 3, active: true, featured: true },
  { id: "pt-hp", name: "HP", monogram: "HP", industry: "Endpoints & printing", kind: "partner", order: 4, active: true, featured: true },
  { id: "pt-microsoft", name: "Microsoft", monogram: "MICROSOFT", industry: "Software & cloud", kind: "partner", order: 5, active: true, featured: true },
  { id: "pt-lenovo", name: "Lenovo", monogram: "LENOVO", industry: "Endpoints & servers", kind: "partner", order: 6, active: true, featured: true },
  { id: "pt-huawei", name: "Huawei", monogram: "HUAWEI", industry: "Network & transmission", kind: "partner", order: 7, active: true, featured: true },
  { id: "pt-fortinet", name: "Fortinet", monogram: "FORTINET", industry: "Network security", kind: "partner", order: 8, active: true, featured: true },
  { id: "pt-apc", name: "APC by Schneider Electric", shortName: "APC", monogram: "APC", industry: "Power & UPS", kind: "partner", order: 9, active: true, featured: true },
  { id: "pt-commscope", name: "CommScope", monogram: "COMMSCOPE", industry: "Structured cabling", kind: "partner", order: 10, active: true, featured: true },
  { id: "pt-corning", name: "Corning", monogram: "CORNING", industry: "Optical fibre", kind: "partner", order: 11, active: true, featured: true },
  { id: "pt-panduit", name: "Panduit", monogram: "PANDUIT", industry: "Cabling infrastructure", kind: "partner", order: 12, active: true, featured: true },
  { id: "pt-veeam", name: "Veeam", monogram: "VEEAM", industry: "Backup & recovery", kind: "partner", order: 13, active: true, featured: true },
  { id: "pt-vmware", name: "VMware", monogram: "VMWARE", industry: "Virtualisation", kind: "partner", order: 14, active: true, featured: false },
  { id: "pt-seagate", name: "Seagate", monogram: "SEAGATE", industry: "Storage media", kind: "partner", order: 15, active: true, featured: false },
  { id: "pt-kaspersky", name: "Kaspersky", monogram: "KASPERSKY", industry: "Endpoint security", kind: "partner", order: 16, active: true, featured: false },
  { id: "pt-grandstream", name: "Grandstream", monogram: "GRANDSTREAM", industry: "IP telephony & PABX", kind: "partner", order: 17, active: true, featured: false },
  { id: "pt-hikvision", name: "Hikvision", monogram: "HIKVISION", industry: "Security systems", kind: "partner", order: 18, active: true, featured: false },
];

export const activeTechnologyPartners = technologyPartners
  .filter((p) => p.active)
  .sort((a, b) => a.order - b.order);

export const featuredTechnologyPartners = activeTechnologyPartners.filter((p) => p.featured);
