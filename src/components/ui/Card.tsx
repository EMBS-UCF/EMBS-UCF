import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

/**
 * An open section of the page marked by a rule on top, not a filled box. Cards that link somewhere use the stretched-link pattern —
 * an `after:absolute after:inset-0` on the heading anchor — so the whole card
 * is clickable while the accessible name stays on the title text.
 * That relies on this element being positioned.
 */
export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative border-t border-line-strong transition-colors duration-200",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
