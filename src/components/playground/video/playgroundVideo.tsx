"use client";

import React, { useContext } from "react";
import PlaygroundVideoForm from "./playgroundVideoForm";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import UploadUtube from "./uploadUtube";

export default function PlaygroundVideo() {
  const { playground } = useContext(PlaygroundContext);
  const videoUrl = useQuery(api.videos.renderVideo, {
    playgroundId: playground?._id || null,
  });

  if (playground === null) {
    return <>Loading...</>;
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
        {playground && <UploadUtube playgroundId={playground?._id} />}
      </CardContent>
    </Card>
  );
}
