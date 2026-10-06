"use client";

import { useState } from "react";

const placeholderCompanies = ["SOLVANTA", "NORTHVALE", "ARCWELL", "KINORA", "FIELDSTONE WORKS", "EVERMONT"];

export function HomeCompanies() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="companies" aria-labelledby="companies-title" data-paused={paused}>
      <div className="companies__header"><h2 id="companies-title">Working together. Building better.</h2><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume company scrolling" : "Pause company scrolling"}>{paused ? "Play" : "Pause"}</button></div>
      <div className="companies__window">
        <div className="companies__track">
          {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>{placeholderCompanies.map((company, index) => <li key={company}><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{index % 3 === 0 ? <><path d="M4 26 16 5l12 21H4ZM10 26l6-10 6 10" /></> : index % 3 === 1 ? <><path d="M5 5h9v9H5zM18 18h9v9h-9zM18 5h9v9h-9zM5 18h9v9H5z" /></> : <><circle cx="16" cy="16" r="11" /><path d="m8 20 8-14 8 14M7 20h18" /></>}</svg><span>{company}</span></li>)}</ul>)}
        </div>
      </div>
      <div className="companies__ruler" aria-hidden="true"><span>▲</span></div>
    </section>
  );
}
