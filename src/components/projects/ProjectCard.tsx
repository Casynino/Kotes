import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "@/components/ui/Icon";
import { displayClient, formatTZS, getCategory } from "@/content/projects";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: Project;
  /** Set on the first card above the fold so the LCP image is not lazy-loaded. */
  priority?: boolean;
  className?: string;
}) {
  const category = getCategory(project.category);

  return (
    <Card
      href={`/projects/${project.slug}`}
      label={`View project: ${project.title}`}
      className={cn("h-full", className)}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-ink-900">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
        />
        <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
          {category ? <Badge tone="onDark">{category.label}</Badge> : null}
          {project.status === "ongoing" ? <Badge tone="onDark">Ongoing</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
          {displayClient(project)}
        </p>
        <h3 className="text-h3 mt-2 text-ink-900">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{project.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border-subtle pt-5 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-400">Location</dt>
            <dd className="mt-1 font-medium text-ink-800">{project.location}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-400">Completed</dt>
            <dd className="mt-1 font-medium text-ink-800">{project.completionLabel}</dd>
          </div>
          {project.contractValueTZS && !project.valueConfidential ? (
            <div className="col-span-2">
              <dt className="text-xs uppercase tracking-wider text-ink-400">Contract value</dt>
              <dd className="mt-1 font-semibold tabular-nums text-ink-900">
                {formatTZS(project.contractValueTZS)}
              </dd>
            </div>
          ) : null}
        </dl>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          View case study
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Card>
  );
}
