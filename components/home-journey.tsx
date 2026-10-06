import Image from "next/image";

const steps = [
  { title: "Enquiry", body: "Tell us about your energy needs and goals.", image: "/vagus%20images/pexels-seljansalim-34955548.jpg", icon: "M21 11a8 8 0 0 1-8 8H8l-5 3 1-6a8 8 0 1 1 17-5ZM8 10h8M8 14h5" },
  { title: "Site assessment", body: "We evaluate your site for maximum potential.", image: "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg", icon: "M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 1 1 14 0ZM9 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0" },
  { title: "Engineered design", body: "Custom designs for optimal performance and savings.", image: "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg", icon: "m9 3 1-2h4l1 2 3 2 2 1-1 4v4l1 4-2 1-3 2-1 2h-4l-1-2-3-2-2-1 1-4v-4L4 6l2-1 3-2ZM8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" },
  { title: "Approvals", body: "We manage all regulatory approvals for you.", image: "/vagus%20images/pexels-bulat843-1243575272-34054464.jpg", icon: "M5 2h10l4 4v16H5V2ZM14 2v5h5M8 11h8M8 15h8M8 19h5" },
  { title: "Installation", body: "Professional, efficient and on-time installation.", image: "/vagus%20images/pexels-cristian-rojas-8853536.jpg", icon: "M14 6a6 6 0 0 0-7 8L2 19a2 2 0 0 0 3 3l6-6a6 6 0 0 0 8-7l-4 4-4-4 3-3Z" },
  { title: "Switch-on and monitoring", body: "We get you live and keep your system performing.", image: null, icon: "M3 12h4v10H3V12ZM10 3h4v19h-4V3ZM17 8h4v14h-4V8Z" },
];

export function HomeJourney({ displayFont }: { displayFont: string }) {
  return (
    <section className="home-journey" aria-labelledby="journey-title">
      <div className="home-journey__header">
        <div>
          <p className="home-journey__kicker">The journey</p>
          <h2 id="journey-title" className={displayFont}>Six steps, one team,<br /><em>no handovers.</em></h2>
        </div>
        <p className="home-journey__intro">From your first enquiry to long-term monitoring, we handle every step in-house — ensuring a seamless, reliable and transparent experience.</p>
        <div className="home-journey__promise">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 28C2 12 15 5 28 4c-1 14-8 26-24 24ZM4 28 22 10" /></svg>
          Cleaner<br />communities.<br />Brighter<br />tomorrows.
        </div>
      </div>
      <div className="home-journey__timeline">
        <ol>
          {steps.map((step, index) => (
            <li key={step.title}>
              {index < steps.length - 1 && (
                <svg className="home-journey__connector" style={{ top: `${95.5 + (index === 0 ? 25 : index % 2 ? 48 : 0)}px` }} viewBox="0 0 100 120" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d={`M0 60C35 60 65 ${60 + (index === 0 ? 23 : index % 2 ? -48 : 48)} 100 ${60 + (index === 0 ? 23 : index % 2 ? -48 : 48)}`} stroke="#a3ad88" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
                  <ellipse cx="50" cy={60 + (index === 0 ? 23 : index % 2 ? -48 : 48) / 2} rx="1.6" ry="3.5" fill="#65783e" />
                </svg>
              )}
              <span className="home-journey__number">0{index + 1}</span>
              <div className="home-journey__visual">
                <div className="home-journey__photo">
                  {step.image ? <Image src={step.image} alt="" fill sizes="(max-width: 767px) 120px, 140px" className="object-cover" /> : (
                    <div className="home-journey__monitor" aria-hidden="true">
                      <div className="home-journey__screen"><span>Energy performance</span><div>{[30, 46, 35, 60, 53, 75, 65, 90].map((height, bar) => <i key={bar} style={{ height: `${height}%` }} />)}</div><span>Solar · Storage · Grid</span></div>
                    </div>
                  )}
                </div>
                <span className="home-journey__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={step.icon} /></svg></span>
              </div>
              <span className="home-journey__stem" aria-hidden="true" />
              <h3 className={displayFont}>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
