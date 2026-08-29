import { projects } from "@/content";
import { projectGrid } from "@/lib/grid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";

export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        heading="Student-built medical hardware"
        lede="Our project teams design, wire, and test real devices. They're open to every member and take new people throughout the semester, including partway through a build."
      />

      <Section width="wide" className="pb-24 sm:pb-32">
        <ul className={`grid gap-6 ${projectGrid(projects.length)}`}>
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 60}>
              <ProjectCard project={project} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <p className="max-w-xl text-muted">
            Build sessions are on the chapter calendar. Come to one and ask what needs
            doing — that's genuinely how most people start.
          </p>
          <ButtonLink to="/events" variant="secondary" className="mt-5">
            See the calendar
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
