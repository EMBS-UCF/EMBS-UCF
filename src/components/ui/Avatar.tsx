import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Photos are hosted on assets.embsucf.org. If one 404s — a common outcome
 * when an officer changes and the image has not been uploaded yet — fall
 * back to initials rather than a broken image icon.
 */
export function Avatar({
  src,
  name,
  className,
}: {
  src: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  if (!src || failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-surface-sunk font-display text-4xl text-faint",
          className,
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("size-full object-cover", className)}
    />
  );
}
