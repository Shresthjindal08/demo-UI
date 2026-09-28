import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { launchCategories, mostRequested } from "@/lib/content/categories";
import { featuredProjects } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { dummyImage } from "@/lib/content/media";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Container, Kicker, Section, TierBadge } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";

const heroFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
});

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

const heroImage =
  "/ChatGPT Image Sep 28, 2026, 04_27_26 PM.png";

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
        <div className="hero__bg" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero__image"
          />
        </div>
        <div className="relative z-10 flex min-h-svh flex-col items-center px-6 pb-16 pt-[max(140px,23svh)] text-center">
          <h1 className="max-w-4xl font-display text-[var(--palette-forest)]">
            <span className="mb-5 block text-[clamp(0.7rem,1vw,0.85rem)] leading-normal font-semibold tracking-[0.28em] uppercase">
              Cleaner energy.
            </span>
            <span className={`${heroFont.className} block text-[clamp(3.5rem,6.5vw,6.5rem)] leading-[1.05] tracking-[-0.035em]`}>
              Brighter <span className="italic">tomorrows.</span>
            </span>
          </h1>
          <Link
            href={routes.whatWeDo}
            className="mt-7 inline-flex min-h-12 items-center gap-5 rounded-full bg-[var(--palette-green)] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--palette-green-deep)]"
          >
            Explore our solutions
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section data-surface="light" data-treatment="C" aria-label="Accreditation">
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

      <Section surface="tint" data-treatment="A" label="What we do" className="what-we-do">
        <div className="what-we-do__header">
          <Kicker>What we do</Kicker>
          <h2>
            Four capabilities,
            <br />
            engineered as
            <br />
            one system.
          </h2>
        </div>

        <ul className="capability-rows" aria-label="Service capabilities">
          {launchCategories.map((category) => (
            <li key={category.slug} className="capability-row">
              <Link href={routes.category(category.slug)} className="capability-row__link">
                <div className="capability-row__media">
                  <span className="capability-row__blob" aria-hidden="true" />
                  <span
                    className="capability-row__image"
                    style={{ backgroundImage: `url(${dummyImage(category.name)})` }}
                  />
                </div>

                <div className="capability-row__text">
                  <span className="capability-row__index">{category.index}</span>
                  <h3 className="capability-row__name">{category.name}</h3>
                  <p className="capability-row__descriptor">{category.descriptor}</p>
                  <span className="capability-row__cta">
                    {category.solutions.length} solutions →
                  </span>
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

      <Section surface="light" data-treatment="A" label="Featured projects">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>Selected work</Kicker>
            <h2 className="mt-6 max-w-[16ch] text-display-3">Systems already running.</h2>
          </div>
          <Link href={routes.projects} className="text-body-sm text-accent">
            All projects →
          </Link>
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
          {featured.map((project, index) => {
            const lead = index % 2 === 0;
            return (
              <li
                key={project.slug}
                className={lead ? "lg:col-span-7" : "lg:col-span-5 lg:col-start-8 lg:mt-32"}
              >
                <Link href={routes.project(project.slug)} className="group block">
                  <MediaSlot
                    label={project.name}
                    className={lead ? "aspect-[4/3]" : "aspect-[4/5]"}
                  />
                  <span className="mono-fact mt-6 block">
                    {project.industry} · {project.suburb} · {project.year}
                  </span>
                  <span
                    className={`mt-3 block font-display text-ink group-hover:text-accent ${
                      lead ? "text-display-3" : "text-display-4"
                    }`}
                  >
                    {project.name}
                  </span>
                  <ul className="mt-6 flex flex-wrap gap-8 border-t border-hairline pt-6">
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
            );
          })}
        </ul>
      </Section>

      <section data-surface="light" data-treatment="E" className="relative">
        <MediaSlot
          label="Rooftop solar array at golden hour — Victoria"
          src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2000&q=80"
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

      <Section surface="cream" data-treatment="F" label="Engineering statement">
        <p className="mx-auto max-w-[20ch] text-center font-display text-display-2 text-ink">
          Engineered for what&rsquo;s next.
        </p>
      </Section>

      <Section surface="light" data-treatment="C" label="Start a consultation">
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
