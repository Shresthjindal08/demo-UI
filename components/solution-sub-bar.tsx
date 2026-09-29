"use client";
import { surfaceStyles } from "@/lib/styles";

import { useEffect, useState } from "react";
import { site } from "@/lib/content/site";
import { ButtonLink } from "./ui/button";

export function SolutionSubBar({
  name,
  contextHref,
}: {
  name: string;
  contextHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-surface="cream"
      aria-hidden={!visible}
      className={`${surfaceStyles} transition-transform duration-400 ease-brand bg-[var(--v-nav-fill)] backdrop-saturate-180 backdrop-blur-[20px] data-[visible=true]:translate-y-0 data-[visible=true]:pointer-events-auto data-[visible=false]:translate-y-full data-[visible=false]:pointer-events-none fixed inset-x-0 bottom-0 z-80 border-t border-hairline md:top-[var(--nav-height-scrolled)] md:bottom-auto md:border-t-0 md:border-b`}
      data-visible={visible}
    >
      <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)] flex min-h-14 flex-wrap items-center justify-between gap-4 py-2">
        <span className="hidden text-body-sm text-ink md:block">{name}</span>
        <div className="flex flex-1 flex-wrap gap-3 md:flex-none">
          <ButtonLink
            href="#specifications"
            variant="secondary"
            className="flex-1 md:flex-none"
            tabIndex={visible ? undefined : -1}
          >
            Download spec ↓
          </ButtonLink>
          <ButtonLink
            href={contextHref}
            className="flex-1 md:flex-none"
            tabIndex={visible ? undefined : -1}
          >
            {site.consultationCta}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
