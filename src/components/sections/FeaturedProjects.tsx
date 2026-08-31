import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/content/projects";

export function FeaturedProjects() {
  const shown = featuredProjects.slice(0, 6);

  if (shown.length === 0) {
    return null;
  }

  return (
    <Section labelledBy="featured-projects-heading" tone="default" spacing="lg">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Selected work"
            title="Delivered for the institutions Tanzania relies on"
            description="National backbone fibre, ministry connectivity, port networks and university infrastructure — completed, certified and handed over."
            className="max-w-2xl"
          />
          <ButtonLink href="/projects" variant="secondary" className="shrink-0">
            All projects
            <ArrowRight />
          </ButtonLink>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={index * 70} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
