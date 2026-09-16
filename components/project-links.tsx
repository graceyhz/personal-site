import type { Project } from "@/content/schema";

const order = ["repo", "paper", "demo", "poster", "writeup"] as const;

export function ProjectLinks({
  links,
  className = "",
}: {
  links: Project["links"];
  className?: string;
}) {
  if (!links) return null;
  const entries = order.filter((k) => links[k]);
  if (entries.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 text-sm lowercase ${className}`}>
      {entries.map((k) => (
        <li key={k}>
          <a
            href={links[k]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text underline-offset-4 transition-colors duration-150 hover:underline"
          >
            {k} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
