import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vagus Energy is a renewable-infrastructure engineering company operating across Victoria since 2014. NETCC Approved Seller and Solar Victoria Approved Retailer.",
  alternates: { canonical: routes.about },
};

const timeline = [
  { year: "2014", event: "Founded in Victoria as an electrical engineering practice." },
  { year: "2017", event: "First commercial rooftop array above 100 kWp." },
  { year: "2020", event: "Storage and grid-integration division established." },
  { year: "2023", event: "EV charging infrastructure added from driveway to depot." },
  { year: "2026", event: "Community energy and precinct-scale projects." },
];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.positioning,
    areaServed: { "@type": "State", name: "Victoria, Australia" },
    hasCredential: site.accreditations.map((item) => item.label),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="about-page">
        <section className="about-intro" aria-labelledby="about-title">
          <div className="about-intro__rule" />
          <p className="about-eyebrow">About Vagus Energy</p>
          <h1 id="about-title">An engineering company<br className="hidden md:block" /> that installs.</h1>
          <div className="about-intro__details">
            <div>
              <p>Vagus Energy has designed and delivered renewable infrastructure across Victoria since 2014. From the first conversation to the final connection, we see the whole system.</p>
              <Link className="about-link" href={contactWithContext("about")}>Start a project <span aria-hidden="true">↗</span></Link>
            </div>
            <p>We employ our own engineers and our own crews. Solar, storage, EV charging and grid integration — connected by one team, with engineering at the centre.</p>
          </div>
          <div className="about-intro__footer"><span>Based in Victoria. Built for the long term.</span><a href="#about-practice">Get to know us <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="about-practice" id="about-practice" aria-labelledby="practice-title">
          <Image src="/vagus%20images/pexels-trinh-tr-n-191284110-11645013.jpg" alt="" fill sizes="100vw" className="about-practice__background" />
          <div className="about-practice__heading">
            <p className="about-eyebrow">The way we work</p>
            <h2 id="practice-title">Good energy starts<br />with good people.</h2>
          </div>
          <div className="about-practice__cards">
            <article className="about-card">
              <div className="about-card__copy">
                <span className="about-card__number">01 / PEOPLE</span>
                <h3>Our people</h3>
                <p>Our own engineers. Our own installation crews. A team that stays connected from design through delivery.</p>
                <Link href={routes.careers}>Meet your next opportunity <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="about-card__image"><Image src="/vagus%20images/pexels-cristian-rojas-8853536.jpg" alt="Solar installers working together on a rooftop" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
            </article>
            <article className="about-card">
              <div className="about-card__copy">
                <span className="about-card__number">02 / PROJECTS</span>
                <h3>Our projects</h3>
                <p>From homes to commercial rooftops, we design energy systems around the places and people they serve.</p>
                <Link href={routes.projects}>Explore our projects <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="about-card__image"><Image src="/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg" alt="Solar panels and wind turbines at sunset" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
            </article>
            <article className="about-card">
              <div className="about-card__copy">
                <span className="about-card__number">03 / THINKING</span>
                <h3>Our approach</h3>
                <p>Design first. Connect the whole system. Bring generation, storage and energy use together with purpose.</p>
                <Link href={routes.vision}>See how we think <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="about-card__image"><Image src="/vagus%20images/pexels-elite-power-group-661996115-39057093.jpg" alt="An electrician working on an energy installation" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
            </article>
          </div>
          <p className="about-practice__caption">Illustrative imagery</p>
        </section>

        <section className="about-founder" aria-labelledby="founder-title">
          <div><p className="about-eyebrow" id="founder-title">From the founder</p><span className="about-founder__mark" aria-hidden="true">“</span></div>
          <blockquote>
            <p>We started because too many systems were being sold before they were designed. <span>That order is the whole problem.</span></p>
            <footer>Founder, Vagus Energy</footer>
          </blockquote>
        </section>

        <section className="about-credentials" aria-labelledby="credentials-title">
          <div className="about-section-heading"><p className="about-eyebrow">Accreditation</p><h2 id="credentials-title">Standards behind<br />every system.</h2></div>
          <ul>
            {site.accreditations.map((item, index) => <li key={item.label}><span className="about-card__number">0{index + 1}</span><h3>{item.label}</h3></li>)}
          </ul>
        </section>

        <section className="about-history" aria-labelledby="history-title">
          <div className="about-section-heading"><p className="about-eyebrow">Our journey</p><h2 id="history-title">Built on experience.<br />Looking ahead.</h2></div>
          <ol>{timeline.map((entry) => <li key={entry.year}><span>{entry.year}</span><p>{entry.event}</p></li>)}</ol>
        </section>

        <section className="about-contact" aria-labelledby="about-contact-title">
          <div><p className="about-eyebrow">Your next step</p><h2 id="about-contact-title">Let’s build something<br />that lasts.</h2></div>
          <div className="about-contact__actions"><Link className="about-link" href={contactWithContext("about")}>Work with our engineers <span aria-hidden="true">↗</span></Link><Link href={routes.careers}>Looking to join the team? Explore careers <span aria-hidden="true">↗</span></Link></div>
        </section>
      </div>
    </>
  );
}
