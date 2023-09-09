"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="w-full grow h-fit flex flex-col justify-center min-h-[85vh]">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem culpa ratione libero amet cum aspernatur dolorem accusantium asperiores! Quia officia nobis reprehenderit dolor commodi modi voluptatem delectus ut est animi.
      <SignInButton>LogIn</SignInButton>
      <SignOutButton>LogOut</SignOutButton>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle Theme</Button>
    </main>
  )
}