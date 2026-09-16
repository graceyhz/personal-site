import { site } from "@/lib/site";

const links = [
  { href: `mailto:${site.email}`, label: "email" },
  { href: site.github, label: "github" },
  { href: site.linkedin, label: "linkedin" },
] as const;

export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm lowercase ${className}`}>
      {links.map(({ href, label }) => (
        <li key={label}>
          <a
            href={href}
            className="text-ink-muted underline-offset-4 transition-colors duration-150 hover:text-accent-text hover:underline"
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
