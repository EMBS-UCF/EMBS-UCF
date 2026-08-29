import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Waveform } from "@/components/ui/Waveform";
import { NAV_ITEMS } from "@/lib/nav";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container width="default">
      <div className="flex min-h-[60vh] flex-col justify-center py-20">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 font-display text-display-2 text-ink">
          No signal on this channel.
        </h1>
        <p className="mt-5 max-w-md text-lede text-muted">
          That page does not exist. It may have been renamed, or the link that
          brought you here may be out of date.
        </p>

        <div className="mt-9">
          <ButtonLink to="/" size="lg">
            Back to the home page
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-faint transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 text-faint opacity-40" aria-hidden="true">
          <Waveform className="h-12" weight={1} animated={false} />
        </div>
      </div>
    </Container>
  );
}
