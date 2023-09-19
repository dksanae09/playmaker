"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Menubar() {
  const topPlaygrounds = useQuery(api.playground.getTop, { limit: 5 });
  const playgroundLinks = topPlaygrounds?.map((playground) => ({
    name: playground.name,
    path: `/playground/${playground._id}`,
  }));
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Routing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md border-2 bg-gradient-to-b from-muted to-background p-6 no-underline outline-none hover:border-primary focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-primary">
                      Playmaker
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed and Coordinated for Creators!
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/playground" title="Playgrounds">
                Visit your playgrounds!
              </ListItem>
              <ListItem href="/" title="Documentation">
                Coming Soon!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Playgrounds</NavigationMenuTrigger>
          <NavigationMenuContent>
            {playgroundLinks && playgroundLinks?.length < 1 ? (
              <ul className="flex w-[400px] p-4">No playgrounds found</ul>
            ) : (
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {playgroundLinks?.map((link, index) => (
                  <ListItem key={index} title={link.name} href={link.path}>
                    {link.name}
                  </ListItem>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
