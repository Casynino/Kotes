import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { photos } from "@/content/media";
import { activeProjects, usedCategories } from "@/content/projects";
import { site } from "@/content/company";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Completed ICT infrastructure projects by KOTES (T) LIMITED — national fibre backbone routes, ministry last-mile connectivity, port and campus networks, and equipment supply programmes across Tanzania.",
  path: "/projects",
  image: photos.fibreDistribution,
});

export default function ProjectsPage() {
  const completed = activeProjects.filter((p) => p.status === "completed").length;

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work delivered, tested and handed over"
        description={`${completed} documented contracts for ministries, authorities, universities and enterprises — from national backbone fibre to campus networks and equipment supply programmes.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        image={photos.fibreDistribution}
      />

      <Section labelledBy="portfolio-heading" spacing="lg">
        <div className="container-page">
          <h2 id="portfolio-heading" className="sr-only">
            Project portfolio
          </h2>
          <ProjectsExplorer projects={activeProjects} categories={usedCategories} />
        </div>
      </Section>

      <CTASection
        eyebrow="Your project next"
        title="Bring us the requirement, however early"
        description="Feasibility study, tender response or a fully specified build — we work at whichever stage you are at."
        primaryLabel="Start a conversation"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "KOTES (T) LIMITED project portfolio",
            numberOfItems: activeProjects.length,
            itemListElement: activeProjects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              url: new URL(`/projects/${project.slug}`, site.url).toString(),
            })),
          },
        ]}
      />
    </>
  );
}
