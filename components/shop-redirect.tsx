"use client";

import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { track } from "@/lib/analytics";
import { Button, ButtonLink } from "./ui/button";

const COUNTDOWN_SECONDS = 8;

export function ShopRedirect({ url }: { url: string }) {
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
  const [paused, setPaused] = useState(false);
  const continueRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    continueRef.current?.focus();
  }, []);

  useEffect(() => {
    if (paused || remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [paused, remaining]);

  useEffect(() => {
    if (remaining > 0) return;
    track("outbound_shop", { source_page: routes.shop, trigger: "auto" });
    window.location.href = url;
  }, [remaining, url]);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-4">
        <ButtonLink
          ref={continueRef}
          href={url}
          size="lg"
          target="_blank"
          rel="noopener"
          onClick={() =>
            track("outbound_shop", { source_page: routes.shop, trigger: "manual" })
          }
        >
          Continue to shop ↗
        </ButtonLink>
        <ButtonLink href={routes.home} variant="secondary" size="lg">
          ← Back to vagus.energy
        </ButtonLink>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <p role="status" aria-live="polite" className="mono-fact">
          {paused
            ? "Auto-continue paused"
            : `Auto-continue in ${remaining}s`}
        </p>
        <Button
          type="button"
          variant="text"
          onClick={() => setPaused((value) => !value)}
          className="mono-fact underline"
        >
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
}
