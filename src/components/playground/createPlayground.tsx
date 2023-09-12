"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import PlayGroundForm from "@/components/playground/playGroundForm";

export default function CreatePlayground() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <Button onClick={() => setIsOpen(!isOpen)} variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <PlayGroundForm isOpen={isOpen} setIsOpen={setIsOpen} />
            </PopoverContent>
        </Popover>
    )
}
