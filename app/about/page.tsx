import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "about",
  description: "How I got here and what I'm interested in.",
  alternates: { canonical: "/about" },
};

// Handwritten "currently…" card beside the text
const currently = [
  { label: "capturing on", value: "sony cyber-shot dsc-p100" },
  { label: "saving up for", value: "a camera of my own" },
  { label: "dancing & drawing", value: "since age 5" },
];

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-accent-text underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-ink"
    >
      {children}
    </Link>
  );
}

export default function AboutPage() {
  return (
    <Container className="pt-24 sm:pt-32">
      <PageHeader title="about" note="the longer story" />

      <div className="mt-12 flex flex-wrap items-start gap-x-16 gap-y-12">
        <div className="min-w-0 flex-[999_1_520px] space-y-6 text-lg leading-relaxed max-w-[62ch]">
          <p>
            Hi, I’m Grace, a CS student at the University of Pennsylvania concentrating in AI! I
            love building things for people (why I joined Hack4Impact &lt;3), and computer science
            has turned out to be an incredible way to do that. I’m especially drawn to machine
            learning for how far it reaches: the same tools can follow birds across hours of
            aviary footage or help explain what drives rent in a city, and I’ve gotten to apply
            them across a few different disciplines already.
          </p>
          <p>
            I’d love to keep going, both in fields I have experience in and in ones I don’t yet.
            I’m a quick learner, and one of my favorite parts of any project is learning more
            about the specific niche that I would be working in.
          </p>
          <p>
            Outside of my technical work, I’m also a very creative and artsy person! I’ve been{" "}
            <InlineLink href="/arts/performing">dancing</InlineLink> and{" "}
            <InlineLink href="/arts/visual">drawing</InlineLink> since I was five. While I
            primarily did ballet, Chinese classical dance, and contemporary, since coming to Penn
            I’ve had the amazing opportunity to explore so many more styles through my dance
            group, Pan-Asian Dance Troupe. And while I did love watercolors, I’ve really taken to
            digital art for its ease and convenience.
          </p>
          <p>
            Lately, I’ve also been getting into{" "}
            <InlineLink href="/arts/visual#photography">photography</InlineLink>! For now, I mostly
            shoot on my digicam (Sony Cyber-shot DSC-P100), but after borrowing a friend’s
            Fujifilm X-T5 for our dance photoshoots, I’m hoping to get a camera of my own and take
            it around the world.
          </p>
          <p>
            If you’re working on something where CS meets a field I haven’t explored yet, I’d love
            to hear about it:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent-text underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </div>

        <aside
          aria-label="Currently"
          className="relative flex-[1_1_260px] rotate-1 border-[1.5px] border-ink bg-paper px-6 pt-8 pb-6 shadow-[4px_4px_0_var(--ink)]"
        >
          <span
            aria-hidden="true"
            className="absolute -top-3 left-[35%] h-6 w-20 rotate-[3deg] bg-[#d3d1ef] opacity-90"
          />
          <p className="font-hand text-3xl text-pen">currently…</p>
          <dl className="mt-4 space-y-3">
            {currently.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-xs lowercase text-ink-muted">{label}</dt>
                <dd className="font-hand text-2xl leading-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Container>
  );
}
