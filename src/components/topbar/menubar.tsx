"use client";

import links from "@/utils/links";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function Menubar() {
  return (
    <Card className="m-0 hidden bg-accent p-1 sm:flex">
      <CardContent className="m-0 flex gap-2 bg-accent p-0">
        {links.map((link, index) => {
          if (link.name === "Profile") {
            return;
          }
          return (
            <Button
              className="bg-secondary text-secondary-foreground shadow-inner"
              key={index}
            >
              <Link href={link.path}>{link.name}</Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
