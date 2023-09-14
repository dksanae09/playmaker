'use client'

import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react';
import React, { FormEvent, useRef, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

export default function PlaygroundVideoForm({ userId, playground }: { userId: Id<"users">, playground: Doc<"playgrounds"> }) {
    const generateUploadUrl = useMutation(api.videos.generateUploadUrl);
    const sendVideo = useMutation(api.videos.sendVideo);

    const videoInput = useRef<HTMLInputElement>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    if (userId === null) {
        return <>Waiting for User!</>
    }

    async function handleSendVideo(e: FormEvent) {
        e.preventDefault();

        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": selectedVideo!.type },
            body: selectedVideo,
        });
        const { storageId } = await result.json();

        // Step 3: Save the newly allocated storage id to the database
        await sendVideo({ storageId, userId, playgroundId: playground._id });

        setSelectedVideo(null);
        videoInput.current!.value = "";
    }

    return (
        <form onSubmit={handleSendVideo}>
            <Input
                type="file"
                accept="video/*"
                ref={videoInput}
                onChange={(event) => setSelectedVideo(event.target.files![0])}
                disabled={selectedVideo !== null}
            />
            <Button
                variant={selectedVideo === null ? "ghost" : "secondary"}
                type="submit"
                disabled={selectedVideo === null}
            >Upload</Button>
        </form>
    )
}
