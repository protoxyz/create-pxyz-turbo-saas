"use client";

import { api } from "@/lib/api";
import { Divider } from "../../divider";
import { Heading, Text } from "../../typography";
import { DeleteProjectButton } from "./delete-button";
import { EditProjectButton } from "./edit-button";

export function ProjectDetails({ projectId }: { projectId: string }) {
  const query = api.project.get.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const project = query.data;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="relative">
      <div className=" absolute right-0 top-0 flex flex-col gap-3">
        <EditProjectButton project={project} />
        <DeleteProjectButton projectId={projectId} />
      </div>

      <Heading className="mt-5">{project.name}</Heading>

      <Divider className="my-5" />

      <Text>{project.description}</Text>
    </div>
  );
}
