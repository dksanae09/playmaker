'use client'

import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'

export default function PlaygroundBoard({ params }: { params: { id: Id<"playgrounds"> } }) {
    const playgroundDetails = useQuery(api.playground.get, { playgroundId: params.id })
    console.log(playgroundDetails)

    return (
        <div>
            PlaygroundId: {params.id}
            Name: {playgroundDetails?.name}
            Owner: {playgroundDetails?.owner}
            Editor: {playgroundDetails?.editor}
        </div>
    )
}
