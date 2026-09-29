"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content/projects";
import { routes } from "@/lib/routes";
import { track } from "@/lib/analytics";
import { MediaSlot } from "./ui/media-slot";

type View = "grid" | "map";

interface Filters {
  industries: string[];
  categories: { slug: string; name: string }[];
  locations: string[];
  years: number[];
}

export function ProjectFilters({
  filters,
  projects,
}: {
  filters: Filters;
  projects: Project[];
}) {
  const [view, setView] = useState<View>("grid");
  const [industry, setIndustry] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (!industry || project.industry === industry) &&
          (!category || project.categorySlugs.includes(category)),
      ),
    [projects, industry, category],
  );

  const toggle = (
    facet: string,
    value: string,
    current: string | null,
    set: (next: string | null) => void,
  ) => {
    const next = current === value ? null : value;
    set(next);
    track("filter_use", { facet, value: next ?? "cleared" });
  };

  return (
    <section className="py-section-tight" aria-label="Project archive">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)]">
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-hairline py-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
            {filters.industries.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={industry === value}
                onClick={() => toggle("industry", value, industry, setIndustry)}
                className={`min-h-11 rounded-pill border px-4 text-body-sm transition-colors ${
                  industry === value
                    ? "border-accent bg-accent text-on-accent"
                    : "border-hairline text-body hover:border-ink hover:text-ink"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="View">
            {(["grid", "map"] as View[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                onClick={() => {
                  setView(value);
                  track("view_toggle", { view: value });
                }}
                className={`min-h-11 rounded-pill px-4 text-body-sm capitalize transition-colors ${
                  view === value ? "bg-surface text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 py-5" role="group" aria-label="Filter by capability">
          {filters.categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={category === item.slug}
              onClick={() => toggle("category", item.slug, category, setCategory)}
              className={`min-h-11 rounded-pill border px-4 text-body-sm transition-colors ${
                category === item.slug
                  ? "border-accent bg-accent text-on-accent"
                  : "border-hairline text-body hover:border-ink hover:text-ink"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <p role="status" className="text-pretty font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted py-4">
          {visible.length} of {projects.length} projects
        </p>

        {view === "map" ? (
          <MediaSlot
            label="Styled map tiles with clustered pins — the grid below is the accessible equivalent"
            className="aspect-[16/9] w-full"
          />
        ) : null}

        {visible.length === 0 ? (
          <p className="text-pretty py-16 text-body-lg text-ink">
            No projects match those filters yet. Clear one to widen the search.
          </p>
        ) : (
          <ul className="grid gap-10 pt-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <li key={project.slug}>
                <Link href={routes.project(project.slug)} className="group block">
                  <MediaSlot label={project.name} className="aspect-[4/3]" />
                  <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-4 block">
                    {project.industry} · {project.suburb} · {project.year}
                  </span>
                  <span className="mt-2 block font-display text-display-4 text-ink group-hover:text-accent">
                    {project.name}
                  </span>
                  <ul className="mt-4 flex flex-wrap gap-6 border-t border-hairline pt-4">
                    {project.metrics.map((metric) => (
                      <li key={metric.label}>
                        <span className="block font-display text-[1.5rem] text-ink">
                          {metric.value}
                        </span>
                        <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{metric.label}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
