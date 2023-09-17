"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import encryptText, { decryptText } from "@/utils/encryptdecrpyt";
import { Button } from "@/components/ui/button";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function TaskForm() {
  const [tasks, setTasks] = useState(null);

  return <></>;
}

export default function TimeLine({ isOwner }: { isOwner: boolean }) {
  const { playground } = useContext(PlaygroundContext);
  const tasks = useQuery(api.tasks.get, { playgroundId: playground?._id });

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
        <TaskForm />
      </CardContent>
    </Card>
  );
}
