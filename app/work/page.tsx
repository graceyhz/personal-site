import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader title="work" note="research, jobs & side projects" />
      <div className="mt-16">
        <Publications />
      </div>
      <WorkGroups projects={projects} />
    </Container>
  );
}
