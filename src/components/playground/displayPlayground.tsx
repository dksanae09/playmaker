'use client'

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel";
import useStoreUserEffect from "@/utils/useStoreUserEffect";
import { Card, CardContent } from "../ui/card";
import CardianBox from "../Cardian";

function AuthenticatedPlayground({ userId }: { userId: Id<"users"> }) {
    const activePlaygrounds = useQuery(api.playground.listActive, { userId });

    if (!activePlaygrounds) return (<>No Active Playhround!</>);

    return (
        <CardContent className='grid grid-cols-1 m-0 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
            {activePlaygrounds && activePlaygrounds?.map((playground) => (
                <CardianBox playground={playground} key={playground._id} />
            ))}
        </CardContent>
    )
}

export default function DisplayPlayground() {
    const userId = useStoreUserEffect();

    if (!userId) return (<>User not found!</>);

    return (
        <Card className="flex flex-col justify-center items-center">
            {userId && <AuthenticatedPlayground userId={userId} />}
        </Card>
    )
}
