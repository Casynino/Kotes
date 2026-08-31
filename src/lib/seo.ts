import type { Metadata } from "next";

import { addressLine, company, site } from "@/content/company";

/**
 * Page-level metadata helper.
 * Every page calls this so title, description, canonical URL, Open Graph and
 * Twitter card metadata stay consistent and never drift.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  type = "website",
}: {
  title: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = new URL(path, site.url).toString();
  const og = image ?? site.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: site.locale,
      images: [
        {
          url: new URL(og.src, site.url).toString(),
          width: og.width ?? 1200,
          height: og.height ?? 630,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL(og.src, site.url).toString()],
      ...(site.twitterHandle ? { site: site.twitterHandle } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ----------------------------------------------------------- JSON-LD graph */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: company.address.street,
  postOfficeBoxNumber: company.address.poBox.replace(/^P\.O\.\s*Box\s*/i, ""),
  addressLocality: company.address.city,
  addressRegion: company.address.region,
  addressCountry: company.address.countryCode,
} as const;

/** Organization + LocalBusiness, emitted once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: company.legalName,
    alternateName: company.shortName,
    url: site.url,
    logo: new URL("/opengraph-image", site.url).toString(),
    image: new URL(site.ogImage.src, site.url).toString(),
    description: site.defaultDescription,
    foundingDate: company.foundedISO,
    slogan: company.tagline,
    email: company.email,
    telephone: company.phones[0],
    taxID: company.tin,
    address: postalAddress,
    ...(company.address.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: company.address.geo.lat,
            longitude: company.address.geo.lng,
          },
        }
      : {}),
    areaServed: [
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Place", name: "East Africa" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: company.socials.filter((s) => s.active).map((s) => s.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: company.primaryPhoneE164,
        email: company.email,
        areaServed: "TZ",
        availableLanguage: ["en", "sw"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.defaultDescription,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  summary: string;
  slug: string;
  capabilities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: new URL(`/services/${service.slug}`, site.url).toString(),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Tanzania" },
    serviceType: service.title,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: capability },
      })),
    },
  };
}

export function projectSchema(project: {
  title: string;
  summary: string;
  slug: string;
  completionDate: string;
  cover: { src: string; alt: string };
  location: string;
  client: string;
  clientConfidential: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: new URL(`/projects/${project.slug}`, site.url).toString(),
    image: new URL(project.cover.src, site.url).toString(),
    dateCreated: project.completionDate,
    creator: { "@id": `${site.url}/#organization` },
    locationCreated: { "@type": "Place", name: project.location },
    ...(project.clientConfidential
      ? {}
      : { sourceOrganization: { "@type": "Organization", name: project.client } }),
  };
}

/** Human-readable postal address, reused by the contact page. */
export const formattedAddress = addressLine;
