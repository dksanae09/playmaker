"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export type Playground = Doc<"playgrounds">;

export const columns: ColumnDef<Playground>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Id",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const isSelected = row.getIsSelected();
      const id = row.getValue("_id") as Id<"playgrounds">;
      const name = row.getValue("name") as string;

      return isSelected ? (
        <div className="text-left hover:underline">
          <Link href={`/playground/${id}`}>{name}</Link>
        </div>
      ) : (
        <div>{name}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("deadline") as string;
      const formatted = new Date(date);

      return (
        <div className="text-right font-medium">{formatted.toDateString()}</div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userId = row.getValue("owner") as Id<"users">;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const user = useQuery(api.users.get, { id: userId });

      return (
        <div className="rounded-lg bg-accent text-center">{user?.email}</div>
      );
    },
  },
  {
    accessorKey: "editor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Editor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userId = row.getValue("editor") as Id<"users">;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const user = useQuery(api.users.get, { id: userId });

      return <div>{user?.email}</div>;
    },
  },
];
