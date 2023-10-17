"use client";

import { useState } from "react";
import Link from "next/link";
import { ageFromDob } from "@acme/shared";
import { Image } from "@protoxyz/uploads-react";
import { Cake, GridIcon, ListIcon, MapPin } from "lucide-react";

import { api } from "@/lib/api";
import {
  DisplayType,
  getProjectSearchDisplayType,
  setProjectSearchDisplayType,
} from "@/lib/storage";
import { urls } from "@/lib/urls";
import { Text } from "../../typography";
import { Button } from "../../ui/button";

export function ProjectList() {
  const [display, setDisplay] = useState<DisplayType>(
    getProjectSearchDisplayType(),
  );

  return (
    <div className="relative flex flex-col gap-y-8">
      <DisplaySelect display={display} setDisplay={setDisplay} />

      {display === "grid" && <Grid />}
      {display === "list" && <List />}
    </div>
  );
}

function DisplaySelect({
  display,
  setDisplay,
}: {
  display: "grid" | "list";
  setDisplay: (display: "grid" | "list") => void;
}) {
  return (
    <div className="-ml-6 -mr-12 flex items-center justify-between border-b border-t bg-slate-50 px-12 py-3">
      <div className="flex w-full items-center justify-end">
        <Text className="mr-2" size="xs">
          Select Display Type
        </Text>
        <Button
          size="sm"
          variant={display === "grid" ? "black" : "white"}
          onClick={() => {
            setDisplay("grid");
            setProjectSearchDisplayType("grid");
          }}
          className="  rounded-br-none rounded-tr-none"
        >
          <GridIcon className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={display === "list" ? "black" : "white"}
          onClick={() => {
            setDisplay("list");
            setProjectSearchDisplayType("list");
          }}
          className="rounded-bl-none rounded-tl-none"
        >
          <ListIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Grid() {
  const query = api.project.list.useQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const projects = query.data;

  if (!projects) {
    return <div>No projects found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={urls.dashboard.matchmaker.projects.view(project.id)}
        >
          <div className="rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <Image
                    uploadId={project.photos[0]?.photoId ?? ""}
                    options={{
                      width: 256,
                      height: 256,
                      format: "webp",
                    }}
                    alt="profile photo"
                    className="aspect-square w-full rounded-lg"
                  />

                  <div className="flex flex-col gap-3">
                    <div className="text-lg font-medium text-gray-900">
                      {project.firstName}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Cake className="h-5 w-5" /> {ageFromDob(project.dob)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-5 w-5" /> {project.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function List() {
  const query = api.project.list.useQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const projects = query.data;

  if (!projects) {
    return <div>No projects found</div>;
  }

  return (
    <div className="flow-root">
      <ul className="-my-5 divide-y divide-gray-200">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={urls.dashboard.matchmaker.projects.view(project.id)}
          >
            <li className="py-5">
              <div className="flex items-center space-x-4">
                <Image
                  uploadId={project.photos[0]?.photoId ?? ""}
                  options={{
                    width: 256,
                    height: 256,
                    format: "webp",
                  }}
                  alt="profile photo"
                  className="h-12 w-12 rounded border bg-slate-50"
                />
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {project.firstName}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Cake className="h-5 w-5" /> {ageFromDob(project.dob)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" /> {project.location}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
