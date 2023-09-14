import React, { useState, useRef } from 'react'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import ChatInput from './chatInput'
import ChatView from './chatView'

export default function PlaygroundChat({
    userId,
    playground,
}: {
    userId: Id<"users">
    playground: Doc<"playgrounds">
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const addMessage = useMutation(api.messages.add)

    function sendMessage() {
        if (!input) return
        setIsLoading(true)

        try {
            addMessage({ message: input, playgroundId: playground._id, fromUser: userId, toUser: userId === playground.owner ? playground.editor : playground.owner })
            setInput('')
            textareaRef.current?.focus()
        } catch {
            throw new Error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <ChatView userId={userId} playground={playground} />
            <ChatInput input={input} setInput={setInput} sendMessage={sendMessage}
                textareaRef={textareaRef} playground={playground} userId={userId} />
        </div>
    )
}
