import { surfaceStyles } from "@/lib/styles";
import Image from "next/image";
import type { ReactNode } from "react";
import { dummyImage } from "@/lib/content/media";
import { Container } from "./primitives";

export function PageMasthead({
  kicker,
  title,
  lead,
  index,
  imageLabel,
  children,
}: {
  kicker: string;
  title: string;
  lead?: string;
  index?: string;
  imageLabel?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`${surfaceStyles} relative overflow-hidden bg-bg text-ink pt-[calc(var(--nav-height)_+_clamp(2rem,_4vw,_3.5rem))]`} data-surface="dark">
      <div className="absolute inset-0 z-0 [background:radial-gradient(_ellipse_55%_60%_at_6%_0%,_color-mix(in_srgb,_var(--v-accent)_18%,_transparent),_transparent_60%_)] pointer-events-none" aria-hidden="true" />

      <Container className="relative z-2">
        <div className="flex items-baseline justify-between gap-6 pb-4 [border-bottom:1px_solid_var(--v-hairline)] [@media(max-width:_767px)]:flex-col [@media(max-width:_767px)]:items-start [@media(max-width:_767px)]:gap-[0.4rem]">
          <span className="font-mono text-[0.72rem] tracking-[0.24em] uppercase text-muted">{kicker}</span>
          {index ? <span className="font-mono text-[0.72rem] tracking-[0.24em] uppercase text-highlight">{index}</span> : null}
        </div>

        <div className="grid grid-cols-[minmax(0,_1.25fr)_minmax(0,_0.75fr)] items-center gap-[clamp(1.5rem,_4vw,_4rem)] py-[clamp(2rem,_4.5vw,_4.5rem)] [@media(max-width:_1024px)]:grid-cols-[1fr] [@media(max-width:_1024px)]:items-start">
          <div>
            <h1 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance m-0 max-w-[15ch] font-display text-[clamp(2.6rem,_6vw,_6.5rem)] leading-[0.92] tracking-[-0.05em] [@media(max-width:_767px)]:text-[clamp(2.5rem,_12vw,_3.75rem)]">{title}</h1>
            {lead ? <p className="text-pretty max-w-[46ch] [margin:clamp(1.25rem,_2vw,_2rem)_0_0] text-body text-[clamp(0.98rem,_1.1vw,_1.15rem)] leading-[1.65]">{lead}</p> : null}
            {children ? <div className="flex flex-wrap gap-3 mt-7 [@media(max-width:_767px)]:[&>_*]:[flex:1_1_12rem]">{children}</div> : null}
          </div>

          <div className="relative h-[clamp(13rem,_26vw,_21rem)] rounded-lg overflow-hidden bg-surface [&_img]:object-cover [&_img]:[filter:saturate(0.9)_contrast(1.04)_brightness(1.04)] [&::after]:[content:''] [&::after]:absolute [&::after]:inset-0 [&::after]:[background:linear-gradient(_160deg,_color-mix(in_srgb,_var(--v-accent)_12%,_transparent)_0%,_transparent_55%_)] [@media(max-width:_1024px)]:h-[clamp(12rem,_38vw,_18rem)] [@media(max-width:_1024px)]:rounded-lg [@media(max-width:_767px)]:h-48 [@media(max-width:_767px)]:rounded-lg">
            <Image
              src={dummyImage(imageLabel ?? title)}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Container>

      <span className="relative z-1 block mb-[-0.16em] [color:rgb(var(--contrast-line)_/_0.06)] font-display text-[clamp(4rem,_13vw,_11rem)] leading-[0.74] tracking-[-0.06em] text-center whitespace-nowrap pointer-events-none select-none" aria-hidden="true">
        Vagus
      </span>
    </header>
  );
}
