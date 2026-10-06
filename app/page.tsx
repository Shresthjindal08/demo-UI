import { HomeJourney } from "@/components/home-journey";
import { HomeImpact } from "@/components/home-impact";
import { HomeHowWeWork } from "@/components/home-how-we-work";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeProjects } from "@/components/home-projects";
import { routes, contactWithContext } from "@/lib/routes";
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
  "/vagus%20images/pexels-cristian-rojas-8853536.jpg";

export default function HomePage() {

  return (
    <>
      <section className="energy-hero" aria-labelledby="hero-title">
        <Image src={heroImage} alt="" fill preload sizes="100vw" className="energy-hero__image" />
        <div className="energy-hero__content">
          <div>
            <h1 id="hero-title">Smart solutions for<br />power, homes &amp; tomorrow</h1>
            <p className="energy-hero__lead">
              Smarter energy for homes, businesses and communities.<br className="hidden sm:block" />
              Solar, storage and EV charging — designed to work together.
            </p>
            <Link className="energy-hero__cta" href={contactWithContext("home")}>
              Request a quote <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="energy-hero__services" aria-label="Energy services">
          <div>
            {[0, 1, 2].map((copy) => (
              <span className="energy-hero__service-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
                {["Solar solutions", "Battery storage", "EV charging", "Heat pumps"].map((service) => (
                  <span key={service}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m14 1-11 13h8l-1 9L22 9h-9z" /></svg>{service}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HomeCapabilities />

      <HomeMostRequested displayFont={heroFont.className} />

      <HomeHowWeWork displayFont={heroFont.className} />

      <HomeProjects displayFont={heroFont.className} />

      <HomeImpact displayFont={heroFont.className} />

      <HomeJourney displayFont={heroFont.className} />

      <section className="customer-story" aria-label="Customer story">
        <div className="customer-story__image">
          <Image src="/vagus%20images/pexels-seljansalim-34955548%201.jpg" alt="A couple outdoors in the evening" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-cover" />
        </div>
        <div className="customer-story__content">
          <p className="customer-story__kicker">Customer story</p>
          <blockquote>
            <p className={heroFont.className}>
              “They sized it to the house, not to a price list. Three years on it <em>still does what they said it would.</em>”
            </p>
            <footer>
              <div className="customer-story__avatar"><Image src="/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg" alt="" fill sizes="64px" className="object-cover" /></div>
              <cite>Homeowner <span>· Brighton</span></cite>
              <Link href={routes.projects} aria-label="Explore our customer projects" className="customer-story__next">→</Link>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="energy-cta" aria-labelledby="closing-title">
        <Image src={heroImage} alt="" fill sizes="100vw" className="energy-cta__image" />
        <div className="energy-cta__content">
          <p className="energy-cta__label">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m14 1-11 13h8l-1 9L22 9h-9z" /></svg>
            Get in touch
          </p>
          <h2 id="closing-title">Let’s power a brighter tomorrow</h2>
          <p className="energy-cta__lead">
            Our team is ready to help with your solar, storage,<br className="hidden md:block" />
            EV charging and home energy needs.<br className="hidden md:block" />
            Expert advice. One connected solution.
          </p>
          <Link className="energy-hero__cta" href={contactWithContext("home")}>
            Request a quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
