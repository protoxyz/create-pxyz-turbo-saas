"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { admin } from "@/lib/admin";
import { columns } from "./columns";

export function ProjectsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [take, setTake] = useState<number>(
    searchParams.get("take")
      ? parseInt(searchParams.get("take") as string)
      : 10,
  );
  const [cursor, setCursor] = useState<string | undefined>(
    searchParams.get("cursor")
      ? (searchParams.get("cursor") as string)
      : undefined,
  );
  const dataQuery = admin.project.all.useQuery({ take, cursor });

  const onSetTake = (take: number) => {
    setTake(take);
    setParam("take", take.toString());
  };

  const onSetCursor = (cursor: string | undefined) => {
    setCursor(cursor);
    setParam("cursor", cursor?.toString());
  };

  const setParam = (key: string, value: string | undefined) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  if (!dataQuery.data) return null;

  console.log("DATA QUERY", dataQuery.data.meta);
  if (dataQuery.data.error) return <div>{dataQuery.data.error}</div>;

  return (
    <DataTable
      meta={dataQuery.data?.meta}
      columns={columns}
      data={dataQuery.data?.all ?? []}
      take={take}
      setTake={onSetTake}
      setCursor={onSetCursor}
    />
  );
}
