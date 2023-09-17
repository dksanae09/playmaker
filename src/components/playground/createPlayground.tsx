"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import PlayGroundForm from "@/components/playground/playGroundForm";
import { Card } from "../ui/card";

export default function CreatePlayground() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="flex justify-start">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className="flex text-2xl"
          >
            Create
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <PlayGroundForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </PopoverContent>
      </Popover>
    </Card>
  );
}
