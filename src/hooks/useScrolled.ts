import { useSyncExternalStore } from "react";

/** True once the page has scrolled past `threshold` pixels. */

const THRESHOLD = 8;

const listeners = new Set<() => void>();
let snapshot = false;
let attached = false;

const read = () => window.scrollY > THRESHOLD;

function onScroll(): void {
  const next = read();
  if (next === snapshot) return;
  snapshot = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (!attached) {
    attached = true;
    snapshot = read();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      attached = false;
    }
  };
}

const getSnapshot = (): boolean => snapshot;
const getServerSnapshot = (): boolean => false;

export function useScrolled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
