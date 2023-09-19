"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export default function UploadUtube({
  playgroundId,
}: {
  playgroundId: Id<"playgrounds">;
}) {
  const video = useQuery(api.videos.list, { playgroundId: playgroundId });
  const update = useMutation(api.videos.update);

  async function handleVideoApproval() {
    const status = update({
      id: playgroundId,
      approved: true,
    });
  }

  return (
    <Card>
      <CardHeader>Approve the Video!</CardHeader>
      <CardContent>
        <Button
          disabled={video === null || video?.approved}
          onClick={handleVideoApproval}
          className={cn(video?.approved ? "bg-green-500" : "bg-red-500")}
        >
          Approve
        </Button>
      </CardContent>
      <Separator />
      <CardContent>
        <CardHeader>Upload to Youtube!</CardHeader>
        <CardContent>Add Youtube Keys!</CardContent>
      </CardContent>
    </Card>
  );
}
