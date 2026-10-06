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
    <header className={`${surfaceStyles} page-masthead`} data-surface="light">
      <Container>
        <div className="page-masthead__topline">
          <p className="section-kicker">{kicker}</p>
          {index ? <span>{index}</span> : null}
        </div>
        <div className="page-masthead__intro">
          <h1>{title}</h1>
          <div className="page-masthead__summary">
            {lead ? <p>{lead}</p> : null}
            {children ? <div className="page-masthead__actions">{children}</div> : null}
          </div>
        </div>
        {imageLabel ? (
          <div className="page-masthead__image">
            <Image src={dummyImage(imageLabel)} alt="" fill sizes="(max-width: 767px) 100vw, 90vw" />
            <span>Vagus Energy <span aria-hidden="true">↗</span></span>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
