import type { Certification, CoreValue, Differentiator, Milestone, Stat } from "./types";

export const mission =
  "To deliver innovative, efficient and customized ICT services that empower clients through advanced technology, reliability and professionalism.";

export const vision =
  "To be a leading provider of cutting-edge ICT solutions and services in East Africa and beyond.";

export const aboutStory: string[] = [
  "KOTES (T) LIMITED is a premier Information and Communication Technology company based in Tanzania. Founded on 15 May 1995, it is a dynamic, locally-owned enterprise with a strong reputation for delivering high-quality, tailored ICT solutions across the public and private sectors.",
  "With a highly skilled team of certified engineers, KOTES provides strategic services ranging from network design and integration to mission-critical ICT infrastructure deployment and maintenance. The company is recognised as a trusted government IT tender holder and continues to expand its operations across Tanzania to maintain close relationships with its clients.",
  "Three decades on, that work runs through some of the country's most relied-upon institutions — ministries, ports, universities and regulators — where the networks we build carry services people depend on every day.",
];

export const coreValues: CoreValue[] = [
  {
    id: "val-service",
    title: "Customer Service",
    icon: "headset",
    description:
      "We are committed to delivering exceptional ICT and infrastructure solutions tailored to meet our clients' unique needs. We build lasting relationships by prioritising responsiveness, reliability and continuous support, ensuring optimal value and client satisfaction.",
  },
  {
    id: "val-quality",
    title: "Commitment to Quality",
    icon: "award",
    description:
      "We take pride in providing high-quality, future-ready ICT services — including network infrastructure, data management and systems integration. Our pursuit of innovation drives us to offer smart, scalable and efficient solutions that exceed industry standards.",
  },
  {
    id: "val-integrity",
    title: "Integrity",
    icon: "shield",
    description:
      "Our operations are founded on honesty, transparency and ethical conduct. Every engagement is handled with integrity, ensuring mutual trust and long-term success for our clients, partners and stakeholders.",
  },
];

export const keysToSuccess: string[] = [
  "Proven experience in delivering scalable ICT, network and communication solutions.",
  "Extensive partnerships with global technology vendors ensuring high-quality product and service delivery.",
  "Dedicated to driving digital transformation through innovative and secure technology solutions.",
  "Recognised by government institutions, corporate enterprises and NGOs as a reliable ICT partner.",
  "Commitment to client satisfaction through excellence in service delivery and technical support.",
  "Strategic alliances with industry leaders to ensure seamless system integration and operational efficiency.",
];

export const differentiators: Differentiator[] = [
  {
    id: "diff-comprehensive",
    title: "Comprehensive Solutions",
    icon: "sparkle",
    description:
      "From hardware to software, cabling to maintenance, we are your all-in-one partner. One contract, one accountable team, no gaps between suppliers.",
  },
  {
    id: "diff-reliability",
    title: "Reliability",
    icon: "shield",
    description:
      "Quality products sourced from trusted brands through authorised channels, with valid manufacturer warranty and documented compliance.",
  },
  {
    id: "diff-support",
    title: "Expert Support",
    icon: "headset",
    description:
      "Dedicated certified professionals ready to assist with installation, support and troubleshooting — including four-hour emergency response for contract clients.",
  },
  {
    id: "diff-value",
    title: "Cost-Effective",
    icon: "chart",
    description:
      "Competitive pricing without compromising on quality and performance, with transparent itemised quotations and no hidden charges.",
  },
  {
    id: "diff-track-record",
    title: "Proven Track Record",
    icon: "check",
    description:
      "Three decades of delivery for ministries, authorities and universities — including national backbone fibre routes and multi-billion shilling contracts.",
  },
  {
    id: "diff-local",
    title: "Local Presence, Global Standards",
    icon: "handshake",
    description:
      "A locally-owned Tanzanian enterprise with engineers on the ground nationwide, working to recognised international standards and vendor certifications.",
  },
];

export const milestones: Milestone[] = [
  { id: "ms-1995", year: "1995", title: "KOTES (T) LIMITED founded", description: "Incorporated in Dar es Salaam on 15 May 1995 as a locally-owned ICT enterprise.", order: 1 },
  { id: "ms-2008", year: "2008", title: "Registered specialised contractor", description: "Registered with the Contractors Registration Board as a Class One specialised contractor in telecommunications, ICT and security systems.", order: 2 },
  { id: "ms-2015", year: "2015 – 2016", title: "National fibre programmes", description: "Delivered outside plant fibre for the President's Office and last-mile connectivity for the Ministry of Home Affairs, alongside the TPA port network extension.", order: 3 },
  { id: "ms-2020", year: "2020 – 2022", title: "Multi-year supply programmes", description: "Sustained equipment supply programmes for the Ministries of Water and Agriculture across successive procurement cycles.", order: 4 },
  { id: "ms-2023", year: "2022 – 2023", title: "NICTBB backbone works", description: "Construction, installation, testing and commissioning of OPGW fibre on National ICT Broadband Backbone routes.", order: 5 },
  { id: "ms-2025", year: "2023 – 2025", title: "Higher education infrastructure", description: "ICT infrastructure for the DIT RAFIC project and campus fibre infrastructure for NM-AIST.", order: 6 },
];

export const certifications: Certification[] = [
  { id: "cert-incorp", name: "Certificate of Incorporation", issuer: "Registrar of Companies, Tanzania", detail: "Incorporated under the Companies Ordinance (Cap. 212).", year: "1995", order: 1, active: true },
  { id: "cert-crb", name: "Specialised Contractor — Class One", issuer: "Contractors Registration Board", detail: "Registered in telecommunications, ICT and security systems.", year: "2008", order: 2, active: true },
  { id: "cert-tcra-install", name: "Licence for Installation and Maintenance — Class A", issuer: "Tanzania Communications Regulatory Authority (TCRA)", detail: "Licensed under the Electronic and Postal Communications Act, Cap. 306.", year: "2023", order: 3, active: true },
  { id: "cert-tcra-import", name: "Licence for National Importation", issuer: "Tanzania Communications Regulatory Authority (TCRA)", detail: "Licensed to import communications equipment nationally.", year: "2023", order: 4, active: true },
  { id: "cert-tin", name: "Taxpayer Identification & VAT Registration", issuer: "Tanzania Revenue Authority", detail: "TIN 101-046-192, with current tax clearance.", order: 5, active: true },
  { id: "cert-licence", name: "Business Licence", issuer: "Business Registrations and Licensing Agency (BRELA)", detail: "Installation and maintenance of telecom equipment.", order: 6, active: true },
];

export const activeCertifications = certifications
  .filter((c) => c.active)
  .sort((a, b) => a.order - b.order);

/**
 * Home-page statistics.
 * `value` animates on scroll; `displayOverride` renders a fixed string instead.
 */
export const stats: Stat[] = [
  { id: "st-years", value: 30, suffix: "+", label: "Years in operation" },
  { id: "st-clients", value: 25, suffix: "+", label: "Institutions served" },
  { id: "st-projects", value: 15, suffix: "+", label: "Major contracts delivered" },
  { id: "st-support", value: 24, displayOverride: "24/7", label: "Monitoring & support" },
];
