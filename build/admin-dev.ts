import type { Plugin } from "vite";

/**
 * Serves the CMS at `/admin/` during development and preview.
 *
 * Without this, Vite hands `/admin` and `/admin/` to the SPA's history
 * fallback, so the site's own 404 page renders instead of the editor and the
 * only URL that works is the full `/admin/index.html`. That mismatch between
 * local and production is exactly the kind of thing that wastes an afternoon,
 * so it is fixed rather than documented.
 *
 * Registered directly in `configureServer` (not in a returned callback) so it
 * runs ahead of Vite's internal history-fallback middleware.
 */

const REWRITES: Record<string, string> = {
  "/admin": "/admin/index.html",
  "/admin/": "/admin/index.html",
  "/admin/preview": "/admin/preview/index.html",
  "/admin/preview/": "/admin/preview/index.html",
};

export function adminDevPlugin(): Plugin {
  const middleware = (
    req: { url?: string | undefined },
    _res: unknown,
    next: () => void,
  ) => {
    const [path] = (req.url ?? "").split("?");
    const target = path ? REWRITES[path] : undefined;
    if (target) req.url = target;
    next();
  };

  return {
    name: "embs:admin-dev",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
