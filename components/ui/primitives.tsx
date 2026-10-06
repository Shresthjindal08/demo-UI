import { surfaceStyles } from "@/lib/styles";
import type { ComponentProps, ReactNode } from "react";

type Surface = "light" | "dark" | "cream" | "tint";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)] ${className}`}>{children}</div>;
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
      className={`content-section ${surfaceStyles} ${tight ? "py-section-tight" : "py-section"} ${className}`}
      {...rest}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="section-kicker">{children}</p>;
}

export function MonoFact({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">{children}</span>;
}

export function TierBadge(_props: { tier: string }) {
  return null;
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
    <header className="py-section-tight">
      <Container>
        <Kicker>{kicker}</Kicker>
        <h1 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[16ch] text-display-2">{title}</h1>
        {lead ? <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-8 text-lead">{lead}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </header>
  );
}
