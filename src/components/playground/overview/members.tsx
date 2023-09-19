"use client";

import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "../../../../convex/_generated/dataModel";

export default function Members({
  playground,
}: {
  playground: Doc<"playgrounds">;
}) {
  const owner = useQuery(api.users.get, { id: playground?.owner });
  const editor = useQuery(api.users.get, { id: playground?.editor });
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Users" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner: {owner?.email}</SelectItem>
        <SelectItem value="editor">Editor: {editor?.email}</SelectItem>
      </SelectContent>
    </Select>
  );
}
