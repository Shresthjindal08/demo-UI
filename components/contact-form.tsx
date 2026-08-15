"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { allSolutions } from "@/lib/content/categories";
import { routes } from "@/lib/routes";
import { track } from "@/lib/analytics";
import { Button } from "./ui/button";

const inquiryTypes = [
  { value: "home", label: "My home" },
  { value: "business", label: "My business" },
  { value: "support", label: "Support" },
];

const solutions = allSolutions().filter((solution) => solution.status === "live");

function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="kicker">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 min-h-11 w-full border-b border-hairline-strong bg-transparent py-2 text-body text-ink outline-none focus-visible:border-accent"
      />
    </div>
  );
}

export function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formId = useId();
  const context = searchParams.get("context");

  const [inquiry, setInquiry] = useState(inquiryTypes[0].value);
  const [started, setStarted] = useState(false);
  const [sending, setSending] = useState(false);

  const contextSolution = solutions.find((solution) => solution.slug === context);

  return (
    <form
      className="border border-hairline p-6 lg:p-10"
      onFocus={() => {
        if (started) return;
        setStarted(true);
        track("form_start", { inquiry_type: inquiry, context: context ?? "direct" });
      }}
      onSubmit={(event) => {
        event.preventDefault();
        setSending(true);
        track("form_submit", { inquiry_type: inquiry, context: context ?? "direct" });
        router.push(`${routes.thankYou}?type=consultation`);
      }}
    >
      <fieldset>
        <legend className="kicker">I am asking about</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {inquiryTypes.map((type) => (
            <label
              key={type.value}
              className={`flex min-h-11 cursor-pointer items-center rounded-pill border px-4 text-body-sm transition-colors ${
                inquiry === type.value
                  ? "border-accent bg-accent text-on-accent"
                  : "border-hairline text-body hover:border-ink hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value={type.value}
                checked={inquiry === type.value}
                onChange={() => setInquiry(type.value)}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Field id={`${formId}-name`} label="Name" required autoComplete="name" />
        <Field id={`${formId}-email`} label="Email" type="email" required autoComplete="email" />
        <Field id={`${formId}-phone`} label="Phone" type="tel" autoComplete="tel" />
        <Field id={`${formId}-suburb`} label="Suburb" autoComplete="address-level2" />
      </div>

      <div className="mt-8">
        <label htmlFor={`${formId}-regarding`} className="kicker">
          Regarding
        </label>
        <select
          id={`${formId}-regarding`}
          name="regarding"
          defaultValue={contextSolution?.slug ?? ""}
          className="mt-2 min-h-11 w-full border-b border-hairline-strong bg-transparent py-2 text-body text-ink outline-none focus-visible:border-accent"
        >
          <option value="">Not sure yet</option>
          {solutions.map((solution) => (
            <option key={solution.slug} value={solution.slug}>
              {solution.name}
            </option>
          ))}
        </select>
        {contextSolution ? (
          <p className="mono-fact mt-3">
            Pre-selected from the page you came from.
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <label htmlFor={`${formId}-message`} className="kicker">
          Anything we should know
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          className="mt-2 w-full border-b border-hairline-strong bg-transparent py-2 text-body text-ink outline-none focus-visible:border-accent"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="mono-fact">No obligation · free site assessment</p>
        <Button type="submit" size="lg" loading={sending}>
          Send
        </Button>
      </div>
    </form>
  );
}
