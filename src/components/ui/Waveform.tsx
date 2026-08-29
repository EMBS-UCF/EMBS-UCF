import { cn } from "@/lib/cn";

/**
 * ECG trace used as the chapter's signature mark.
 *
 * One cardiac cycle is 200 units wide — flat baseline, P wave, QRS complex,
 * T wave — tiled four times. A short bright segment travels along the path
 * the way a bedside monitor sweeps. Purely decorative, so it is hidden from
 * assistive technology and holds still under prefers-reduced-motion.
 */

const BEAT =
  "M0 50 H30 Q36 38 42 50 H72 L78 57 L84 18 L90 80 L96 50 H120 Q134 28 148 50 H200";

const TILES = [0, 200, 400, 600];

interface WaveformProps {
  className?: string;
  /** Stroke width in user units. */
  weight?: number;
  animated?: boolean;
}

export function Waveform({ className, weight = 1.5, animated = true }: WaveformProps) {
  return (
    <svg
      viewBox="0 0 800 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("w-full", className)}
    >
      <g stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round">
        {TILES.map((x) => (
          <path key={x} d={BEAT} transform={`translate(${x} 0)`} opacity={0.28} />
        ))}
        {animated &&
          TILES.map((x) => (
            <path
              key={`sweep-${x}`}
              d={BEAT}
              transform={`translate(${x} 0)`}
              className="ecg-sweep"
              style={{ animationDelay: `${(x / 800) * 3.2}s` }}
            />
          ))}
      </g>
    </svg>
  );
}
