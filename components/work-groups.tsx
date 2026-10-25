import { ProjectRow } from "@/components/project-row";
import type { Project } from "@/content/schema";
import { groups } from "@/lib/categories";

/* FR-05: grouped by category */
export function WorkGroups({ projects }: { projects: Project[] }) {
  return (
    <>
      {groups.map(({ id, label, categories }) => {
        const group = projects.filter((p) => categories.includes(p.category));
        if (group.length === 0) return null;
        return (
          <section key={id} id={id} className="mt-16 scroll-mt-8" aria-labelledby={`group-${id}`}>
            <h2 id={`group-${id}`} className="border-b border-border pb-3 text-xl lowercase">
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
