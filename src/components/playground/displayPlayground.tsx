"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import useStoreUserEffect from "@/utils/useStoreUserEffect";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import CardianBox from "../Cardian";
import { Skeleton } from "../ui/skeleton";

function Loading() {
  return (
    <div className="m-0 grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      <Skeleton className="h-20 w-[250px]" />
      <Skeleton className="h-20 w-[250px]" />
      <Skeleton className="h-20 w-[250px]" />
      <Skeleton className="h-20 w-[250px]" />
    </div>
  );
}

function AuthenticatedPlayground({ userId }: { userId: Id<"users"> }) {
  const activePlaygrounds = useQuery(api.playground.listActive, { userId });

  if (!activePlaygrounds) return <Loading />;

  if (activePlaygrounds.length < 1)
    return (
      <CardContent className="flex flex-col items-center justify-center">
        <CardHeader className="text-center text-2xl font-bold">
          No playgrounds found
        </CardHeader>
        <CardDescription className="text-center text-sm leading-tight text-muted-foreground">
          Create a playground to get started!
        </CardDescription>
      </CardContent>
    );

  return (
    <CardContent className="m-0 grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {activePlaygrounds &&
        activePlaygrounds?.map((playground) => (
          <CardianBox playground={playground} key={playground._id} />
        ))}
    </CardContent>
  );
}

export default function DisplayPlayground() {
  const userId = useStoreUserEffect();

  if (!userId) return <Loading />;

  return (
    <Card className="flex flex-col items-center justify-center">
      {userId && <AuthenticatedPlayground userId={userId} />}
    </Card>
  );
}
