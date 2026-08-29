declare module "*.md" {
  export const frontmatter: Record<string, unknown>;
  export const html: string;
  export const raw: string;
  export const plain: string;
  const mod: {
    frontmatter: Record<string, unknown>;
    html: string;
    raw: string;
    plain: string;
  };
  export default mod;
}
