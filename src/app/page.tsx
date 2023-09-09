"use client"

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";

export default function Home() {
  const { user } = useUser();
  // const tasks = useQuery(api.tasks.get);
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     {tasks?.map(({ _id, text }) => (
  //       <div key={_id.toString()}>{text}</div>
  //     ))}
  //   </main>
  // );

  return (
    <div>
      <p>Home</p>
      {/* <Button onClick={() => SignIn()}>Login</Button> */}
      <SignInButton>LogIn</SignInButton>
      <SignOutButton>LogOut</SignOutButton>
      {JSON.stringify(user) || "No User"}
    </div>
  )
}