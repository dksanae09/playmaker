"use client"

import { Button } from "@/components/ui/button";
import useStoreUserEffect from "@/utils/useStoreUserEffect";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    return <AuthenticatedHome />;
  }

  return (
    <main className="w-full grow h-fit flex flex-col justify-center min-h-[85vh]">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem culpa ratione libero amet cum aspernatur dolorem accusantium asperiores! Quia officia nobis reprehenderit dolor commodi modi voluptatem delectus ut est animi.
      <SignInButton >LogIn</SignInButton>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle Theme</Button>
    </main>
  )
}

function AuthenticatedHome() {
  const { theme, setTheme } = useTheme();
  const userId = useStoreUserEffect();
  if (userId !== null) {
    localStorage.setItem('userId', userId);
    console.log("Stored user ID: ", userId)
  }

  return (
    <main className="w-full grow h-fit flex flex-col justify-center min-h-[85vh]">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem culpa ratione libero amet cum aspernatur dolorem accusantium asperiores! Quia officia nobis reprehenderit dolor commodi modi voluptatem delectus ut est animi.
      <SignInButton>LogIn</SignInButton>
      <SignOutButton>LogOut</SignOutButton>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle Theme</Button>
      <div>
        {userId ? <div>Stored user ID: {userId}</div> : <div>Storing user...</div>}
      </div>
      <Button><Link href={'/playground'}>Go to Playgrounds!</Link></Button>
    </main>
  )
}