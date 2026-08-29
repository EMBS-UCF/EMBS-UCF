import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  /** `wide` for full-bleed grids, `text` for reading columns. */
  width?: "default" | "wide" | "text";
  className?: string;
}

const widths = {
  default: "max-w-6xl",
  wide: "max-w-[86rem]",
  text: "max-w-2xl",
} as const;

export function Container({ children, width = "default", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
