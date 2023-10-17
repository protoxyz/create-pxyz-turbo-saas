import Link from "next/link";
import { FolderKanbanIcon, Home, Plus } from "lucide-react";

import { urls } from "@/lib/urls";
import { Text } from "../typography";
import { Button } from "../ui/button";

export function DashboardSidebar() {
  return (
    <div className="hidden flex-col gap-4 py-4   lg:flex lg:py-8">
      <Link href={urls.dashboard.projects.create()} className="mx-4">
        <Button size="lg" className="w-full">
          <Plus className="h4 w-4" />
          Create Project
        </Button>
      </Link>

      <div className="flex flex-col gap-4">
        <Link href={urls.dashboard.root()}>
          <Button size="lg" variant="ghost" className="w-full justify-start">
            <Home className="h-4 w-4" /> Dashboard
          </Button>
        </Link>

        <div className="flex w-full flex-col">
          <Text
            size="md"
            className="text-muted-foreground/40 ml-8 uppercase tracking-widest"
          >
            Projects
          </Text>

          <Link href={urls.dashboard.projects.list()}>
            <Button size="lg" variant="ghost" className="w-full justify-start">
              <FolderKanbanIcon className="h-4 w-4" /> All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
