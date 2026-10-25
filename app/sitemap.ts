import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const pages = ["", "/work", "/arts", "/arts/visual", "/arts/performing", "/about"];

// Every public page, plus project pages that are switched on (`page: true`)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectPages = (await getProjects())
    .filter((p) => p.page)
    .map((p) => `/work/${p.slug}`);
  return [...pages, ...projectPages].map((path) => ({ url: `${site.url}${path}` }));
}
