import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "arts",
  description: "Visual and performing arts.",
  alternates: { canonical: "/arts" },
};

const sections = [
  { href: "/arts/visual", label: "visual", blurb: "Drawings and digital work." },
  { href: "/arts/performing", label: "performing", blurb: "Dance, on video." },
] as const;

export default function ArtsPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">arts</h1>
      <ul className="mt-12 divide-y divide-border border-y border-border">
        {sections.map(({ href, label, blurb }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-baseline justify-between py-6 transition-colors duration-150 hover:text-accent-text"
            >
              <span className="font-display text-xl lowercase">{label}</span>
              <span className="text-sm text-ink-muted">{blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
