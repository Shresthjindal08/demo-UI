"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { featuredProjects } from "@/lib/content/projects";
import { routes } from "@/lib/routes";

const presentations = [
  { image: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg", description: "Solar, storage and smarter energy for manufacturing." },
  { image: "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg", description: "An integrated solar, battery and EV system for the home." },
];

export function HomeProjects() {
  const trackRef = useRef<HTMLOListElement>(null);

  function move(direction: number) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="featured-projects" aria-labelledby="projects-title">
      <div className="featured-projects__header">
        <div>
          <p className="capabilities__eyebrow">Selected work</p>
          <h2 id="projects-title">Real projects. Real impact.</h2>
        </div>
        <div className="featured-projects__controls">
          <Link href={routes.projects}>All projects <span aria-hidden="true">↗</span></Link>
          <button type="button" onClick={() => move(-1)} aria-label="Previous project" aria-controls="featured-projects-track">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next project" aria-controls="featured-projects-track">→</button>
        </div>
      </div>
      <ol id="featured-projects-track" ref={trackRef} className="featured-projects__track" aria-label="Featured projects">
        {featuredProjects().map((project, index) => (
          <li key={project.slug} className="featured-projects__card">
            <Link href={routes.project(project.slug)} className="featured-projects__link" aria-label={`View ${project.name}`}>
              <Image src={presentations[index].image} alt="" fill sizes="(max-width: 767px) 90vw, 85vw" className="object-cover" />
              <div className="featured-projects__overlay">
                <div className="featured-projects__title">
                  <p>{project.year} · {project.suburb}</p>
                  <h3>{project.name}</h3>
                </div>
                <div className="featured-projects__details">
                  <dl>
                    {project.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
                  </dl>
                  <p>{presentations[index].description}<span aria-hidden="true">↗</span></p>
                </div>
              </div>
              <span className="featured-projects__caption">Illustrative imagery</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
