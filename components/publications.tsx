import { publications } from "@/content/publications";

/* FR-08 / §6.3: real citations, one click to the paper. */
export function Publications() {
  return (
    <section aria-labelledby="publications">
      <h2 id="publications" className="border-b border-border pb-3 text-xl lowercase">
        publications
      </h2>
      <ol className="divide-y divide-border">
        {publications.map((p) => (
          <li key={p.doi} className="py-5">
            <p className="max-w-[68ch]">
              <span className="text-ink-muted">{p.authors}</span>{" "}
              <span className="font-medium">{p.title}.</span>{" "}
              <span className="text-ink-muted">
                <em>{p.venue}</em>, {p.year}.
              </span>
            </p>
            <ul className="mt-2 flex gap-4 text-sm lowercase">
              <li>
                <a
                  href={p.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text underline-offset-4 transition-colors duration-150 hover:underline"
                >
                  doi ↗
                </a>
              </li>
              {p.pdf && (
                <li>
                  <a
                    href={p.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-text underline-offset-4 transition-colors duration-150 hover:underline"
                  >
                    pdf ↗
                  </a>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
