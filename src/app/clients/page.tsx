import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { ClientTile } from "@/components/sections/ClientLogos";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activeClients, clientStories } from "@/content/clients";
import { photos } from "@/content/media";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Clients & Partners",
  description:
    "Ministries, authorities, universities and enterprises that trust KOTES (T) LIMITED with their ICT infrastructure — alongside the global technology vendors we source and deploy.",
  path: "/clients",
  image: photos.switchFibre,
});

/** Groups clients by sector so the grid tells a story rather than listing logos. */
function groupByIndustry(clients: typeof activeClients) {
  const groups = new Map<string, typeof activeClients>();
  for (const client of clients) {
    const key = client.industry ?? "Other";
    const existing = groups.get(key);
    if (existing) existing.push(client);
    else groups.set(key, [client]);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

export default function ClientsPage() {
  const grouped = groupByIndustry(activeClients);
  const sectorCount = grouped.length;

  return (
    <>
      <PageHero
        eyebrow="Clients & partners"
        title="Trusted where downtime is not an option"
        description={`${activeClients.length} institutions across ${sectorCount} sectors — government ministries, regulators, authorities, universities and private enterprise.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
        image={photos.switchFibre}
      />

      {/* Full client grid */}
      <Section labelledBy="clientele-heading" spacing="lg">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="clientele-heading"
              eyebrow="Our clientele"
              title="Who we work with"
              description="A selection of the organisations we have delivered infrastructure, equipment and support to."
            />
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {activeClients.map((client, index) => (
              <li key={client.id}>
                <Reveal delay={Math.min(index * 30, 400)}>
                  <ClientTile client={client} />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-8 text-sm text-ink-500">
            <p>
              Client logos are shown as text marks pending receipt of official artwork. Some
              engagements are covered by confidentiality and are not listed.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* By sector */}
      <Section labelledBy="sectors-heading" tone="muted" spacing="lg">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="sectors-heading"
              eyebrow="Sectors"
              title="Depth across the public and private sector"
              description="Different sectors bring different constraints — procurement rules, security requirements, operating hours. We have worked inside all of them."
            />
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map(([industry, members], index) => (
              <li key={industry}>
                <Reveal delay={index * 50} className="h-full">
                  <div className="flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-border-subtle">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-base font-bold text-ink-900">{industry}</h3>
                      <span className="font-display text-2xl font-extrabold text-brand-600 tabular-nums">
                        {members.length}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {members.map((member) => (
                        <li key={member.id} className="flex items-start gap-2 text-sm text-ink-600">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                          />
                          {member.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Success stories — hidden until real, approved stories exist */}
      {clientStories.length > 0 ? (
        <Section labelledBy="stories-heading" spacing="lg">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="stories-heading"
                eyebrow="Success stories"
                title="What delivery looked like"
              />
            </Reveal>
            <ul className="mt-12 grid gap-6 lg:grid-cols-2">
              {clientStories.map((client, index) => (
                <li key={client.id}>
                  <Reveal delay={index * 70} className="h-full">
                    <article className="flex h-full flex-col rounded-card bg-surface-muted p-8 ring-1 ring-border-subtle">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                        {client.name}
                      </p>
                      <h3 className="text-h3 mt-3">{client.successStory!.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink-600">{client.successStory!.body}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <PartnerLogos />

      <CTASection
        eyebrow="Join them"
        title="Become our next reference client"
        description="Repeat awards from the same institutions are how we measure ourselves. Let's start with your first project."
        primaryLabel="Contact Us"
        secondaryLabel="See completed work"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />
    </>
  );
}
