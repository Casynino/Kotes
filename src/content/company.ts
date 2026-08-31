import type { CompanyProfile, SiteSettings } from "./types";

/**
 * Single source of truth for company identity and contact details.
 * Editing this file updates the header, footer, contact page, JSON-LD schema
 * and every email template. No component hard-codes an address or phone number.
 */
export const company: CompanyProfile = {
  legalName: "KOTES (T) LIMITED",
  shortName: "KOTES",
  tagline: "Your Reliable Partner in ICT Innovation, Integration and Support",
  valueProposition:
    "We design, deploy and maintain the ICT infrastructure that keeps Tanzania's institutions connected — from national fibre optic backbones to enterprise networks, data protection and 24/7 managed support.",
  foundedISO: "1995-05-15",
  foundedLabel: "15 May 1995",
  tin: "101-046-192",
  email: "info@kotes.co.tz",
  phones: ["+255 222 123 249", "+255 756 529 083"],
  primaryPhoneE164: "+255756529083",
  whatsapp: "+255756529083",
  address: {
    street: "6 Kasenga Street, Mbezi Beach B",
    poBox: "P.O. Box 7211",
    city: "Dar es Salaam",
    region: "Dar es Salaam",
    country: "Tanzania",
    countryCode: "TZ",
    // Approximate coordinates for Mbezi Beach B. Replace with the surveyed
    // position of the head office if you need pin-accurate mapping.
    geo: { lat: -6.7139, lng: 39.2214 },
    mapQuery: "Kasenga Street, Mbezi Beach B, Dar es Salaam, Tanzania",
  },
  hours: [
    { days: "Monday – Friday", hours: "08:00 – 17:00" },
    { days: "Saturday", hours: "09:00 – 13:00" },
    { days: "Sunday & Public Holidays", hours: "Closed (24/7 emergency support for contract clients)" },
  ],
  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/kotes-t-limited", platform: "linkedin", active: true },
    { id: "twitter", label: "X (Twitter)", href: "https://x.com/kotestz", platform: "twitter", active: false },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/kotestz", platform: "facebook", active: false },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/255756529083", platform: "whatsapp", active: true },
  ],
};

export const site: SiteSettings = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kotes.co.tz").replace(/\/$/, ""),
  name: "KOTES (T) LIMITED",
  titleTemplate: "%s | KOTES (T) LIMITED",
  defaultTitle: "KOTES (T) LIMITED — ICT Infrastructure & Systems Integration in Tanzania",
  defaultDescription:
    "KOTES (T) LIMITED is a Tanzanian ICT company delivering fibre optic networks, systems integration, ICT equipment supply, data protection and 24/7 managed support to government and enterprise since 1995.",
  keywords: [
    "ICT company Tanzania",
    "fibre optic installation Dar es Salaam",
    "network infrastructure Tanzania",
    "systems integration",
    "ICT equipment supply",
    "structured cabling",
    "managed IT services Tanzania",
    "KOTES",
  ],
  locale: "en_TZ",
  // Generated at build time by src/app/opengraph-image.tsx.
  ogImage: {
    src: "/opengraph-image",
    alt: "KOTES (T) LIMITED — ICT infrastructure and systems integration in Tanzania",
    width: 1200,
    height: 630,
  },
};

/** Convenience: full postal address on one line. */
export const addressLine = [
  company.address.street,
  company.address.poBox,
  `${company.address.city}, ${company.address.country}`,
].join(", ");
