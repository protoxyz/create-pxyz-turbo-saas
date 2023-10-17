"use client";

import Link from "next/link";
import { UserProfile } from "@protoxyz/types";
import { ColumnDef } from "@tanstack/react-table";

import { urls } from "@/lib/urls";

export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link href={urls.admin.users.user(row.original.id)}>
          <div className="text-sm font-bold">{row.original.name}</div>
          <div className="text-muted-foreground  text-xs">
            #{row.original.id}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const primaryEmail = row.original.emailAddresses.find(
        (email) => email.id === row.original.primaryEmailId,
      );
      return (
        <Link href={urls.admin.users.user(row.original.id)}>
          <div className="text-muted-foreground text-sm">
            {primaryEmail?.email}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const primaryPhone = row.original.phoneNumbers.find(
        (phone) => phone.id === row.original.primaryPhoneId,
      );
      return (
        <Link href={urls.admin.users.user(row.original.id)}>
          <div className="text-muted-foreground text-sm">
            {primaryPhone?.phone}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <Link href={urls.admin.users.user(row.original.id)}>
          <div className="text-muted-foreground text-sm">
            {new Date(row.original.createdAt).toLocaleString()}
          </div>
        </Link>
      );
    },
  },
];
