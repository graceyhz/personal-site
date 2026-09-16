import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { ProjectRow } from "@/components/project-row";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function Home() {
  // FR-04: exactly three featured projects
  const featured = (await getProjects()).filter((p) => p.featured).slice(0, 3);

  return (
    <Container>
      {/* FR-02, FR-03: hero with name, positioning line, short bio, contact above the fold */}
      <section className="fade-up pt-24 sm:pt-32">
        <h1 className="text-3xl font-medium sm:text-4xl">{site.name}</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-ink-muted">
          {site.description}
        </p>
        <ContactLinks className="mt-8" />
      </section>

      <section className="mt-24 sm:mt-32" aria-labelledby="featured">
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <h2 id="featured" className="text-xl lowercase">
            featured
          </h2>
          <Link
            href="/work"
            className="text-sm lowercase text-ink-muted transition-colors duration-150 hover:text-accent-text"
          >
            all work →
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      </section>
    </Container>
  );
}
