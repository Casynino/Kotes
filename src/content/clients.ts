import type { Client } from "./types";

/**
 * Clients and partners.
 *
 * Logos: drop a file into /public/images/clients (SVG or transparent PNG,
 * ~240x120 recommended) and set `logo: { src, alt }`. Until then the
 * `monogram` renders as a styled fallback tile — no broken images.
 */
export const clients: Client[] = [
  { id: "cl-moha", name: "Ministry of Home Affairs", monogram: "MHA", industry: "Government", kind: "client", order: 1, active: true, featured: true },
  { id: "cl-tpa", name: "Tanzania Ports Authority", shortName: "TPA", monogram: "TPA", industry: "Transport & Logistics", kind: "client", order: 2, active: true, featured: true },
  { id: "cl-mow", name: "Ministry of Water", monogram: "MoW", industry: "Government", kind: "client", order: 3, active: true, featured: true },
  { id: "cl-po", name: "President's Office", monogram: "PO", industry: "Government", kind: "client", order: 4, active: true, featured: true },
  { id: "cl-agc", name: "Attorney General's Chamber", monogram: "AGC", industry: "Government", kind: "client", order: 5, active: true, featured: true },
  { id: "cl-moes", name: "Ministry of Education and Science", monogram: "MoE", industry: "Education", kind: "client", order: 6, active: true, featured: true },
  { id: "cl-nhc", name: "National Housing Corporation", shortName: "NHC", monogram: "NHC", industry: "Housing & Real Estate", kind: "client", order: 7, active: true, featured: true },
  { id: "cl-taa", name: "Tanzania Airports Authority", shortName: "TAA", monogram: "TAA", industry: "Aviation", kind: "client", order: 8, active: true, featured: true },
  { id: "cl-sumatra", name: "SUMATRA", monogram: "SUM", industry: "Transport Regulation", kind: "client", order: 9, active: true, featured: false },
  { id: "cl-nida", name: "National Identification Authority", shortName: "NIDA", monogram: "NIDA", industry: "Government", kind: "client", order: 10, active: true, featured: false },
  { id: "cl-gpsa", name: "Government Procurement Services Agency", shortName: "GPSA", monogram: "GPSA", industry: "Government", kind: "client", order: 11, active: true, featured: false },
  { id: "cl-duce", name: "Dar es Salaam University College of Education", shortName: "DUCE", monogram: "DUCE", industry: "Higher Education", kind: "client", order: 12, active: true, featured: false },
  { id: "cl-tbs", name: "Tanzania Bureau of Standards", shortName: "TBS", monogram: "TBS", industry: "Standards & Quality", kind: "client", order: 13, active: true, featured: false },
  { id: "cl-moem", name: "Ministry of Energy and Minerals", monogram: "MEM", industry: "Energy", kind: "client", order: 14, active: true, featured: false },
  { id: "cl-temesa", name: "TEMESA", monogram: "TEM", industry: "Government Agency", kind: "client", order: 15, active: true, featured: false },
  { id: "cl-nssf", name: "National Social Security Fund", shortName: "NSSF", monogram: "NSSF", industry: "Social Security", kind: "client", order: 16, active: true, featured: false },
  { id: "cl-mohsw", name: "Ministry of Health and Social Welfare", monogram: "MoH", industry: "Health", kind: "client", order: 17, active: true, featured: false },
  { id: "cl-nhif", name: "National Health Insurance Fund", shortName: "NHIF", monogram: "NHIF", industry: "Health Insurance", kind: "client", order: 18, active: true, featured: false },
  { id: "cl-ttb", name: "Tanzania Tourist Board", shortName: "TTB", monogram: "TTB", industry: "Tourism", kind: "client", order: 19, active: true, featured: false },
  { id: "cl-mcst", name: "Ministry of Communication, Science and Technology", monogram: "MCST", industry: "Government", kind: "client", order: 20, active: true, featured: false },
  { id: "cl-psc", name: "Public Service Commission", shortName: "PSC", monogram: "PSC", industry: "Government", kind: "client", order: 21, active: true, featured: false },
  { id: "cl-dit", name: "Dar es Salaam Institute of Technology", shortName: "DIT", monogram: "DIT", industry: "Higher Education", kind: "client", order: 22, active: true, featured: false },
  { id: "cl-nmaist", name: "Nelson Mandela African Institution of Science and Technology", shortName: "NM-AIST", monogram: "NM", industry: "Higher Education", kind: "client", order: 23, active: true, featured: false },
  { id: "cl-taifa", name: "Taifa Gas", monogram: "TG", industry: "Energy", kind: "client", order: 24, active: true, featured: false },
  { id: "cl-metl", name: "MeTL Group", monogram: "MeTL", industry: "Conglomerate", kind: "client", order: 25, active: true, featured: false },
  { id: "cl-moa", name: "Ministry of Agriculture", monogram: "MoA", industry: "Agriculture", kind: "client", order: 26, active: true, featured: false },
  { id: "cl-srbc", name: "Songwe River Basin Commission", monogram: "SRBC", industry: "Water Resources", kind: "client", order: 27, active: true, featured: false },
];

/**
 * Technology partners and vendors live in ./partners.ts and are displayed in a
 * separate band from clients on /clients.
 */
export { technologyPartners as partners } from "./partners";

export const activeClients = clients
  .filter((c) => c.active && c.kind === "client")
  .sort((a, b) => a.order - b.order);

export const featuredClients = activeClients.filter((c) => c.featured);

export { activeTechnologyPartners as activePartners } from "./partners";

/** Success stories are optional; the section hides itself when empty. */
export const clientStories = activeClients.filter((c) => c.successStory);
