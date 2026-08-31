import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { company } from "@/content/company";
import { photos } from "@/content/media";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact KOTES (T) LIMITED — ${company.address.street}, ${company.address.city}, Tanzania. Call ${company.phones[0]} or email ${company.email} for ICT infrastructure, fibre optic and managed support enquiries.`,
  path: "/contact",
  image: photos.monitoring,
});

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address.mapQuery)}&output=embed`;

export default function ContactPage() {
  const socials = company.socials.filter((s) => s.active);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project"
        description="Send us the scope, the site list or just the problem. We reply within one business day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        image={photos.monitoring}
      />

      <Section labelledBy="contact-heading" spacing="lg">
        <div className="container-page">
          <h2 id="contact-heading" className="sr-only">
            Contact details and enquiry form
          </h2>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal className="rounded-panel bg-ink-950 p-8 text-white sm:p-10">
                <h3 className="text-h3 text-white">Head office</h3>

                <ul className="mt-8 space-y-7">
                  <ContactItem icon="network" label="Address">
                    <address className="not-italic leading-relaxed text-ink-200">
                      {company.address.street}
                      <br />
                      {company.address.poBox}
                      <br />
                      {company.address.city}, {company.address.country}
                    </address>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-brand-300 hover:text-brand-200"
                    >
                      Open in Google Maps
                    </a>
                  </ContactItem>

                  <ContactItem icon="phone" label="Phone">
                    <ul className="space-y-1">
                      {company.phones.map((phone) => (
                        <li key={phone}>
                          <a
                            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                            className="text-ink-200 transition-colors hover:text-brand-300"
                          >
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ContactItem>

                  <ContactItem icon="check" label="Email">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-ink-200 transition-colors hover:text-brand-300"
                    >
                      {company.email}
                    </a>
                  </ContactItem>

                  <ContactItem icon="clock" label="Business hours">
                    <ul className="space-y-1.5">
                      {company.hours.map((entry) => (
                        <li key={entry.days} className="text-sm text-ink-200">
                          <span className="font-semibold text-white">{entry.days}</span>
                          <br />
                          {entry.hours}
                        </li>
                      ))}
                    </ul>
                  </ContactItem>
                </ul>

                {socials.length > 0 ? (
                  <div className="mt-9 border-t border-white/10 pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      Follow us
                    </p>
                    <ul className="mt-4 flex items-center gap-3">
                      {socials.map((social) => (
                        <li key={social.id}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-ink-200 ring-1 ring-inset ring-white/10 transition-all hover:bg-brand-600 hover:text-white hover:ring-brand-500"
                          >
                            <SocialIcon platform={social.platform} />
                            <span className="sr-only">{`${company.shortName} on ${social.label}`}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Reveal>

              <Reveal delay={80} className="mt-6 rounded-panel bg-brand-50 p-7 ring-1 ring-brand-100">
                <h3 className="font-display text-base font-bold text-brand-900">
                  Existing maintenance client?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  Contract clients with a support agreement should use the 24/7 emergency line agreed
                  in their SLA for critical incidents, rather than this form.
                </p>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <Suspense fallback={<FormSkeleton />}>
                  <ContactForm />
                </Suspense>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section labelledBy="map-heading" tone="muted" spacing="md">
        <div className="container-page">
          <h2 id="map-heading" className="text-h3">
            Find us
          </h2>
          <p className="mt-2 text-ink-600">
            {company.address.street}, {company.address.city}, {company.address.country}
          </p>

          <Reveal className="mt-8 overflow-hidden rounded-panel shadow-card ring-1 ring-border-subtle">
            <iframe
              src={mapSrc}
              title={`Map showing the location of ${company.legalName} in ${company.address.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[24rem] w-full border-0 sm:h-[28rem]"
            />
          </Reveal>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${company.legalName}`,
            url: "/contact",
          },
        ]}
      />
    </>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: "network" | "phone" | "check" | "clock";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </li>
  );
}

function FormSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-panel bg-surface p-6 shadow-card ring-1 ring-border-subtle sm:p-8 lg:p-10"
    >
      <div className="h-8 w-2/3 animate-pulse rounded bg-surface-sunken" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-surface-sunken" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <div className="h-4 w-24 animate-pulse rounded bg-surface-sunken" />
            <div className="mt-2 h-12 w-full animate-pulse rounded-xl bg-surface-sunken" />
          </div>
        ))}
      </div>
      <div className="mt-5 h-36 w-full animate-pulse rounded-xl bg-surface-sunken" />
      <div className="mt-8 h-14 w-48 animate-pulse rounded-full bg-surface-sunken" />
    </div>
  );
}
