import { HomeCompanies } from "@/components/home-companies";
import { HomeWhyChooseUs } from "@/components/home-why-choose-us";
import { HomeLocation } from "@/components/home-location";
import { HomeJourney } from "@/components/home-journey";
import { HomeImpact } from "@/components/home-impact";
import { HomeHowWeWork } from "@/components/home-how-we-work";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeProjects } from "@/components/home-projects";
import { routes, contactWithContext } from "@/lib/routes";
import { HomeMostRequested } from "@/components/home-most-requested";
import { HomeCapabilities } from "@/components/home-capabilities";

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

      <section className="home-intro" aria-labelledby="intro-title">
        <h2 id="intro-title"><span aria-hidden="true" />Introduction</h2>
        <p>Vagus brings solar, storage and smarter energy together. <span>Engineered as one system,</span> built around the way you live and work — today and into the future.</p>
      </section>

      <HomeCompanies />

      <HomeCapabilities />

      <HomeMostRequested />

      <HomeHowWeWork />

      <HomeWhyChooseUs />

      <HomeProjects />

      <HomeImpact />

      <HomeJourney />

      <section className="testimonial" aria-labelledby="testimonial-title">
        <div className="testimonial__content">
          <h2 id="testimonial-title">Customer story</h2>
          <span className="testimonial__quote" aria-hidden="true">“</span>
          <blockquote>
            <p>They sized it to the house, not to a price list. Three years on it <span>still does what they said it would.</span></p>
            <footer><cite>Homeowner<span>Brighton, Victoria</span></cite><Link href={routes.projects}>Explore our projects <span aria-hidden="true">↗</span></Link></footer>
          </blockquote>
        </div>
        <div className="testimonial__image">
          <Image src="/vagus%20images/pexels-seljansalim-34955548%201.jpg" alt="A couple outdoors in the evening" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" />
        </div>
      </section>

      <section className="energy-cta" aria-labelledby="closing-title">
        <div className="energy-cta__content">
          <div className="energy-cta__intro">
            <p className="energy-cta__label">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m14 1-11 13h8l-1 9L22 9h-9z" /></svg>
              Get in touch
            </p>
            <h2 id="closing-title">Let’s power a brighter tomorrow</h2>
          </div>
          <div className="energy-cta__action">
            <p className="energy-cta__lead">
              Solar, storage, EV charging or a smarter home. Let’s find the right energy solution for you.
            </p>
            <Link className="energy-cta__button" href={contactWithContext("home")}>
              Request a quote <span aria-hidden="true">↗</span>
            </Link>
            <p className="energy-cta__note">Expert advice. One connected solution.</p>
          </div>
        </div>
      </section>

      <HomeLocation />
    </>
  );
}
