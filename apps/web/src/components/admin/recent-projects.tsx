"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@acme/db/types";
import { Image } from "@protoxyz/components";

import { admin } from "@/lib/admin";
import { urls } from "@/lib/urls";
import { Heading } from "../typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function AdminRecentProjects() {
  const [take, setTake] = useState<number>(5);

  const query = admin.project.all.useQuery({
    take,
  });

  return (
    <Card className="col-span-1 border lg:col-span-2">
      <Link href={urls.admin.projects.root()}>
        <CardHeader>
          <Heading size="h4">
            Recent Projects ({query.data?.meta.total})
          </Heading>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="mb-4 divide-y divide-gray-100">
          {query?.data?.all.length === 0 && (
            <div className="text-muted-foreground  ">
              No recent projects created
            </div>
          )}
          {query?.data?.all.map((project: Project) => (
            <div key={project.id} className="mb-5 flex items-center pt-5 ">
              <Link href={urls.admin.projects.project(project.id)}>
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  uploadId={(project as any).photos?.[0]?.photoId}
                  options={{
                    width: 64,
                    height: 64,
                    format: "webp",
                  }}
                  alt="project photo "
                />
              </Link>
              <div className="ml-4 w-full space-y-1">
                <div className="text-md  flex w-full items-center justify-between font-bold leading-none ">
                  <Link href={urls.admin.projects.project(project.id)}>
                    {project.name}
                  </Link>
                </div>
                <Link href={urls.admin.projects.project(project.id)}>
                  <p className="text-muted-foreground flex items-center gap-1 text-sm">
                    {new Date(project.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",

                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={urls.admin.projects.root()} className="w-full">
          <Button variant="secondary" className="w-full">
            View All
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
