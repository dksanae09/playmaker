"use client";

import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";

export default function ClerkUserProfile() {
  const { user } = useUser();
  const { theme } = useTheme();

  if (!user)
    return (
      <div className="flex h-fit w-fit items-center">
        <Button variant="ghost">
          <SignInButton />
        </Button>
      </div>
    );

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
