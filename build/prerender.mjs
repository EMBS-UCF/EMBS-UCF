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

import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const serverDir = join(dist, "server");

const { render, routes } = await import(join(serverDir, "entry-server.js"));

const template = readFileSync(join(dist, "index.html"), "utf8");

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
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
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
