"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { columns } from "@/components/dashboard/playground/columns";
import { DataTable } from "@/components/dashboard/playground/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingDashboard() {
  return (
    <div className="mt-10 flex h-full w-full flex-col justify-center gap-5">
      <div className="h-full w-full">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="h-[400px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

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

  if (!userId || !activePlaygrounds) {
    return <LoadingDashboard />;
  }

  return (
    <Card className="container mx-auto py-5">
      <CardHeader className="text-4xl">Dashboard</CardHeader>
      <CardContent>
        {activePlaygrounds && (
          <DataTable columns={columns} data={activePlaygrounds} />
        )}
      </CardContent>
    </Card>
  );
}
