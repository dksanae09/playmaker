"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { decryptText } from "@/utils/encryptdecrpyt";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { BlocksIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingTasks() {
  return (
    <div className="flex w-full">
      <div className="flex w-full items-center justify-between rounded-md">
        <Skeleton className="h-[100px] w-[350px]" />
        <Skeleton className="h-[100px] w-[350px]" />
        <Skeleton className="h-[100px] w-[350px]" />
      </div>
    </div>
  );
}

export default function TimeLine({ isOwner }: { isOwner: boolean }) {
  const { playground } = useContext(PlaygroundContext);
  const [isDone, setIsDone] = useState(false);

  const update = useMutation(api.tasks.update);
  const tasks = useQuery(api.tasks.get, { playgroundId: playground?._id });

  function handleCheck(taskId: Id<"tasks">) {
    setIsDone(!isDone);
    update({
      taskId,
      objects: {
        isDone: !isDone,
      },
    });
  }

  if (!tasks) {
    return <LoadingTasks />;
  }

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tasks?.map((task, index) => {
          return (
            <CardContent
              key={index}
              className={cn("flex items-center rounded-md")}
            >
              <CardContent className="flex flex-col justify-between">
                <CardContent className="flex items-center justify-between gap-3">
                  <CardHeader className="text-2xl underline">
                    {decryptText(task.name)}
                  </CardHeader>
                  {task.deadline}
                </CardContent>
                <CardContent>
                  <span className="w-[200px] overflow-hidden truncate">
                    {decryptText(task.description as string)}
                  </span>
                </CardContent>
              </CardContent>
              <CardContent className="m-0 p-0">
                <Button
                  variant="ghost"
                  value={task.isDone ? "Done" : "Not Done"}
                  onClick={() => handleCheck(task._id)}
                >
                  {task.isDone ? (
                    <CheckIcon className="rounded-md border-2 border-green-400 text-green-400" />
                  ) : (
                    <BlocksIcon className="rounded-md text-destructive" />
                  )}
                </Button>
              </CardContent>
            </CardContent>
          );
        })}
      </CardContent>
    </Card>
  );
}
