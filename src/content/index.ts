import type {
  Person,
  Project,
  ResourceItem,
  ResourceSection,
  SiteSettings,
} from "./types";

import siteJson from "../../content/settings/site.json";
import homeJson from "../../content/pages/home.json";
import joinJson from "../../content/pages/join.json";
import eventsJson from "../../content/pages/events.json";
import contactJson from "../../content/pages/contact.json";

interface MdModule {
  frontmatter: Record<string, unknown>;
}

/* ------------------------------------------------------------------ *
 * Coercion helpers.
 *
 * Content is authored through the CMS, so a missing or mistyped field is
 * an editing mistake rather than a programming one. These never throw:
 * `npm run build` runs build/validate-content.ts first, which fails the
 * deploy loudly with a filename and a field. By the time a value reaches
 * here it has already been checked, and coercing keeps a bad edit from
 * white-screening the live site if one ever slips through.
 * ------------------------------------------------------------------ */

const str = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value.trim() : fallback;

const num = (value: unknown, fallback = 999): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

/** `/content/projects/eeg-from-scratch.md` -> `eeg-from-scratch` */
const slugOf = (path: string): string =>
  path
    .split("/")
    .pop()!
    .replace(/\.md$/, "")
    // Numeric prefixes exist only to keep the files ordered on disk.
    .replace(/^\d+-/, "");

const byOrder = <T extends { order: number; name?: string; title?: string }>(
  a: T,
  b: T,
): number => a.order - b.order || (a.name ?? a.title ?? "").localeCompare(b.name ?? b.title ?? "");

/* ------------------------------------------------------------------ *
 * People
 * ------------------------------------------------------------------ */

function toPerson(path: string, mod: MdModule, detailKey: "major" | "affiliation"): Person {
  const fm = mod.frontmatter;
  return {
    slug: slugOf(path),
    name: str(fm.name, "Unnamed"),
    role: str(fm.role),
    detail: str(fm[detailKey]),
    photo: str(fm.photo),
    linkedin: str(fm.linkedin),
    order: num(fm.order),
  };
}

const officerModules = import.meta.glob<MdModule>("../../content/officers/*.md", {
  eager: true,
});

const advisorModules = import.meta.glob<MdModule>("../../content/advisors/*.md", {
  eager: true,
});

export const officers: Person[] = Object.entries(officerModules)
  .map(([path, mod]) => toPerson(path, mod, "major"))
  .sort(byOrder);

export const advisors: Person[] = Object.entries(advisorModules)
  .map(([path, mod]) => toPerson(path, mod, "affiliation"))
  .sort(byOrder);

/* ------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------ */

const projectModules = import.meta.glob<MdModule>("../../content/projects/*.md", {
  eager: true,
});

export const projects: Project[] = Object.entries(projectModules)
  .map(([path, mod]): Project => {
    const fm = mod.frontmatter;
    return {
      slug: slugOf(path),
      title: str(fm.title, "Untitled project"),
      summary: str(fm.summary),
      meeting: str(fm.meeting),
      cover: str(fm.cover),
      order: num(fm.order),
    };
  })
  .sort(byOrder);

/* ------------------------------------------------------------------ *
 * Resources
 * ------------------------------------------------------------------ */

const resourceModules = import.meta.glob<MdModule>("../../content/resources/*.md", {
  eager: true,
});

export const resourceSections: ResourceSection[] = Object.entries(resourceModules)
  .map(([path, mod]): ResourceSection => {
    const fm = mod.frontmatter;
    const rawItems = Array.isArray(fm.items) ? fm.items : [];
    return {
      slug: slugOf(path),
      title: str(fm.title, "Untitled"),
      description: str(fm.description),
      order: num(fm.order),
      items: rawItems
        .map((item): ResourceItem => {
          const i = (item ?? {}) as Record<string, unknown>;
          return {
            label: str(i.label),
            note: str(i.note),
            href: str(i.href),
          };
        })
        // A row with no label is an unfinished edit. A row with no href is
        // fine — that is how course areas are listed.
        .filter((i) => i.label !== ""),
    };
  })
  .sort(byOrder);

/* ------------------------------------------------------------------ *
 * Settings and page copy
 * ------------------------------------------------------------------ */

export const site = siteJson as SiteSettings;
export const homeCopy = homeJson;
export const joinCopy = joinJson;
export const eventsCopy = eventsJson;
export const contactCopy = contactJson;

export type { Person, Project, ResourceItem, ResourceSection, SiteSettings } from "./types";
