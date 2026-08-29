#!/usr/bin/env node
/**
 * Renders every route to static HTML after the Vite build.
 *
 * The site is still a React SPA once it loads — this only changes what the
 * server hands over first. Two things depend on it:
 *
 *   1. Link unfurlers (Discord, LinkedIn, iMessage, Slack) do not run
 *      JavaScript. Without prerendered <head> tags, a shared chapter link
 *      shows a blank card.
 *   2. The first paint is real content rather than an empty div.
 *
 * Unknown paths become 404.html, which Cloudflare Pages serves with an
 * actual 404 status rather than a soft 200.
 */

import { mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const serverDir = join(dist, "server");

const { render, routes } = await import(join(serverDir, "entry-server.js"));

const template = readFileSync(join(dist, "index.html"), "utf8");

/**
 * Fonts are only discovered after the stylesheet parses, which delays the two
 * faces that draw the headline and body text. Preloading them removes a round
 * trip. Filenames are content-hashed, so they have to be looked up here rather
 * than hard-coded.
 *
 * Only the Latin subsets of the two above-the-fold faces are preloaded —
 * preloading everything would just move the contention around.
 */
const assets = readdirSync(join(dist, "assets"));

const fontPreloads = ["inter-latin-wght-normal", "instrument-serif-latin-400-normal"]
  .map((stem) => assets.find((f) => f.startsWith(stem) && f.endsWith(".woff2")))
  .filter(Boolean)
  .map(
    (file) =>
      `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${file}" />`,
  )
  .join("\n    ");

/**
 * The first slide of the home page slideshow is the largest contentful paint.
 * It is inside a component the browser cannot see until the JavaScript runs,
 * so without this the fetch does not start until hydration.
 */
function imagePreloadFor(route) {
  if (route !== "/") return "";
  const home = JSON.parse(readFileSync(join(root, "content/pages/home.json"), "utf8"));
  const first = home.hero?.slides?.[0]?.src;
  return first
    ? `<link rel="preload" as="image" fetchpriority="high" href="${first}" />`
    : "";
}

if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  console.error("  index.html is missing its <!--app-html--> / <!--app-head--> markers.");
  process.exit(1);
}

const write = (route, html) => {
  const target =
    route === "/404"
      ? join(dist, "404.html")
      : join(dist, route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`);

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
  return target;
};

const buildPage = (route) => {
  const { html, head } = render(route);
  const preloads = [fontPreloads, imagePreloadFor(route)].filter(Boolean).join("\n    ");
  return template
    .replace("<!--app-head-->", `${preloads}\n    ${head}`)
    .replace("<!--app-html-->", html);
};

const allRoutes = [...routes, "/404"];

for (const route of allRoutes) {
  write(route, buildPage(route));
}

console.log(`  Prerendered ${allRoutes.length} routes.`);

/* ----------------------------- sitemap ---------------------------- */

const site = JSON.parse(readFileSync(join(root, "content/settings/site.json"), "utf8"));
const origin = site.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const priorityFor = (route) => {
  if (route === "/") return "1.0";
  if (route === "/join" || route === "/projects" || route === "/events") return "0.8";
  return "0.6";
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) =>
    [
      "  <url>",
      // Trailing slash matches what Cloudflare Pages actually serves; the
      // bare form 308-redirects, and a sitemap of redirects is a wasted crawl.
      `    <loc>${origin}${route === "/" ? "/" : `${route}/`}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <priority>${priorityFor(route)}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(dist, "sitemap.xml"), sitemap, "utf8");

writeFileSync(
  join(dist, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "",
    "# The CMS is a client-side app behind GitHub auth; there is nothing to index.",
    "Disallow: /admin",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n"),
  "utf8",
);

console.log("  Wrote sitemap.xml and robots.txt.");

/* --------------------------- tidy up ------------------------------ */

if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true });
}
