import { readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { projectMetaSchema, type Project } from "@/content/schema";

const dir = path.join(process.cwd(), "content", "projects");

export function projectSlugs(): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

/* Loads one entry's exported `meta` and validates it. A malformed file
   throws here, which fails `next build` (G6, §9). */
export const getProject = cache(async (slug: string): Promise<Project> => {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  const parsed = projectMetaSchema.safeParse(mod.meta);
  if (!parsed.success) {
    throw new Error(
      `content/projects/${slug}.mdx has invalid meta:\n${parsed.error.message}`,
    );
  }
  return { slug, ...parsed.data };
});

export const getProjects = cache(async (): Promise<Project[]> => {
  return Promise.all(projectSlugs().map(getProject));
});

export async function getProjectBody(slug: string) {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  return mod.default as React.ComponentType;
}
