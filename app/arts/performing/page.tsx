import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Gallery } from "@/components/gallery";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { VideoFacade } from "@/components/video-facade";
import type { PerformingEntry } from "@/content/arts";
import { getPerforming, getPerformingPhotos } from "@/lib/arts";

export const metadata: Metadata = {
  title: "performing arts",
  description: "Dance, in photos and on video.",
  alternates: { canonical: "/arts/performing" },
};

const videoSections = [
  { kind: "choreography", heading: "check out some of my choreography!" },
  { kind: "danced", heading: "check out some of the dances i’ve performed in!" },
] as const;

function Video({ p }: { p: PerformingEntry }) {
  return (
    <li className="min-w-0">
      <VideoFacade youtubeId={p.youtubeId} title={p.title} alt={p.alt} />
      <h3 className="mt-4 text-lg">{p.title}</h3>
      <p className="font-mono text-xs text-ink-muted">
        {[p.medium, p.year].filter(Boolean).join(" · ")}
      </p>
      {p.role && <p className="mt-1 text-sm text-ink-muted">{p.role}</p>}
      {p.note && <p className="mt-2 max-w-[60ch] text-ink-muted">{p.note}</p>}
      <a
        href={`https://www.youtube.com/watch?v=${p.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm lowercase text-accent-text underline-offset-4 hover:underline"
      >
        watch on youtube ↗
      </a>
    </li>
  );
}

export default function PerformingArtsPage() {
  const pieces = getPerforming();
  const photos = getPerformingPhotos();
  return (
    <Container className="pt-24 sm:pt-32">
      <PageHeader title="performing" note="a variety of dance styles!" />
      {videoSections.map(({ kind, heading }) => {
        const videos = pieces.filter((p) => p.kind === kind);
        if (videos.length === 0) return null;
        return (
          <section key={kind} className="mt-16" aria-labelledby={`videos-${kind}`}>
            <SectionHeading id={`videos-${kind}`} title={heading} />
            <ul className="grid gap-12 md:grid-cols-2">
              {videos.map((p) => (
                <Video key={p.youtubeId} p={p} />
              ))}
            </ul>
          </section>
        );
      })}
      {photos.length > 0 && (
        <section className="mt-20" aria-labelledby="photos">
          <SectionHeading id="photos" title="photos from the stage" />
          <Gallery pieces={photos} columns="columns-2 md:columns-3 lg:columns-4" />
        </section>
      )}
    </Container>
  );
}
