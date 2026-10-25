import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { VideoFacade } from "@/components/video-facade";
import type { Project } from "@/content/schema";
import { getPerforming, getPerformingPhotos, getVisual } from "@/lib/arts";
import { groups } from "@/lib/categories";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

/* Sketchbook homepage: a short overview, each section linking to its full page. */

// Tilt and tape color per project card, cycled
const cardStyles = [
  { tilt: "-rotate-1", tape: "bg-[#bfd3e8]", tapeAt: "left-[40%] rotate-[4deg]" },
  { tilt: "rotate-[0.8deg]", tape: "bg-[#d3d1ef]", tapeAt: "left-[20%] -rotate-[3deg]" },
  { tilt: "-rotate-[0.6deg]", tape: "bg-[#c4ddd9]", tapeAt: "left-[55%] rotate-[2deg]" },
];

function inGroup(projects: Project[], id: string) {
  const categories = groups.find((g) => g.id === id)?.categories ?? [];
  return projects.filter((p) => categories.includes(p.category));
}

export default async function Home() {
  const projects = await getProjects();
  const experience = inGroup(projects, "experience").slice(0, 3);
  const builds = inGroup(projects, "projects").slice(0, 3);
  // Two visual pieces and one dance photo, each linking to its gallery
  const artTiles = [
    ...getVisual()
      .slice(0, 2)
      .map((p) => ({ ...p, href: "/arts/visual" })),
    ...getPerformingPhotos()
      .slice(0, 1)
      .map((p) => ({ ...p, href: "/arts/performing" })),
  ];
  const performance = getPerforming()[0];

  return (
    <Container>
      {/* FR-02, FR-03: hero with name, positioning line, contact above the fold */}
      <section className="fade-up pt-20 pb-24 sm:pt-28 sm:pb-28">
        <p className="origin-left -rotate-2 font-hand text-2xl text-pen sm:text-3xl">
          hi! welcome to my digital sketchbook~
        </p>
        <h1 className="mt-6 max-w-[16ch] text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          I’m {site.name.split(" ")[0]}, a CS student at Penn who builds with{" "}
          <span className="relative inline-block px-2">
            AI/ML
            <svg
              aria-hidden="true"
              viewBox="0 0 200 90"
              preserveAspectRatio="none"
              className="absolute -left-[6%] -top-[12%] h-[124%] w-[112%] overflow-visible text-pen"
            >
              <path
                d="M12 48 C 10 14, 120 2, 182 20 C 206 30, 198 72, 140 82 C 80 92, 6 80, 14 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>{" "}
          and draws &amp; dances on the side.
        </h1>
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm text-paper transition-colors duration-150 hover:bg-accent-text"
        >
          let's chat!
        </a>
      </section>

      {experience.length > 0 && (
        <section aria-labelledby="home-experience" className="pb-24">
          <SectionHeading
            id="home-experience"
            title="experience"
            note=""
            href="/work#experience"
            linkLabel="all work"
          />
          <ul className="border-t-[1.5px] border-dashed border-ink">
            {experience.map((p) => (
              <li key={p.slug} className="border-b-[1.5px] border-dashed border-ink">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex flex-col gap-2 py-7 sm:flex-row sm:gap-8"
                >
                  <span className="font-hand text-2xl leading-tight text-pen sm:w-48 sm:shrink-0">
                    {p.period}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-display text-lg font-medium transition-colors duration-150 group-hover:text-accent-text">
                      {p.title}
                    </span>
                    {p.org && <span className="text-sm text-ink-muted">{p.org}</span>}
                    <span className="max-w-[68ch]">{p.blurb}</span>
                    <span className="font-mono text-xs text-ink-muted">
                      {p.stack.join(" · ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {builds.length > 0 && (
        <section aria-labelledby="home-projects" className="pb-24">
          <SectionHeading
            id="home-projects"
            title="projects"
            note=""
            href="/work#projects"
            linkLabel="all projects"
          />
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((p, i) => {
              const s = cardStyles[i % cardStyles.length];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className={`relative flex h-full flex-col gap-3 border-[1.5px] border-ink bg-paper px-6 pt-7 pb-6 shadow-[4px_4px_0_var(--ink)] transition-transform duration-150 hover:-translate-y-0.5 ${s.tilt}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -top-3 h-6 w-20 opacity-90 ${s.tape} ${s.tapeAt}`}
                    />
                    <span className="font-hand text-xl text-pen">{p.period}</span>
                    <span className="font-display text-xl font-medium">{p.title}</span>
                    <span className="text-sm">{p.blurb}</span>
                    <span className="font-mono text-xs text-ink-muted">
                      {p.stack.join(" · ")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {(artTiles.length > 0 || performance) && (
        <section aria-labelledby="home-arts" className="pb-16">
          <SectionHeading
            id="home-arts"
            title="arts"
            note=""
            href="/arts"
            linkLabel="see all arts"
          />
          <ul className="flex flex-wrap items-start gap-8">
            {artTiles.map((v, i) => (
              <li key={v.src} className={`min-w-0 flex-[1_1_220px] sm:max-w-xs ${i === 1 ? "sm:mt-12" : ""}`}>
                <Link href={v.href} className="block border-[1.5px] border-ink">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    width={v.width}
                    height={v.height}
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="h-auto w-full"
                  />
                </Link>
                <p className="mt-2 font-hand text-xl text-pen">
                  {[v.title, v.medium.toLowerCase(), v.year].filter(Boolean).join(", ")}
                </p>
              </li>
            ))}
            {performance && (
              <li className="min-w-0 flex-[2_1_400px]">
                <div className="border-[1.5px] border-ink">
                  <VideoFacade
                    youtubeId={performance.youtubeId}
                    title={performance.title}
                    alt={performance.alt}
                  />
                </div>
                <p className="mt-2 font-hand text-xl text-pen">
                  {[performance.title, performance.medium, performance.year]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </li>
            )}
          </ul>
        </section>
      )}

      <p className="font-hand text-3xl text-pen">thanks for flipping through!</p>
    </Container>
  );
}
