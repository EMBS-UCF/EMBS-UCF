import { advisors, officers } from "@/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PersonCard } from "@/components/ui/PersonCard";

export default function Officers() {
  return (
    <>
      <PageHeader
        eyebrow="Officers"
        heading="Meet the team"
        lede="These are the students running the chapter this year. Any of them is a good person to ask about joining, about a project, or about anything you can't find here."
      />

      <Section width="wide" heading="Officers">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {officers.map((person, i) => (
            <Reveal as="li" key={person.slug} delay={(i % 4) * 60}>
              <PersonCard person={person} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {advisors.length > 0 && (
        <Section
          divider
          width="wide"
          heading="Faculty advisor"
          className="pb-24 sm:pb-32"
        >
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {advisors.map((person) => (
              <Reveal as="li" key={person.slug}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
