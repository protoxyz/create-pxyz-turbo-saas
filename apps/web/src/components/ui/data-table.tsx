"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronsLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  take,
  setTake,
  data,
  meta,
  setCursor,
}: DataTableProps<TData, TValue> & {
  take?: number;
  setTake?: (take: number) => void;
  setCursor?: (cursor: string | undefined) => void;
  meta: {
    count: number;
    next: string | undefined;
    prev: string | undefined;
    numPages: number;
    perPage: number;
    total: number;
  };
}) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="bg-background rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-muted-foreground text-sm">
            {meta?.numPages} pages
          </div>
          {setTake && setCursor && (
            <div className="flex items-center space-x-2">
              <Select
                value={`${meta?.perPage}`}
                onValueChange={(value) => {
                  setTake(Number(value));
                  setCursor(undefined);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={meta?.perPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-muted-foreground text-sm">Per Page</div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {(setTake || setCursor) && (
            <Button
              variant="outline"
              disabled={take === 10 && meta?.prev === undefined}
              onClick={() => {
                setTake?.(10);
                setCursor?.(undefined);
              }}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          )}
          {setCursor && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => meta?.prev && setCursor(meta?.prev)}
              disabled={!meta?.prev}
            >
              Prev
            </Button>
          )}

          {setCursor && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => meta?.next && setCursor(meta?.next)}
              disabled={!meta?.next}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
