import { Metadata } from "next";
import { prisma } from "@acme/db";

import { ProjectDetails } from "@/components/admin/projects/details";

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    select: { name: true },
  });

  return {
    title: `${project?.name} | Projects | Admin`,
  };
}

export default function AdminUsersPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <ProjectDetails projectId={params.projectId} />;
}
