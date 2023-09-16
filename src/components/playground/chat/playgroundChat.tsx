import React, { useState, useRef, useContext } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import ChatInput from './chatInput'
import ChatView from './chatView'
import { PlaygroundContext } from '@/context/playgroundContextProvider'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function PlaygroundChat() {
    const { userId, playground } = useContext(PlaygroundContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const addMessage = useMutation(api.messages.add)

    function sendMessage() {
        if (!input) return
        setIsLoading(true)

        if (userId === undefined || playground === undefined) {
            throw new Error("User or Playground is undefined");
        }

        try {
            addMessage({ message: input, playgroundId: playground?._id, fromUser: userId, toUser: userId === playground?.owner ? playground.editor : playground?.owner })
            setInput('')
            textareaRef.current?.focus()
        } catch {
            throw new Error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className='text-4xl'>Chat</CardHeader>
            <CardContent className='w-full'>
                <ChatView />
                <ChatInput
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    textareaRef={textareaRef}
                />
            </CardContent>
        </Card>
    )
}
