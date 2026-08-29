import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeCopy, projects, site } from "@/content";
import { projectGrid } from "@/lib/grid";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Waveform } from "@/components/ui/Waveform";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EventList } from "@/components/ui/EventList";
import { Slideshow } from "@/components/ui/Slideshow";
import { Countdown } from "@/components/ui/Countdown";

function Hero() {
  const { hero } = homeCopy;
  const slides = hero.slides ?? [];

  return (
    <section className="texture-grid relative overflow-hidden pt-14 pb-16 sm:pt-24 sm:pb-24">
      {/* A single soft wash behind the headline. Kept low-contrast so the
          type stays the loudest thing on the page. */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, var(--c-accent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container width="wide">
        <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 font-display text-display-1 text-ink">
              {hero.headline}{" "}
              <span className="italic text-accent-text">{hero.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-2xl text-lede text-muted">{hero.lede}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
          </div>

          {slides.length > 0 && (
            <Reveal delay={200} className="mx-auto w-full max-w-sm lg:max-w-none">
              <Slideshow slides={slides} />
            </Reveal>
          )}
        </div>

        <Reveal delay={260} className="mt-16 text-accent sm:mt-20">
          <Waveform className="h-14 sm:h-16" />
        </Reveal>
      </Container>
    </section>
  );
}

function NextMeeting() {
  const state = useCalendarEvents(3);
  const next = state.status === "ready" ? state.events[0] : undefined;

  return (
    <Section divider>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>Next up</Eyebrow>
          <h2 className="mt-4 font-display text-display-3 text-ink">
            {next ? next.title : "The chapter calendar"}
          </h2>
          <p className="mt-4 text-lede text-muted">
            Meetings, workshops, and build sessions all live on one calendar.
            Subscribe once and you will stop having to check.
          </p>

          {next && (
            <div className="mt-8">
              <Countdown target={next.start} />
            </div>
          )}

          <Link
            to="/events"
            className="mt-8 inline-flex items-center gap-2 text-sm text-accent-text underline decoration-1 underline-offset-4 transition-colors hover:no-underline"
          >
            See the full calendar
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <EventList state={state} emptyLabel="Nothing on the calendar yet this term." />
        </Reveal>
      </div>
    </Section>
  );
}

function CurrentWork() {
  const { workSection } = homeCopy;
  const featured = projects.slice(0, 3);

  return (
    <Section
      divider
      eyebrow={workSection.eyebrow}
      heading={workSection.heading}
      lede={workSection.lede}
      width="wide"
      headerAside={
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-accent-text underline decoration-1 underline-offset-4 hover:no-underline"
        >
          All projects
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      }
    >
      <ul className={`grid gap-6 ${projectGrid(featured.length)}`}>
        {featured.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function Pillars() {
  const { pillarSection } = homeCopy;

  return (
    <Section
      tone="sunk"
      eyebrow={pillarSection.eyebrow}
      heading={pillarSection.heading}
      lede={pillarSection.lede}
    >
      <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
        {pillarSection.pillars.map((pillar, i) => (
          <Reveal as="li" key={pillar.title} delay={i * 70} className="bg-surface p-7 sm:p-8">
            <span
              className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function JoinSteps() {
  const { joinSection } = homeCopy;

  return (
    <Section divider eyebrow={joinSection.eyebrow} heading={joinSection.heading} width="text">
      <ol className="mt-2">
        {joinSection.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 70}
            className="relative border-l border-line py-6 pl-8 last:pb-0"
          >
            <span
              className="absolute -left-px top-8 h-px w-4 bg-line-strong"
              aria-hidden="true"
            />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-text">
              Step {i + 1}
            </span>
            <h3 className="mt-2.5 font-display text-2xl leading-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-2.5 leading-relaxed text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Closing() {
  const { closing } = homeCopy;

  return (
    <Section width="wide" className="pb-24 sm:pb-32">
      <Reveal className="relative overflow-hidden rounded-card border border-line bg-surface px-7 py-14 sm:px-14 sm:py-20">
        <div className="relative max-w-2xl">
          <h2 className="font-display text-display-2 text-ink">{closing.heading}</h2>
          <p className="mt-5 text-lede text-muted">{closing.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to={closing.primaryCta.href} size="lg">
              {closing.primaryCta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to={closing.secondaryCta.href} variant="secondary" size="lg">
              {closing.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-8 font-mono text-xs text-faint">
            Or email {site.email} — it reaches the officers directly.
          </p>
        </div>

        <div
          className="pointer-events-none absolute -right-20 -bottom-24 w-[36rem] text-accent opacity-[0.06]"
          aria-hidden="true"
        >
          <Waveform className="h-64" weight={2} animated={false} />
        </div>
      </Reveal>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CurrentWork />
      <NextMeeting />
      <Pillars />
      <JoinSteps />
      <Closing />
    </>
  );
}
