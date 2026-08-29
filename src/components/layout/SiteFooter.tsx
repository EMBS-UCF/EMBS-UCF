import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, MessageSquare } from "lucide-react";
import { site } from "@/content";
import { NAV_ITEMS } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Waveform } from "@/components/ui/Waveform";

const SOCIALS = [
  { label: "Discord", href: site.socials.discord, Icon: MessageSquare },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "GitHub", href: site.socials.github, Icon: Github },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-sunk">
      <div className="text-accent/40" aria-hidden="true">
        <Waveform className="h-10" weight={1} animated={false} />
      </div>

      <Container width="wide">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={site.logo}
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                {site.name} · {site.chapter}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.fullName}. {site.campus}, {site.location}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-mono text-sm text-accent-text underline decoration-1 underline-offset-4 hover:no-underline"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <Eyebrow as="h2">Pages</Eyebrow>
            <ul className="mt-5 space-y-3">
              {[{ path: "/", label: "Home" }, ...NAV_ITEMS, { path: "/join", label: "Join" }].map(
                (item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <Eyebrow as="h2">Elsewhere</Eyebrow>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Icon size={15} className="shrink-0" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="max-w-md font-mono text-xs leading-relaxed text-faint">
            A student branch chapter of the IEEE Engineering in Medicine and Biology
            Society. Founded {site.founded}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
