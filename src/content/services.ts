import { photos } from "./media";
import type { Service } from "./types";

/**
 * Services shown on /services, /services/[slug] and the home page preview.
 *
 * To add a service: append an object, give it a unique `slug`, set `order`.
 * To hide one without losing the content: set `active: false`.
 * To reorder: change `order` (ascending).
 */
export const services: Service[] = [
  {
    id: "svc-network",
    slug: "network-infrastructure",
    title: "Network Infrastructure & Communication Systems",
    summary:
      "Consulting, design and deployment of LAN, WAN and wireless networks, secure VPNs and enterprise telephony built for uptime.",
    description: [
      "KOTES provides expert consultation, planning and implementation of Local Area Networks (LAN), Wide Area Networks (WAN) and wireless solutions (WLAN). Every engagement begins with a site survey and a network architecture plan sized to your traffic, growth and security profile.",
      "We deliver structured cabling to international standards, bandwidth management, VPN and firewall configuration, and PABX and IP telephony systems for institutions that need robust internal and external communication.",
      "The result is a single, documented network estate — designed, installed, tested and handed over with as-built drawings your own team can maintain.",
    ],
    icon: "network",
    image: photos.patchPanel,
    benefits: [
      { title: "Designed for growth", description: "Architecture sized for tomorrow's user count, not just today's, so expansion does not mean re-cabling." },
      { title: "Secure by default", description: "Segmentation, firewall policy and VPN access designed in from the first drawing rather than bolted on later." },
      { title: "Standards-compliant cabling", description: "Structured cabling installed, tested and certified to recognised international standards." },
      { title: "Unified communications", description: "PABX and IP telephony integrated with the data network to cut recurring call costs." },
    ],
    process: [
      { step: 1, title: "Site survey", description: "Physical walkthrough, existing-estate audit and traffic profiling across every location in scope." },
      { step: 2, title: "Architecture & design", description: "Logical and physical design, bill of quantities and a costed implementation plan for sign-off." },
      { step: 3, title: "Deployment", description: "Cabling, active equipment installation and configuration executed to an agreed phased schedule." },
      { step: 4, title: "Testing & certification", description: "Link-by-link certification, performance testing and documented remediation of every fault found." },
      { step: 5, title: "Handover & support", description: "As-built documentation, administrator training and an optional maintenance agreement." },
    ],
    capabilities: [
      "LAN, WAN and WLAN design and deployment",
      "Structured cabling and containment",
      "VPN and firewall solutions",
      "Bandwidth and network infrastructure management",
      "PABX and IP telephony systems",
      "Technical site studies and infrastructure recommendations",
    ],
    order: 1,
    active: true,
    featured: true,
  },
  {
    id: "svc-fiber",
    slug: "fibre-optic-solutions",
    title: "Fibre Optic Installation & Management",
    summary:
      "Single-mode, multimode and POF fibre networks — design, trenching, splicing, termination and OTDR certification over long distances.",
    description: [
      "From design to deployment, KOTES installs high-speed fibre optic networks including single-mode, multi-mode and plastic optical fibre. Our teams have delivered outside-plant fibre routes, last-mile connectivity and OPGW installations on national backbone projects.",
      "Work includes route survey and civil works, cable laying, splicing, termination, testing and certification of fibre systems — ensuring seamless data transmission over long distances with minimal signal loss.",
      "Every route is handed over with OTDR traces, splice records and route drawings so future faults can be located in minutes rather than days.",
    ],
    icon: "fiber",
    image: photos.fibreDistribution,
    benefits: [
      { title: "Long-haul capability", description: "Proven on national backbone and outside-plant routes, not only in-building runs." },
      { title: "Certified terminations", description: "OTDR-tested splices with loss budgets documented per link at handover." },
      { title: "Civil works included", description: "Trenching, ducting and reinstatement managed in-house, so one contract covers the whole route." },
      { title: "Minimal downtime", description: "Phased cutovers planned around your operating hours to keep services live." },
    ],
    process: [
      { step: 1, title: "Route survey", description: "Field survey of the proposed route, obstacles, way-leaves and permit requirements." },
      { step: 2, title: "Design & loss budget", description: "Route design, fibre count selection and an end-to-end optical loss budget." },
      { step: 3, title: "Civil works", description: "Trenching, ducting, chambers and reinstatement executed to specification." },
      { step: 4, title: "Cabling & splicing", description: "Cable pulling or blowing, fusion splicing, termination and enclosure fit-out." },
      { step: 5, title: "OTDR certification", description: "Bidirectional OTDR testing, splice records and as-built route documentation." },
    ],
    capabilities: [
      "Outside plant (OSP) fibre optic cable deployment",
      "Last-mile connectivity to distributed sites",
      "OPGW installation, testing and commissioning",
      "Single-mode, multimode and POF cabling",
      "Fusion splicing, termination and OTDR certification",
      "Fibre route civil works and reinstatement",
    ],
    order: 2,
    active: true,
    featured: true,
  },
  {
    id: "svc-hardware",
    slug: "ict-hardware-supply",
    title: "ICT Hardware Supply & Systems Support",
    summary:
      "Supply, installation and lifecycle support of servers, desktops, laptops, printers, telephony and accessories with full warranty backing.",
    description: [
      "KOTES supplies and installs a full range of ICT hardware — servers, desktops, laptops, printers, executive and secretarial phones and accessories. All equipment is sourced through authorised channels and comes with warranty support and post-sale service.",
      "Support includes comprehensive maintenance packages, on-site repair, preventive maintenance and warranty extension through recognised service centres.",
      "We also manage physical and virtual IT infrastructure on your behalf, ensuring optimal performance and efficiency across hardware, networks and storage systems.",
    ],
    icon: "server",
    image: photos.datacenter,
    benefits: [
      { title: "Authorised sourcing", description: "Equipment procured through vendor-authorised channels with valid manufacturer warranty." },
      { title: "Delivered ready to use", description: "Imaging, configuration and asset tagging completed before deployment to the desk." },
      { title: "Tender-ready documentation", description: "Full technical compliance sheets and certificates supplied for public procurement." },
      { title: "Lifecycle support", description: "Preventive maintenance and warranty extension keep the estate serviceable for longer." },
    ],
    process: [
      { step: 1, title: "Requirements & specification", description: "Workload analysis and a technical specification matched to budget and procurement rules." },
      { step: 2, title: "Sourcing & quotation", description: "Authorised-channel sourcing with transparent, itemised quotation and lead times." },
      { step: 3, title: "Delivery & installation", description: "Delivery, imaging, configuration, asset tagging and desk-side installation." },
      { step: 4, title: "Commissioning", description: "Acceptance testing, user handover and documentation of serial numbers and warranties." },
      { step: 5, title: "Warranty & maintenance", description: "On-site repair, preventive maintenance visits and warranty administration." },
    ],
    capabilities: [
      "Servers, desktops, laptops and printers",
      "Executive and secretarial telephone systems",
      "ICT accessories and consumables",
      "Warranty and post-warranty service",
      "Preventive maintenance programmes",
      "Infrastructure resource management",
    ],
    order: 3,
    active: true,
    featured: true,
  },
  {
    id: "svc-data",
    slug: "data-management-protection",
    title: "Data Management & Protection",
    summary:
      "Backup architecture, SAN/NAS storage, disaster recovery and retention management that keep your data available when systems fail.",
    description: [
      "KOTES designs backup architecture and data recovery solutions that ensure business continuity in the event of system failure or data loss, covering both cloud and on-premise backup systems.",
      "We install and manage Storage Area Networks (SAN) and Network Attached Storage (NAS) to enable high-capacity, secure and scalable data access across enterprise networks.",
      "Disk and tape management support ensures data retention policies and compliance standards are met, with restore procedures tested rather than assumed.",
    ],
    icon: "database",
    image: photos.circuitBoard,
    benefits: [
      { title: "Tested restores", description: "Recovery drills prove the backup works before you need it, not during an incident." },
      { title: "Defined RPO and RTO", description: "Backup windows and recovery targets agreed against real business impact, then engineered to." },
      { title: "Compliance-ready retention", description: "Retention schedules and audit records aligned to your regulatory obligations." },
      { title: "Scalable capacity", description: "SAN and NAS platforms that expand without forking the storage estate." },
    ],
    process: [
      { step: 1, title: "Data assessment", description: "Inventory of systems, data volumes, growth rates and criticality tiers." },
      { step: 2, title: "RPO/RTO definition", description: "Agreement on acceptable data loss and downtime for each system tier." },
      { step: 3, title: "Architecture", description: "Backup topology, storage sizing and off-site or cloud replication design." },
      { step: 4, title: "Implementation", description: "Installation, policy configuration, initial seeding and monitoring setup." },
      { step: 5, title: "Recovery testing", description: "Scheduled restore drills with documented results and corrective actions." },
    ],
    capabilities: [
      "Cloud and on-premise backup architecture",
      "Storage Area Network (SAN) deployment",
      "Network Attached Storage (NAS) deployment",
      "Disaster recovery planning and testing",
      "Disk and tape management systems",
      "Data retention and compliance support",
    ],
    order: 4,
    active: true,
    featured: true,
  },
  {
    id: "svc-integration",
    slug: "systems-integration",
    title: "Systems Integration & Performance Optimisation",
    summary:
      "Making separately procured systems work as one — integration, tuning and performance management consulting across your ICT estate.",
    description: [
      "Institutions rarely buy everything from one vendor. KOTES specialises in making separately procured systems work as a single estate — integrating networks, servers, storage, telephony and applications into a coherent, monitored whole.",
      "Our system and performance management consulting identifies bottlenecks across the stack and delivers a prioritised remediation plan with measurable targets.",
      "Remote clustering and managed continuity services extend this to high-availability designs for the systems your operations cannot run without.",
    ],
    icon: "chip",
    image: photos.engineer,
    benefits: [
      { title: "Vendor-neutral", description: "We integrate what you already own rather than pushing a replacement purchase." },
      { title: "Measured improvement", description: "Baseline metrics captured before and after, so the gain is demonstrable." },
      { title: "Fewer handoff failures", description: "One accountable integrator across systems removes the finger-pointing between suppliers." },
      { title: "High availability", description: "Clustering and continuity design for the systems that must not stop." },
    ],
    process: [
      { step: 1, title: "Discovery", description: "Mapping of systems, interfaces, dependencies and current performance baselines." },
      { step: 2, title: "Gap analysis", description: "Identification of integration gaps, bottlenecks and single points of failure." },
      { step: 3, title: "Integration design", description: "Target architecture, interface specifications and a phased migration plan." },
      { step: 4, title: "Implementation", description: "Staged integration with rollback points and controlled cutover windows." },
      { step: 5, title: "Optimisation", description: "Tuning against the baseline, monitoring setup and knowledge transfer." },
    ],
    capabilities: [
      "Customised ICT systems and solutions",
      "System and performance management consulting",
      "Remote clustering and managed continuity",
      "Antivirus and multi-platform operating system support",
      "Interface and middleware integration",
      "Monitoring and alerting implementation",
    ],
    order: 5,
    active: true,
    featured: true,
  },
  {
    id: "svc-managed",
    slug: "maintenance-managed-services",
    title: "ICT Maintenance & Managed Services",
    summary:
      "Proactive 24/7/365 monitoring, maintenance agreements with spare-parts commitment, and fully outsourced ICT support.",
    description: [
      "Managed continuity services provide proactive monitoring and support for critical systems 24/7/365, ensuring uptime, system health and business continuity.",
      "Our maintenance agreements are customisable and can include spare-parts commitment, preventive maintenance visits, emergency response within four hours and on-site technical support.",
      "Clients can outsource partial or complete ICT support to KOTES, gaining access to experienced certified engineers without the cost of internal staffing.",
    ],
    icon: "headset",
    image: photos.monitoring,
    benefits: [
      { title: "Four-hour emergency response", description: "Contracted on-site response for critical incidents, backed by a committed spares pool." },
      { title: "Predictable cost", description: "A fixed annual agreement replaces unbudgeted emergency repair spend." },
      { title: "Certified engineers on tap", description: "Access to a full engineering bench without carrying the headcount." },
      { title: "Fewer incidents", description: "Preventive maintenance and monitoring catch failures before users report them." },
    ],
    process: [
      { step: 1, title: "Estate audit", description: "Inventory and condition assessment of every asset to be covered." },
      { step: 2, title: "Service level agreement", description: "Response and resolution targets, coverage hours and spares commitment agreed in writing." },
      { step: 3, title: "Onboarding", description: "Monitoring agents deployed, escalation paths and contact matrix established." },
      { step: 4, title: "Proactive operations", description: "24/7 monitoring, scheduled preventive maintenance and incident response." },
      { step: 5, title: "Service review", description: "Periodic reporting on SLA performance, incident trends and improvement actions." },
    ],
    capabilities: [
      "24/7/365 proactive monitoring",
      "Comprehensive maintenance agreements",
      "Four-hour emergency response",
      "Outsourced ICT support desk",
      "Preventive maintenance scheduling",
      "Spare parts commitment",
    ],
    order: 6,
    active: true,
    featured: true,
  },
];

export const activeServices = services
  .filter((s) => s.active)
  .sort((a, b) => a.order - b.order);

export const featuredServices = activeServices.filter((s) => s.featured);

export function getServiceBySlug(slug: string): Service | undefined {
  return activeServices.find((s) => s.slug === slug);
}

/** Options for the "Service of interest" field on the contact form. */
export const serviceOptions: string[] = [
  ...activeServices.map((s) => s.title),
  "General enquiry",
  "Other",
];
