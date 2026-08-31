/**
 * Content models for the KOTES website.
 *
 * Every page renders from these types — no copy is hard-coded into components.
 * When a headless CMS (Sanity / Payload / Strapi / a database) is introduced,
 * point the loaders in `src/content/index.ts` at the CMS and keep these shapes.
 */

/* ------------------------------------------------------------------ shared */

export type ImageRef = {
  /** Public path or absolute CDN URL. */
  src: string;
  /** Required for accessibility. Describe the image, do not repeat the title. */
  alt: string;
  width?: number;
  height?: number;
};

/** Icon keys resolved by `src/components/ui/Icon.tsx`. */
export type IconName =
  | "network"
  | "fiber"
  | "shield"
  | "server"
  | "database"
  | "wrench"
  | "phone"
  | "cloud"
  | "chip"
  | "headset"
  | "check"
  | "chart"
  | "handshake"
  | "sparkle"
  | "clock"
  | "award";

/* ---------------------------------------------------------- company & site */

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  /** Key resolved by `src/components/ui/SocialIcon.tsx`. */
  platform: "linkedin" | "twitter" | "facebook" | "instagram" | "youtube" | "whatsapp";
  active: boolean;
};

export type OfficeHours = { days: string; hours: string };

export type CompanyProfile = {
  legalName: string;
  shortName: string;
  tagline: string;
  /** One-sentence value proposition used in the hero and meta description. */
  valueProposition: string;
  foundedISO: string;
  foundedLabel: string;
  registrationNumber?: string;
  tin?: string;
  email: string;
  /** Additional inbox shown on the contact page (optional). */
  salesEmail?: string;
  phones: string[];
  /** E.164 number used for tel: and WhatsApp links. */
  primaryPhoneE164: string;
  whatsapp?: string;
  address: {
    street: string;
    poBox: string;
    city: string;
    region: string;
    country: string;
    countryCode: string;
    /** Used for the map embed and LocalBusiness schema. */
    geo?: { lat: number; lng: number };
    mapQuery: string;
  };
  hours: OfficeHours[];
  socials: SocialLink[];
};

export type SiteSettings = {
  /** Canonical origin, no trailing slash. Overridden by NEXT_PUBLIC_SITE_URL. */
  url: string;
  name: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  locale: string;
  ogImage: ImageRef;
  twitterHandle?: string;
};

/* ---------------------------------------------------------------- services */

export type ServiceBenefit = { title: string; description: string };
export type ProcessStep = { step: number; title: string; description: string };

export type Service = {
  id: string;
  slug: string;
  title: string;
  /** Card + meta description. Keep under ~160 characters. */
  summary: string;
  /** Paragraphs rendered on the service detail page. */
  description: string[];
  icon: IconName;
  image?: ImageRef;
  benefits: ServiceBenefit[];
  process: ProcessStep[];
  /** Bullet list of concrete capabilities. */
  capabilities: string[];
  /** Controls order in listings; lower first. */
  order: number;
  /** Hide from the site without deleting the record. */
  active: boolean;
  /** Surface on the home page preview. */
  featured: boolean;
};

/* ---------------------------------------------------------------- projects */

export type ProjectStatus = "completed" | "ongoing";

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  /** When true the client name is masked publicly (confidential engagements). */
  clientConfidential: boolean;
  /** Free-text sector shown on the card, e.g. "Government". */
  clientIndustry?: string;
  /** Must match a `ProjectCategory.id`. */
  category: string;
  location: string;
  /** ISO date or year — drives sorting and the `datePublished` schema field. */
  completionDate: string;
  completionLabel: string;
  status: ProjectStatus;
  featured: boolean;
  cover: ImageRef;
  gallery: ImageRef[];
  /** Short teaser used on cards and search. */
  summary: string;
  scope: string;
  solution: string;
  outcomes: string[];
  /** Contract value in TZS. Hidden when `valueConfidential` is true. */
  contractValueTZS?: number;
  valueConfidential?: boolean;
  externalUrl?: string;
  order: number;
  active: boolean;
};

export type ProjectCategory = {
  id: string;
  label: string;
  description?: string;
  order: number;
};

/* ----------------------------------------------------------------- clients */

export type ClientKind = "client" | "partner";

export type Client = {
  id: string;
  name: string;
  /** Short display name for the logo tile. */
  shortName?: string;
  industry?: string;
  kind: ClientKind;
  /** Drop a real logo file into /public/images/clients and set the path here. */
  logo?: ImageRef;
  /** Fallback monogram rendered when `logo` is absent. */
  monogram: string;
  website?: string;
  successStory?: { title: string; body: string };
  order: number;
  active: boolean;
  featured: boolean;
};

/* -------------------------------------------------------------------- team */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: ImageRef;
  /** Initials fallback when no photo is supplied. */
  initials: string;
  linkedin?: string;
  email?: string;
  order: number;
  active: boolean;
};

/* ------------------------------------------------------------ testimonials */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  organisation?: string;
  /** Optional 1–5 rating. */
  rating?: number;
  order: number;
  active: boolean;
};

/* ------------------------------------------------- about-page supporting content */

export type CoreValue = { id: string; title: string; description: string; icon: IconName };

export type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  detail?: string;
  year?: string;
  order: number;
  active: boolean;
};

export type Stat = {
  id: string;
  /** Numeric portion, animated on scroll. */
  value: number;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  prefix?: string;
  label: string;
  /** Set for values that should not animate (e.g. "24/7"). */
  displayOverride?: string;
};

export type Differentiator = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

/* --------------------------------------------------------------- inquiries */

export type InquiryStatus = "new" | "in_progress" | "contacted" | "closed";

export type Inquiry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceOfInterest: string;
  subject: string;
  message: string;
  budgetRange?: string;
  status: InquiryStatus;
  /** Set when the notification email could not be delivered. */
  emailError?: string;
  meta: { userAgent?: string; referer?: string };
};
