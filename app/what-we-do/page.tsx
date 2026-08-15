import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/content/categories";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section, TierBadge } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { MediaSlot } from "@/components/ui/media-slot";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Five business capabilities — renewable energy, electric mobility, energy efficiency, community energy and future services — and the solutions inside each.",
  alternates: { canonical: routes.whatWeDo },
};

const integrationBenefits = [
  { title: "One control layer", body: "Generation, storage and charging answer to the same system." },
  { title: "One warranty relationship", body: "A single party is accountable for the whole install." },
  { title: "Staged expansion", body: "Sized so storage or charging can follow without rework." },
  { title: "Measured performance", body: "Monitored after handover and tuned against the design." },
];

const audiences = [
  { title: "Homes", body: "Solar, battery, EV charging and heat pump on one design.", filter: "Residential" },
  { title: "Businesses", body: "Commercial solar, storage and fleet charging.", filter: "Commercial" },
  { title: "Communities", body: "Community battery, microgrid and optimisation.", filter: "Community" },
];

export default function WhatWeDoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `${site.url}${routes.category(category.slug)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="What we do"
        title="Five capabilities. One instrument."
        lead="These are the five things Vagus does. The services you buy sit inside them — so you can see the whole business before you choose a part of it."
        index="01 / Capabilities"
        imageLabel="Renewable Energy"
      />

      <Section surface="tint" data-treatment="D" label="Ecosystem">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <MediaSlot
            label="Interactive SVG — how the five categories interconnect"
            className="aspect-[4/3]"
          />
          <ol className="border-t border-hairline">
            {categories.map((category) => (
              <li key={category.slug} className="border-b border-hairline">
                <Link
                  href={routes.category(category.slug)}
                  className="group flex min-h-14 items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="kicker">{category.index}</span>
                    <span className="font-display text-display-4 text-ink group-hover:text-accent">
                      {category.name}
                    </span>
                  </span>
                  <span className="mono-fact">
                    {category.solutions.length}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {categories.map((category, index) => (
        <Section
          key={category.slug}
          id={category.slug}
          surface={index % 2 === 0 ? "light" : "dark"}
          data-treatment="B"
          label={category.name}
        >
          <div
            className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <MediaSlot label={category.name} className="aspect-[4/3]" />
            <div>
              <Kicker>
                {category.index} / {category.name}
              </Kicker>
              <h2 className="mt-6 max-w-[16ch] text-display-3">{category.promise}</h2>
              <p className="measure mt-6 text-body-lg">{category.descriptor}</p>
              <ul className="mt-8 flex flex-wrap gap-3">
                {category.solutions.map((solution) => (
                  <li key={solution.slug}>
                    {solution.status === "live" ? (
                      <Link
                        href={routes.solution(category.slug, solution.slug)}
                        className="flex min-h-11 items-center gap-2 border border-hairline px-4 text-body-sm transition-colors hover:border-accent hover:text-ink"
                      >
                        {solution.name}
                        {solution.tier === "P1" ? <TierBadge tier="P1" /> : null}
                      </Link>
                    ) : (
                      <span className="flex min-h-11 items-center gap-2 border border-dashed border-hairline px-4 text-body-sm text-muted">
                        {solution.name}
                        <span className="mono-fact">soon</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={routes.category(category.slug)}
                  className="text-body-sm text-accent"
                >
                  Explore category →
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section surface="tint" data-treatment="C" label="Why an integrated system">
        <Kicker>Why integrated</Kicker>
        <h2 className="mt-6 max-w-[20ch] text-display-3">
          The benefits are benefits of integration.
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {integrationBenefits.map((benefit) => (
            <li key={benefit.title}>
              <h3 className="text-display-4">{benefit.title}</h3>
              <p className="mt-3 text-body-sm">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light" data-treatment="A" label="Who uses what">
        <Kicker>Who uses what</Kicker>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li key={audience.title}>
              <Link
                href={`${routes.projects}?industry=${audience.filter}`}
                className="group flex h-full flex-col border border-hairline p-6 transition-colors hover:border-accent"
              >
                <MediaSlot label={audience.title} className="aspect-[3/2]" />
                <span className="mt-6 block font-display text-display-4 text-ink">
                  {audience.title}
                </span>
                <span className="mt-3 block text-body-sm">{audience.body}</span>
                <span className="mono-fact mt-auto pt-6 group-hover:text-accent">
                  See projects →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="dark" data-treatment="C" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] text-display-3">
            Not sure which capability you need?
          </h2>
          <ButtonLink href={contactWithContext("what-we-do")} size="lg">
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
