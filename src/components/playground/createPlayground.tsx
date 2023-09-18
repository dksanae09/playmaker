"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import PlayGroundForm from "@/components/playground/playGroundForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function CreatePlayground() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className="flex text-2xl"
        >
          Create
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Your Playground!</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-3" />
        <PlayGroundForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
