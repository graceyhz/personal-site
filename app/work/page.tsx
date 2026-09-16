import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Publications } from "@/components/publications";
import { WorkGroups } from "@/components/work-groups";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "work",
  description: "Research, projects, and work — with links.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <Container className="pt-24 sm:pt-32">
      <h1 className="text-3xl lowercase sm:text-4xl">work</h1>
      <div className="mt-12">
        <Publications />
      </div>
      <WorkGroups projects={projects} />
    </Container>
  );
}
