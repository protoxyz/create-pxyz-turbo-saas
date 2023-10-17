"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { admin } from "@/lib/admin";
import { urls } from "@/lib/urls";

export function ProjectDetails({ projectId }: { projectId: string }) {
  const ctx = admin.useContext();
  const query = admin.project.byId.useQuery(
    { id: projectId },
    { enabled: !!projectId },
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
    <div>
      <Link href={urls.admin.projects.root()}>
        <Button variant="secondary" className="m-5">
          <ArrowLeft className="h-5 w-5" />
          Back to Projects
        </Button>
      </Link>

      <div className="border-muted-background flex flex-col justify-between border-b border-t bg-white lg:flex-row">
        <div className="flex items-center gap-5 p-10">
          <div className="text-center lg:text-left">
            <Heading size="h1">{project.name}</Heading>
            <Text>#{project.id}</Text>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5  ">
        <ProfileCard title="Description">
          <Text>{project.description}</Text>
        </ProfileCard>
      </div>
    </div>
  );
}

function ProfileCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Heading size="h2">{title}</Heading>
        </CardTitle>
        <CardContent className=" p-0">{children}</CardContent>
      </CardHeader>
    </Card>
  );
}

function ProfileItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Heading size="h6">{title}</Heading>
      <Text>{children}</Text>
    </div>
  );
}
