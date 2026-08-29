import matter from "gray-matter";
import { Marked } from "marked";
import type { Plugin } from "vite";

/**
 * Turns `.md` files into ES modules at build time.
 *
 * Frontmatter is parsed and Markdown is rendered to HTML here, in Node, so the
 * browser bundle never carries a Markdown parser. Officers editing content in
 * the CMS write Markdown; the site only ever sees finished HTML.
 */

const marked = new Marked({ gfm: true, breaks: false });

marked.use({
  renderer: {
    link({ href, title, text }) {
      const external = /^https?:\/\//.test(href);
      const attrs = [
        `href="${href}"`,
        title ? `title="${title}"` : "",
        external ? 'target="_blank" rel="noopener noreferrer"' : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `<a ${attrs}>${text}</a>`;
    },
    image({ href, title, text }) {
      const attrs = [
        `src="${href}"`,
        `alt="${text ?? ""}"`,
        title ? `title="${title}"` : "",
        'loading="lazy"',
        'decoding="async"',
      ]
        .filter(Boolean)
        .join(" ");
      return `<img ${attrs} />`;
    },
  },
});

export function markdownPlugin(): Plugin {
  return {
    name: "embs:markdown",
    enforce: "pre",

    async transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const { data, content } = matter(code);
      const html = await marked.parse(content);
      const plain = content
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[#*_`>~-]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return {
        code: [
          `export const frontmatter = ${JSON.stringify(data)};`,
          `export const html = ${JSON.stringify(html)};`,
          `export const raw = ${JSON.stringify(content)};`,
          `export const plain = ${JSON.stringify(plain)};`,
          `export default { frontmatter, html, raw, plain };`,
        ].join("\n"),
        map: null,
      };
    },
  };
}
