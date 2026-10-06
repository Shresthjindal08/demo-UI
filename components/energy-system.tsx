const stages = [
  { title: "Generate", detail: "Solar energy from your roof", icon: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0" },
  { title: "Store", detail: "Energy ready when you need it", icon: "M9 4V2h6v2M6 4h12v18H6zM13 8l-3 5h4l-3 5" },
  { title: "Use", detail: "Power your building and your drive", icon: "m3 11 9-8 9 8M5 9v12h14V9M10 21v-7h4v7" },
  { title: "Optimise", detail: "Monitor, manage and fine-tune", icon: "M4 3v18h17M8 16l4-5 4 2 5-7" },
];

export function EnergySystem() {
  return (
    <div className="energy-system">
      <div className="energy-system__heading"><p className="section-kicker">Connected by design</p><h2>Every part.<br />Working together.</h2><p>Your system is designed around your property, your usage and your plans.</p></div>
      <ol className="energy-system__stages">
        {stages.map((stage, index) => <li key={stage.title}><div className="energy-system__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={stage.icon} /></svg><span>0{index + 1}</span></div><h3>{stage.title}</h3><p>{stage.detail}</p></li>)}
      </ol>
      <p className="energy-system__note">An integrated approach. Components depend on your engineered design.</p>
    </div>
  );
}
