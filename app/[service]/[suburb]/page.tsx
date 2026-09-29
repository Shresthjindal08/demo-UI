import { surfaceStyles } from "@/lib/styles";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findLocalService,
  findSuburb,
  localPages,
} from "@/lib/content/suburbs";
import { findSolution } from "@/lib/content/categories";
import { projectsInSuburb } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";

export function generateStaticParams() {
  return localPages();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[service]/[suburb]">): Promise<Metadata> {
  const { service: serviceSlug, suburb: suburbSlug } = await params;
  const service = findLocalService(serviceSlug);
  const suburb = findSuburb(suburbSlug);
  if (!service || !suburb) return {};

  return {
    title: `${service.name} in ${suburb.name}, ${suburb.state}`,
    description: `${service.name} designed and installed in ${suburb.name} ${suburb.postcode}. ${suburb.systemsInstalled} systems installed locally since ${suburb.servingSince}.`,
    alternates: { canonical: routes.local(service.slug, suburb.slug) },
  };
}

export default async function LocalLandingPage({
  params,
}: PageProps<"/[service]/[suburb]">) {
  const { service: serviceSlug, suburb: suburbSlug } = await params;
  const service = findLocalService(serviceSlug);
  const suburb = findSuburb(suburbSlug);
  if (!service || !suburb) notFound();

  const solution = findSolution(service.categorySlug, service.solutionSlug);
  if (!solution) notFound();

  const localProjects = projectsInSuburb(suburb.name);
  const nearby = suburb.nearby
    .map((slug) => findSuburb(slug))
    .filter((entry) => entry !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${suburb.name}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: {
      "@type": "Place",
      name: `${suburb.name}, ${suburb.state} ${suburb.postcode}`,
    },
    url: `${site.url}${routes.local(service.slug, suburb.slug)}`,
  };

  return (
    <div data-surface="dark" className={`${surfaceStyles}`}>
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
          {
            label: suburb.name,
            href: routes.local(service.slug, suburb.slug),
          },
        ]}
      />

      <Section surface="dark" data-treatment="B" label={`${service.name} in ${suburb.name}`}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker>
              {service.name} · {suburb.name}, {suburb.state} {suburb.postcode}
            </Kicker>
            <h1 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-8 max-w-[14ch] text-display-2">
              {service.name} in {suburb.name}.
            </h1>
            <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-8 text-lead">
              We have been designing systems in {suburb.name} since {suburb.servingSince}.
              The local housing stock and network conditions shape what we specify here —
              this is not a template page with a suburb name dropped into it.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">
                {suburb.systemsInstalled} systems in {suburb.name}
              </li>
              <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{suburb.capacityInstalled} installed</li>
              <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">Since {suburb.servingSince}</li>
            </ul>
            <div className="mt-10">
              <ButtonLink
                href={contactWithContext(`${service.slug}-${suburb.slug}`)}
                size="lg"
              >
                {site.consultationCta}
              </ButtonLink>
            </div>
          </div>
          <MediaSlot
            label={`Real install in ${suburb.name}`}
            className="aspect-[4/3]"
          />
        </div>
      </Section>

      {localProjects.length ? (
        <Section surface="light" data-treatment="A" label={`Projects in ${suburb.name}`}>
          <Kicker>Nearby work</Kicker>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {localProjects.map((project) => (
              <li key={project.slug}>
                <Link href={routes.project(project.slug)} className="group block">
                  <MediaSlot label={project.name} className="aspect-[4/3]" />
                  <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-4 block">
                    {project.industry} · {project.suburb} · {project.year}
                  </span>
                  <span className="mt-2 block font-display text-display-4 text-ink group-hover:text-accent">
                    {project.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section surface="tint" data-treatment="C" label="Rebates and service area">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Rebates</Kicker>
            <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 text-display-3">What applies in {suburb.state}.</h2>
            <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-6 text-body-lg">
              Solar Victoria rebates and federal certificates are prepared and lodged by
              us, and applied to your figure rather than claimed back later.
            </p>
          </div>
          <div>
            <Kicker>Service area</Kicker>
            <MediaSlot
              label={`Service area — ${suburb.name} + 5km`}
              className="mt-6 aspect-[4/3]"
            />
          </div>
        </div>
      </Section>

      <Section surface="dark" data-treatment="F" label="Nearby suburbs">
        <Kicker>Also serving</Kicker>
        <ul className="mt-6 flex flex-wrap gap-3">
          {nearby.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={routes.local(service.slug, entry.slug)}
                className="flex min-h-11 items-center border border-hairline px-4 text-body-sm transition-colors hover:border-accent hover:text-ink"
              >
                {service.name} in {entry.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[18ch] text-display-3">
            Talk to an engineer who knows {suburb.name}.
          </h2>
          <ButtonLink
            href={contactWithContext(`${service.slug}-${suburb.slug}`)}
            size="lg"
          >
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </div>
  );
}
