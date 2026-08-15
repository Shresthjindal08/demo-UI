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
    <header className="masthead" data-surface="dark">
      <div className="masthead__glow" aria-hidden="true" />

      <Container>
        <div className="masthead__rail">
          <span className="masthead__kicker">{kicker}</span>
          {index ? <span className="masthead__index">{index}</span> : null}
        </div>

        <div className="masthead__body">
          <div className="masthead__text">
            <h1 className="masthead__title">{title}</h1>
            {lead ? <p className="masthead__lead">{lead}</p> : null}
            {children ? <div className="masthead__actions">{children}</div> : null}
          </div>

          <div className="masthead__media">
            <Image
              src={dummyImage(imageLabel ?? title)}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Container>

      <span className="masthead__wordmark" aria-hidden="true">
        Vagus
      </span>
    </header>
  );
}
