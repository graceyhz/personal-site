import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  // Content model lands in M2; until then every slug is a 404.
  void slug;
  notFound();
}
