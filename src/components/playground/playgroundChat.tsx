import React, { useState, useRef } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '../ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'


function ChatInput({ input, setInput, sendMessage, textareaRef, playground, userId }: {
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
    textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>
    sendMessage: () => void
    playground: Doc<"playgrounds">
    userId: Id<"users">
}) {
    return (
        <div className='border-t px-4 pt-4 mb-2 sm:mb-0'>
            <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-indigo-600'>
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${playground?.editor !== userId ? 'editor' : 'owner'}`}
                    className='block w-full resize-none border-0 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
                />

                <div
                    onClick={() => textareaRef.current?.focus()}
                    className='py-2'
                    aria-hidden='true'>
                    <div className='py-px'>
                        <div className='h-9' />
                    </div>
                </div>

                <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
                    <div className='flex-shrin-0'>
                        <Button onClick={sendMessage} type='submit'>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
            <ChatInput input={input} setInput={setInput} sendMessage={sendMessage}
                textareaRef={textareaRef} playground={playground} userId={userId} />
        </div>
    )
}
