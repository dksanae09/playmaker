"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { decryptText } from "@/utils/encryptdecrpyt";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Id } from "../../../../convex/_generated/dataModel";

export default function TimeLine({ isOwner }: { isOwner: boolean }) {
  const { playground } = useContext(PlaygroundContext);
  const [isDone, setIsDone] = useState(false);

  const update = useMutation(api.tasks.update);
  const tasks = useQuery(api.tasks.get, { playgroundId: playground?._id });

  function handleCheck(taskId: Id<"tasks">) {
    setIsDone(!isDone);
    update({
      taskId,
      isDone: !isDone,
    });
  }

  return (
    <Card>
      <CardContent>
        {tasks?.map((task, index) => {
          return (
            <CardContent key={index}>
              {decryptText(task.name)}
              <br />
              {decryptText(task.description as string)}
              <br />
              {task.isDone ? "Done" : "Not done"}
              <br />
              <Checkbox
                id="isDone"
                className="h-6 w-6"
                checked={task.isDone}
                onCheckedChange={() => handleCheck(task._id)}
              />
              <br />
              {task.deadline}
            </CardContent>
          );
        })}
      </CardContent>
    </Card>
  );
}
