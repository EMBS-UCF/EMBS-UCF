import { Github, Instagram, Linkedin, MapPin } from "lucide-react";
import { contactCopy, site } from "@/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

const CHANNEL_HREF: Record<string, string> = {
  discord: site.socials.discord,
  email: `mailto:${site.email}`,
};

/** The channel a message should go to is decided above; Discord is deliberately
    absent here so it is not offered twice on one screen. */
const SOCIALS = [
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram, note: "Event photos and announcements" },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin, note: "Chapter and alumni updates" },
  { label: "GitHub", href: site.socials.github, Icon: Github, note: "Project code, including this site" },
].filter((s) => s.href);

export default function Contact() {
  const { hero, channels } = contactCopy;

  return (
    <>
      <PageHeader eyebrow={hero.eyebrow} heading={hero.headline} lede={hero.lede} />

      <Section width="wide" className="pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <ul className="grid gap-6 sm:grid-cols-2">
            {channels.map((channel, i) => (
              <Reveal as="li" key={channel.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                  <h2 className="font-display text-2xl text-ink">{channel.title}</h2>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {channel.body}
                  </p>
                  <ButtonLink
                    to={CHANNEL_HREF[channel.channel] ?? `mailto:${site.email}`}
                    variant={i === 0 ? "primary" : "secondary"}
                    className="mt-7 self-start"
                  >
                    {channel.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="space-y-10">
            <Reveal>
              <Eyebrow as="h2">Where we are</Eyebrow>
              <p className="mt-5 flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-faint" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-ink">{site.campus}</span>
                  <span className="mt-1 block text-sm text-muted">{site.location}</span>
                </span>
              </p>
              <p className="mt-4 font-mono text-xs leading-relaxed text-faint">
                Meeting locations vary and are listed on each calendar event.
              </p>
            </Reveal>

            {SOCIALS.length > 0 && (
              <Reveal delay={80}>
                <Eyebrow as="h2">Follow along</Eyebrow>
                <ul className="mt-5 space-y-px overflow-hidden rounded-card border border-line bg-line">
                  {SOCIALS.map(({ label, href, Icon, note }) => (
                    <li key={label} className="bg-surface">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3.5 p-5 transition-colors hover:bg-surface-raised"
                      >
                        <Icon size={16} className="shrink-0 text-faint" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.9375rem] font-medium text-ink">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">{note}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
