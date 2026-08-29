export type ClassValue = string | number | false | null | undefined;

/** Minimal class joiner. No dependency needed for what this site does. */
export const cn = (...parts: ClassValue[]): string =>
  parts.filter((p): p is string | number => Boolean(p)).join(" ");
