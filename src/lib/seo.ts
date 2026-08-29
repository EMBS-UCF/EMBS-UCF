import { site, homeCopy, joinCopy, eventsCopy, contactCopy } from "@/content";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Absolute URL to the social preview image. */
  image: string;
  type: "website" | "article";
  noindex?: boolean;
}

/**
 * Cloudflare Pages serves directory-style output and 308-redirects `/join` to
 * `/join/`. Canonical tags, og:url and the sitemap must therefore all carry the
 * trailing slash, or every one of them points at a redirect.
 */
const absolute = (path: string): string => {
  const clean = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  return new URL(clean, site.url).toString();
};

const DEFAULT_IMAGE = new URL(site.logo, site.url).toString();

/** Appends the chapter name unless the page is the home page. */
export const pageTitle = (title: string, isHome = false): string =>
  isHome ? `${site.shortName} — ${site.tagline}` : `${title} · ${site.shortName}`;

export function metaForPath(path: string): PageMeta {
  const clean = path.replace(/\/+$/, "") || "/";

  if (clean === "/") {
    return {
      title: pageTitle(homeCopy.seo.title, true),
      description: homeCopy.seo.description,
      path: "/",
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  if (clean === "/projects") {
    return {
      title: pageTitle("Projects"),
      description:
        "The hardware teams running at IEEE EMBS UCF — a student-built oxygen concentrator and an EEG acquisition stack built from the electrodes up.",
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }


  if (clean === "/events") {
    return {
      title: pageTitle(eventsCopy.seo.title),
      description: eventsCopy.seo.description,
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  if (clean === "/officers") {
    return {
      title: pageTitle("Officers"),
      description:
        "The officers and faculty advisor running IEEE EMBS at the University of Central Florida.",
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  if (clean === "/resources") {
    return {
      title: pageTitle("Resources"),
      description:
        "Coursework, scholarships, research placements, and career resources for biomedical engineering students at UCF.",
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  if (clean === "/join") {
    return {
      title: pageTitle(joinCopy.seo.title),
      description: joinCopy.seo.description,
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  if (clean === "/contact") {
    return {
      title: pageTitle(contactCopy.seo.title),
      description: contactCopy.seo.description,
      path: clean,
      image: DEFAULT_IMAGE,
      type: "website",
    };
  }

  return {
    title: pageTitle("Page not found"),
    description: "That page does not exist.",
    path: clean,
    image: DEFAULT_IMAGE,
    type: "website",
    noindex: true,
  };
}

/** Head tags as data, so the prerenderer and the client emit identical markup. */
export function headTagsFor(meta: PageMeta): string {
  const url = absolute(meta.path);
  const esc = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : "",
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(site.shortName)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
  ];

  return tags.filter(Boolean).join("\n    ");
}

export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${site.url}/#organization`,
    name: site.fullName,
    alternateName: site.shortName,
    url: site.url,
    logo: DEFAULT_IMAGE,
    foundingDate: site.founded,
    email: site.email,
    description: homeCopy.seo.description,
    parentOrganization: {
      "@type": "Organization",
      name: "University of Central Florida",
      url: "https://www.ucf.edu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs: Object.values(site.socials).filter(Boolean),
  });
}

export const ALL_STATIC_ROUTES: string[] = [
  "/",
  "/projects",
  "/events",
  "/officers",
  "/resources",
  "/join",
  "/contact",
];
