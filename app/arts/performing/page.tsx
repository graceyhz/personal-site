import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "performing arts",
  description: "Dance, on video.",
  alternates: { canonical: "/arts/performing" },
};

export default function PerformingArtsPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">performing</h1>
    </Container>
  );
}
