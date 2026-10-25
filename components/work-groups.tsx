import { ProjectRow } from "@/components/project-row";
import { SectionHeading } from "@/components/section-heading";
import type { Project } from "@/content/schema";
import { groups } from "@/lib/categories";

/* FR-05: grouped by category */
export function WorkGroups({ projects }: { projects: Project[] }) {
  return (
    <>
      {groups.map(({ id, label, note, categories }) => {
        const group = projects.filter((p) => categories.includes(p.category));
        if (group.length === 0) return null;
        return (
          <section key={id} id={id} className="mt-20 scroll-mt-8" aria-labelledby={`group-${id}`}>
            <SectionHeading id={`group-${id}`} title={label} note={note} />
            <ul className="divide-y divide-border border-t border-border">
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
