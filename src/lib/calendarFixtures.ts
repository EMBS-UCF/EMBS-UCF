import type { CalendarEvent } from "./calendar";

/**
 * Stand-in calendar data for local development.
 *
 * The calendar drives the countdown, the "next meeting" block, the GBM
 * filter, and four distinct empty/error states — none of which could be
 * exercised without a Google API key and a public calendar. These fixtures
 * make all of it testable on a laptop with no credentials.
 *
 * Times are relative to now so the countdown always has something to count
 * toward, and so the fixtures never rot.
 */

const DAY = 86_400_000;
const HOUR = 3_600_000;

/** Today at a fixed local hour, `days` from now. */
function at(days: number, hour: number, minute = 0): number {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
}

export function mockEvents(limit: number): CalendarEvent[] {
  const events: CalendarEvent[] = [
    {
      id: "mock-gbm-1",
      title: "General Body Meeting (GBM) — Guest speaker",
      description: "",
      location: "Engineering II, Room 102",
      start: at(2, 18, 30),
      end: at(2, 18, 30) + 1.5 * HOUR,
      allDay: false,
      htmlLink: "",
    },
    {
      id: "mock-workshop",
      title: "Workshop: Soldering and through-hole assembly",
      description: "",
      location: "TCH 238",
      start: at(5, 17, 0),
      end: at(5, 17, 0) + 2 * HOUR,
      allDay: false,
      htmlLink: "",
    },
    {
      id: "mock-build",
      title: "EEG build session",
      description: "",
      location: "",
      start: at(9, 16, 30),
      end: at(9, 16, 30) + 2 * HOUR,
      allDay: false,
      htmlLink: "",
    },
    {
      id: "mock-allday",
      title: "UCF Engineering Career Fair",
      description: "",
      location: "Addition Financial Arena",
      start: at(16, 0),
      end: at(16, 0) + DAY,
      allDay: true,
      htmlLink: "",
    },
    {
      id: "mock-gbm-2",
      title: "General Body Meeting (GBM) — Semester wrap-up",
      description: "",
      location: "Engineering II, Room 102",
      start: at(23, 18, 30),
      end: at(23, 18, 30) + 1.5 * HOUR,
      allDay: false,
      htmlLink: "",
    },
  ];

  return events.slice(0, limit);
}
