import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "work",
  description: "Research, projects, and work — with links.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">work</h1>
    </Container>
  );
}
