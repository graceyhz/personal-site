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

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/* Sort key from the end of `period` ("Feb – May 2026", "Jun 2026 – present"):
   ongoing entries first, then by the last month and year mentioned. */
function periodEnd(period: string): number {
  if (/present/i.test(period)) return Infinity;
  const year = Number(period.match(/\d{4}(?!.*\d{4})/)?.[0] ?? 0);
  const months = (period.toLowerCase().match(/[a-z]{3}/g) ?? [])
    .map((w) => MONTHS.indexOf(w))
    .filter((m) => m >= 0);
  return year * 12 + (months.at(-1) ?? 0);
}

/* Newest first */
export const getProjects = cache(async (): Promise<Project[]> => {
  const projects = await Promise.all(projectSlugs().map(getProject));
  return projects.sort((a, b) => periodEnd(b.period) - periodEnd(a.period));
});

export async function getProjectBody(slug: string) {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  return mod.default as React.ComponentType;
}
