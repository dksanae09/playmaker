"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(100).optional(),
    owner: z.string().uuid(),
    editors: z.array(z.string().uuid()),
})

export default function PlayGroundForm(
    { isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }
) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            owner: "",
            editors: [],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsOpen(!isOpen)
        console.log(values)

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
                            <FormDescription>
                                This is your Playground name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                {/* todo */}
                                {/* <Select /> */}
                            </FormControl>
                            <FormDescription>
                                Owner( Admin )
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}