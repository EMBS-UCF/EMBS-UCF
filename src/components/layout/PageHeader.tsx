import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  heading: string;
  lede?: string;
  children?: ReactNode;
  width?: "default" | "wide" | "text";
}

export function PageHeader({
  eyebrow,
  heading,
  lede,
  children,
  width = "wide",
}: PageHeaderProps) {
  return (
    <section className="border-b border-line pt-12 pb-14 sm:pt-20 sm:pb-20">
      <Container width={width}>
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-display-2 text-ink">{heading}</h1>
          {lede && <p className="mt-6 max-w-2xl text-lede text-muted">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
