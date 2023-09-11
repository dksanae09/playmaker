"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PlayGround() {
    const [values, setValues] = useState({
        name: "",
        descp: "",
        owner: "",
        editors: [],
    })

    const createPlayGround = () => {
        console.log('createPlayGround', values);
    }

    return (
        <div className="w-full h-full flex justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Details</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the metadata for the Playground.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    defaultValue={values.name}
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="descp">Description</Label>
                                <Input
                                    id="descp"
                                    defaultValue={values.descp || ""}
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="Admin">Admin</Label>
                                {/* put a select */}
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="editors">Editors</Label>
                                {/* put select */}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
                <Button onClick={createPlayGround}>Create</Button>
            </Popover>
        </div>
    )
}