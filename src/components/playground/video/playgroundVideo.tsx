"use client";

import React, { useContext } from "react";
import PlaygroundVideoForm from "./playgroundVideoForm";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import ApprovalComponent from "./approvalComponent";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingVideo() {
  return (
    <div className="flex h-full w-[450px] flex-col items-center justify-center gap-3">
      <Skeleton className="h-[220px] w-[400px]" />
      <div className="flex h-[250px] w-[400px] flex-col gap-3">
        <Skeleton className="h-[100px] w-full" />
        <div className="mt-5 flex">
          <Skeleton className="h-[50px] w-[50%]" />
        </div>
        <Skeleton className="h-[50px] w-full" />
      </div>
    </div>
  );
}

export default function PlaygroundVideo() {
  const { playground } = useContext(PlaygroundContext);
  const videoUrl = useQuery(api.videos.renderVideo, {
    playgroundId: playground?._id || null,
  });

  if (playground === null) {
    return <LoadingVideo />;
  }

  return (
    <Card>
      <CardContent>
        {videoUrl ? (
          <video src={videoUrl} controls autoPlay width="500px" />
        ) : (
          <>No Videos Yet!</>
        )}
      </CardContent>
      <CardContent>
        <PlaygroundVideoForm />
        {playground && <ApprovalComponent playgroundId={playground?._id} />}
      </CardContent>
    </Card>
  );
}
