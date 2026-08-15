import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight " +
  "min-h-[var(--hit-target)] rounded-sm transition-colors duration-[var(--duration-micro)] " +
  "ease-brand disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover border border-transparent",
  secondary:
    "border border-hairline-strong text-ink hover:border-ink bg-transparent",
  text: "text-ink hover:text-accent px-0 min-h-0 underline-offset-4",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-body-sm",
  lg: "px-6 py-4 text-body",
};

function classesFor(variant: Variant, size: Size, className?: string) {
  const sizing = variant === "text" ? "" : sizes[size];
  return [base, variants[variant], sizing, className].filter(Boolean).join(" ");
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={classesFor(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends Omit<ComponentProps<"button">, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  loading?: boolean;
  loadingLabel?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  loading = false,
  loadingLabel = "Sending…",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classesFor(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
