"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { surfaceStyles } from "@/lib/styles";

function LocationPreview() {
  return (
    <section className={`${surfaceStyles} location`} data-surface="light" aria-labelledby="location-title">
      <div className="location__heading">
        <p className="location__eyebrow"><span />Local expertise. Connected thinking.</p>
        <h2 id="location-title">Where we operate</h2>
        <p>Based in Melbourne. Powering homes, businesses and communities across Victoria.</p>
      </div>
      <div className="location__visual">
        <div className="location__placeholder" aria-hidden="true" />
        <div className="location__card">
          <p className="location__eyebrow">Our office</p>
          <h3>Vagus Energy</h3>
          <address>139 Cardigan Street<br />Carlton VIC 3053<br />Melbourne, Australia</address>
          <p className="location__card-detail">Engineering solar, storage and smarter energy systems, from our Melbourne base.</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=139%20Cardigan%20Street%2C%20Carlton%20VIC%203053%2C%20Australia" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

const InteractiveLocation = dynamic(() => import("./home-location").then((module) => module.HomeLocation), {
  ssr: false,
  loading: LocationPreview,
});

export function DeferredHomeLocation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: "600px" });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef}>{visible ? <InteractiveLocation /> : <LocationPreview />}</div>;
}
