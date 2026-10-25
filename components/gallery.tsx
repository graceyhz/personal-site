"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Polaroid } from "@/components/polaroid";
import type { PhotoPiece } from "@/lib/arts";

/* FR-09: responsive grid → lightbox. The native <dialog> handles the focus
   trap, Esc, and returning focus to the thumbnail that opened it (§10). */
export function Gallery({
  pieces,
  columns = "columns-2 md:columns-3",
}: {
  pieces: PhotoPiece[];
  columns?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  function step(delta: number) {
    setIndex((i) => (i === null ? i : (i + delta + pieces.length) % pieces.length));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  const current = index === null ? null : pieces[index];

  return (
    <>
      <ul className={`${columns} gap-6 pt-3 [&>li]:mb-9 [&>li]:break-inside-avoid`}>
        {pieces.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${p.title}`}
              className="group block w-full"
            >
              <Polaroid
                index={i}
                caption={`${p.title}${p.year ? ` · ${p.year}` : ""}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full"
                />
              </Polaroid>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        aria-label={current ? current.title : "Artwork"}
        className="m-auto max-h-[100dvh] w-full max-w-5xl bg-paper p-4 text-ink backdrop:bg-ink/80 sm:p-6"
      >
        {current && (
          <div className="flex flex-col gap-4">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              // w-auto leaves a lazy image 0×0 until it loads, so it never would
              loading="eager"
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="max-h-[75dvh] w-auto max-w-full self-center object-contain"
            />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg">{current.title}</p>
                <p className="font-mono text-xs text-ink-muted">
                  {current.medium}
                  {current.year ? ` · ${current.year}` : ""}
                </p>
                {current.note && (
                  <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">{current.note}</p>
                )}
              </div>
              <div className="flex gap-2 text-sm lowercase">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous"
                  className="rounded-chip border border-border px-3 py-1 transition-colors duration-150 hover:border-accent"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next"
                  className="rounded-chip border border-border px-3 py-1 transition-colors duration-150 hover:border-accent"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(null)}
                  className="rounded-chip border border-border px-3 py-1 transition-colors duration-150 hover:border-accent"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
