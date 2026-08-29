import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

interface SlideshowProps {
  slides: Slide[];
  /** Milliseconds between automatic advances. */
  interval?: number;
  className?: string;
}

/**
 * Photo slideshow for the home page.
 *
 * Auto-advancing content has to be stoppable to meet WCAG 2.2.2, so there is a
 * real pause control rather than only pause-on-hover — a keyboard user who
 * never hovers still needs a way to stop it. It also holds still by default
 * under prefers-reduced-motion, and pauses when the tab is hidden so a
 * backgrounded page is not decoding images for nobody.
 *
 * The first slide renders eagerly; the rest are lazy. Every slide stays in the
 * DOM and is cross-faded, which keeps the height stable and avoids a reflow on
 * each advance.
 */
export function Slideshow({ slides, interval = 5000, className }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = slides.length;

  // Starts true so the server render and first client render agree; the real
  // preference is read after mount.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  const advancing = !paused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!advancing) return;

    const tick = () => setIndex((i) => (i + 1) % count);
    let id = window.setInterval(tick, interval);

    // A backgrounded tab should not keep cycling.
    const onVisibility = () => {
      window.clearInterval(id);
      if (!document.hidden) id = window.setInterval(tick, interval);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [advancing, count, interval]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  if (count === 0) return null;

  const current = slides[index];

  return (
    <div
      ref={containerRef}
      className={cn("group/slideshow relative", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photographs of the chapter"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-card border border-line bg-surface-sunk">
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i === index ? undefined : true}
            inert={i !== index}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              width={1500}
              height={2000}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              {...(i === 0 ? { fetchPriority: "high" as const } : {})}
              className="size-full object-cover"
            />
          </figure>
        ))}

        {count > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
            <div className="pointer-events-auto flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show photo ${i + 1} of ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
                  )}
                />
              ))}
            </div>

            <div className="pointer-events-auto flex items-center gap-1">
              <SlideButton
                label={paused ? "Resume the slideshow" : "Pause the slideshow"}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play size={13} /> : <Pause size={13} />}
              </SlideButton>
              <SlideButton label="Previous photo" onClick={() => go(index - 1)}>
                <ChevronLeft size={15} />
              </SlideButton>
              <SlideButton label="Next photo" onClick={() => go(index + 1)}>
                <ChevronRight size={15} />
              </SlideButton>
            </div>
          </div>
        )}
      </div>

      {/* Announced on manual navigation only. Reading out an automatic advance
          every few seconds would talk over whatever else is happening. */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        Photo {index + 1} of {count}
        {current?.caption ? `: ${current.caption}` : ""}
      </p>

      {current?.caption && (
        <p className="mt-3 font-mono text-xs text-faint">{current.caption}</p>
      )}
    </div>
  );
}

function SlideButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-7 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
    >
      {children}
    </button>
  );
}
