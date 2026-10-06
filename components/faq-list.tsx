"use client";

import { useCallback, useId, useState, useSyncExternalStore } from "react";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function readHash() {
  return window.location.hash.replace("#", "");
}

export function FaqList({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const baseId = useId();
  const hash = useSyncExternalStore(subscribeToHash, readHash, () => "");
  const [override, setOverride] = useState<{ index: number | null } | null>(null);

  const hashIndex = faqs.findIndex((faq) => slugify(faq.question) === hash);
  const openIndex = override ? override.index : hashIndex >= 0 ? hashIndex : null;

  const toggle = useCallback(
    (index: number) =>
      setOverride((current) => {
        const isOpen = (current ? current.index : null) === index;
        return { index: isOpen ? null : index };
      }),
    [],
  );

  return (
    <ul className="faq-accordion border-t border-hairline">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li
            key={faq.question}
            id={slugify(faq.question)}
            className="border-b border-hairline"
          >
            <h3 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-body-lg text-ink"
              >
                {faq.question}
                <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted shrink-0" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] pb-6 text-body-sm">{faq.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
