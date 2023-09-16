import React, { useState, useRef, useContext } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import ChatInput from './chatInput'
import ChatView from './chatView'
import { PlaygroundContext } from '@/context/playgroundContextProvider'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function PlaygroundChat() {
    return (
        <Card>
            <CardHeader className='text-4xl'>Chat</CardHeader>
            <CardContent className='w-full'>
                <ChatView />
            </CardContent>
        </Card>
    )
}
