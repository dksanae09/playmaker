"use client"

import React from 'react'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import PlaygroundVideoForm from './playgroundVideoForm'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export default function PlaygroundVideo({ userId, playground }: { userId: Id<"users">, playground: Doc<"playgrounds"> }) {
    const videoUrl = useQuery(api.videos.renderVideo, { playgroundId: playground._id })
    console.log(videoUrl)

    if (videoUrl === null) {
        return <>Loading...</>
    }

    return (
        <div>
            <video src={videoUrl} controls autoPlay width="500px" />
            <PlaygroundVideoForm userId={userId} playground={playground} />
        </div>
    )
}
