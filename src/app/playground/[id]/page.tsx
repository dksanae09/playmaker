"use client";

import { useQuery } from "convex/react";
import React, { useContext, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaygroundChat from "@/components/playground/chat/playgroundChat";
import PlaygroundVideo from "@/components/playground/video/playgroundVideo";
import PlaygroundOverview from "@/components/playground/overview/playgroundOverview";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function LoadingPlayground() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-20 w-full items-center justify-between">
        <Skeleton className="ml-5 h-10 w-[400px]" />
        <Skeleton className="mr-5 h-10 w-[100px]" />
        <Skeleton className="mr-5 h-10 w-[400px]" />
      </div>
      <div className="flex h-[450px] w-full flex-col gap-3 p-3">
        <Skeleton className="h-[300px] w-full" />
        <div className="flex h-[100px] w-full justify-evenly p-3">
          <Skeleton className="h-20 w-[350px]" />
          <Skeleton className="h-20 w-[350px]" />
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundBoard({
  params,
}: {
  params: { id: Id<"playgrounds"> };
}) {
  const { userId, setUserId, setPlayground } = useContext(PlaygroundContext);
  const playground = useQuery(api.playground.get, { playgroundId: params.id });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId") as Id<"users">);
    }
  }, [userId, setUserId]);

  useEffect(() => {
    if (playground) {
      setPlayground(playground);
    }
  }, [playground, setPlayground]);

  if (!playground) return <LoadingPlayground />;

  if (playground?.owner !== userId && playground?.editor !== userId) {
    return (
      <CardContent className="flex h-full w-full flex-col items-center justify-center">
        <CardHeader className="text-center text-2xl font-bold">
          You are not authorized to view this playground!
        </CardHeader>
        <CardContent className="text-center text-xl">
          <Button variant="link" className="text-xl">
            <Link href="/playground">Return to Playgrounds!</Link>
          </Button>
        </CardContent>
      </CardContent>
    );
  }

  return (
    <Card className="flex h-full w-full">
      <Tabs
        defaultValue="overview"
        className="flex w-full flex-col items-center"
      >
        <TabsContent value="overview">
          <PlaygroundOverview />
        </TabsContent>
        <TabsContent value="chat" className="w-full">
          <PlaygroundChat />
        </TabsContent>
        <TabsContent value="video">
          <PlaygroundVideo />
        </TabsContent>
        <TabsList className="bg-blur-md fixed bottom-10 w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>
      </Tabs>
    </Card>
  );
}
