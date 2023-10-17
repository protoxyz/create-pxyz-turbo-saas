"use client";

import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

import { Heading, Text } from "../../typography";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { CreateProjectForm } from "./create-form";

export function CreateProjectButton({}: {}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 w-full">
          <Plus />
          Create Project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1">
            <Heading size="h3">Create a Project</Heading>
            <Text size="lg">
              Enter the name of the project you would like to create.
            </Text>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <CreateProjectForm onSuccess={() => setOpen(false)} />

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
