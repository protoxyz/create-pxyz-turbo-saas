"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export function UsersTable() {
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
  const dataQuery = useSWR(
    `/api/admin/users?take=${take}&cursor=${cursor}`,
    fetcher,
  );

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

  if (dataQuery.isLoading) return <div>Loading...</div>;
  if (dataQuery.error) return <div>{dataQuery.error.message}</div>;
  if (!dataQuery.data) return null;

  return (
    <DataTable
      meta={dataQuery.data?.meta}
      columns={columns}
      data={dataQuery.data?.data ?? []}
      take={take}
      setTake={onSetTake}
      setCursor={onSetCursor}
    />
  );
}
