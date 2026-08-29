import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useScrolled } from "@/hooks/useScrolled";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState<string | null>(null);
  const scrolled = useScrolled();
  const { pathname } = useLocation();

  // Navigating away closes the drawer. Adjusting state during render is the
  // documented way to react to a changed value without an extra render pass.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // The drawer covers the page, so the content underneath must not scroll
  // and Escape must close it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "border-line bg-canvas/85 backdrop-blur-lg"
          : "border-transparent bg-transparent",
      )}
    >
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${site.shortName} — home`}
          >
            <img
              src={site.logo}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                {site.name}
              </span>
              <span className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
                {site.chapter}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive
                      ? "text-ink"
                      : "text-muted hover:bg-surface-raised hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink to="/join" size="md" className="hidden sm:inline-flex">
              Join
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-9 place-items-center rounded-full border border-line text-muted lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden sm:top-18"
        >
          <Container width="wide">
            <nav aria-label="Mobile" className="flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-line py-4 font-display text-2xl transition-colors",
                      isActive ? "text-accent-text" : "text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <ButtonLink to="/join" size="lg" className="mt-6 w-full">
                Join the chapter
              </ButtonLink>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
