import type { Project } from "@/content/types";
import { Card } from "./Card";

/**
 * Projects are summarised, not expanded. There are no per-project pages, so
 * this card is the whole of what the site says about a build — the summary has
 * to stand on its own.
 */
interface ProjectCardProps {
  project: Project;
  /**
   * The Projects page has no section heading above the grid, so the cards are
   * the first level under its h1. On the home page they sit under a section
   * heading and drop a level.
   */
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden">
      {project.cover && (
        <div className="aspect-16/9 overflow-hidden border-b border-line bg-surface-sunk">
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <Heading className="font-display text-2xl leading-tight text-ink">
          {project.title}
        </Heading>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        {project.meeting && (
          <dl className="mt-6 flex gap-2 border-t border-line pt-5 font-mono text-xs">
            <dt className="shrink-0 uppercase tracking-[0.08em] text-faint">Meets</dt>
            <dd className="text-muted">{project.meeting}</dd>
          </dl>
        )}
      </div>
    </Card>
  );
}
