"use client";

import Image from "next/image";
import { useState } from "react";

/* FR-10: poster + play button; the YouTube iframe only loads on click. */
export function VideoFacade({
  youtubeId,
  title,
  alt,
}: {
  youtubeId: string;
  title: string;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-surface"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="rounded-card bg-paper/90 px-4 py-2 font-mono text-sm text-ink transition-colors duration-150 group-hover:bg-accent group-hover:text-paper">
          ▶ play
        </span>
      </span>
    </button>
  );
}
