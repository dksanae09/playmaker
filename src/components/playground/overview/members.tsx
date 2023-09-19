"use client";

import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Members({
  playground,
}: {
  playground: Doc<"playgrounds">;
}) {
  const owner = useQuery(api.users.get, { id: playground?.owner });
  const editor = useQuery(api.users.get, { id: playground?.editor });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="User Details">
        <AccordionTrigger>Members</AccordionTrigger>
        <AccordionContent className="text-primary">
          {owner?.email}
        </AccordionContent>
        <AccordionContent>{editor?.email}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
