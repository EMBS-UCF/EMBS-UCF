import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

interface SectionProps {
  children: ReactNode;
  eyebrow?: string;
  heading?: string;
  lede?: string;
  id?: string;
  width?: "default" | "wide" | "text";
  className?: string;
  /** Draws a hairline above the section. */
  divider?: boolean;
  headerAside?: ReactNode;
  /**
   * `sunk` gives the section its own recessed background. Alternating this
   * down the page is what stops a long single-column layout reading as one
   * undifferentiated scroll.
   */
  tone?: "canvas" | "sunk";
}

export function Section({
  children,
  eyebrow,
  heading,
  lede,
  id,
  width = "default",
  className,
  divider = false,
  headerAside,
  tone = "canvas",
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || heading || lede);

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "sunk" && "border-y border-line bg-surface-sunk",
        className,
      )}
    >
      {divider && tone === "canvas" && (
        <Container width={width}>
          <div className="rule-fade mb-16 sm:mb-24" />
        </Container>
      )}

      <Container width={width}>
        {hasHeader && (
          <header className="reveal mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
              {heading && (
                <h2 className="font-display text-display-2 text-ink">{heading}</h2>
              )}
              {lede && <p className="mt-4 text-lede text-muted">{lede}</p>}
            </div>
            {headerAside && <div className="shrink-0">{headerAside}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
