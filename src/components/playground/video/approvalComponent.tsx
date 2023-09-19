"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ApprovalComponent({
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
      <CardContent className="mt-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="upload">
            <AccordionTrigger className="text-primary">
              Are you a developer?
            </AccordionTrigger>
            <AccordionContent>
              Upload the video directly to Youtube! Coming Soon!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <Separator />
      <CardContent className="flex items-center">
        <Button
          disabled={video === null || video?.approved}
          onClick={handleVideoApproval}
          className={cn(video?.approved ? "bg-green-500" : "bg-red-500")}
        >
          {video?.approved ? "Approved!" : "Approve the Video!"}
        </Button>
      </CardContent>
      <Separator />
    </Card>
  );
}
