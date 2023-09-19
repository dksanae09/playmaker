import React from "react";
import { Card, CardContent } from "./ui/card";

export default function HeroImage() {
  const gradientStyle = {
    background:
      "repeating-linear-gradient(-45deg, hsl(var(--accent)), hsl(var(--accent)) 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 25px)",
    width: "100%",
    height: "100%",
  };
  return (
    <Card className="m-0 h-full w-full p-0">
      <CardContent className="m-0 h-[400px] overflow-hidden rounded-lg bg-secondary p-0">
        <CardContent style={gradientStyle} />
      </CardContent>
    </Card>
  );
}
