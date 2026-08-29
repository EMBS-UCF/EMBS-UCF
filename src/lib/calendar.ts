import { site } from "@/content";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  /** Milliseconds since epoch. */
  start: number;
  end: number | null;
  allDay: boolean;
  htmlLink: string;
}

export type CalendarState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | { status: "ready"; events: CalendarEvent[] };

interface GoogleEventItem {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
}

const API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY ?? "";
const CALENDAR_ID: string = import.meta.env.VITE_GOOGLE_CALENDAR_ID || site.calendar.id;

export const calendarIsConfigured = (): boolean =>
  API_KEY !== "" && CALENDAR_ID !== "";

/**
 * Development can stand in fixture data for the live feed, so the calendar UI
 * is testable without a Google API key. Never true in a production build —
 * `import.meta.env.DEV` is compiled to `false` and the fixtures are then
 * dropped from the bundle entirely.
 */
export const calendarUsesMockData = (): boolean =>
  import.meta.env.DEV &&
  (import.meta.env.VITE_CALENDAR_MOCK === "on" || !calendarIsConfigured());

export type CalendarStateOverride = "loading" | "empty" | "error" | "ready";

/**
 * `?calendar=error` and friends force a single state, so the empty, failed and
 * still-loading branches can be looked at without breaking anything to get
 * there. Development only.
 */
export function calendarStateOverride(): CalendarStateOverride | null {
  if (!import.meta.env.DEV || typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("calendar");
  return value === "loading" || value === "empty" || value === "error" || value === "ready"
    ? value
    : null;
}

/**
 * An all-day event has a `date` (no time). Parsing that string directly gives
 * UTC midnight, which renders as the previous day for anyone west of Greenwich
 * — including Orlando. Splitting it into local components avoids the
 * off-by-one-day bug that every calendar integration hits eventually.
 */
function parseStart(value: { dateTime?: string; date?: string } | undefined): {
  ms: number;
  allDay: boolean;
} | null {
  if (!value) return null;

  if (value.dateTime) {
    const ms = Date.parse(value.dateTime);
    return Number.isNaN(ms) ? null : { ms, allDay: false };
  }

  if (value.date) {
    const parts = value.date.split("-").map(Number);
    const [y, m, d] = parts;
    if (y === undefined || m === undefined || d === undefined) return null;
    return { ms: new Date(y, m - 1, d).getTime(), allDay: true };
  }

  return null;
}

export async function fetchUpcomingEvents(
  limit: number,
  signal?: AbortSignal,
): Promise<CalendarEvent[]> {
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID,
    )}/events`,
  );
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("timeMin", new Date().toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", String(Math.min(limit * 3, 50)));

  const res = await fetch(url, { signal });

  if (!res.ok) {
    // Google returns a readable reason for the two failures that actually
    // happen in practice: an expired key and a calendar that is not public.
    let detail = `${res.status}`;
    try {
      const body = (await res.json()) as { error?: { message?: string } };
      if (body.error?.message) detail = body.error.message;
    } catch {
      /* response body was not JSON; the status code is all we have */
    }
    throw new Error(detail);
  }

  const data = (await res.json()) as { items?: GoogleEventItem[] };

  return (data.items ?? [])
    .map((item): CalendarEvent | null => {
      const start = parseStart(item.start);
      if (!start) return null;
      const end = parseStart(item.end);
      return {
        id: item.id ?? `${item.summary ?? "event"}-${start.ms}`,
        title: item.summary?.trim() || "Untitled event",
        description: item.description?.trim() ?? "",
        location: item.location?.trim() ?? "",
        start: start.ms,
        end: end?.ms ?? null,
        allDay: start.allDay,
        htmlLink: item.htmlLink ?? "",
      };
    })
    .filter((e): e is CalendarEvent => e !== null)
    .slice(0, limit);
}

export const isGbm = (event: CalendarEvent): boolean =>
  event.title.toUpperCase().includes(site.calendar.gbmKeyword.toUpperCase());

export function calendarEmbedUrl(): string {
  const url = new URL("https://calendar.google.com/calendar/embed");
  url.searchParams.set("src", CALENDAR_ID);
  url.searchParams.set("ctz", site.calendar.timezone);
  url.searchParams.set("mode", "MONTH");
  url.searchParams.set("showTitle", "0");
  url.searchParams.set("showPrint", "0");
  url.searchParams.set("showCalendars", "0");
  url.searchParams.set("showTabs", "1");
  url.searchParams.set("showNav", "1");
  url.searchParams.set("showDate", "1");
  // Matches --c-surface so the embed does not punch a white hole in the page.
  url.searchParams.set("bgcolor", "#1e222a");
  return url.toString();
}

export function googleCalendarSubscribeUrl(): string {
  return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(CALENDAR_ID)}`;
}
