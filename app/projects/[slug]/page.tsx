import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, findProject } from "@/lib/content/projects";
import { findSolution } from "@/lib/content/categories";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.industry}`,
    description: `${project.industry} project in ${project.suburb}, ${project.year}. ${project.metrics
      .map((metric) => `${metric.value} ${metric.label}`)
      .join(", ")}.`,
    alternates: { canonical: routes.project(project.slug) },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const solutions = project.solutionSlugs
    .map((solutionSlug) => {
      for (const categorySlug of project.categorySlugs) {
        const match = findSolution(categorySlug, solutionSlug);
        if (match) return match;
      }
      return undefined;
    })
    .filter((solution) => solution !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    about: { "@type": "Place", name: `${project.suburb}, Victoria` },
    datePublished: `${project.year}-01-01`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <div data-surface="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumbs
        trail={[
          { label: "Projects", href: routes.projects },
          { label: project.name, href: routes.project(project.slug) },
        ]}
      />

      <Section surface="dark" data-treatment="B" label={project.name}>
        <Kicker>
          {project.industry} · {project.suburb} · {project.year}
        </Kicker>
        <h1 className="mt-8 max-w-[16ch] text-display-2">{project.name}</h1>
        <ul className="mt-12 flex flex-wrap gap-12 border-t border-hairline pt-8">
          {project.metrics.map((metric) => (
            <li key={metric.label}>
              <span className="block font-display text-display-3 text-ink">
                {metric.value}
              </span>
              <span className="kicker mt-2 block">{metric.label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section data-surface="dark" data-treatment="A">
        <MediaSlot label={`${project.name} — full-bleed`} className="aspect-[21/9] w-full" />
      </section>

      {project.hasBeforeAfter ? (
        <Section surface="light" data-treatment="D" label="Before and after">
          <Kicker>Before / after</Kicker>
          <h2 className="mt-6 max-w-[18ch] text-display-3">
            The same position, twelve months apart.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure>
              <MediaSlot label="Before" className="aspect-[4/3]" />
              <figcaption className="mono-fact mt-3">Before</figcaption>
            </figure>
            <figure>
              <MediaSlot label="After" className="aspect-[4/3]" />
              <figcaption className="mono-fact mt-3">After</figcaption>
            </figure>
          </div>
        </Section>
      ) : null}

      <Section surface="tint" data-treatment="C" label="Systems installed">
        <Kicker>Systems installed</Kicker>
        <ul className="mt-10 border-t border-hairline">
          {solutions.map((solution) => (
            <li key={solution.slug} className="border-b border-hairline">
              <Link
                href={routes.solution(solution.category.slug, solution.slug)}
                className="group flex min-h-14 flex-wrap items-center justify-between gap-4 py-4"
              >
                <span className="text-body-lg text-ink">{solution.name}</span>
                <span className="mono-fact group-hover:text-accent">
                  {solution.spec ?? "Detail"} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="dark" data-treatment="F" label="Discuss a similar project">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[18ch] text-display-3">
            Discuss a similar project.
          </h2>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactWithContext(project.slug)} size="lg">
              {site.consultationCta}
            </ButtonLink>
            <ButtonLink href={routes.projects} variant="secondary" size="lg">
              All projects
            </ButtonLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
