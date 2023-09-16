'use client'

import { useQuery } from 'convex/react'
import React, { useContext, useEffect } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PlaygroundChat from '@/components/playground/chat/playgroundChat'
import PlaygroundVideo from '@/components/playground/video/playgroundVideo'
import PlaygroundOverview from '@/components/playground/overview/playgroundOverview'
import { PlaygroundContext } from '@/context/playgroundContextProvider'
import { Card } from '@/components/ui/card'

export default function PlaygroundBoard({ params }: { params: { id: Id<"playgrounds"> } }) {
    const { userId, setUserId, setPlayground } = useContext(PlaygroundContext)
    const playground = useQuery(api.playground.get, { playgroundId: params.id })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserId(localStorage.getItem('userId') as Id<"users">)
        }
    }, [userId, setUserId])

    useEffect(() => {
        if (playground) {
            setPlayground(playground)
        }
    }, [playground, setPlayground])

    if (playground?.owner !== userId && playground?.editor !== userId) {
        return <div>Not authorized</div>
    }

    return (
        <Card className='w-full h-full flex'>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <PlaygroundOverview />
                </TabsContent>
                <TabsContent value="chat">
                    <PlaygroundChat />
                </TabsContent>
                <TabsContent value="video">
                    <PlaygroundVideo />
                </TabsContent>
            </Tabs>
        </Card>
    )
}
