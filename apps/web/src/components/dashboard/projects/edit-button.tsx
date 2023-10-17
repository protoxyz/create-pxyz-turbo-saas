"use client";

import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import { RouterOutputs } from "@/lib/api";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { UpdateProjectForm } from "./update-form";

export function EditProjectButton({
  project,
}: {
  project: RouterOutputs["project"]["get"];
}) {
  const [open, setOpen] = useState(false);
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogDescription>{project.firstName}</DialogDescription>

        <UpdateProjectForm project={project} onSuccess={() => setOpen(false)} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
