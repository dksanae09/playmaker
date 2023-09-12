'use client'

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel";
import useStoreUserEffect from "@/utils/useStoreUserEffect";
import Link from "next/link";

function AuthenticatedPlayground({ userId }: { userId: Id<"users"> }) {
    const activePlaygrounds = useQuery(api.playground.listActive, { userId })

    return (
        <div className="flex flex-col">
            {activePlaygrounds && activePlaygrounds?.map((playground) => (
                <div className="flex flex-col bg-primary text-secondary p-3" key={playground._id}>
                    <Link href={`/playground/${playground._id}`}>
                        <h3>{playground.name}</h3>
                        <p>{playground.description || "About this playground..."}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default function DisplayPlayground() {
    const userId = useStoreUserEffect();

    return (
        <div className="flex flex-col">
            {userId && <AuthenticatedPlayground userId={userId} />}
        </div>
    )
}
