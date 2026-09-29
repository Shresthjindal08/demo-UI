import { surfaceStyles } from "@/lib/styles";
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
      <section className={`${surfaceStyles} relative flex flex-col min-h-[100svh] overflow-hidden isolate bg-bg`} data-surface="dark">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover [object-position:center_45%] [transform:scale(1.06)] animate-hero-drift"
          />
        </div>
        <div className="relative z-2 flex flex-col items-center min-h-[100svh] [padding:max(140px,_18svh)_24px_180px] text-center [color:var(--palette-forest)]">
          <div className="relative isolate flex w-full max-w-240 flex-col items-center">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -top-8 -bottom-8 -z-1 bg-[linear-gradient(to_bottom,transparent_0%,rgb(255_255_255_/_0.65)_35%,white_100%)] blur-2xl" />
            <p className="text-pretty text-[0.75rem] font-semibold tracking-[0.28em] uppercase">Powering a cleaner future</p>
            <span className="w-12 h-0.5 [margin:18px_0_22px] [background:var(--palette-orange)]" aria-hidden="true" />
            <h1 className={`[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance ${heroFont.className} text-black text-[clamp(3.5rem,_7.2vw,_7.5rem)] font-medium leading-[0.9] tracking-[-0.045em]`}>
              Energy, designed
              <br />
              for <em>tomorrow.</em>
            </h1>
            <p className="text-pretty max-w-160 mt-6 text-[clamp(0.95rem,_1.3vw,_1.2rem)] leading-[1.6] [color:var(--palette-slate)]">
              Smarter solar solutions for homes, businesses and communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6.5">
              <Link href={routes.whatWeDo} className="inline-flex items-center justify-center gap-5 min-h-12.5 [padding:12px_28px] [border:1px_solid_var(--palette-green-deep)] rounded-pill text-[0.9rem] font-medium [transition:background-color_200ms] [background:var(--palette-green-deep)] [color:white] [&:hover]:[background:var(--palette-green)]">
                Explore solutions <span aria-hidden="true">→</span>
              </Link>
              <Link href={routes.projects} className="inline-flex items-center justify-center gap-5 min-h-12.5 [padding:12px_28px] [border:1px_solid_var(--palette-green-deep)] rounded-pill text-[0.9rem] font-medium [transition:background-color_200ms] [background:rgb(248_250_247_/_0.35)] [color:var(--palette-forest)] [&:hover]:[background:rgb(248_250_247_/_0.8)]">
                See our projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <a href="#solutions" className="no-underline absolute z-2 right-8 bottom-10 grid [place-items:center] w-11 h-11 [border:1px_solid_white] rounded-[50%] [color:white] text-[1.5rem] [@media(max-width:_479px)]:right-4 [@media(max-width:_479px)]:bottom-8" aria-label="Scroll to our solutions">↓</a>
      </section>

      <section data-surface="light" data-treatment="C" aria-label="Accreditation" className={`${surfaceStyles}`}>
        <Container>
          <ul className="flex gap-8 overflow-x-auto border-t border-hairline py-6 lg:justify-between">
            {site.trustBar.map((item) => (
              <li key={item} className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted whitespace-nowrap">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section id="solutions" surface="tint" data-treatment="A" label="What we do" className="relative z-6 mt-[clamp(-5rem,_-7vw,_-2.5rem)] pt-[clamp(2.5rem,_4vw,_4rem)] pb-12 [@media(max-width:_900px)]:mt-[0] [@media(max-width:_900px)]:pt-4">
        <div className="mb-[2.8rem]">
          <Kicker>What we do</Kicker>
          <h2 className="mt-4 max-w-[10ch] font-display text-[clamp(2.75rem,_4.5vw,_7rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-balance text-ink normal-case">
            Four capabilities,
            <br />
            engineered as
            <br />
            one system.
          </h2>
        </div>

        <ul className="flex flex-col gap-[clamp(3.5rem,_7vw,_7rem)] [margin:clamp(1.5rem,_3vw,_3rem)_0_0] p-0 list-none [@media(max-width:_900px)]:gap-[clamp(2.75rem,_8vw,_4rem)]" aria-label="Service capabilities">
          {launchCategories.map((category) => (
            <li key={category.slug} className="group/capability-row [--blob:color-mix(in_srgb,_var(--palette-green-soft)_26%,_var(--v-surface))] [--blob-deep:color-mix(in_srgb,_var(--palette-green)_32%,_var(--v-surface))] [&:nth-child(2)]:[--blob:color-mix(in_srgb,_var(--palette-yellow)_26%,_var(--v-surface))] [&:nth-child(2)]:[--blob-deep:color-mix(in_srgb,_var(--palette-yellow)_42%,_var(--v-surface))] [&:nth-child(3)]:[--blob:color-mix(in_srgb,_var(--palette-green-bright)_24%,_var(--v-surface))] [&:nth-child(3)]:[--blob-deep:color-mix(in_srgb,_var(--palette-green-bright)_36%,_var(--v-surface))] [&:nth-child(4)]:[--blob:color-mix(in_srgb,_var(--palette-orange)_24%,_var(--v-surface))] [&:nth-child(4)]:[--blob-deep:color-mix(in_srgb,_var(--palette-orange)_36%,_var(--v-surface))] [&:nth-child(5)]:[--blob:color-mix(in_srgb,_var(--palette-green-deep)_28%,_var(--v-surface))] [&:nth-child(5)]:[--blob-deep:color-mix(in_srgb,_var(--palette-green-deep)_42%,_var(--v-surface))]">
              <Link href={routes.category(category.slug)} className="group/capability-row-link grid grid-cols-[1fr_1fr] items-center gap-[clamp(1.5rem,_5vw,_6rem)] [&:focus-visible]:[outline:2px_solid_var(--v-accent)] [&:focus-visible]:[outline-offset:10px] [&:focus-visible]:rounded-md [@media(max-width:_1200px)]:gap-[clamp(1.25rem,_3.5vw,_3rem)] [@media(max-width:_900px)]:grid-cols-[1fr] [@media(max-width:_900px)]:gap-[clamp(1.25rem,_4vw,_1.75rem)] [@media(max-width:_900px)]:group-even/capability-row:grid-cols-[1fr] [@media(max-width:_900px)]:group-even/capability-row:gap-[clamp(1.25rem,_4vw,_1.75rem)]">
                <div className="col-start-2 row-start-1 relative aspect-[5_/_4] group-even/capability-row:col-start-1 [@media(max-width:_900px)]:col-start-1 [@media(max-width:_900px)]:row-start-1 [@media(max-width:_900px)]:aspect-[16_/_11] [@media(max-width:_900px)]:group-even/capability-row:col-start-1 [@media(max-width:_900px)]:group-even/capability-row:row-start-1 [@media(max-width:_900px)]:group-even/capability-row:aspect-[16_/_11]">
                  <span className="absolute inset-0 [background:var(--blob)] rounded-[clamp(2.5rem,_7vw,_6.5rem)_var(--radius-lg)_clamp(2.5rem,_7vw,_6.5rem)_var(--radius-lg)] [box-shadow:0_42px_80px_-46px_var(--blob-deep)] group-even/capability-row:rounded-[var(--radius-lg)_clamp(2.5rem,_7vw,_6.5rem)_var(--radius-lg)_clamp(2.5rem,_7vw,_6.5rem)]" aria-hidden="true" />
                  <div
                    className="overflow-hidden absolute [inset:clamp(1rem,_2.6vw,_2.25rem)] bg-center bg-cover rounded-[clamp(1.75rem,_5vw,_4.5rem)_var(--radius-md)_clamp(1.75rem,_5vw,_4.5rem)_var(--radius-md)] [box-shadow:0_30px_60px_-34px_rgb(0_0_0_/_0.4)] [transition:transform_640ms_var(--ease)] group-even/capability-row:rounded-[var(--radius-md)_clamp(1.75rem,_5vw,_4.5rem)_var(--radius-md)_clamp(1.75rem,_5vw,_4.5rem)] group-hover/capability-row-link:scale-103 [@media(max-width:_640px)]:[inset:clamp(0.75rem,_3.5vw,_1.25rem)]"
                  >
                    <Image src={dummyImage(category.name)} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>

                <div className="col-start-1 row-start-1 flex flex-col items-start gap-[clamp(0.9rem,_1.5vw,_1.35rem)] group-even/capability-row:col-start-2 [@media(max-width:_900px)]:col-start-1 [@media(max-width:_900px)]:row-start-2 [@media(max-width:_900px)]:group-even/capability-row:col-start-1 [@media(max-width:_900px)]:group-even/capability-row:row-start-2">
                  <span className="font-mono text-[0.72rem] tracking-[0.28em] uppercase text-accent">{category.index}</span>
                  <h3 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[12ch] text-ink font-display text-[clamp(2rem,_3.4vw,_3.75rem)] leading-[0.98] tracking-[-0.045em] [transition:color_var(--duration-base)_var(--ease)] group-hover/capability-row-link:text-accent [@media(max-width:_1200px)]:text-[clamp(1.9rem,_3.6vw,_2.75rem)] [@media(max-width:_640px)]:text-[clamp(1.85rem,_8vw,_2.5rem)]">{category.name}</h3>
                  <p className="text-pretty max-w-[40ch] text-body text-[clamp(1rem,_1.15vw,_1.15rem)] leading-[1.6]">{category.descriptor}</p>
                  <span className="inline-flex items-center gap-2 mt-[0.4rem] pb-[0.3rem] text-highlight font-mono text-[0.75rem] tracking-[0.16em] uppercase [border-bottom:1px_solid_color-mix(in_srgb,_var(--v-highlight)_40%,_transparent)] [transition:border-color_var(--duration-base)_var(--ease)] group-hover/capability-row-link:[border-color:var(--v-highlight)]">
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
            <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[16ch] text-display-3">
              The three systems people ask for first.
            </h2>
          </div>
          <Link href={routes.whatWeDo} className="text-body-sm text-accent">
            See all solutions →
          </Link>
        </div>
        <ul className="grid grid-cols-[repeat(3,_minmax(0,_1fr))] [margin:clamp(2.5rem,_4vw,_4rem)_0_0] p-0 list-none [border-top:1px_solid_var(--v-hairline-strong)] [@media(max-width:_1024px)]:grid-cols-[1fr]">
          {popular.map((solution, index) => (
            <li key={solution.slug} className="[&+li]:[border-left:1px_solid_var(--v-hairline)] [@media(max-width:_1024px)]:[&+li]:[border-left:0] [@media(max-width:_1024px)]:[&+li]:[border-top:1px_solid_var(--v-hairline)]">
              <Link
                href={routes.solution(solution.category.slug, solution.slug)}
                className="group/requested-link relative flex flex-col h-full [padding:clamp(1.5rem,_2vw,_2.25rem)] [&::before]:[content:''] [&::before]:absolute [&::before]:top-[-1px] [&::before]:left-[0] [&::before]:right-[0] [&::before]:h-0.5 [&::before]:bg-highlight [&::before]:scale-x-0 [&::before]:origin-left [&::before]:[transition:transform_var(--duration-base)_var(--ease)] [&:hover::before]:scale-x-100 [&:focus-visible::before]:scale-x-100"
              >
                <span className="font-mono text-[0.7rem] tracking-[0.24em] text-muted [transition:color_var(--duration-micro)_var(--ease)] group-hover/requested-link:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative block h-[clamp(11rem,_17vw,_15rem)] mt-5 rounded-lg overflow-hidden bg-surface [&_img]:object-cover [&_img]:[transition:transform_620ms_var(--ease)] group-hover/requested-link:[&_img]:scale-107">
                  <Image
                    src={dummyImage(solution.name)}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </span>

                <span className="flex items-center gap-3 mt-6">
                  <span className="font-display text-[clamp(1.5rem,_1.9vw,_2.1rem)] leading-[1.05] tracking-[-0.03em] text-ink [transition:color_var(--duration-micro)_var(--ease)] group-hover/requested-link:text-accent">{solution.name}</span>
                  <TierBadge tier={solution.tier} />
                </span>

                {solution.spec ? (
                  <span className="mt-[0.7rem] font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{solution.spec}</span>
                ) : null}
                <span className="mt-4 text-[length:var(--text-body-sm)] leading-[1.55] text-body">{solution.outcome}</span>

                {solution.investment ? (
                  <span className="flex items-baseline gap-[0.55rem] mt-[auto] pt-7 font-display text-[clamp(1.5rem,_1.8vw,_2rem)] tracking-[-0.03em] text-ink [&_em]:font-mono [&_em]:not-italic [&_em]:text-[0.68rem] [&_em]:tracking-[0.2em] [&_em]:uppercase [&_em]:text-muted">
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
        <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[18ch] text-display-3">Method, not salesmanship.</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {howWeWork.map((item) => (
            <li key={item.index}>
              <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">{item.index}</span>
              <h3 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-4 text-display-4">{item.title}</h3>
              <p className="text-pretty mt-3 text-body-sm">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light" data-treatment="A" label="Featured projects">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>Selected work</Kicker>
            <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[16ch] text-display-3">Systems already running.</h2>
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
                  <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-6 block">
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
                        <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{metric.label}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <section data-surface="light" data-treatment="E" className={`${surfaceStyles} relative`}>
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
                  <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted mt-2 block">{stat.label}</span>
                </li>
              ))}
            </ul>
          </Container>
        </MediaSlot>
      </section>

      <Section surface="light" data-treatment="D" label="Customer journey">
        <Kicker>The journey</Kicker>
        <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[18ch] text-display-3">
          Six steps, one team, no handovers.
        </h2>
        <ol className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-6">
          {journey.map((step, index) => (
            <li key={step} className="bg-bg p-6">
              <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">{String(index + 1).padStart(2, "0")}</span>
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
              <p className="text-pretty text-display-4">
                “They sized it to the house, not to a price list. Three years on it still
                does what they said it would.”
              </p>
              <footer className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-6">
                <cite className="not-italic">Homeowner · Brighton</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section surface="cream" data-treatment="F" label="Engineering statement">
        <p className="text-pretty mx-auto max-w-[20ch] text-center font-display text-display-2 text-ink">
          Engineered for what&rsquo;s next.
        </p>
      </Section>

      <Section surface="light" data-treatment="C" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[16ch] text-display-3">
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
