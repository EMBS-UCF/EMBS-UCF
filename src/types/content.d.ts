declare module "*.md" {
  export const frontmatter: Record<string, unknown>;
  const mod: { frontmatter: Record<string, unknown> };
  export default mod;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY?: string;
  readonly VITE_GOOGLE_CALENDAR_ID?: string;
  /** Names used by the previous version of the site; still honoured. */
  readonly VITE_APP_GOOGLE_API_KEY?: string;
  readonly VITE_APP_GOOGLE_CALENDAR_ID?: string;
  readonly VITE_CALENDAR_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
