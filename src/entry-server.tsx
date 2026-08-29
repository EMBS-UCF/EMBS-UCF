import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { headTagsFor, metaForPath, organizationJsonLd, ALL_STATIC_ROUTES } from "./lib/seo";

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );

  const meta = metaForPath(url);
  const head = [
    headTagsFor(meta),
    `<script type="application/ld+json">${organizationJsonLd()}</script>`,
  ].join("\n    ");

  return { html, head };
}

export const routes = ALL_STATIC_ROUTES;
