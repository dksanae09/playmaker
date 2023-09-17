"use client";

import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { decryptText } from "@/utils/encryptdecrpyt";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import TaskForm from "./taskForm";

export default function TimeLine({ isOwner }: { isOwner: boolean }) {
  const { playground } = useContext(PlaygroundContext);
  const tasks = useQuery(api.tasks.get, { playgroundId: playground?._id });

  if (!playground) {
    return <div>Playground not found!</div>;
  }

  return (
    <Card>
      <CardContent>
        {tasks?.map((task, index) => {
          return (
            <CardContent key={index}>
              {decryptText(task.name)}
              {decryptText(task.description as string)}
              {task.isDone ? "Done" : "Not done"}
              {task.deadline}
            </CardContent>
          );
        })}
      </CardContent>
      <CardContent>
        <TaskForm playgroundId={playground?._id} />
      </CardContent>
    </Card>
  );
}
