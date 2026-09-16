import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "visual arts",
  description: "Drawings and digital work.",
  alternates: { canonical: "/arts/visual" },
};

export default function VisualArtsPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">visual</h1>
    </Container>
  );
}
