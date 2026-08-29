#!/usr/bin/env node
/**
 * Content gate.
 *
 * Runs before every build. Its job is to turn a bad edit made in the CMS into
 * a failed deploy with a readable explanation, rather than a broken page that
 * nobody notices for a week. Officers see the failure in the Cloudflare Pages
 * build log; the previously deployed site stays up untouched.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentDir = join(root, "content");

const problems = [];

const report = (file, message) => {
  problems.push(`${relative(root, file)}\n    ${message}`);
};

const isFilledString = (v) => typeof v === "string" && v.trim() !== "";
const isUrlOrEmpty = (v) =>
  v === "" || v === undefined || (typeof v === "string" && /^(https?:\/\/|\/)/.test(v));

function readCollection(dir) {
  const abs = join(contentDir, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const file = join(abs, f);
      const { data, content } = matter(readFileSync(file, "utf8"));
      return { file, data, content };
    });
}

function readJson(relPath) {
  const file = join(contentDir, relPath);
  if (!existsSync(file)) {
    problems.push(`${relPath}\n    Missing required file.`);
    return null;
  }
  try {
    return { file, data: JSON.parse(readFileSync(file, "utf8")) };
  } catch (err) {
    report(file, `Not valid JSON — ${err.message}`);
    return null;
  }
}

/* ---------------------------- people ---------------------------- */

for (const { file, data } of readCollection("officers")) {
  if (!isFilledString(data.name)) report(file, "`name` is required.");
  if (!isFilledString(data.role)) report(file, "`role` is required.");
  if (!isUrlOrEmpty(data.photo))
    report(file, "`photo` must be a full https:// URL or a path starting with /.");
  if (!isUrlOrEmpty(data.linkedin))
    report(file, "`linkedin` must be a full https:// URL, or empty (\"\") if they have none.");
  if (typeof data.order !== "number")
    report(file, "`order` must be a number — it controls the position on the Officers page.");
}

for (const { file, data } of readCollection("advisors")) {
  if (!isFilledString(data.name)) report(file, "`name` is required.");
  if (!isUrlOrEmpty(data.photo)) report(file, "`photo` must be a full URL or a path starting with /.");
  if (!isUrlOrEmpty(data.linkedin)) report(file, "`linkedin` must be a full URL or empty.");
}

/* --------------------------- projects --------------------------- */

/**
 * Timing statements go stale and nobody comes back to fix them. A project
 * described as "forming now" is still forming now two years later. Timing
 * belongs in `meeting`, which is a field officers already expect to change.
 */
const STALE_PHRASES = [
  "forming now",
  "starting soon",
  "coming soon",
  "just started",
  "just formed",
  "recently started",
  "right now",
  "at the moment",
  "as of now",
  "this semester we",
  "new project",
];

const projectSlugs = new Set();

for (const { file, data } of readCollection("projects")) {
  if (!isFilledString(data.title)) report(file, "`title` is required.");
  if (!isFilledString(data.summary))
    report(file, "`summary` is required — it is the one-line description shown on project cards.");
  if (isFilledString(data.summary)) {
    const lower = data.summary.toLowerCase();
    for (const phrase of STALE_PHRASES) {
      if (lower.includes(phrase)) {
        report(
          file,
          `\`summary\` contains "${phrase}". Timing statements go stale and never get updated — put schedule information in the \`meeting\` field instead, and keep the summary to what the project is and what you would learn.`,
        );
      }
    }
  }
  if (data.summary && data.summary.length > 400)
    report(
      file,
      `\`summary\` is ${data.summary.length} characters; keep it under 400. It is the whole description — there are no project pages.`,
    );
  if (!isUrlOrEmpty(data.cover)) report(file, "`cover` must be a full URL, a path starting with /, or empty.");
  if (typeof data.order !== "number") report(file, "`order` must be a number.");

  const slug = file.split("/").pop().replace(/\.md$/, "");
  if (projectSlugs.has(slug)) report(file, `Duplicate filename \`${slug}\` — project URLs would collide.`);
  projectSlugs.add(slug);
}

if (![...projectSlugs].length) problems.push("content/projects\n    No projects found.");

/* --------------------------- resources -------------------------- */

for (const { file, data } of readCollection("resources")) {
  if (!isFilledString(data.title)) report(file, "`title` is required.");
  if (typeof data.order !== "number") report(file, "`order` must be a number.");

  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) report(file, "This section has no entries. Add at least one, or delete the section.");

  items.forEach((item, i) => {
    if (!isFilledString(item?.label)) report(file, `items[${i}] is missing a \`label\`.`);
    // An empty address is allowed on purpose: coursework entries are not links.
    if (isFilledString(item?.href) && !/^(https?:\/\/|\/|mailto:)/.test(item.href))
      report(file, `items[${i}] ("${item?.label ?? "?"}") href must start with https://, / or mailto: (found: ${item.href}).`);
  });
}

/* ---------------------------- settings -------------------------- */

