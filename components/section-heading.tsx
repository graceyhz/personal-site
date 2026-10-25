import Link from "next/link";

/* Sketchbook section heading: title, an optional handwritten aside, and an
   optional "see all" link pushed to the right. */
export function SectionHeading({
  id,
  title,
  note,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  note?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h2 id={id} className="text-2xl lowercase sm:text-3xl">
        {title}
      </h2>
      {note && <span className="font-hand text-2xl text-pen">{note}</span>}
      {href && (
        <Link
          href={href}
          className="ml-auto text-sm lowercase text-ink-muted underline-offset-4 transition-colors duration-150 hover:text-accent-text hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
