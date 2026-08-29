export interface CtaLink {
  label: string;
  href: string;
}

export interface Person {
  slug: string;
  name: string;
  role: string;
  /** Officers carry a major; advisors carry a department. */
  detail: string;
  photo: string;
  linkedin: string;
  order: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  meeting: string;
  cover: string;
  order: number;
}

export interface SiteSettings {
  name: string;
  chapter: string;
  shortName: string;
  fullName: string;
  tagline: string;
  location: string;
  campus: string;
  /** Year the chapter was chartered. */
  founded: string;
  email: string;
  url: string;
  assetBase: string;
  /** Square image for social cards and the favicon. May be a path or a URL. */
  logo: string;
  /** Small mark for the header and footer, shown at 32px. */
  logoMark: string;
  socials: {
    discord: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  calendar: {
    id: string;
    timezone: string;
    gbmKeyword: string;
    maxUpcoming: number;
  };
}

export interface SeoMeta {
  title: string;
  description: string;
}