const settings = readJson("settings/site.json");
if (settings) {
  const { file, data } = settings;
  for (const key of ["name", "shortName", "email", "url", "logo", "tagline", "founded"]) {
    if (!isFilledString(data[key])) report(file, `\`${key}\` is required.`);
  }
  if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
    report(file, `\`email\` does not look like an email address (found: ${data.email}).`);
  for (const [k, v] of Object.entries(data.socials ?? {})) {
    if (!isUrlOrEmpty(v)) report(file, `socials.${k} must be a full https:// URL or empty.`);
  }
  if (data.calendar && typeof data.calendar.maxUpcoming !== "number")
    report(file, "`calendar.maxUpcoming` must be a number.");
}

/* --------------------------- page copy -------------------------- */

const pageRequirements = {
  "pages/home.json": ["hero.headline", "hero.lede", "seo.title", "seo.description"],
  "pages/join.json": [
    "hero.headline",
    "hero.lede",
    "seo.title",
    "membership.heading",
    "membership.lede",
    "membership.cta.label",
    "membership.cta.href",
  ],
  "pages/events.json": ["hero.headline", "hero.lede", "seo.title"],
  "pages/contact.json": ["hero.headline", "hero.lede", "seo.title"],
};

const dig = (obj, path) => path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);

for (const [relPath, required] of Object.entries(pageRequirements)) {
  const page = readJson(relPath);
  if (!page) continue;
  for (const path of required) {
    if (!isFilledString(dig(page.data, path))) report(page.file, `\`${path}\` is required and cannot be blank.`);
  }
}

// A photograph without alt text is inaccessible, and the CMS cannot enforce
// "required only when another field is filled". Catching it here means an
// officer who uploads an image and skips the description finds out at once.
const imageSlots = [
  ["pages/join.json", "membership.image", "the membership section"],
  ["pages/events.json", "hero.image", "the events page"],
];

for (const [relPath, path, where] of imageSlots) {
  const page = readJson(relPath);
  if (!page) continue;
  const image = dig(page.data, path);
  if (!image || !isFilledString(image.src)) continue;
  if (!isFilledString(image.alt)) {
    report(
      page.file,
      `\`${path}\` has an image but no \`alt\` text. Describe what is happening in the photo — it is what screen readers announce for ${where}.`,
    );
  }
  if (!isUrlOrEmpty(image.src)) {
    report(page.file, `\`${path}.src\` must be an uploaded image or a full URL.`);
  }
}

// Home page slideshow: every slide needs a description, for the same reason.
const homePage = readJson("pages/home.json");
if (homePage) {
  const slides = homePage.data.hero?.slides;
  if (slides !== undefined && !Array.isArray(slides)) {
    report(homePage.file, "`hero.slides` must be a list.");
  } else {
    (slides ?? []).forEach((slide, i) => {
      if (!isFilledString(slide?.src)) {
        report(homePage.file, `hero.slides[${i}] has no image. Remove the entry or choose a photo.`);
      } else if (!isUrlOrEmpty(slide.src)) {
        report(homePage.file, `hero.slides[${i}].src must be an uploaded image or a full URL.`);
      }
      if (!isFilledString(slide?.alt)) {
        report(
          homePage.file,
          `hero.slides[${i}] has no \`alt\` text. Describe what is happening in the photo — it is what screen readers announce.`,
        );
      }
    });
  }
}

const joinPage = readJson("pages/join.json");
if (joinPage) {
  const benefits = joinPage.data.membership?.benefits;
  if (!Array.isArray(benefits) || benefits.length < 2) {
    report(joinPage.file, "`membership.benefits` needs at least two entries.");
  } else {
    benefits.forEach((benefit, i) => {
      if (!isFilledString(benefit?.title)) report(joinPage.file, `membership.benefits[${i}] is missing a \`title\`.`);
      if (!isFilledString(benefit?.body)) report(joinPage.file, `membership.benefits[${i}] is missing a \`body\`.`);
    });
  }
}

const contact = readJson("pages/contact.json");
if (contact) {
  const channels = contact.data.channels;
  if (!Array.isArray(channels) || channels.length === 0) {
    report(contact.file, "`channels` must list at least one way to get in touch.");
  } else {
    channels.forEach((channel, i) => {
      if (!isFilledString(channel?.title)) report(contact.file, `channels[${i}] is missing a \`title\`.`);
      if (!isFilledString(channel?.cta)) report(contact.file, `channels[${i}] is missing \`cta\` (the button text).`);
      if (!["discord", "email"].includes(channel?.channel))
        report(contact.file, `channels[${i}] \`channel\` must be "discord" or "email" (found: ${JSON.stringify(channel?.channel)}).`);
    });
  }
}


/* ----------------------------- output --------------------------- */

if (problems.length > 0) {
  console.error(`\n  Content check failed — ${problems.length} problem${problems.length === 1 ? "" : "s"} found.\n`);
  console.error("  Nothing was deployed. The live site is unchanged.");
  console.error("  Fix the items below in the CMS (or in the files directly) and save again.\n");
  for (const p of problems) console.error(`  • ${p}\n`);
  process.exit(1);
}

console.log("  Content check passed.");
