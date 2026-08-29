import { Linkedin } from "lucide-react";
import type { Person } from "@/content/types";
import { Avatar } from "./Avatar";

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group">
      <div className="aspect-4/5 overflow-hidden rounded-card border border-line bg-surface-sunk">
        <Avatar
          src={person.photo}
          name={person.name}
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-text">
          {person.role}
        </p>
        <h3 className="mt-1.5 text-lg font-medium tracking-tight text-ink">
          {person.name}
        </h3>
        {person.detail && (
          <p className="mt-1 text-sm text-muted">{person.detail}</p>
        )}

        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <Linkedin size={14} aria-hidden="true" />
            <span>LinkedIn</span>
            <span className="sr-only"> profile for {person.name}</span>
          </a>
        )}
      </div>
    </article>
  );
}
