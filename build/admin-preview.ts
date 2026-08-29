import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

/**
 * Publishes the contents of `content/` as JSON for the preview editor.
 *
 * The `/admin/preview/` page runs Sveltia's `test-repo` backend, which keeps
 * its files in the browser's own storage and therefore starts completely
 * empty. An editor with no entries in it is close to useless for checking
 * whether the fields and labels read well, so the page seeds that storage from
 * this endpoint on first load and the collections come up populated with the
 * real projects, officers, and page copy.
 *
 * Only content is exposed, and only what already ships publicly in the built
 * site, so there is nothing here that is not on the live pages anyway.
 */

const ENDPOINT = "/admin/preview/content.json";

interface ContentFile {
  path: string;
  text: string;
}

function collect(dir: string, root: string, out: ContentFile[] = []): ContentFile[] {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      collect(abs, root, out);
    } else if (/\.(md|json|ya?ml)$/.test(entry)) {
      out.push({
        // Forward slashes regardless of platform: these become paths inside
        // the browser's virtual repository.
        path: relative(root, abs).split(/[\\/]/).join("/"),
        text: readFileSync(abs, "utf8"),
      });
    }
  }
  return out;
}

export function adminPreviewPlugin(): Plugin {
  let config: ResolvedConfig;

  const payload = (): string =>
    JSON.stringify({ files: collect(join(config.root, "content"), config.root) });

  const middleware = (
    req: { url?: string | undefined },
    res: { setHeader: (k: string, v: string) => void; end: (body: string) => void },
    next: () => void,
  ) => {
    if ((req.url ?? "").split("?")[0] !== ENDPOINT) return next();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(payload());
  };

  return {
    name: "embs:admin-preview",

    configResolved(resolved) {
      config = resolved;
    },

    configureServer(server) {
      server.middlewares.use(middleware);
    },

    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },

    generateBundle() {
      // The SSR pass writes into dist/server, which the prerenderer deletes.
      if (config.build.ssr) return;
      this.emitFile({
        type: "asset",
        fileName: "admin/preview/content.json",
        source: payload(),
      });
    },
  };
}
