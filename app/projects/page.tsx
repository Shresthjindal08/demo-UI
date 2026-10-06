import { surfaceStyles } from "@/lib/styles";
import type { Metadata } from "next";
import { projects, projectFilters } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { ProjectFilters } from "@/components/project-filters";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed renewable infrastructure across Victoria — residential, commercial, community and government systems with measured performance.",
  alternates: { canonical: routes.projects },
};

export default function ProjectsPage() {
  const filters = projectFilters();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: `${site.url}${routes.project(project.slug)}`,
    })),
  };

  return (
    <div data-surface="light" className={`${surfaceStyles} interior-page`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="Selected work"
        title={`${projects.length} systems, measured after handover.`}
        index="04 / Project archive"
        imageLabel="Norwood Manufacturing — full-bleed"
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{projects.length} projects</li>
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">46.2 MW installed</li>
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">2014—2026</li>
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{filters.locations.length} suburbs</li>
        </ul>
      </PageMasthead>

      <ProjectFilters filters={filters} projects={projects} />

      <Section surface="dark" data-treatment="C" label="Start a consultation" className="interior-cta">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[18ch] text-display-3">
            Discuss a project at your scale.
          </h2>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactWithContext("projects")} size="lg">
              {site.consultationCta}
            </ButtonLink>
            <ButtonLink href={routes.whatWeDo} variant="secondary" size="lg">
              What we do
            </ButtonLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
