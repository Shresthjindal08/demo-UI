import Image from "next/image";
import type { ReactNode } from "react";
import { dummyImage } from "@/lib/content/media";

export function MediaSlot({
  label,
  src,
  lightSrc,
  darkSrc,
  className = "",
  children,
}: {
  label: string;
  src?: string;
  lightSrc?: string;
  darkSrc?: string;
  className?: string;
  children?: ReactNode;
}) {
  const resolved = src ?? dummyImage(label);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-hairline-faint bg-surface ${className}`}
    >
      {lightSrc && darkSrc ? (
        <>
          <Image
            src={lightSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
            className="media-slot__image media-slot__image--light object-cover"
          />
          <Image
            src={darkSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
            className="media-slot__image media-slot__image--dark object-cover"
          />
        </>
      ) : (
        <Image
          src={resolved}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          className="object-cover"
        />
      )}
      {children ? (
        <>
          <div
            className="media-slot__overlay absolute inset-0"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full py-16">{children}</div>
        </>
      ) : null}
    </div>
  );
}
