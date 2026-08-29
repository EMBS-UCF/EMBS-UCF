import { useEffect, useState } from "react";
import {
  calendarIsConfigured,
  calendarStateOverride,
  calendarUsesMockData,
  fetchUpcomingEvents,
  type CalendarState,
} from "@/lib/calendar";

/**
 * Calendar data is fetched after mount, never during render, so the
 * prerendered HTML stays deterministic and a Google outage degrades to a
 * message rather than an empty page.
 *
 * In development this can serve fixtures instead, and `?calendar=error`
 * (or `empty` / `loading` / `ready`) forces a single branch. Both paths
 * compile away in a production build.
 */
export function useCalendarEvents(limit: number): CalendarState {
  const [state, setState] = useState<CalendarState>(() =>
    calendarIsConfigured() || calendarUsesMockData()
      ? { status: "loading" }
      : { status: "unconfigured" },
  );

  useEffect(() => {
    // Everything in this block is compiled out of a production build:
    // `import.meta.env.DEV` folds to false and Rollup drops the branch,
    // taking the fixtures and the state overrides with it.
    if (import.meta.env.DEV) {
      const override = calendarStateOverride();

      if (override === "loading") return;
      if (override === "error") {
        setState({ status: "error", message: "Forced by ?calendar=error" });
        return;
      }
      if (override === "empty") {
        setState({ status: "ready", events: [] });
        return;
      }

      if (calendarUsesMockData()) {
        let cancelled = false;
        // A short delay so the loading skeleton is actually visible rather
        // than flashing past on a local machine.
        const id = setTimeout(() => {
          if (cancelled) return;
          void import("@/lib/calendarFixtures").then(({ mockEvents }) => {
            if (!cancelled) setState({ status: "ready", events: mockEvents(limit) });
          });
        }, 400);
        return () => {
          cancelled = true;
          clearTimeout(id);
        };
      }
    }

    if (!calendarIsConfigured()) return;

    const controller = new AbortController();

    fetchUpcomingEvents(limit, controller.signal)
      .then((events) => setState({ status: "ready", events }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      });

    return () => controller.abort();
  }, [limit]);

  return state;
}
