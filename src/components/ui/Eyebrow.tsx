import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Short label above a heading, in the body font and sentence case. */
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
        "text-sm font-medium text-accent-text",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
