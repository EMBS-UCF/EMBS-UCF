import { CalendarPlus, MapPin } from "lucide-react";
import type { CalendarEvent, CalendarState } from "@/lib/calendar";
import { calendarUsesMockData, googleCalendarSubscribeUrl } from "@/lib/calendar";
import { formatDayNumber, formatMonthShort, formatTime, relativeDay } from "@/lib/format";
import { site } from "@/content";
import { Card } from "./Card";
import { StatusDot } from "./Tag";
import { ButtonLink } from "./Button";

function EventRow({ event }: { event: CalendarEvent }) {
  return (
    <li className="flex gap-5 border-b border-line py-6 last:border-0">
      <div
        className="flex size-14 shrink-0 flex-col items-center justify-center rounded-card border border-line bg-surface-sunk"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-faint">
          {formatMonthShort(event.start)}
        </span>
        <span className="font-display text-xl leading-none text-ink">
          {formatDayNumber(event.start)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-medium text-ink">{event.title}</h3>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-text">
            {relativeDay(event.start)}
          </span>
        </div>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="font-mono text-xs">
            {event.allDay ? "All day" : formatTime(event.start)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="shrink-0 text-faint" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </p>
      </div>
    </li>
  );
}

interface EventListProps {
  state: CalendarState;
  /** Message shown when the feed works but returns nothing. */
  emptyLabel?: string;
}

export function EventList({ state, emptyLabel = "Nothing scheduled yet." }: EventListProps) {
  if (state.status === "loading") {
    return (
      <ul className="animate-pulse" aria-busy="true" aria-label="Loading events">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex gap-5 border-b border-line py-6 last:border-0">
            <div className="size-14 shrink-0 rounded-card bg-surface-sunk" />
            <div className="flex-1 space-y-2.5 pt-1">
              <div className="h-4 w-2/3 rounded bg-surface-sunk" />
              <div className="h-3 w-1/3 rounded bg-surface-sunk" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (state.status === "unconfigured") {
    return (
      <Card className="p-6">
        <StatusDot live={false} label="Calendar not connected" />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The chapter calendar isn't connected yet. Until it is, Discord is the
          best place to find out when we're meeting.
        </p>
        <ButtonLink to={site.socials.discord} variant="secondary" size="md" className="mt-5">
          Open Discord
        </ButtonLink>
      </Card>
    );
  }

  if (state.status === "error") {
    return (
      <Card className="p-6">
        <StatusDot live={false} label="Calendar unavailable" />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Couldn't load the schedule just now. The calendar below should still
          work.
        </p>
        <p className="mt-2 font-mono text-xs text-faint">{state.message}</p>
      </Card>
    );
  }

  if (state.events.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted">{emptyLabel}</p>
      </Card>
    );
  }

  return (
    <>
      {/* Fixtures look exactly like real events, which is the point and also
          the danger. This strip only exists in a development build. */}
      {import.meta.env.DEV && calendarUsesMockData() && (
        <p className="mb-4 rounded-card border border-dashed border-gold/50 bg-gold-soft px-4 py-2.5 font-mono text-xs text-gold-text">
          Sample data — no calendar connected. Try{" "}
          <code>?calendar=empty</code>, <code>?calendar=error</code> or{" "}
          <code>?calendar=loading</code>.
        </p>
      )}
      <ul>
        {state.events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </ul>
      <ButtonLink
        to={googleCalendarSubscribeUrl()}
        variant="secondary"
        size="md"
        className="mt-8"
      >
        <CalendarPlus size={15} aria-hidden="true" />
        Add to your calendar
      </ButtonLink>
    </>
  );
}
