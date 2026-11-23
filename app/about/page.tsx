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
      <main className="about-page">
        <section className="about-hero" aria-labelledby="about-title">
          <Image
            src="/hero-renewable.png"
            alt="Renewable energy infrastructure across a mountain landscape"
            fill
            priority
            sizes="100vw"
            className="about-hero__image"
          />
          <div className="about-hero__shade" />
          <p className="about-hero__breadcrumb"><span />About</p>
          <h1 id="about-title">About Us</h1>
        </section>

        <section className="about-intro" aria-labelledby="about-statement">
          <p className="about-eyebrow">About Vagus Energy</p>
          <h2 id="about-statement">Renewable energy, built by the people who deliver it.</h2>
          <div className="about-intro__details">
            <p>Since 2014, we’ve designed and delivered renewable energy systems across Victoria. From the first conversation to the final connection, we see the whole system.</p>
            <p>Our engineers and installation crews work as one team across solar, storage, EV charging and grid integration — making better energy practical for the places we live and work.</p>
          </div>
          <Link className="about-intro__cta" href={contactWithContext("about")}>Start a project <span aria-hidden="true">→</span></Link>
        </section>

        <div className="about-team-image" role="img" aria-label="Vagus Energy field electrician working on an electrical installation">
          <Image src="/hero-electrician.jpg" alt="" fill sizes="100vw" />
        </div>

        <section className="about-purpose" aria-labelledby="purpose-title">
          <div className="about-purpose__image">
            <Image src="/hero-solar-homes.png" alt="Solar powered homes in a green valley" fill sizes="(max-width: 767px) 100vw, 46vw" />
          </div>
          <div className="about-purpose__copy">
            <p className="about-eyebrow">Why We Exist</p>
            <h2 id="purpose-title">A better energy future takes more than good hardware.</h2>
            <div className="about-purpose__details">
              <p>Energy is changing quickly. Homes, businesses and communities need systems that are designed to work together, and built to keep working long after installation.</p>
              <p>We bring design, equipment and delivery together under one roof. That means practical advice, considered engineering and a team that stays accountable from start to finish.</p>
            </div>
            <Link href={routes.vision} className="about-purpose__link">How we think <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        {/* <section className="about-credentials" aria-labelledby="credentials-title">
          <div className="about-section-heading"><p className="about-eyebrow">Accreditation</p><h2 id="credentials-title">Standards behind every system.</h2></div>
          <ul>
            {site.accreditations.map((item, index) => <li key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3></li>)}
          </ul>
        </section> */}

        <section className="about-history" aria-labelledby="history-title">
          <div className="about-section-heading"><p className="about-eyebrow">Our journey</p><h2 id="history-title">Built on experience.<br />Looking ahead.</h2></div>
          <ol>{timeline.map((entry) => <li key={entry.year}><span>{entry.year}</span><p>{entry.event}</p></li>)}</ol>
        </section>

        {/* <section className="about-contact" aria-labelledby="about-contact-title">
          <div><p className="about-eyebrow">Your next step</p><h2 id="about-contact-title">Let’s build something that lasts.</h2></div>
          <Link className="about-contact__link" href={contactWithContext("about")}>Talk with our team <span aria-hidden="true">↗</span></Link>
        </section> */}
      </main>
    </>
  );
}
