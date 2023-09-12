'use client'

import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import useStoreUserEffect from '@/utils/useStoreUserEffect'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PlaygroundChat from '@/components/playground/playgroundChat'

export default function PlaygroundBoard({ params }: { params: { id: Id<"playgrounds"> } }) {
    const playground = useQuery(api.playground.get, { playgroundId: params.id })
    const userId = useStoreUserEffect()

    if (playground?.owner !== userId && playground?.editor !== userId) {
        return <div>Not authorized</div>
    }

    return (
        <div className='w-full h-full flex'>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam fugiat ea rerum perferendis. Aspernatur accusantium laborum, exercitationem veritatis voluptatem odio explicabo dolores praesentium tenetur sapiente id voluptatibus non expedita accusamus?</>
                </TabsContent>
                <TabsContent value="chat">
                    <PlaygroundChat userId={userId} playground={playground} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
