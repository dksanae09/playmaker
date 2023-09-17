"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UsersList from "../../utils/usersList";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { zid } from "../../../convex/withZod";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(10).max(100).optional(),
  owner: zid("users"),
  editor: zid("users"),
});

export default function PlayGroundForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const createPlayground = useMutation(api.playground.create);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: undefined,
      editor: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.owner === undefined || values.editor === undefined) {
      return console.error("Owner or Editor is not selected");
    }
    setIsOpen(!isOpen);
    try {
      const playgroundId = await createPlayground({
        name: values.name,
        description: values.description,
        owner: values.owner as Id<"users">,
        editor: values.editor as Id<"users">,
      });
      router.push(`/playground/${playgroundId}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Playmaker" {...field} />
              </FormControl>
              <FormDescription>This is your Playground name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <UsersList onChange={field.onChange} />
              </FormControl>
              <FormDescription>Owner</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="editor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Editor</FormLabel>
              <FormControl>
                <UsersList
                  omitValue={form.getValues().owner as Id<"users">}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Editor</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
