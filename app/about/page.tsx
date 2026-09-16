import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "about",
  description: "How I got here and what I'm interested in.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">about</h1>
    </Container>
  );
}
