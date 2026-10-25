import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "about",
  description: "How I got here and what I'm interested in.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <PageHeader title="about" note="the longer story" />
    </Container>
  );
}
