"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { columns } from "@/components/dashboard/playground/columns";
import { DataTable } from "@/components/dashboard/playground/data-table";

export default function Dashboard() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const activePlaygrounds = useQuery(api.playground.listActive, {
    userId: userId as Id<"users">,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId as Id<"users">);
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      {activePlaygrounds && (
        <DataTable columns={columns} data={activePlaygrounds} />
      )}
    </div>
  );
}
