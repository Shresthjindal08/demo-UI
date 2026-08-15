import type { ComponentProps, ReactNode } from "react";

type Surface = "light" | "dark" | "cream" | "tint";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-grid ${className}`}>{children}</div>;
}

export function Section({
  children,
  surface,
  tight = false,
  bleed = false,
  className = "",
  id,
  label,
  ...rest
}: {
  children: ReactNode;
  surface?: Surface;
  tight?: boolean;
  bleed?: boolean;
  className?: string;
  id?: string;
  label?: string;
} & ComponentProps<"section">) {
  return (
    <section
      id={id}
      aria-label={label}
      data-surface={surface}
      className={`${tight ? "section-tight" : "section"} ${className}`}
      {...rest}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

export function MonoFact({ children }: { children: ReactNode }) {
  return <span className="mono-fact">{children}</span>;
}

export function TierBadge({ tier }: { tier: string }) {
  return (
    <span
      className="mono-fact border border-hairline px-1.5 py-0.5 text-[0.6875rem] tracking-widest"
      aria-label={`Priority tier ${tier}`}
    >
      {tier}
    </span>
  );
}

export function PageHeader({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="section-tight">
      <Container>
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-6 max-w-[16ch] text-display-2">{title}</h1>
        {lead ? <p className="measure mt-8 text-lead">{lead}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </header>
  );
}
