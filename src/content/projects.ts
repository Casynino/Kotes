import type { Project, ProjectCategory } from "./types";

export const projectCategories: ProjectCategory[] = [
  { id: "fibre-optic", label: "Fibre Optic", description: "Outside plant, last-mile and backbone fibre deployments.", order: 1 },
  { id: "network-infrastructure", label: "Network Infrastructure", description: "LAN, WAN and campus network extensions.", order: 2 },
  { id: "ict-supply", label: "ICT Equipment Supply", description: "Supply, installation and commissioning of ICT hardware.", order: 3 },
  { id: "systems-integration", label: "Systems Integration", description: "Multi-vendor infrastructure delivered as one estate.", order: 4 },
];

const img = (src: string, alt: string) => ({ src, alt, width: 1600, height: 1000 });

/**
 * Project portfolio.
 *
 * Cover and gallery images point at licensed stock placeholders in
 * /public/images/photos (see that folder’s CREDITS.md). Replace those files
 * with real KOTES site photography as it becomes available — keep the same
 * filenames and nothing here needs to change.
 *
 * `clientConfidential: true` masks the client name across the whole site.
 * `valueConfidential: true` hides the contract value.
 */
export const projects: Project[] = [
  {
    id: "prj-pmo-psc-osp",
    slug: "public-service-commission-outside-plant-fibre",
    title: "Outside Plant Fibre Optic Network for the President's Office",
    client: "President's Office — Public Service Commission",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "fibre-optic",
    location: "Dar es Salaam, Tanzania",
    completionDate: "2016-12-31",
    completionLabel: "2015 – 2016",
    status: "completed",
    featured: true,
    cover: img("/images/photos/fibre-distribution.jpg", "Fibre optic distribution frame with rows of terminated patch cords"),
    gallery: [
      img("/images/photos/patch-panel.jpg", "Structured cabling patch panel with numbered ports and connected patch leads"),
      img("/images/photos/switch-fibre-copper.jpg", "Network switch with fibre and copper patch cables connected to its ports"),
      img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk"),
    ],
    summary:
      "Supply, installation and commissioning of an outside plant optic fibre network including accessories and related civil works.",
    scope:
      "The President's Office — Public Service Commission required a resilient outside plant fibre network linking its facilities, complete with the civil works needed to route and protect the cable. The engagement covered supply of optic fibre cables and accessories, full civil works, installation and commissioning — the largest single contract in the KOTES portfolio.",
    solution:
      "KOTES completed a full route survey, designed the cable route and optical loss budget, then executed trenching, ducting and reinstatement before pulling and splicing the fibre. Every link was terminated, bidirectionally OTDR-tested and certified, with splice records and as-built route drawings handed over on completion.",
    outcomes: [
      "High-capacity fibre backbone commissioned and certified end to end",
      "Civil works, supply and installation delivered under a single accountable contract",
      "As-built documentation and OTDR traces handed over for in-house fault location",
    ],
    contractValueTZS: 3460997988,
    order: 1,
    active: true,
  },
  {
    id: "prj-moha-lastmile-2015-2016b",
    slug: "ministry-home-affairs-last-mile-fibre-infrastructure",
    title: "Last Mile Fibre Optic Cable Infrastructure Deployment",
    client: "Ministry of Home Affairs",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "fibre-optic",
    location: "Tanzania (multiple regions)",
    completionDate: "2016-12-31",
    completionLabel: "2015 – 2016",
    status: "completed",
    featured: true,
    cover: img("/images/photos/patch-panel.jpg", "Structured cabling patch panel with numbered ports and connected patch leads"),
    gallery: [
      img("/images/photos/fibre-distribution.jpg", "Fibre optic distribution frame with rows of terminated patch cords"),
      img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk"),
    ],
    summary:
      "Supply and installation of last mile connectivity through dedicated optic fibre cable infrastructure deployment.",
    scope:
      "The Ministry required last mile fibre optic infrastructure to bring high-capacity connectivity from backbone points of presence into its own facilities across multiple regions, without disrupting operational policing services.",
    solution:
      "KOTES surveyed each route, designed the last-mile fibre paths and executed deployment site by site. Work was phased so that each location was cut over individually, with testing and certification completed before the team moved on.",
    outcomes: [
      "Last-mile fibre infrastructure delivered across multiple regional sites",
      "Phased cutover kept operational services running throughout deployment",
      "Certified links handed over with per-site optical test records",
    ],
    contractValueTZS: 2890627757,
    order: 2,
    active: true,
  },
  {
    id: "prj-moha-lastmile-police-2015-2016",
    slug: "ministry-home-affairs-police-station-connectivity",
    title: "Last Mile Connectivity to Police Stations",
    client: "Ministry of Home Affairs",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "network-infrastructure",
    location: "Tanzania (multiple regions)",
    completionDate: "2016-12-31",
    completionLabel: "2015 – 2016",
    status: "completed",
    featured: true,
    cover: img("/images/photos/switch-fibre-copper.jpg", "Network switch with fibre and copper patch cables connected to its ports"),
    gallery: [
      img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
      img("/images/photos/fibre-distribution.jpg", "Fibre optic distribution frame with rows of terminated patch cords"),
    ],
    summary:
      "Supply and installation of last mile connectivity to police stations across the country.",
    scope:
      "Police stations distributed across the country needed reliable last-mile connectivity to central Ministry systems. Sites varied widely in existing infrastructure, access and power availability.",
    solution:
      "KOTES ran a site study for each station, selected the appropriate last-mile medium per location, then supplied and installed the connectivity and terminating equipment. Standardised configuration templates kept the estate consistent and supportable.",
    outcomes: [
      "Police stations connected to central Ministry systems",
      "Per-site technical survey ensured the right medium at each location",
      "Standardised configuration simplified ongoing Ministry support",
    ],
    contractValueTZS: 1570195615,
    order: 3,
    active: true,
  },
  {
    id: "prj-moha-lastmile-2014-2015",
    slug: "ministry-home-affairs-last-mile-connectivity-phase-one",
    title: "Police Station Connectivity — Phase One",
    client: "Ministry of Home Affairs",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "network-infrastructure",
    location: "Tanzania (multiple regions)",
    completionDate: "2015-12-31",
    completionLabel: "2014 – 2015",
    status: "completed",
    featured: false,
    cover: img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    gallery: [img("/images/photos/switch-fibre-copper.jpg", "Network switch with fibre and copper patch cables connected to its ports")],
    summary: "Supply and installation of last mile connectivity to various police stations.",
    scope:
      "The first phase of the Ministry's connectivity programme, covering supply and installation of last mile links to an initial group of police stations.",
    solution:
      "KOTES delivered surveys, supply, installation and commissioning for each station in the phase, establishing the deployment model and documentation standard reused in later phases.",
    outcomes: [
      "Initial group of stations brought onto the Ministry network",
      "Deployment and documentation model established for subsequent phases",
      "Successful delivery led to award of follow-on contracts",
    ],
    contractValueTZS: 1046772100,
    order: 4,
    active: true,
  },
  {
    id: "prj-tpa-lan",
    slug: "tanzania-ports-authority-lan-extension",
    title: "TPA LAN Extension Across Dar es Salaam Port",
    client: "Tanzania Ports Authority",
    clientConfidential: false,
    clientIndustry: "Transport & Logistics",
    category: "network-infrastructure",
    location: "Dar es Salaam Port, Tanzania",
    completionDate: "2016-12-31",
    completionLabel: "2015 – 2016",
    status: "completed",
    featured: true,
    cover: img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    gallery: [
      img("/images/photos/switch-fibre-copper.jpg", "Network switch with fibre and copper patch cables connected to its ports"),
      img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk"),
    ],
    summary:
      "Extension of the Tanzania Ports Authority local area network to additional offices within Dar es Salaam Port.",
    scope:
      "TPA needed its existing local area network extended to further offices inside the Dar es Salaam Port estate — an operational environment where cabling routes, heavy vehicle movement and continuous port activity all constrain the work.",
    solution:
      "KOTES surveyed the port estate, designed the network extension to integrate cleanly with the existing TPA core, and installed structured cabling and active equipment in phases scheduled around port operations. Each link was certified before handover.",
    outcomes: [
      "Additional port offices brought onto the corporate network",
      "Works phased around live port operations with no service interruption",
      "Extension integrated with the existing TPA core without redesign",
    ],
    contractValueTZS: 624657898,
    order: 5,
    active: true,
  },
  {
    id: "prj-mocict-opgw-nictbb",
    slug: "nictbb-opgw-fibre-routes",
    title: "OPGW Fibre Optic Cable Works for NICTBB Routes",
    client: "Ministry of Communication & ICT",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "fibre-optic",
    location: "Tanzania (NICTBB routes)",
    completionDate: "2023-12-31",
    completionLabel: "2022 – 2023",
    status: "completed",
    featured: true,
    cover: img("/images/photos/fibre-distribution.jpg", "Fibre optic distribution frame with rows of terminated patch cords"),
    gallery: [
      img("/images/photos/patch-panel.jpg", "Structured cabling patch panel with numbered ports and connected patch leads"),
      img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk"),
    ],
    summary:
      "Construction, installation, testing and commissioning services for OPGW optic fibre cable on National ICT Broadband Backbone routes.",
    scope:
      "Optical Ground Wire (OPGW) carries fibre on overhead transmission infrastructure, combining an earth conductor with optical cores. The Ministry required construction, installation, testing and commissioning across National ICT Broadband Backbone routes — work that demands specialist crews, height access and strict safety control.",
    solution:
      "KOTES mobilised specialist crews for OPGW stringing, splicing and termination along the assigned routes, followed by full optical testing and commissioning. Route records and test results were compiled into acceptance documentation for the Ministry.",
    outcomes: [
      "OPGW fibre routes constructed, tested and commissioned on the national backbone",
      "Specialist overhead installation delivered under strict safety control",
      "Acceptance documentation and optical records delivered per route",
    ],
    contractValueTZS: 984597852,
    order: 6,
    active: true,
  },
  {
    id: "prj-dit-rafic",
    slug: "dit-ict-infrastructure-rafic-project",
    title: "ICT Infrastructure for the RAFIC Project",
    client: "Dar es Salaam Institute of Technology (DIT)",
    clientConfidential: false,
    clientIndustry: "Higher Education",
    category: "systems-integration",
    location: "Dar es Salaam, Tanzania",
    completionDate: "2025-06-30",
    completionLabel: "2023 – 2025",
    status: "completed",
    featured: true,
    cover: img("/images/photos/engineer-workstation.jpg", "Engineer working at a multi-monitor workstation reviewing system output"),
    gallery: [
      img("/images/photos/switch-fibre-copper.jpg", "Network switch with fibre and copper patch cables connected to its ports"),
      img("/images/photos/monitoring-dashboard.jpg", "Monitoring dashboard on screen showing live system performance metrics"),
      img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk"),
    ],
    summary:
      "Supply and installation of complete ICT infrastructure for the RAFIC project at Dar es Salaam Institute of Technology.",
    scope:
      "DIT's RAFIC project required a complete ICT infrastructure build — network, equipment and supporting systems — delivered into an active teaching institution across a multi-year programme.",
    solution:
      "KOTES supplied and installed the full infrastructure stack, integrating network, compute and supporting systems into a single documented estate. Delivery was phased across academic calendars to avoid disruption to teaching.",
    outcomes: [
      "Complete ICT infrastructure delivered and integrated for the RAFIC project",
      "Multi-year delivery phased around the academic calendar",
      "One accountable integrator across network, equipment and supporting systems",
    ],
    contractValueTZS: 7208875600,
    order: 7,
    active: true,
  },
  {
    id: "prj-nmaist-fibre",
    slug: "nm-aist-fibre-infrastructure",
    title: "Fibre Infrastructure for Nelson Mandela Institute of Science & Technology",
    client: "Nelson Mandela African Institution of Science and Technology",
    clientConfidential: false,
    clientIndustry: "Higher Education",
    category: "fibre-optic",
    location: "Arusha, Tanzania",
    completionDate: "2025-06-30",
    completionLabel: "2024 – 2025",
    status: "completed",
    featured: true,
    cover: img("/images/photos/patch-panel.jpg", "Structured cabling patch panel with numbered ports and connected patch leads"),
    gallery: [
      img("/images/photos/fibre-distribution.jpg", "Fibre optic distribution frame with rows of terminated patch cords"),
      img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    ],
    summary:
      "Supply and installation of fibre infrastructure across the NM-AIST campus under competitive tender.",
    scope:
      "NM-AIST required campus-wide fibre infrastructure to connect academic, research and administrative buildings with the capacity that research workloads demand.",
    solution:
      "KOTES won the tender and delivered survey, design, civil works, cabling, splicing and certification across the campus, integrating the new routes with existing campus distribution points.",
    outcomes: [
      "Campus-wide fibre infrastructure supplied and installed",
      "Research-grade capacity delivered between academic buildings",
      "Certified links documented for campus IT to maintain",
    ],
    contractValueTZS: 509798975,
    order: 8,
    active: true,
  },
  {
    id: "prj-metl-ict",
    slug: "metl-ict-equipment-accessories",
    title: "ICT Equipment & Accessories Supply for MeTL Group",
    client: "MeTL Group",
    clientConfidential: false,
    clientIndustry: "Private Sector — Conglomerate",
    category: "ict-supply",
    location: "Tanzania",
    completionDate: "2024-12-31",
    completionLabel: "2023 – 2024",
    status: "completed",
    featured: false,
    cover: img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board"),
    gallery: [img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators")],
    summary: "Supply of ICT equipment and accessories to one of Tanzania's largest private conglomerates.",
    scope:
      "MeTL Group required ICT equipment and accessories supplied across its business units, with consistent specification and warranty terms across a diverse group structure.",
    solution:
      "KOTES sourced equipment through authorised channels, standardised the specification across units, and delivered with configuration, asset records and warranty documentation in place.",
    outcomes: [
      "Standardised equipment specification across group business units",
      "Authorised-channel sourcing with full manufacturer warranty",
      "Asset and warranty records delivered for group IT administration",
    ],
    contractValueTZS: 663958860,
    order: 9,
    active: true,
  },
  {
    id: "prj-mow-data-tools",
    slug: "ministry-water-office-data-management-tools",
    title: "Office Data Management Tools & ICT Equipment",
    client: "Ministry of Water",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "ict-supply",
    location: "Dodoma, Tanzania",
    completionDate: "2021-12-31",
    completionLabel: "2021",
    status: "completed",
    featured: false,
    cover: img("/images/photos/monitoring-dashboard.jpg", "Monitoring dashboard on screen showing live system performance metrics"),
    gallery: [img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board")],
    summary: "Supply of office data management tools and equipment, including ICT equipment, to the Ministry of Water.",
    scope:
      "The Ministry of Water required office data management tooling and supporting ICT equipment to modernise records handling across its offices.",
    solution:
      "KOTES supplied, delivered and installed the data management tooling and associated ICT equipment, with configuration and user handover completed on site.",
    outcomes: [
      "Data management tooling deployed across Ministry offices",
      "Equipment delivered configured and ready for use",
      "Follow-on supply contracts awarded on the strength of delivery",
    ],
    contractValueTZS: 1257361695,
    order: 10,
    active: true,
  },
  {
    id: "prj-taifa-gas-2023",
    slug: "taifa-gas-ict-equipment-accessories",
    title: "ICT Equipment & Accessories for Taifa Gas",
    client: "Taifa Gas",
    clientConfidential: false,
    clientIndustry: "Energy",
    category: "ict-supply",
    location: "Tanzania",
    completionDate: "2023-12-31",
    completionLabel: "2023",
    status: "completed",
    featured: false,
    cover: img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    gallery: [img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board")],
    summary: "Supply of ICT equipment and accessories supporting Taifa Gas operations.",
    scope:
      "Taifa Gas required ICT equipment and accessories to support expanding operations, delivered to specification and on schedule.",
    solution:
      "KOTES specified, sourced and delivered the equipment with installation and configuration, following the successful 2022 computer equipment supply.",
    outcomes: [
      "Equipment supplied and installed to specification",
      "Repeat award following earlier successful delivery",
      "Warranty and post-sale support provided throughout",
    ],
    contractValueTZS: 474052645,
    order: 11,
    active: true,
  },
  {
    id: "prj-taifa-gas-2022",
    slug: "taifa-gas-computer-equipment",
    title: "Computer Equipment Supply for Taifa Gas",
    client: "Taifa Gas",
    clientConfidential: false,
    clientIndustry: "Energy",
    category: "ict-supply",
    location: "Tanzania",
    completionDate: "2022-12-31",
    completionLabel: "2022",
    status: "completed",
    featured: false,
    cover: img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board"),
    gallery: [img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators")],
    summary: "Supply of computer equipment for Taifa Gas corporate operations.",
    scope: "Taifa Gas required computer equipment supplied and commissioned for corporate users.",
    solution:
      "KOTES supplied, imaged and installed the equipment, with asset tagging and warranty registration completed at handover.",
    outcomes: [
      "Computer estate delivered ready for use",
      "Asset and warranty records handed over on completion",
      "Established the relationship that led to the 2023 award",
    ],
    contractValueTZS: 354252645,
    order: 12,
    active: true,
  },
  {
    id: "prj-moa-equipment",
    slug: "ministry-agriculture-computer-equipment",
    title: "Computer Equipment & Accessories for the Ministry of Agriculture",
    client: "Ministry of Agriculture",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "ict-supply",
    location: "Dodoma, Tanzania",
    completionDate: "2020-12-31",
    completionLabel: "2020",
    status: "completed",
    featured: false,
    cover: img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    gallery: [img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board")],
    summary: "Supply of computer equipment and accessories to the Ministry of Agriculture.",
    scope: "The Ministry required computer equipment and accessories delivered under public procurement terms.",
    solution:
      "KOTES supplied the equipment with full technical compliance documentation, delivery and installation completed to the procurement schedule.",
    outcomes: [
      "Equipment delivered within the procurement schedule",
      "Full technical compliance documentation supplied",
      "Installation and user handover completed on site",
    ],
    contractValueTZS: 77764600,
    order: 13,
    active: true,
  },
  {
    id: "prj-mow-equipment",
    slug: "ministry-water-computer-equipment-supply",
    title: "Computer Equipment Supply Programme — Ministry of Water",
    client: "Ministry of Water",
    clientConfidential: false,
    clientIndustry: "Government",
    category: "ict-supply",
    location: "Dodoma, Tanzania",
    completionDate: "2022-12-31",
    completionLabel: "2020 – 2022",
    status: "completed",
    featured: false,
    cover: img("/images/photos/circuit-board.jpg", "Close-up of a populated electronic circuit board"),
    gallery: [img("/images/photos/monitoring-dashboard.jpg", "Monitoring dashboard on screen showing live system performance metrics")],
    summary: "Multi-year computer equipment supply programme for the Ministry of Water.",
    scope:
      "A multi-year programme supplying computer equipment across Ministry of Water offices, requiring consistent specification and support over several procurement cycles.",
    solution:
      "KOTES maintained a standard specification across the programme, delivering, installing and supporting each tranche while keeping the estate consistent and serviceable.",
    outcomes: [
      "Consistent equipment standard maintained across procurement cycles",
      "Multi-year delivery completed against schedule",
      "Single support baseline across Ministry offices",
    ],
    valueConfidential: true,
    order: 14,
    active: true,
  },
  {
    id: "prj-songwe-ict",
    slug: "songwe-river-basin-commission-ict-supply",
    title: "ICT Equipment Supply — Songwe River Basin Commission",
    client: "Songwe River Basin Commission",
    clientConfidential: false,
    clientIndustry: "Government Agency",
    category: "ict-supply",
    location: "Songwe, Tanzania",
    completionDate: "2023-12-31",
    completionLabel: "2023",
    status: "completed",
    featured: false,
    cover: img("/images/photos/datacenter-racks.jpg", "Data centre racks filled with dense structured cabling and status indicators"),
    gallery: [img("/images/photos/technical-drawings.jpg", "Technical drawings and design documentation laid out on a desk")],
    summary: "Supply of ICT equipment to the Songwe River Basin Commission.",
    scope:
      "The Commission required ICT equipment supplied and installed to support its basin management operations from a regional base.",
    solution:
      "KOTES supplied, delivered and installed the equipment on site, including configuration and user handover in a remote regional location.",
    outcomes: [
      "Equipment delivered and installed at a remote regional base",
      "Configuration and user handover completed on site",
      "Operations supported without a permanent local IT presence",
    ],
    valueConfidential: true,
    order: 15,
    active: true,
  },
];

/* --------------------------------------------------------------- selectors */

export const activeProjects = projects
  .filter((p) => p.active)
  .sort((a, b) => a.order - b.order);

export const featuredProjects = activeProjects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return activeProjects.find((p) => p.slug === slug);
}

export function getCategory(id: string): ProjectCategory | undefined {
  return projectCategories.find((c) => c.id === id);
}

/** Client name respecting the confidentiality flag. */
export function displayClient(project: Project): string {
  return project.clientConfidential ? "Confidential client" : project.client;
}

/** Categories that actually have projects, in display order. */
export const usedCategories = projectCategories
  .filter((c) => activeProjects.some((p) => p.category === c.id))
  .sort((a, b) => a.order - b.order);

export function formatTZS(value: number): string {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(value);
}
