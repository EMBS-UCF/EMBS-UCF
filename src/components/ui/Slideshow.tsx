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
 * It always advances on its own. Two things it deliberately does not do:
 *
 * - It does not pause on hover. Hovering is how people read a photo, and
 *   stopping there makes a working slideshow look broken.
 * - It does not stop under prefers-reduced-motion. That preference is about
 *   animation, not about content changing, so the cross-fade is dropped for an
 *   instant cut instead and the rotation continues.
 *
 * It does pause while something inside has keyboard focus, so a keyboard user
 * is not yanked to another slide mid-interaction, and while the tab is hidden.
 * The explicit pause button is what satisfies WCAG 2.2.2.
 *
 * The first slide renders eagerly; the rest are lazy. Every slide stays in the
 * DOM and is cross-faded, which keeps the height stable and avoids a reflow on
 * each advance.
 */
export function Slideshow({ slides, interval = 4500, className }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = slides.length;

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

  const advancing = !paused && count > 1;

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
              "absolute inset-0 transition-opacity ease-[var(--ease-out-expo)]",
              // Reduced motion keeps the rotation but drops the fade.
              reducedMotion ? "duration-0" : "duration-700",
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
