import type { Metadata } from "next";
import Image from "next/image";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  aboutStory,
  activeCertifications,
  coreValues,
  keysToSuccess,
  milestones,
  mission,
  stats,
  vision,
} from "@/content/about";
import { company } from "@/content/company";
import { photos } from "@/content/media";
import { activeTeam } from "@/content/team";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Founded in 1995, KOTES (T) LIMITED is a locally-owned Tanzanian ICT company delivering network infrastructure, systems integration and managed support to government and enterprise. Meet the mission, milestones and credentials behind three decades of delivery.",
  path: "/about",
  image: photos.drawings,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Three decades building the networks Tanzania depends on"
        description={company.tagline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        image={photos.drawings}
      />

      {/* Story */}
      <Section labelledBy="story-heading" spacing="lg">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionHeading
                id="story-heading"
                eyebrow="Our story"
                title="A locally-owned enterprise, trusted at national scale"
              />
              <div className="mt-6 space-y-5 text-ink-600">
                {aboutStory.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border-subtle pt-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id}>
                    <dt className="text-sm text-ink-500">{stat.label}</dt>
                    <dd className="font-display mt-1 text-2xl font-extrabold text-brand-700">
                      {stat.displayOverride ?? `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-panel shadow-card">
                <Image
                  src={photos.engineer.src}
                  alt={photos.engineer.alt}
                  width={photos.engineer.width}
                  height={photos.engineer.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-5 rounded-panel bg-ink-950 p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
                  Registered &amp; licensed
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-200">
                  Incorporated {company.foundedLabel} under the Companies Ordinance (Cap. 212).
                  Registered with the Contractors Registration Board as a Class One specialised
                  contractor in telecommunications, ICT and security systems, and licensed by the
                  Tanzania Communications Regulatory Authority.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mission, vision, values */}
      <Section labelledBy="mv-heading" tone="muted" spacing="lg">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="mv-heading"
              eyebrow="What drives us"
              align="center"
              title="Mission, vision and values"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-panel bg-ink-950 p-8 text-white sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                <Icon name="sparkle" />
              </span>
              <h3 className="text-h3 mt-5 text-white">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-ink-200">{mission}</p>
            </Reveal>

            <Reveal delay={80} className="rounded-panel bg-brand-700 p-8 text-white sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
                <Icon name="chart" />
              </span>
              <h3 className="text-h3 mt-5 text-white">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-brand-50">{vision}</p>
            </Reveal>
          </div>

          <ul className="mt-6 grid gap-6 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <li key={value.id}>
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-border-subtle">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                      <Icon name={value.icon} />
                    </span>
                    <h3 className="text-h3 mt-5">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{value.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Milestones */}
      <Section labelledBy="timeline-heading" spacing="lg">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="timeline-heading"
              eyebrow="Milestones"
              title="Three decades, one direction"
              description="A selection of the moments that shaped the company and the contracts that proved it."
            />
          </Reveal>

          <ol className="mt-12">
            {milestones.map((milestone, index) => (
              <li key={milestone.id}>
                <Reveal delay={index * 60} className="relative flex gap-6 pb-10 sm:gap-10">
                  {index < milestones.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[0.6875rem] top-7 h-full w-px bg-gradient-to-b from-brand-300 to-border-subtle"
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 ring-4 ring-brand-50"
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-brand-700">
                      {milestone.year}
                    </p>
                    <h3 className="text-h3 mt-1.5">{milestone.title}</h3>
                    <p className="mt-2 max-w-2xl text-ink-600">{milestone.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Leadership */}
      {activeTeam.length > 0 ? (
        <Section labelledBy="team-heading" tone="muted" spacing="lg">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="team-heading"
                eyebrow="Leadership"
                title="Key personnel"
                description="The people accountable for what we deliver."
              />
            </Reveal>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeTeam.map((member, index) => (
                <li key={member.id}>
                  <Reveal delay={index * 80} className="h-full">
                    <div className="flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-border-subtle">
                      {member.photo ? (
                        <Image
                          src={member.photo.src}
                          alt={member.photo.alt}
                          width={160}
                          height={160}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="font-display grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-2xl font-extrabold text-white"
                        >
                          {member.initials}
                        </span>
                      )}
                      <h3 className="text-h3 mt-5">{member.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-700">{member.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-600">{member.bio}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Credentials */}
      <Section labelledBy="credentials-heading" spacing="lg">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="credentials-heading"
                eyebrow="Credentials"
                title="Licensed, registered and audited"
                description="Every certificate below is held current and supplied on request for tender submissions."
              />
              <ul className="mt-8 space-y-3">
                {keysToSuccess.slice(0, 4).map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-ink-600">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2} />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {activeCertifications.map((certification, index) => (
                <li key={certification.id}>
                  <Reveal delay={index * 50} className="h-full">
                    <div className="flex h-full flex-col rounded-card bg-surface-muted p-6 ring-1 ring-border-subtle">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-white">
                        <Icon name="award" className="h-5 w-5" />
                      </span>
                      <h3 className="font-display mt-4 text-base font-bold text-ink-900">
                        {certification.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand-700">{certification.issuer}</p>
                      {certification.detail ? (
                        <p className="mt-2 text-sm text-ink-600">{certification.detail}</p>
                      ) : null}
                      {certification.year ? (
                        <p className="mt-3 text-xs uppercase tracking-wider text-ink-400">
                          Since {certification.year}
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <PartnerLogos tone="light" />

      <CTASection
        eyebrow="Work with us"
        title="Ready to talk about your infrastructure?"
        description="Whether it is a national fibre route or a single office network, the conversation starts the same way — tell us what you need."
        primaryLabel="Contact Us"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
