import { useSyncExternalStore } from "react";

/**
 * Current time as an external store, so a ticking component does not have to
 * call setState from inside an effect.
 *
 * One interval is shared by every subscriber, which also keeps multiple
 * countdowns on a page visually in step.
 */

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let snapshot = 0;

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (timer === undefined) {
    snapshot = Date.now();
    timer = setInterval(() => {
      snapshot = Date.now();
      for (const l of listeners) l();
    }, 1000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

function getSnapshot(): number {
  if (snapshot === 0) snapshot = Date.now();
  return snapshot;
}

const getServerSnapshot = (): null => null;

export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
