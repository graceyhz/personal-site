import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ProjectLinks } from "@/components/project-links";
import { StackChip } from "@/components/stack-chip";
import { getProject, getProjectBody, projectSlugs } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: `/work/${slug}` },
    openGraph: project.cover ? { images: [project.cover.src] } : undefined,
  };
}

/* FR-07: what it is, approach, stack, outcome, links, screenshot where one exists. */
export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  if (!project) notFound();
  const Body = await getProjectBody(slug);

  return (
    <Container className="pt-24 sm:pt-32">
      <article className="max-w-[68ch]">
        <p className="font-mono text-xs lowercase text-ink-muted">
          <Link href="/work" className="transition-colors duration-150 hover:text-accent-text">
            work
          </Link>{" "}
          / {project.category}
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl">{project.title}</h1>
        <p className="mt-3 font-mono text-xs text-ink-muted">
          {project.org ? `${project.org} · ` : ""}
          {project.period}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s}>
              <StackChip>{s}</StackChip>
            </li>
          ))}
        </ul>
        <ProjectLinks links={project.links} className="mt-4" />

        {project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 768px) 68ch, 100vw"
            className="mt-10 h-auto w-full"
            priority
          />
        )}

        <div className="prose mt-10">
          <Body />
        </div>

        <section className="mt-12 rounded-card bg-surface p-6" aria-labelledby="outcome">
          <h2 id="outcome" className="text-sm lowercase text-ink-muted">
            outcome
          </h2>
          <p className="mt-2">{project.outcome}</p>
        </section>
      </article>
    </Container>
  );
}
