import { ArrowRight, ArrowUpRight } from "lucide-react";
import { homeCopy, joinCopy, site } from "@/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoBand } from "@/components/ui/PhotoBand";

export default function Join() {
  const { hero, faqs, steps, membership } = joinCopy;
  const { joinSection } = homeCopy;

  return (
    <>
      <PageHeader eyebrow={hero.eyebrow} heading={hero.headline} lede={hero.lede}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/events" size="lg">
            Find the next meeting
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={site.socials.discord} variant="secondary" size="lg">
            Join the Discord
          </ButtonLink>
        </div>
      </PageHeader>

      <Section width="wide" eyebrow="The process" heading="Three steps">
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {joinSection.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 70} className="bg-surface p-7 sm:p-8">
              <span
                className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 max-w-2xl rounded-card border border-line bg-surface-sunk p-7">
          <h3 className="font-medium text-ink">{steps.heading}</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{steps.body}</p>
        </Reveal>
      </Section>

      <Section
        tone="sunk"
        width="wide"
        eyebrow={membership.eyebrow}
        heading={membership.heading}
        lede={membership.lede}
      >
        {membership.image?.src && (
          <Reveal className="mb-10">
            <PhotoBand photo={membership.image} ratio="wide" />
          </Reveal>
        )}

        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {membership.benefits.map((benefit, i) => (
            <Reveal
              as="li"
              key={benefit.title}
              delay={(i % 2) * 70}
              className="bg-surface p-7 sm:p-8"
            >
              <h3 className="font-display text-2xl leading-tight text-ink">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {benefit.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-mono text-xs leading-relaxed text-faint">
            {membership.note}
          </p>
          <ButtonLink to={membership.cta.href} size="lg" className="self-start">
            {membership.cta.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Section>

      <Section
        divider
        width="default"
        eyebrow="Questions"
        heading="What people usually ask"
        className="pb-24 sm:pb-32"
      >
        <dl className="divide-y divide-line border-y border-line">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={Math.min(i, 4) * 50} className="py-7">
              <dt className="font-display text-2xl leading-tight text-ink">
                {faq.question}
              </dt>
              <dd className="mt-3 max-w-2xl leading-relaxed text-muted">{faq.answer}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-12">
          <p className="text-muted">
            Something not covered here?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent-text underline decoration-1 underline-offset-4 hover:no-underline"
            >
              Email the chapter
            </a>{" "}
            and an officer will answer.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
