import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-1",
        "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ live, label }: { live: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em]">
      <span className="relative flex size-1.5">
        {live && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            live ? "bg-live" : "bg-faint",
          )}
        />
      </span>
      <span className={live ? "text-live" : "text-faint"}>{label}</span>
    </span>
  );
}
