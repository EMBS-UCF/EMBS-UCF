import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Seo } from "@/components/seo/Seo";
import { useReveal } from "@/hooks/useReveal";

export function RootLayout() {
  const { pathname } = useLocation();

  // Router does not reset scroll between routes, and landing halfway down a
  // new page is disorienting.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useReveal([pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Seo />
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
