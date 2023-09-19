import React, { useContext } from "react";
import TimeLine from "./timeLine";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/ui/date-range";
import TaskFormSheet from "./taskFormSheet";
import Members from "./members";

// todo:
//  ai write descp tasks
//  ability to edit descp

export default function PlaygroundOverview() {
  const { userId, playground } = useContext(PlaygroundContext);
  const isOwner = userId === playground?.owner;

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <CardHeader className="text-4xl">Title Here!</CardHeader>
        {playground && <Members playground={playground} />}
        <DatePickerWithRange isOwner={isOwner} />
      </CardContent>
      <CardContent>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam autem
        corporis dolorum magni dolor fugit adipisci recusandae aut praesentium
        voluptate hic, sint voluptates ipsum. Facere quidem explicabo beatae
        porro libero.
      </CardContent>
      <Separator />
      <CardHeader>Timeline</CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        <TaskFormSheet playgroundId={playground?._id} />
      </CardContent>
      <TimeLine isOwner={isOwner} />
    </Card>
  );
}
