"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { geoContains, geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { surfaceStyles } from "@/lib/styles";

const topology = world as unknown as Topology<{
  countries: GeometryCollection<{ name: string }>;
  land: GeometryCollection;
}>;
const countries = feature(topology, topology.objects.countries).features;
const continents = feature(topology, topology.objects.land);
const borders = mesh(topology, topology.objects.countries, (a, b) => a !== b);
const grid = geoGraticule10();
const initialRotation: [number, number] = [-120, 65];
const office = { latitude: -37.80368, longitude: 144.966, address: "139 Cardigan Street, Carlton VIC 3053, Australia" };
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address)}`;

function subscribeMotionPreference(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function motionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeLocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{ x: number; y: number; rotation: [number, number]; moved: boolean } | null>(null);
  const [rotation, setRotation] = useState<[number, number]>(initialRotation);
  const [paused, setPaused] = useState(true);
  const [manualMotion, setManualMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [selection, setSelection] = useState<{ coordinates: [number, number]; country?: typeof countries[number] } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotionPreference, motionPreference, () => true);
  const rotationEnabled = !paused && (!reducedMotion || manualMotion);
  const projection = useMemo(() => geoOrthographic().translate([550, 505]).scale(475).rotate(rotation).clipAngle(90), [rotation]);
  const path = geoPath(projection);
  const center = projection.invert?.([550, 505]) ?? [135, -25];
  const officeCoordinates: [number, number] = [office.longitude, office.latitude];
  const pin = projection(officeCoordinates);
  const officeVisible = geoDistance(center, officeCoordinates) < Math.PI / 2;
  const selectedPin = selection ? projection(selection.coordinates) : null;
  const selectedVisible = selection && geoDistance(center, selection.coordinates) < Math.PI / 2;
  const selectionUrl = selection ? `https://www.google.com/maps/search/?api=1&query=${selection.coordinates[1]},${selection.coordinates[0]}` : directions;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rotationEnabled || !visible) return;
    let frame: number;
    let previous = 0;
    const animate = (time: number) => {
      if (previous && time - previous >= 40 && !document.hidden) {
        const elapsed = Math.min(time - previous, 100);
        setRotation(([longitude, latitude]) => [(longitude + elapsed * 0.004) % 360, latitude]);
        previous = time;
      } else if (!previous || document.hidden) {
        previous = time;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [rotationEnabled, visible]);

  function selectPoint(point: [number, number]) {
    if (Math.hypot(point[0] - 550, point[1] - 505) > 475) return;
    const coordinates = projection.invert?.(point);
    if (!coordinates || !coordinates.every(Number.isFinite)) return;
    setPaused(true);
    setSelection({ coordinates, country: countries.find((country) => geoContains(country, coordinates)) });
  }

  return (
    <section ref={sectionRef} className={`${surfaceStyles} location`} data-surface="light" aria-labelledby="location-title">
      <div className="location__heading">
        <p className="location__eyebrow"><span />Local expertise. Connected thinking.</p>
        <h2 id="location-title">Where we operate</h2>
        <p>Based in Melbourne. Powering homes, businesses and communities across Victoria.</p>
      </div>
      <p id="globe-instructions" className="sr-only">Drag to rotate and click to select a location. Use arrow keys to rotate, Enter to select, Space to pause or resume, and Escape to return to Melbourne.</p>
      <div className="location__visual">
        <svg
          className="location__globe"
          viewBox="0 0 1100 560"
          role="group"
          tabIndex={0}
          aria-label="Interactive world globe"
          aria-describedby="globe-instructions"
          data-keyboard-focus={keyboardFocus}
          onFocus={(event) => setKeyboardFocus(!dragRef.current && event.currentTarget.matches(":focus-visible"))}
          onBlur={() => setKeyboardFocus(false)}
          onKeyDown={(event) => {
            setKeyboardFocus(true);
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
              event.preventDefault();
              setPaused(true);
              setRotation(([longitude, latitude]) => [longitude + (event.key === "ArrowLeft" ? -10 : event.key === "ArrowRight" ? 10 : 0), Math.max(-80, Math.min(80, latitude + (event.key === "ArrowUp" ? 10 : event.key === "ArrowDown" ? -10 : 0)))]);
            } else if (event.key === "Enter") {
              event.preventDefault();
              selectPoint([550, 280]);
            } else if (event.key === " ") {
              event.preventDefault();
              setManualMotion(true);
              setPaused(rotationEnabled);
            } else if (event.key === "Escape") {
              setRotation(initialRotation);
              setSelection(null);
              setPaused(true);
            }
          }}
          onDoubleClick={() => { setRotation(initialRotation); setSelection(null); setPaused(false); }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            setKeyboardFocus(false);
            setPaused(true);
            dragRef.current = { x: event.clientX, y: event.clientY, rotation, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag) return;
            const dx = event.clientX - drag.x;
            const dy = event.clientY - drag.y;
            if (Math.hypot(dx, dy) <= 5 && !drag.moved) return;
            drag.moved = true;
            const speed = 180 / event.currentTarget.getBoundingClientRect().width;
            setRotation([drag.rotation[0] + dx * speed, Math.max(-80, Math.min(80, drag.rotation[1] - dy * speed))]);
          }}
          onPointerUp={(event) => {
            const drag = dragRef.current;
            dragRef.current = null;
            if (!drag || drag.moved) return;
            const matrix = event.currentTarget.getScreenCTM();
            if (!matrix) return;
            const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
            selectPoint([point.x, point.y]);
          }}
          onPointerCancel={() => { dragRef.current = null; }}
        >
          <defs>
            <radialGradient id="location-ocean" cx="65%" cy="25%" r="80%"><stop stopColor="var(--v-tint)" /><stop offset="1" stopColor="var(--v-bg)" /></radialGradient>
            <radialGradient id="location-shade" cx="70%" cy="30%" r="75%"><stop offset="0.35" stopColor="var(--v-bg)" stopOpacity="0" /><stop offset="1" stopColor="var(--v-bg)" stopOpacity="0.92" /></radialGradient>
          </defs>
          <circle cx="550" cy="505" r="475" fill="url(#location-ocean)" stroke="var(--v-accent)" strokeOpacity="0.35" />
          <path className="location__land" d={path(continents) ?? ""} fill="var(--v-accent)" fillOpacity="0.3" stroke="var(--v-accent)" strokeOpacity="0.45" strokeWidth="0.8" />
          <path d={path(borders) ?? ""} fill="none" stroke="var(--v-accent)" strokeOpacity="0.3" strokeWidth="0.6" />
          <path d={path(grid) ?? ""} fill="none" stroke="var(--v-ink)" strokeOpacity="0.09" strokeWidth="0.7" />
          <circle cx="550" cy="505" r="475" fill="url(#location-shade)" />
          {selection?.country ? <path d={path(selection.country) ?? ""} fill="var(--v-accent)" fillOpacity="0.35" stroke="var(--v-accent)" strokeWidth="1.2" /> : null}
          {pin && officeVisible ? (
            <g>
              <circle cx={pin[0]} cy={pin[1]} r="24" fill="var(--v-accent)" fillOpacity="0.12" stroke="var(--v-accent)" strokeOpacity="0.5" />
              <circle cx={pin[0]} cy={pin[1]} r="7" fill="var(--v-accent)" stroke="var(--v-ink)" strokeWidth="2" />
              <text x={pin[0] - 15} y={pin[1] + 48} className="location__map-label">MELBOURNE</text>
            </g>
          ) : null}
          {selectedPin && selectedVisible ? <circle cx={selectedPin[0]} cy={selectedPin[1]} r="9" fill="var(--palette-orange)" stroke="var(--v-ink)" strokeWidth="2" /> : null}
        </svg>
        <div className="location__card" role="status" aria-live="polite" aria-atomic="true">
          <p className="location__eyebrow">{selection ? "Selected location" : "Our office"}</p>
          <h3>{selection ? selection.country?.properties.name ?? "Ocean or unmapped location" : "Vagus Energy"}</h3>
          {selection ? (
            <p className="location__coordinates">{Math.abs(selection.coordinates[1]).toFixed(4)}° {selection.coordinates[1] >= 0 ? "N" : "S"}<br />{Math.abs(selection.coordinates[0]).toFixed(4)}° {selection.coordinates[0] >= 0 ? "E" : "W"}</p>
          ) : <address>139 Cardigan Street<br />Carlton VIC 3053<br />Melbourne, Australia</address>}
          <p className="location__card-detail">{selection ? "Explore this point on the map. Our service area remains Victoria, Australia." : "Engineering solar, storage and smarter energy systems, from our Melbourne base."}</p>
          <a href={selectionUrl} target="_blank" rel="noopener noreferrer">{selection ? "View location on map" : "Get directions"} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
