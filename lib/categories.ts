import type { Category } from "@/content/schema";

/* §6.2: category drives the /work sections, in this order. `id` is the
   anchor the homepage links to (/work#experience). */
export const groups: { id: string; label: string; categories: Category[] }[] = [
  { id: "experience", label: "experience", categories: ["research", "work"] },
  { id: "projects", label: "projects", categories: ["project"] },
];
