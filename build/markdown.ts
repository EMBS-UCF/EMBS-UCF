import matter from "gray-matter";
import type { Plugin } from "vite";

/**
 * Turns `.md` files into ES modules at build time.
 *
 * Only frontmatter is exposed. Nothing on the site renders a Markdown body any
 * more — projects, officers and resources are all structured fields — so there
 * is no renderer here and none ships to the browser.
 *
 * The files stay Markdown rather than YAML because the CMS writes them that
 * way, and because it keeps the door open to adding prose later without
 * migrating the content directory.
 */
export function markdownPlugin(): Plugin {
  return {
    name: "embs:markdown",
    enforce: "pre",

    transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const { data } = matter(code);

      return {
        code: `export const frontmatter = ${JSON.stringify(data)};\nexport default { frontmatter };`,
        map: null,
      };
    },
  };
}
