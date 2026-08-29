import { useEffect } from "react";

/**
 * Reveals `.reveal` elements as they scroll into view.
 *
 * Two details matter here:
 *
 * 1. Pages arrive prerendered, so their content is already painted and
 *    visible. Marking everything hidden and then animating it back in would
 *    flash. Elements already within the viewport are therefore marked visible
 *    immediately and never hidden — only off-screen elements get the pending
 *    state and the transition.
 *
 * 2. The hidden state lives behind `[data-reveal="pending"]`, which only this
 *    code sets. If it never runs — JavaScript disabled, script blocked — the
 *    page stays fully readable rather than blank.
 */
export function useReveal(deps: unknown[] = []): void {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not([data-reveal])"),
    );

    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      for (const node of nodes) node.dataset.reveal = "visible";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.reveal = "visible";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const viewportHeight = window.innerHeight;

    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      const onScreen = rect.top < viewportHeight && rect.bottom > 0;

      if (onScreen) {
        // Already painted. Leave it alone.
        node.dataset.reveal = "visible";
        continue;
      }

      node.dataset.reveal = "pending";
      observer.observe(node);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
