import type { Category } from "@/content/schema";

/* §6.2: category drives the /work sections, in this order. */
export const categories: { key: Category; label: string }[] = [
  { key: "research", label: "research" },
  { key: "project", label: "projects" },
  { key: "work", label: "work" },
];
