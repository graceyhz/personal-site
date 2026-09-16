import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <Container>
      {/* FR-02, FR-03: hero with name, positioning line, short bio, contact above the fold */}
      <section className="fade-up pt-24 sm:pt-32">
        <h1 className="text-3xl font-medium sm:text-4xl">{site.name}</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-ink-muted">
          {site.description}
        </p>
        <p className="mt-6 max-w-[60ch]">
          Besides technical work, I also like to draw and dance!
        </p>
        <ContactLinks className="mt-8" />
      </section>

      {/* FR-04: featured projects — populated in M2 */}
      <section className="mt-24 sm:mt-32">
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="text-xl lowercase">featured</h2>
          <Link
            href="/work"
            className="text-sm lowercase text-ink-muted transition-colors duration-150 hover:text-accent-text"
          >
            all work →
          </Link>
        </div>
      </section>
    </Container>
  );
}
