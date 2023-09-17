"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TaskForm from "./taskForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Id } from "../../../../convex/_generated/dataModel";

export default function TaskFormSheet({
  playgroundId,
}: {
  playgroundId: Id<"playgrounds"> | undefined;
}) {
  const [open, setOpen] = useState(false);

  if (!playgroundId) {
    return <div>Playground not found!</div>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="link">Add Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Tasks To Your Playground!</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-3" />
        {playgroundId !== undefined && (
          <TaskForm open={open} setOpen={setOpen} playgroundId={playgroundId} />
        )}
      </SheetContent>
    </Sheet>
  );
}
