import { cn } from "@/lib/cn";

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoBandProps {
  photo: Photo | undefined;
  /** Letterbox ratio. `wide` for hero bands, `standard` inside sections. */
  ratio?: "wide" | "standard";
  className?: string;
  priority?: boolean;
}

const ratios = {
  wide: "aspect-21/9",
  standard: "aspect-16/9",
} as const;

/**
 * A single wide photograph.
 *
 * Renders nothing at all when no image has been set, so every page it appears
 * on is designed to work without one. That matters because photos arrive from
 * the CMS over time rather than all at once, and a broken or empty frame is
 * worse than no frame.
 */
export function PhotoBand({
  photo,
  ratio = "wide",
  className,
  priority = false,
}: PhotoBandProps) {
  if (!photo?.src) return null;

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-card border border-line bg-surface-sunk",
          ratios[ratio],
        )}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="size-full object-cover"
        />
      </div>
      {photo.caption && (
        <figcaption className="mt-3 font-mono text-xs text-faint">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
