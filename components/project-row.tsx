import Link from "next/link";
import { ProjectLinks } from "@/components/project-links";
import { StackChip } from "@/components/stack-chip";
import type { Project } from "@/content/schema";

/* §8.4: list rows, not cards. Title, blurb, period, stack, links, hairline between. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
      <div className="min-w-0">
        <h3 className="text-lg">
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors duration-150 hover:text-accent-text"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 max-w-[68ch] text-ink-muted">{project.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s}>
              <StackChip>{s}</StackChip>
            </li>
          ))}
        </ul>
        <ProjectLinks links={project.links} className="mt-3" />
      </div>
      <p className="font-mono text-xs text-ink-muted sm:pt-1.5 sm:text-right">
        {project.period}
      </p>
    </li>
  );
}
