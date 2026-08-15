import Image from "next/image";
import type { ReactNode } from "react";
import { dummyImage } from "@/lib/content/media";

export function MediaSlot({
  label,
  src,
  className = "",
  children,
}: {
  label: string;
  src?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-hairline-faint bg-surface ${className}`}
    >
      <Image
        src={src ?? dummyImage(label)}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
        className="object-cover"
      />
      {children ? (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-black/80"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full py-16">{children}</div>
        </>
      ) : null}
    </div>
  );
}
