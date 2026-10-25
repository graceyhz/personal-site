import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Gallery } from "@/components/gallery";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { getVisual } from "@/lib/arts";

export const metadata: Metadata = {
  title: "visual arts",
  description: "Drawing, illustration & photography.",
  alternates: { canonical: "/arts/visual" },
};

const sections = [
  { kind: "drawing", title: "drawing & illustration", note: "" },
  { kind: "photography", title: "photography", note: "" },
] as const;

export default function VisualArtsPage() {
  const pieces = getVisual();
  return (
    <Container className="pt-24 sm:pt-32">
      <PageHeader title="visual" note="things I made with my hands (and a camera)" />
      {sections.map(({ kind, title, note }) => {
        const group = pieces.filter((p) => p.kind === kind);
        if (group.length === 0) return null;
        return (
          <section key={kind} id={kind} className="mt-16" aria-labelledby={`visual-${kind}`}>
            <SectionHeading id={`visual-${kind}`} title={title} note={note} />
            <Gallery pieces={group} />
          </section>
        );
      })}
    </Container>
  );
}
