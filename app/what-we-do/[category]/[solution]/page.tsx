import { surfaceStyles } from "@/lib/styles";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allSolutions, findSolution } from "@/lib/content/categories";
import { projectsForSolution } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
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

const keyFeatures = [
  {
    title: "Designed to your load profile",
    body: "Sized to how the building actually draws power, not a catalogue default.",
  },
  {
    title: "Network-aware engineering",
    body: "Export limits, switchboard and connection constraints resolved before install.",
  },
  {
    title: "Battery- and EV-ready",
    body: "Architecture sized so storage or charging can be added without re-engineering.",
  },
  {
    title: "One accountable team",
    body: "The engineer who designs the system stays with it through commissioning.",
  },
  {
    title: "Measured after handover",
    body: "Performance is monitored against the design and tuned, not assumed.",
  },
  {
    title: "Single warranty relationship",
    body: "Workmanship and equipment answer to one party, not a chain of subcontractors.",
  },
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
    <div data-surface="cream" className={`${surfaceStyles}`}>
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
            <h1 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[14ch] text-display-2">{solution.outcome}</h1>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {specs.map((spec) => (
                <li key={spec} className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">
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
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)]">
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
          {keyFeatures.map((feature, index) => (
            <li key={feature.title}>
              <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-4 text-display-4">{feature.title}</h3>
              <p className="text-pretty mt-3 text-body-sm">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="tint" data-treatment="C" label="Installation process">
        <Kicker>Installation</Kicker>
        <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[18ch] text-display-3">Five steps, five weeks.</h2>
        <ol className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-5">
          {installProcess.map((step) => (
            <li key={step.title} className="bg-bg p-6">
              <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">{step.when}</span>
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
                        <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{metric.label}</span>
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
          <p className="text-pretty mt-6 font-display text-display-2 text-ink">{solution.investment}</p>
          <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-6 text-body-sm">
            An indicative range, not a quote. The figure depends on your roof, switchboard
            and network conditions — the site assessment resolves all three.
          </p>
        </Section>
      ) : null}

      <Section surface="light" data-treatment="C" id="specifications" label="Specifications">
        <Kicker>Specifications</Kicker>
        <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 text-display-3">The full detail.</h2>
        <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-3">
          {specs.map((spec) => (
            <li key={spec} className="bg-bg p-6">
              <span className="block font-mono text-body-sm text-ink">{spec}</span>
            </li>
          ))}
        </ul>
        <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-8 text-body-sm text-muted">
          Full component schedules and datasheets are issued with your engineered design.
        </p>
      </Section>

      <Section surface="cream" data-treatment="F" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[16ch] text-display-3">
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
