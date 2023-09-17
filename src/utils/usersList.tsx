"use client";

import { useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Id } from "../../convex/_generated/dataModel";

export default function UsersList({
  omitValue,
  onChange,
}: {
  omitValue?: Id<"users">;
  onChange: (value: Id<"users">) => void;
}) {
  const usersList = useQuery(api.users.getAll);
  const filteredUsersList = usersList?.filter((user) => user._id !== omitValue);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {email && filteredUsersList
            ? filteredUsersList.find((user) => user.email === email)?.email
            : "Select User..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search User..." />
          <CommandEmpty>No User found.</CommandEmpty>
          <CommandGroup>
            {filteredUsersList?.map((user) => (
              <CommandItem
                key={user._id}
                onSelect={(currentValue) => {
                  setEmail(currentValue === email ? "" : currentValue);
                  onChange(user._id as Id<"users">);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    email === user.email ? "opacity-100" : "opacity-0",
                  )}
                />
                {user.email}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
