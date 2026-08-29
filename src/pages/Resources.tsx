import { ArrowUpRight } from "lucide-react";
import { resourceSections, site } from "@/content";
import type { ResourceItem } from "@/content/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Rows are either links or plain entries. Coursework has no destinations —
 * "take signals and systems" is not a URL — so the same list renders both
 * rather than forcing every row to pretend it links somewhere.
 */
function Row({ item }: { item: ResourceItem }) {
  const content = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium text-ink">{item.label}</span>
        {item.note && <span className="mt-1 block text-sm text-muted">{item.note}</span>}
      </span>
      {item.href && (
        <ArrowUpRight
          size={15}
          className="mt-0.5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!item.href) {
    return <div className="flex items-start gap-4 px-6 py-5">{content}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-surface-raised"
    >
      {content}
    </a>
  );
}

export default function Resources() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        heading="Coursework, funding, and research"
        lede="The questions that come up at every meeting, answered in one place."
      />

      {resourceSections.map((section, index) => (
        <Section
          key={section.slug}
          width="default"
          tone={index % 2 === 1 ? "sunk" : "canvas"}
          className={index === resourceSections.length - 1 ? "pb-20 sm:pb-28" : undefined}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <Reveal>
              <h2 className="font-display text-display-3 text-ink">{section.title}</h2>
              {section.description && (
                <p className="mt-4 leading-relaxed text-muted">{section.description}</p>
              )}
            </Reveal>

            <Reveal delay={70}>
              <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Row item={item} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section width="default" divider className="pb-24 sm:pb-32">
        <Reveal>
          <h2 className="max-w-xl font-display text-display-3 text-ink">
            Something missing?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Scholarships close, labs open positions, and links rot. If you find
            something that would've helped you a year ago, send it over.
          </p>
          <ButtonLink to={`mailto:${site.email}`} variant="secondary" className="mt-6">
            Send us a link
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
