import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small monospace label above a heading. Carries the technical register. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-label font-medium uppercase tracking-[0.14em] text-faint",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
