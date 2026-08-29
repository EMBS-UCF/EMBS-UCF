declare module "*.md" {
  export const frontmatter: Record<string, unknown>;
  const mod: { frontmatter: Record<string, unknown> };
  export default mod;
}
