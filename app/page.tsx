import { HomeJourney } from "@/components/home-journey";
import { HomeImpact } from "@/components/home-impact";
import { HomeHowWeWork } from "@/components/home-how-we-work";
import { surfaceStyles } from "@/lib/styles";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeProjects } from "@/components/home-projects";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { Container } from "@/components/ui/primitives";
import { HomeMostRequested } from "@/components/home-most-requested";
import { HomeCapabilities } from "@/components/home-capabilities";

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

const heroImage =
  "/hero-solar-homes.png";

export default function HomePage() {

  return (
    <>
      <section className="solar-hero h-svh w-full" aria-labelledby="hero-title">
        <div className="solar-hero__image" aria-hidden="true">
          <Image src={heroImage} alt="" fill preload sizes="100vw" className="object-cover object-right" />
        </div>
        <svg className="solar-hero__curve" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H1440V88C1220 95 1060 112 974 222C918 294 910 340 754 375C590 412 570 500 516 628C498 671 487 674 416 686C272 710 152 757 0 797Z" fill="#fafbf7" />
        </svg>
        <div className="solar-hero__content">
          <p className="solar-hero__eyebrow"><span aria-hidden="true" />Clean energy<br />for a brighter tomorrow</p>
          <h1 id="hero-title" className={`${heroFont.className} solar-hero__title`}>
            <span>Energy,</span>
            <span>designed for</span>
            <em>tomorrow.</em>
          </h1>
          <p className="solar-hero__lead">
            Smarter solar solutions for homes, businesses<br className="hidden sm:block" /> and communities across India and Australia.
          </p>
          <div className="solar-hero__actions">
            <Link href={routes.whatWeDo}>Explore solutions <span aria-hidden="true">→</span></Link>
            <Link href={routes.projects}>See our projects <span aria-hidden="true">→</span></Link>
          </div>
        </div>
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

      <HomeCapabilities displayFont={heroFont.className} />

      <HomeMostRequested displayFont={heroFont.className} />

      <HomeHowWeWork displayFont={heroFont.className} />

      <HomeProjects displayFont={heroFont.className} />

      <HomeImpact displayFont={heroFont.className} />

      <HomeJourney displayFont={heroFont.className} />

      <section className="customer-story" aria-label="Customer story">
        <div className="customer-story__image">
          <Image src="/customer-story-consultation.png" alt="An energy consultant discussing a solar home design with a couple on a garden terrace" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-cover" />
        </div>
        <div className="customer-story__content">
          <p className="customer-story__kicker">Customer story</p>
          <blockquote>
            <p className={heroFont.className}>
              “They sized it to the house, not to a price list. Three years on it <em>still does what they said it would.</em>”
            </p>
            <footer>
              <div className="customer-story__avatar"><Image src="/most-requested/residential-solar.png" alt="" fill sizes="64px" className="object-cover" /></div>
              <cite>Homeowner <span>· Brighton</span></cite>
              <Link href={routes.projects} aria-label="Explore our customer projects" className="customer-story__next">→</Link>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="home-closing" aria-labelledby="closing-title">
        <svg className="home-closing__decoration" viewBox="0 0 1440 650" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <circle cx="40" cy="235" r="210" fill="#edf0e3" fillOpacity="0.6" />
          <path d="M-80 245C140 240 225 325 280 530M1190 525C1210 350 1360 190 1490 140" stroke="#d8ded4" strokeWidth="1.3" />
          <circle cx="194" cy="351" r="4" fill="#285c40" />
          <circle cx="1299" cy="294" r="28" fill="#edf0e3" fillOpacity="0.6" />
          <circle cx="1299" cy="294" r="5" fill="#285c40" />
        </svg>
        <div className="home-closing__statement">
          <p className="home-closing__kicker">Built for a brighter tomorrow</p>
          <h2 id="closing-title" className={heroFont.className}>Engineered<br />for <em>what’s next.</em></h2>
          <p className="home-closing__lead">Reliable solar solutions designed for homes, businesses<br className="hidden md:block" /> and communities — today and for the generations ahead.</p>
          <div className="solar-hero__actions justify-center">
              <Link href={contactWithContext("home")}>{site.consultationCta}<span aria-hidden="true">→</span></Link>
              <Link href={routes.projects}>View projects<span aria-hidden="true">→</span></Link>
            </div>
        </div>

      </section>
    </>
  );
}
