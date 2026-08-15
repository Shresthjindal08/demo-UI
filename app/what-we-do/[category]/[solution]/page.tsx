import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allSolutions, findSolution } from "@/lib/content/categories";
import { projectsForSolution } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section, TierBadge } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { SolutionSubBar } from "@/components/solution-sub-bar";

export function generateStaticParams() {
  return allSolutions()
    .filter((solution) => solution.status === "live")
    .map((solution) => ({
      category: solution.category.slug,
      solution: solution.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps<"/what-we-do/[category]/[solution]">): Promise<Metadata> {
  const { category, solution: solutionSlug } = await params;
  const solution = findSolution(category, solutionSlug);
  if (!solution) return {};

  return {
    title: `${solution.name} — Victoria`,
    description: solution.outcome,
    alternates: {
      canonical: routes.solution(solution.category.slug, solution.slug),
    },
  };
}

const installProcess = [
  { when: "Wk 0", title: "Site assessment" },
  { when: "Wk 1", title: "Engineered design" },
  { when: "Wk 2", title: "Approvals" },
  { when: "Wk 4", title: "Installation" },
  { when: "Wk 5", title: "Switch-on" },
];

export default async function SolutionPage({
  params,
}: PageProps<"/what-we-do/[category]/[solution]">) {
  const { category: categorySlug, solution: solutionSlug } = await params;
  const solution = findSolution(categorySlug, solutionSlug);
  if (!solution || solution.status !== "live") notFound();

  const relatedProjects = projectsForSolution(solution.slug);
  const specs = (solution.spec ?? "").split("·").map((part) => part.trim()).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.outcome,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "State", name: "Victoria, Australia" },
    url: `${site.url}${routes.solution(solution.category.slug, solution.slug)}`,
  };

  return (
    <div data-surface="cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumbs
        trail={[
          { label: "What we do", href: routes.whatWeDo },
          { label: solution.category.name, href: routes.category(solution.category.slug) },
          {
            label: solution.name,
            href: routes.solution(solution.category.slug, solution.slug),
          },
        ]}
      />

      <SolutionSubBar
        name={solution.name}
        contextHref={contactWithContext(solution.slug)}
      />

      <Section surface="cream" data-treatment="B" label={solution.name}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker>
              {solution.category.index} / {solution.category.name}
            </Kicker>
            <span className="mt-4 inline-flex">
              <TierBadge tier={solution.tier} />
            </span>
            <h1 className="mt-6 max-w-[14ch] text-display-2">{solution.outcome}</h1>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {specs.map((spec) => (
                <li key={spec} className="mono-fact">
                  {spec}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={contactWithContext(solution.slug)} size="lg">
                {site.consultationCta}
              </ButtonLink>
              <ButtonLink href="#specifications" variant="secondary" size="lg">
                Spec sheet
              </ButtonLink>
            </div>
          </div>
          <MediaSlot label={`${solution.name} in situ — real install`} className="aspect-[4/3]" />
        </div>
      </Section>

      <Section surface="cream" data-treatment="D" bleed label="System architecture">
        <div className="container-grid">
          <Kicker>System architecture</Kicker>
        </div>
        <MediaSlot
          label="Full-bleed engineering diagram — labelled nodes, hover reveals each component's role"
          className="mt-8 aspect-[21/9] w-full"
        />
      </Section>

      <Section surface="light" data-treatment="A" label="Key features">
        <Kicker>Key features</Kicker>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index}>
              <div className="size-8 border border-hairline-strong" aria-hidden="true" />
              <h3 className="mt-4 text-display-4">Feature {index + 1}</h3>
              <p className="mt-3 text-body-sm">
                One line describing what this does for the system.
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="tint" data-treatment="C" label="Installation process">
        <Kicker>Installation</Kicker>
        <h2 className="mt-6 max-w-[18ch] text-display-3">Five steps, five weeks.</h2>
        <ol className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-5">
          {installProcess.map((step) => (
            <li key={step.title} className="bg-bg p-6">
              <span className="kicker">{step.when}</span>
              <span className="mt-3 block text-body-sm text-ink">{step.title}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="cream" data-treatment="A" label="Installation photography">
        <Kicker>On site</Kicker>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {["Commissioning", "Switchboard", "Array"].map((label) => (
            <li key={label}>
              <MediaSlot label={`Install photography — ${label}`} className="aspect-[3/4]" />
            </li>
          ))}
        </ul>
      </Section>

      {relatedProjects.length ? (
        <Section surface="dark" data-treatment="B" label="Customer outcome">
          <Kicker>Measured outcome</Kicker>
          <ul className="mt-10 grid gap-8 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <li key={project.slug}>
                <Link href={routes.project(project.slug)} className="group block">
                  <MediaSlot label={project.name} className="aspect-[4/3]" />
                  <span className="mt-4 block font-display text-display-4 text-ink group-hover:text-accent">
                    {project.name}
                  </span>
                  <ul className="mt-4 flex flex-wrap gap-6 border-t border-hairline pt-4">
                    {project.metrics.map((metric) => (
                      <li key={metric.label}>
                        <span className="block font-display text-[1.5rem] text-ink">
                          {metric.value}
                        </span>
                        <span className="mono-fact">{metric.label}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {solution.investment ? (
        <Section surface="cream" data-treatment="F" label="Investment">
          <Kicker>Typical investment, rebates applied</Kicker>
          <p className="mt-6 font-display text-display-2 text-ink">{solution.investment}</p>
          <p className="measure mt-6 text-body-sm">
            An indicative range, not a quote. The figure depends on your roof, switchboard
            and network conditions — the site assessment resolves all three.
          </p>
        </Section>
      ) : null}

      <Section surface="light" data-treatment="C" id="specifications" label="Specifications">
        <Kicker>Specifications</Kicker>
        <h2 className="mt-6 text-display-3">The full detail.</h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-body-sm">
            <caption className="sr-only">
              {solution.name} technical specifications
            </caption>
            <thead>
              <tr className="border-b border-hairline-strong">
                <th scope="col" className="py-3 text-left font-normal">
                  <span className="kicker">Specification</span>
                </th>
                <th scope="col" className="py-3 text-left font-normal">
                  <span className="kicker">Value</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec} className="border-b border-hairline">
                  <th scope="row" className="py-3 text-left font-normal text-ink">
                    {solution.name} range
                  </th>
                  <td className="py-3 font-mono">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section surface="cream" data-treatment="F" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] text-display-3">
            An engineer will call you back.
          </h2>
          <ButtonLink href={contactWithContext(solution.slug)} size="lg">
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </div>
  );
}
