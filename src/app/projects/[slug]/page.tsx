import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  activeProjects,
  displayClient,
  formatTZS,
  getCategory,
  getProjectBySlug,
} from "@/content/projects";
import { breadcrumbSchema, buildMetadata, projectSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return activeProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: true } };
  }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.cover,
    type: "article",
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const category = getCategory(project.category);
  const related = activeProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  const facts = [
    { label: "Client", value: displayClient(project) },
    { label: "Sector", value: project.clientIndustry ?? "—" },
    { label: "Category", value: category?.label ?? "—" },
    { label: "Location", value: project.location },
    { label: "Completed", value: project.completionLabel },
    {
      label: "Contract value",
      value:
        project.contractValueTZS && !project.valueConfidential
          ? formatTZS(project.contractValueTZS)
          : "Not disclosed",
    },
    { label: "Status", value: project.status === "completed" ? "Completed" : "Ongoing" },
  ];

  return (
    <>
      <PageHero
        eyebrow={category?.label ?? "Project"}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        image={project.cover}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="onDark">{displayClient(project)}</Badge>
          <Badge tone="onDark">{project.location}</Badge>
          <Badge tone="onDark">{project.completionLabel}</Badge>
          {project.status === "ongoing" ? <Badge tone="onDark">Ongoing</Badge> : null}
        </div>
      </PageHero>

      <Section labelledBy="project-detail-heading" spacing="lg">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {/* Cover */}
              <Reveal>
                <div className="relative aspect-16/9 overflow-hidden rounded-panel shadow-card">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal className="mt-12">
                <h2 id="project-detail-heading" className="text-h2">
                  The challenge
                </h2>
                <p className="mt-4 leading-relaxed text-ink-600">{project.scope}</p>
              </Reveal>

              <Reveal className="mt-10">
                <h2 className="text-h2">Our solution</h2>
                <p className="mt-4 leading-relaxed text-ink-600">{project.solution}</p>
              </Reveal>

              <Reveal className="mt-10">
                <h2 className="text-h2">Outcomes</h2>
                <ul className="mt-5 space-y-3">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                        strokeWidth={2}
                      />
                      <span className="text-ink-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Gallery */}
              {project.gallery.length > 0 ? (
                <Reveal className="mt-14">
                  <h2 className="text-h2">Gallery</h2>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((image, index) => (
                      <li
                        key={`${image.src}-${index}`}
                        className={index === 0 ? "sm:col-span-2" : undefined}
                      >
                        <figure className="overflow-hidden rounded-card shadow-card ring-1 ring-border-subtle">
                          <div className={index === 0 ? "relative aspect-16/9" : "relative aspect-4/3"}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              loading="lazy"
                              sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                              className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {project.externalUrl ? (
                <Reveal className="mt-10">
                  <ButtonLink href={project.externalUrl} external variant="secondary">
                    Visit project link
                    <ArrowRight />
                  </ButtonLink>
                </Reveal>
              ) : null}
            </div>

            {/* Facts sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal className="rounded-panel bg-surface-muted p-7 ring-1 ring-border-subtle">
                  <h2 className="font-display text-base font-bold text-ink-900">Project facts</h2>
                  <dl className="mt-5 space-y-4">
                    {facts.map((fact) => (
                      <div key={fact.label} className="border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                        <dt className="text-xs uppercase tracking-wider text-ink-400">{fact.label}</dt>
                        <dd className="mt-1 font-semibold text-ink-900">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal delay={80} className="mt-6 rounded-panel bg-ink-950 p-7 text-white">
                  <h2 className="font-display text-base font-bold text-white">
                    Need something similar?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    We deliver work of this type across Tanzania. Tell us your scope and we will
                    respond with an approach and a quotation.
                  </p>
                  <ButtonLink href="/contact" variant="onDark" className="mt-6 w-full">
                    Request a quote
                  </ButtonLink>
                </Reveal>

                <Reveal delay={140} className="mt-6">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <span aria-hidden="true">&larr;</span>
                    Back to all projects
                  </Link>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section labelledBy="related-projects-heading" tone="muted" spacing="lg">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="related-projects-heading"
                eyebrow="More work"
                title={`Other ${category?.label.toLowerCase() ?? ""} projects`}
              />
            </Reveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.id}>
                  <Reveal delay={index * 70} className="h-full">
                    <ProjectCard project={item} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <CTASection />

      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
    </>
  );
}
