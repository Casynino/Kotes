import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activeProjects } from "@/content/projects";
import { activeServices, getServiceBySlug } from "@/content/services";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

type Params = { slug: string };

/** Pre-renders every service page at build time. */
export function generateStaticParams(): Params[] {
  return activeServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: true } };
  }

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

/**
 * Maps a service to related project categories so each service page can show
 * proof of delivery rather than only claims.
 */
const relatedCategories: Record<string, string[]> = {
  "network-infrastructure": ["network-infrastructure"],
  "fibre-optic-solutions": ["fibre-optic"],
  "ict-hardware-supply": ["ict-supply"],
  "data-management-protection": ["ict-supply"],
  "systems-integration": ["systems-integration"],
  "maintenance-managed-services": ["systems-integration", "network-infrastructure"],
};

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const categories = relatedCategories[service.slug] ?? [];
  const related = activeProjects.filter((project) => categories.includes(project.category)).slice(0, 3);
  const otherServices = activeServices.filter((s) => s.slug !== service.slug).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        image={service.image}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/contact?service=${encodeURIComponent(service.title)}`} variant="onDark">
            Request a quote
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/projects" variant="outlineOnDark">
            See related work
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="overview-heading" spacing="lg">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <SectionHeading id="overview-heading" eyebrow="Overview" title="What we deliver" />
                <div className="mt-6 space-y-5 text-ink-600">
                  {service.description.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="text-h2">Key benefits</h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {service.benefits.map((benefit, index) => (
                    <li
                      key={benefit.title}
                      className="rounded-card bg-surface-muted p-6 ring-1 ring-border-subtle"
                    >
                      <span
                        aria-hidden="true"
                        className="font-display text-sm font-extrabold text-brand-600"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display mt-2 text-base font-bold text-ink-900">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{benefit.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="text-h2">Our process</h2>
                <p className="mt-3 max-w-2xl text-ink-600">
                  Every engagement follows the same sequence, so you always know which stage you are in
                  and what the next deliverable is.
                </p>
                <ol className="mt-8">
                  {service.process.map((step, index) => (
                    <li key={step.step} className="relative flex gap-6 pb-8">
                      {index < service.process.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-5 top-11 h-full w-px bg-border-subtle"
                        />
                      ) : null}
                      <span
                        aria-hidden="true"
                        className="font-display relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-sm font-extrabold text-white"
                      >
                        {step.step}
                      </span>
                      <div>
                        <h3 className="text-h3">{step.title}</h3>
                        <p className="mt-1.5 max-w-2xl text-ink-600">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal className="rounded-panel bg-ink-950 p-7 text-white">
                  <h2 className="font-display text-base font-bold text-white">Capabilities</h2>
                  <ul className="mt-4 space-y-2.5">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2.5 text-sm text-ink-200">
                        <Icon
                          name="check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                          strokeWidth={2.2}
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    variant="onDark"
                    className="mt-7 w-full"
                  >
                    Request a consultation
                  </ButtonLink>
                </Reveal>

                <Reveal delay={80} className="mt-6 rounded-panel bg-surface-muted p-7 ring-1 ring-border-subtle">
                  <h2 className="font-display text-base font-bold text-ink-900">Other services</h2>
                  <ul className="mt-4 space-y-1">
                    {otherServices.map((other) => (
                      <li key={other.id}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-surface hover:text-brand-700"
                        >
                          <Icon name={other.icon} className="h-5 w-5 shrink-0 text-brand-600" />
                          {other.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section labelledBy="related-heading" tone="muted" spacing="lg">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="related-heading"
                eyebrow="Proof of delivery"
                title="Related projects"
                description="Contracts we have completed in this discipline."
              />
            </Reveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project, index) => (
                <li key={project.id}>
                  <Reveal delay={index * 70} className="h-full">
                    <ProjectCard project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <CTASection
        eyebrow={service.title}
        title="Let's scope it together"
        description="Send us the requirement and we will come back with an approach, a programme and an itemised quotation."
        primaryLabel="Request a Quote"
        primaryHref={`/contact?service=${encodeURIComponent(service.title)}`}
        secondaryLabel="All services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
