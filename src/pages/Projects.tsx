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
        eyebrow="Hardware teams"
        heading="A few people build things."
        lede="Build teams run alongside the meetings and workshops for members who want to spend their time that way. They take new people at any point, including partway through."
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
            Sessions are listed on the chapter calendar. Turn up to one and ask what
            needs doing.
          </p>
          <ButtonLink to="/events" variant="secondary" className="mt-5">
            See the calendar
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
