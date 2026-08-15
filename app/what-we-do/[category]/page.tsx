import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  findCategory,
  solutionsByTier,
} from "@/lib/content/categories";
import { projectsInCategory } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Container, Kicker, Section, TierBadge } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/what-we-do/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} — Victoria`,
    description: category.descriptor,
    alternates: { canonical: routes.category(category.slug) },
  };
}

const process = [
  { index: "01", title: "Assess", body: "Site visit, load profile, switchboard and network constraints." },
  { index: "02", title: "Engineer", body: "The system is drawn to the building, then reviewed." },
  { index: "03", title: "Deliver", body: "Approvals, installation and commissioning by our own crew." },
  { index: "04", title: "Optimise", body: "Monitored after handover and tuned against the design." },
];

export default async function CategoryPage({
  params,
}: PageProps<"/what-we-do/[category]">) {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const tiers = solutionsByTier(category);
  const projects = projectsInCategory(category.slug);
  const isEmpty = category.solutions.every((solution) => solution.status !== "live");

  return (
    <>
      <div data-surface="dark">
        <Breadcrumbs
          trail={[
            { label: "What we do", href: routes.whatWeDo },
            { label: category.name, href: routes.category(category.slug) },
          ]}
        />

        <Section surface="dark" data-treatment="B" label={category.name}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Kicker>
                {category.index} / {category.name}
              </Kicker>
              <h1 className="mt-8 max-w-[14ch] text-display-2">{category.promise}</h1>
              <p className="measure mt-8 text-lead">{category.descriptor}</p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {category.facts.map((fact) => (
                  <li key={fact} className="mono-fact">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            <MediaSlot label={`${category.name} — real install`} className="aspect-[4/3]" />
          </div>
        </Section>
      </div>

      <Section surface="light" data-treatment="A" label="Solutions in this category">
        <Kicker>Solutions in this category</Kicker>

        {isEmpty ? (
          <div className="mt-10 border border-dashed border-hairline p-10">
            <h2 className="text-display-4">Being engineered now.</h2>
            <p className="measure mt-4 text-body-sm">
              This capability is live as a category and will fill out over the coming
              releases. If you need it before then, tell us what you are planning.
            </p>
            <div className="mt-8">
              <ButtonLink href={contactWithContext(category.slug)}>
                Tell us what you need
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-12 grid gap-6 lg:grid-cols-2">
              {tiers.P1.map((solution) => (
                <li key={solution.slug} className="lg:col-span-2">
                  <Link
                    href={routes.solution(category.slug, solution.slug)}
                    className="group grid gap-8 border border-hairline p-6 transition-colors hover:border-accent lg:grid-cols-2 lg:items-center"
                  >
                    <MediaSlot label={solution.name} className="aspect-[16/10]" />
                    <div>
                      <span className="flex items-center gap-3">
                        <span className="font-display text-display-3 text-ink">
                          {solution.name}
                        </span>
                        <TierBadge tier={solution.tier} />
                      </span>
                      {solution.spec ? (
                        <span className="mono-fact mt-3 block">{solution.spec}</span>
                      ) : null}
                      <span className="mt-4 block text-body-lg">{solution.outcome}</span>
                      {solution.investment ? (
                        <span className="mono-fact mt-6 block">
                          Typical investment {solution.investment}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}

              {tiers.P2.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={routes.solution(category.slug, solution.slug)}
                    className="group flex h-full flex-col border border-hairline p-6 transition-colors hover:border-accent"
                  >
                    <MediaSlot label={solution.name} className="aspect-[3/2]" />
                    <span className="mt-6 flex items-center gap-3">
                      <span className="font-display text-display-4 text-ink">
                        {solution.name}
                      </span>
                      <TierBadge tier={solution.tier} />
                    </span>
                    {solution.spec ? (
                      <span className="mono-fact mt-3 block">{solution.spec}</span>
                    ) : null}
                    <span className="mt-4 block text-body-sm">{solution.outcome}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {tiers.P3.length ? (
              <ul className="mt-10 border-t border-hairline">
                {tiers.P3.map((solution) => (
                  <li key={solution.slug} className="border-b border-hairline">
                    {solution.status === "live" ? (
                      <Link
                        href={routes.solution(category.slug, solution.slug)}
                        className="group flex min-h-14 flex-wrap items-center justify-between gap-4 py-4"
                      >
                        <span className="flex items-center gap-3 text-body-lg text-ink">
                          {solution.name}
                          <TierBadge tier={solution.tier} />
                        </span>
                        <span className="mono-fact group-hover:text-accent">
                          {solution.spec ?? "Detail"} →
                        </span>
                      </Link>
                    ) : (
                      <span className="flex min-h-14 items-center gap-3 py-4 text-body-lg text-muted">
                        {solution.name}
                        <span className="mono-fact">soon</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </Section>

      <section data-surface="dark" data-treatment="E">
        <MediaSlot label={`${category.name} — proof`} className="min-h-[60svh] w-full">
          <Container>
            <ul className="grid gap-10 md:grid-cols-3">
              {category.facts.map((fact) => (
                <li key={fact}>
                  <span className="block font-display text-display-3 text-ink">
                    {fact.split(" ")[0]}
                  </span>
                  <span className="kicker mt-2 block">
                    {fact.split(" ").slice(1).join(" ") || "capability"}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </MediaSlot>
      </section>

      {projects.length ? (
        <Section surface="dark" data-treatment="A" label="Projects in this category">
          <Kicker>Projects in this category</Kicker>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={routes.project(project.slug)} className="group block">
                  <MediaSlot label={project.name} className="aspect-[4/3]" />
                  <span className="mono-fact mt-4 block">
                    {project.industry} · {project.suburb}
                  </span>
                  <span className="mt-2 block font-display text-display-4 text-ink group-hover:text-accent">
                    {project.name}
                  </span>
                  <span className="mono-fact mt-3 block">
                    {project.metrics.map((metric) => `${metric.value} ${metric.label}`).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section surface="tint" data-treatment="C" label="How we deliver">
        <Kicker>How we deliver</Kicker>
        <h2 className="mt-6 max-w-[18ch] text-display-3">
          The same four steps, every system.
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {process.map((step) => (
            <li key={step.index}>
              <span className="kicker">{step.index}</span>
              <h3 className="mt-4 text-display-4">{step.title}</h3>
              <p className="mt-3 text-body-sm">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="light" data-treatment="F" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] text-display-3">
            Talk to an engineer about {category.name.toLowerCase()}.
          </h2>
          <ButtonLink href={contactWithContext(category.slug)} size="lg">
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
