"use client";

import Link from "next/link";
import { ageFromDob } from "@acme/shared";
import { Image } from "@protoxyz/uploads-react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ReactTimeago from "react-timeago";

import { Button, LoadingButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { admin, AdminRouterOutputs } from "@/lib/admin";
import { urls } from "@/lib/urls";

export const columns: ColumnDef<
  AdminRouterOutputs["project"]["all"]["all"]["0"]
>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <Link href={urls.admin.projects.project(row.original.id)}>
          <ReactTimeago date={row.original.createdAt} />
        </Link>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      const ctx = admin.useContext();

      const deleteMutation = admin.project.delete.useMutation({
        onSuccess: () => {
          ctx.project.invalidate();
        },
      });

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(project.id)}
              >
                Copy project ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem className="text-red-400">
                  Delete project
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={urls.admin.projects.project(row.original.id)}>
                  View project
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this project from our servers?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <LoadingButton
                onClick={() => deleteMutation.mutateAsync({ id: project.id })}
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
    },
  },
];
