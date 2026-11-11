import { useNow } from "@/hooks/useNow";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const remainingFrom = (target: number, now: number): Remaining => {
  const delta = Math.max(0, target - now);
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta % 86_400_000) / 3_600_000),
    minutes: Math.floor((delta % 3_600_000) / 60_000),
    seconds: Math.floor((delta % 60_000) / 1000),
  };
};

/**
 * Ticks toward the next meeting. Renders nothing until the clock is available
 * on the client, so the prerendered HTML never ships a stale time, and clamps
 * at zero rather than counting into negatives once the meeting starts.
 */
export function Countdown({ target }: { target: number }) {
  const now = useNow();

  if (now === null) return null;

  const left = remainingFrom(target, now);
  const units: Array<[string, number]> = [
    ["days", left.days],
    ["hrs", left.hours],
    ["min", left.minutes],
    ["sec", left.seconds],
  ];

  return (
    <div className="flex items-baseline gap-6 sm:gap-8" role="timer" aria-live="off">
      {units.map(([label, value]) => (
        <div key={label} className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl leading-none tabular-nums text-ink sm:text-5xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm text-faint">{label}</span>
        </div>
      ))}
    </div>
  );
}
