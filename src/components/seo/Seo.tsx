import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { headTagsFor, metaForPath } from "@/lib/seo";

/**
 * Keeps <head> correct across client-side navigation.
 *
 * The prerenderer writes the same tags into the served HTML, so crawlers and
 * link unfurlers (Discord, LinkedIn, iMessage) see the right preview without
 * running JavaScript. This only has to handle what changes after the first
 * paint, so it replaces the managed block wholesale rather than diffing.
 */

const MARKER = "data-managed-head";

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);

    for (const node of document.querySelectorAll(`[${MARKER}]`)) node.remove();

    const holder = document.createElement("div");
    holder.innerHTML = headTagsFor(meta);

    for (const node of Array.from(holder.children)) {
      node.setAttribute(MARKER, "");
      document.head.appendChild(node);
    }

    document.title = meta.title;
  }, [pathname]);

  return null;
}
