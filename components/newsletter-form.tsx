"use client";

import { useId, useState } from "react";
import { Button } from "./ui/button";

export function NewsletterForm() {
  const inputId = useId();
  const noteId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (status === "done") {
    return (
      <p role="status" className="mt-8 text-body-sm text-ink">
        Check your inbox to confirm. We send a short note when something is worth reading.
      </p>
    );
  }

  return (
    <form
      className="mt-8"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("sending");
        setTimeout(() => setStatus("done"), 600);
      }}
    >
      <label htmlFor={inputId} className="kicker">
        Newsletter
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-describedby={noteId}
          className="min-h-11 flex-1 border-b border-hairline-strong bg-transparent px-1 py-2 text-body-sm text-ink outline-none placeholder:text-muted focus-visible:border-accent"
        />
        <Button type="submit" variant="secondary" loading={status === "sending"}>
          Subscribe
        </Button>
      </div>
      <p id={noteId} className="mono-fact mt-3">
        Occasional. Double opt-in. Unsubscribe anytime.
      </p>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-body-sm text-ink">
          That address did not go through. Please check it and try again.
        </p>
      ) : null}
    </form>
  );
}
