'use client'

import { useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PlaygroundChat from '@/components/playground/chat/playgroundChat'
import PlaygroundVideo from '@/components/playground/video/playgroundVideo'

export default function PlaygroundBoard({ params }: { params: { id: Id<"playgrounds"> } }) {
    const playground = useQuery(api.playground.get, { playgroundId: params.id })
    const [userId, setUserId] = useState<Id<"users"> | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserId(localStorage.getItem('userId') as Id<"users">)
        }
    }, [])

    if (playground?.owner !== userId && playground?.editor !== userId) {
        return <div>Not authorized</div>
    }

    return (
        <div className='w-full h-full flex'>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam fugiat ea rerum perferendis. Aspernatur accusantium laborum, exercitationem veritatis voluptatem odio explicabo dolores praesentium tenetur sapiente id voluptatibus non expedita accusamus?</>
                </TabsContent>
                <TabsContent value="chat">
                    <PlaygroundChat userId={userId} playground={playground} />
                </TabsContent>
                <TabsContent value="video">
                    <PlaygroundVideo userId={userId} playground={playground} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
