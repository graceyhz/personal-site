import { ProjectRow } from "@/components/project-row";
import type { Project } from "@/content/schema";
import { categories } from "@/lib/categories";

/* FR-05: grouped by category */
export function WorkGroups({ projects }: { projects: Project[] }) {
  return (
    <>
      {categories.map(({ key, label }) => {
        const group = projects.filter((p) => p.category === key);
        if (group.length === 0) return null;
        return (
          <section key={key} className="mt-16" aria-labelledby={`group-${key}`}>
            <h2 id={`group-${key}`} className="border-b border-border pb-3 text-xl lowercase">
              {label}
            </h2>
            <ul className="divide-y divide-border">
              {group.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
