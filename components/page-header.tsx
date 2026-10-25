/* Sketchbook page title: a handwritten margin note above the h1. */
export function PageHeader({ title, note }: { title: string; note?: string }) {
  return (
    <header>
      {note && (
        <p className="origin-left -rotate-2 font-hand text-2xl text-pen">{note}</p>
      )}
      <h1 className="mt-2 text-4xl lowercase sm:text-6xl">{title}</h1>
    </header>
  );
}
