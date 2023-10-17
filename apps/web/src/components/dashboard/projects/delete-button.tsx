"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { Heading, Text } from "../../typography";
import { Button, LoadingButton } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  projectId;
  const router = useRouter();
  const ctx = api.useContext();
  const deleteMutation = api.project.delete.useMutation({
    onSuccess: () => {
      setOpen(false);
      ctx.project.invalidate();
      router.push(urls.dashboard.root());
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading size="h2">Are you sure absolutely sure?</Heading>
          </DialogTitle>
          <DialogDescription>
            <Text>
              This action cannot be undone. Are you sure you want to permanently
              delete this profile from our servers?
            </Text>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <LoadingButton
            onClick={() => deleteMutation.mutateAsync({ projectId })}
            loading={deleteMutation.isLoading}
            variant="destructive"
            type="submit"
          >
            Confirm
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
