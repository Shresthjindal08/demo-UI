import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, mostRequested } from "@/lib/content/categories";
import { featuredProjects } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { dummyImage } from "@/lib/content/media";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Container, Kicker, Section, TierBadge } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";

export const metadata: Metadata = {
  title: "Renewable infrastructure engineering — Victoria",
  description:
    "Vagus Energy designs complete energy systems — solar, storage, EV charging, heat pumps and grid integration — as one instrument.",
};

const howWeWork = [
  {
    index: "01",
    title: "Engineering-led design",
    body: "Every system is drawn to the building and its load profile.",
  },
  {
    index: "02",
    title: "One team, end to end",
    body: "The engineer who designs it stays with it through commissioning.",
  },
  {
    index: "03",
    title: "Measured after handover",
    body: "Performance is monitored and tuned, not assumed.",
  },
  {
    index: "04",
    title: "Built to be added to",
    body: "Systems are sized so storage or charging can follow later.",
  },
];

const heroStats = [
  "46.2 MW installed",
  "2,500+ projects delivered",
  "99.4% fleet uptime",
  "10+ years operating",
  "NETCC Approved Seller",
  "Solar Victoria Approved Retailer",
  "25-year warranty",
  "4.9★ Google",
  "Australian owned",
];

const journey = [
  "Enquiry",
  "Site assessment",
  "Engineered design",
  "Approvals",
  "Installation",
  "Switch-on and monitoring",
];

