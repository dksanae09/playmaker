'use client'

import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react';
import React, { FormEvent, useContext, useRef, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { PlaygroundContext } from '@/context/playgroundContextProvider';
import { Card } from '@/components/ui/card';

export default function PlaygroundVideoForm() {
    const { userId, playground } = useContext(PlaygroundContext);
    const generateUploadUrl = useMutation(api.videos.generateUploadUrl);
    const sendVideo = useMutation(api.videos.sendVideo);

    const videoInput = useRef<HTMLInputElement>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    if (userId === null) {
        return <>Waiting for User!</>
    }

    if (playground === undefined) {
        return <>Waiting for Playground!</>
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
        if (userId === undefined || playground === undefined) {
            throw new Error("User or Playground is undefined");
            return;
        }
        await sendVideo({ storageId, userId, playgroundId: playground?._id });

        setSelectedVideo(null);
        videoInput.current!.value = "";
    }

    return (
        <Card>
            <form onSubmit={handleSendVideo} className='flex'>
                <Input
                    type="file"
                    accept="video/*"
                    ref={videoInput}
                    className='border-primary border-2 opacity-25 focus:opacity-100'
                    onChange={(event) => setSelectedVideo(event.target.files![0])}
                    disabled={selectedVideo !== null}
                />
                <Button
                    variant={selectedVideo === null ? "ghost" : "secondary"}
                    type="submit"
                    disabled={selectedVideo === null}
                >Upload</Button>
            </form>
        </Card>
    )
}
