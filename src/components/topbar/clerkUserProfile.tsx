"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

export default function ClerkUserProfile() {
  const { theme } = useTheme();
  return (
    <div className="flex h-fit w-fit items-center">
      {theme === "dark" ? (
        <UserButton
          appearance={{
            baseTheme: dark,
          }}
        />
      ) : (
        <UserButton />
      )}
    </div>
  );
}
