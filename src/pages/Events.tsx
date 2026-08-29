import { CalendarPlus } from "lucide-react";
import { eventsCopy, site } from "@/content";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import {
  calendarEmbedUrl,
  calendarIsConfigured,
  googleCalendarSubscribeUrl,
  isGbm,
} from "@/lib/calendar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EventList } from "@/components/ui/EventList";
import { Countdown } from "@/components/ui/Countdown";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { formatDateLong, formatTime } from "@/lib/format";

export default function Events() {
  const { hero, kinds } = eventsCopy;
  const state = useCalendarEvents(site.calendar.maxUpcoming);

  const nextGbm =
    state.status === "ready" ? state.events.find(isGbm) ?? state.events[0] : undefined;

  return (
    <>
      <PageHeader eyebrow={hero.eyebrow} heading={hero.headline} lede={hero.lede}>
        <ButtonLink to={googleCalendarSubscribeUrl()} size="lg">
          <CalendarPlus size={16} aria-hidden="true" />
          Subscribe to the calendar
        </ButtonLink>
      </PageHeader>

      {nextGbm && (
        <Section width="wide" className="py-12 sm:py-16">
          <Reveal className="rounded-card border border-line bg-surface p-7 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <Eyebrow>Next meeting</Eyebrow>
                <h2 className="mt-3.5 font-display text-display-3 text-ink">
                  {nextGbm.title}
                </h2>
                <p className="mt-3 text-muted">
                  {formatDateLong(nextGbm.start)}
                  {!nextGbm.allDay && ` · ${formatTime(nextGbm.start)}`}
                  {nextGbm.location && ` · ${nextGbm.location}`}
                </p>
              </div>
              <Countdown target={nextGbm.start} />
            </div>
          </Reveal>
        </Section>
      )}

      {hero.image?.src && (
        <Section width="wide" className="pb-0 pt-12 sm:pt-16">
          <Reveal>
            <PhotoBand photo={hero.image} ratio="wide" />
          </Reveal>
        </Section>
      )}

      <Section
        width="wide"
        eyebrow="What's coming up"
        heading="The next few things on the calendar"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <EventList state={state} emptyLabel="Nothing scheduled yet this term." />
          </Reveal>

          <Reveal delay={80}>
            <Eyebrow as="h3">Kinds of event</Eyebrow>
            <dl className="mt-6 space-y-px overflow-hidden rounded-card border border-line bg-line">
              {kinds.map((kind) => (
                <div key={kind.title} className="bg-surface p-6">
                  <dt className="font-medium text-ink">{kind.title}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {kind.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section divider width="wide" eyebrow="Full schedule" heading="Chapter calendar" className="pb-24 sm:pb-32">
        {calendarIsConfigured() ? (
          <Reveal className="overflow-hidden rounded-card border border-line bg-surface p-1.5">
            <iframe
              src={calendarEmbedUrl()}
              title="IEEE EMBS at UCF chapter calendar"
              loading="lazy"
              className="h-[36rem] w-full rounded-[calc(var(--radius-card)-0.25rem)] border-0"
            />
          </Reveal>
        ) : (
          <Reveal className="rounded-card border border-dashed border-line-strong p-10 text-center">
            <p className="text-muted">
              The chapter calendar has not been connected yet.
            </p>
            <p className="mx-auto mt-2 max-w-md font-mono text-xs leading-relaxed text-faint">
              An officer can add the calendar ID under Settings in the admin panel,
              and set VITE_GOOGLE_API_KEY in the Cloudflare Pages environment.
            </p>
          </Reveal>
        )}
      </Section>
    </>
  );
}
