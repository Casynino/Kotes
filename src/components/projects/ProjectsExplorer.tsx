"use client";

import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

type StatusFilter = "all" | "completed" | "ongoing";

/**
 * Client-side portfolio browser: category filters, free-text search, status
 * filter and incremental "load more" paging.
 *
 * Filtering happens in the browser because the full catalogue is small and
 * statically rendered — no request round-trip, so results feel instant. If the
 * portfolio grows past a few hundred entries, move this to a server action or
 * route handler with the same props shape.
 */
export function ProjectsExplorer({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const searchId = useId();
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Keeps typing responsive: the input updates immediately, the (heavier)
  // filtered list can lag a frame behind.
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    return projects.filter((project) => {
      if (category !== "all" && project.category !== category) return false;
      if (status !== "all" && project.status !== status) return false;
      if (!needle) return true;

      const haystack = [
        project.title,
        project.summary,
        project.location,
        project.completionLabel,
        project.clientConfidential ? "" : project.client,
        project.clientIndustry ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [projects, category, status, deferredQuery]);

  // Reset paging whenever the result set changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, status, deferredQuery]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;
  const isFiltered = category !== "all" || status !== "all" || query.trim() !== "";

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of projects) {
      map.set(project.category, (map.get(project.category) ?? 0) + 1);
    }
    return map;
  }, [projects]);

  const reset = () => {
    setCategory("all");
    setStatus("all");
    setQuery("");
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            All
            <Count value={projects.length} active={category === "all"} />
          </FilterChip>
          {categories.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
              <Count value={counts.get(item.id) ?? 0} active={category === item.id} />
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <label htmlFor={searchId} className="sr-only">
              Search projects
            </label>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by client, location or scope"
              className="h-11 w-full rounded-full border border-border-subtle bg-surface pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus-visible:border-brand-500 sm:w-72"
            />
          </div>

          <div>
            <label htmlFor={`${searchId}-status`} className="sr-only">
              Filter by status
            </label>
            <select
              id={`${searchId}-status`}
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="h-11 rounded-full border border-border-subtle bg-surface px-4 text-sm font-medium text-ink-800 focus-visible:border-brand-500"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live result count for screen readers and sighted users alike. */}
      <p aria-live="polite" className="mt-6 text-sm text-ink-500">
        Showing <span className="font-semibold text-ink-900">{shown.length}</span> of{" "}
        <span className="font-semibold text-ink-900">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "project" : "projects"}
        {isFiltered ? (
          <>
            {" · "}
            <button
              type="button"
              onClick={reset}
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      {/* Results */}
      {shown.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <li key={project.id} className="animate-fade-up">
              <ProjectCard project={project} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState onReset={reset} />
      )}

      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more projects
            <span className="text-ink-400">({filtered.length - visible} left)</span>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
        active
          ? "bg-brand-600 text-white shadow-[0_8px_20px_-10px_rgba(13,135,208,0.9)]"
          : "bg-surface text-ink-700 ring-1 ring-inset ring-border-subtle hover:text-brand-700 hover:ring-brand-300",
      )}
    >
      {children}
    </button>
  );
}

function Count({ value, active }: { value: number; active: boolean }) {
  return (
    <span className={cn("text-xs font-bold tabular-nums", active ? "text-brand-100" : "text-ink-400")}>
      {value}
    </span>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-8 rounded-panel border border-dashed border-border-subtle bg-surface-muted px-6 py-16 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface text-ink-400 ring-1 ring-border-subtle">
        <Icon name="chart" className="h-6 w-6" />
      </span>
      <h3 className="text-h3 mt-5">No projects match those filters</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
        Try a different category or search term. If you are looking for something specific, ask us
        directly — not every engagement is published.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
