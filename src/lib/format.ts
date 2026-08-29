import { site } from "@/content";

const TZ = site.calendar.timezone;

export const formatDate = (ms: number): string =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: TZ,
  }).format(ms);

export const formatDateLong = (ms: number): string =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TZ,
  }).format(ms);

export const formatTime = (ms: number): string =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  }).format(ms);

export const formatDayNumber = (ms: number): string =>
  new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: TZ }).format(ms);

export const formatMonthShort = (ms: number): string =>
  new Intl.DateTimeFormat("en-US", { month: "short", timeZone: TZ })
    .format(ms)
    .toUpperCase();

/** "in 3 days", "tomorrow", "today" — for the next-meeting strip. */
export function relativeDay(ms: number, now: number = Date.now()): string {
  const startOfDay = (t: number) => {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const days = Math.round((startOfDay(ms) - startOfDay(now)) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 0) return "past";
  if (days < 7) return `in ${days} days`;
  if (days < 14) return "next week";
  return `in ${Math.round(days / 7)} weeks`;
}