export default function HomePage() {
  const popular = mostRequested();
  const featured = featuredProjects();

  return (
    <>
      <section className="hero" data-surface="dark">
        <div className="hero__glow" aria-hidden="true" />

        <div className="container-grid hero__inner">
          <div className="hero__top">
            <span className="hero__eyebrow">Since 2014 · Victoria, Australia</span>
            <span className="hero__index">01 / Renewable infrastructure</span>
          </div>

          <div className="hero__main">
            <h1 className="hero__title">
              <span className="hero__line">Engineered</span>
              <span className="hero__line hero__line--accent">for what&rsquo;s</span>
              <span className="hero__line hero__line--shift">next.</span>
            </h1>

            <div className="hero__media">
              <Image
                src={dummyImage("Renewable Energy — hero")}
                alt="Vagus engineers commissioning a rooftop solar array"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="hero__base">
            <p className="hero__lead">
              Solar, storage, EV charging, heat pumps and grid integration — designed as
              one system by the engineers who commission it, then measured after handover.
            </p>

            <div className="hero__actions">
              <ButtonLink href={contactWithContext("home-hero")} size="lg">
                {site.consultationCta}
              </ButtonLink>
              <ButtonLink href={routes.projects} variant="secondary" size="lg">
                View projects
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="hero__rail">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="hero__marquee"
              aria-hidden={copy === 1}
              aria-label={copy === 0 ? "Credentials" : undefined}
            >
              {heroStats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section data-surface="dark" data-treatment="C" aria-label="Accreditation">
        <Container>
          <ul className="flex gap-8 overflow-x-auto border-t border-hairline py-6 lg:justify-between">
            {site.trustBar.map((item) => (
              <li key={item} className="mono-fact whitespace-nowrap">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section surface="dark" data-treatment="A" label="What we do" className="what-we-do">
        <div className="what-we-do__header">
          <Kicker>What we do</Kicker>
          <h2>
            Five capabilities,
            <br />
            engineered as
            <br />
            one system.
          </h2>
        </div>

        <ul className="premium-cards" aria-label="Service capabilities">
          {categories.map((category) => (
            <li key={category.slug} className="premium-card">
              <Link href={routes.category(category.slug)} className="premium-card__link">
                <span className="premium-card__index">{category.index}</span>

                <div
                  className="premium-card__media"
                  style={{ backgroundImage: `url(${dummyImage(category.name)})` }}
                />

                <span className="premium-card__label">{category.name}</span>
                <div className="premium-card__meta">
                  <span>{category.descriptor}</span>
                  <b>{category.solutions.length} solutions →</b>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light" data-treatment="B" label="Most requested">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>Most requested</Kicker>
            <h2 className="mt-6 max-w-[16ch] text-display-3">
              The three systems people ask for first.
            </h2>
          </div>
          <Link href={routes.whatWeDo} className="text-body-sm text-accent">
            See all solutions →
          </Link>
        </div>
        <ul className="requested">
          {popular.map((solution, index) => (
            <li key={solution.slug} className="requested__item">
              <Link
                href={routes.solution(solution.category.slug, solution.slug)}
                className="requested__link"
              >
                <span className="requested__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="requested__media">
                  <Image
                    src={dummyImage(solution.name)}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </span>

                <span className="requested__head">
                  <span className="requested__name">{solution.name}</span>
                  <TierBadge tier={solution.tier} />
                </span>

                {solution.spec ? (
                  <span className="requested__spec">{solution.spec}</span>
                ) : null}
                <span className="requested__outcome">{solution.outcome}</span>

                {solution.investment ? (
                  <span className="requested__price">
                    <em>From</em>
                    {solution.investment.split("–")[0].trim()}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="tint" data-treatment="C" label="How we work">
        <Kicker>How we work</Kicker>
        <h2 className="mt-6 max-w-[18ch] text-display-3">Method, not salesmanship.</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {howWeWork.map((item) => (
            <li key={item.index}>
              <span className="kicker">{item.index}</span>
              <h3 className="mt-4 text-display-4">{item.title}</h3>
              <p className="mt-3 text-body-sm">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="dark" data-treatment="A" label="Featured projects">
        <Kicker>Selected work</Kicker>
        <h2 className="mt-6 max-w-[16ch] text-display-3">Systems already running.</h2>
        <ul className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {featured.map((project) => (
            <li key={project.slug}>
              <Link href={routes.project(project.slug)} className="group block">
                <MediaSlot label={project.name} className="aspect-[16/10]" />
                <span className="mono-fact mt-5 block">
                  {project.industry} · {project.suburb} · {project.year}
                </span>
                <span className="mt-2 block font-display text-display-4 text-ink group-hover:text-accent">
                  {project.name}
                </span>
                <ul className="mt-5 flex flex-wrap gap-8 border-t border-hairline pt-5">
                  {project.metrics.map((metric) => (
                    <li key={metric.label}>
                      <span className="block font-display text-[1.75rem] text-ink">
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
        <div className="mt-12">
          <Link href={routes.projects} className="text-body-sm text-accent">
            All projects →
          </Link>
        </div>
      </Section>

      <section data-surface="dark" data-treatment="E" className="relative">
        <MediaSlot
          label="Statistics over full-bleed imagery"
          className="min-h-[60svh] w-full"
        >
          <Container>
            <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
              {[
                { value: "46.2", label: "MW installed" },
                { value: "2,500+", label: "Projects delivered" },
                { value: "99.4%", label: "Fleet uptime" },
                { value: "10+", label: "Years operating" },
              ].map((stat) => (
                <li key={stat.label}>
                  <span className="block font-display text-display-2 text-ink">
                    {stat.value}
                  </span>
                  <span className="kicker mt-2 block">{stat.label}</span>
                </li>
              ))}
            </ul>
          </Container>
        </MediaSlot>
      </section>

      <Section surface="light" data-treatment="D" label="Customer journey">
        <Kicker>The journey</Kicker>
        <h2 className="mt-6 max-w-[18ch] text-display-3">
          Six steps, one team, no handovers.
        </h2>
        <ol className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-6">
          {journey.map((step, index) => (
            <li key={step} className="bg-bg p-6">
              <span className="kicker">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-3 block text-body-sm text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="cream" data-treatment="B" label="Customer story">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MediaSlot label="Customer story video — 60–90s, captioned" className="aspect-video" />
          <div>
            <Kicker>Customer story</Kicker>
            <blockquote className="mt-6">
              <p className="text-display-4">
                “They sized it to the house, not to a price list. Three years on it still
                does what they said it would.”
              </p>
              <footer className="mono-fact mt-6">
                <cite className="not-italic">Homeowner · Brighton</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section surface="dark" data-treatment="F" label="Engineering statement">
        <p className="mx-auto max-w-[20ch] text-center font-display text-display-2 text-ink">
          Engineered for what&rsquo;s next.
        </p>
      </Section>

      <Section surface="dark" data-treatment="C" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[16ch] text-display-3">
            An engineer will call you back.
          </h2>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactWithContext("home")} size="lg">
              {site.consultationCta}
            </ButtonLink>
            <ButtonLink href={routes.projects} variant="secondary" size="lg">
              View projects
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
