import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useContext, useRef, useState } from "react";
import { decryptText } from "@/utils/encryptdecrpyt";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatScroll from "@/utils/useChatScroll";
import ChatInput from "./chatInput";

export default function ChatView() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const { userId, playground } = useContext(PlaygroundContext);

    const addMessage = useMutation(api.messages.add)
    const getMessages = useQuery(api.messages.get, { playgroundId: playground?._id || null })

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const chatRef = useChatScroll(getMessages)

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
            <CardContent className="py-2">
                <ScrollArea ref={chatRef} className="h-[400px] absolute flex flex-col rounded-md p-4">
                    {getMessages?.map((message) => {
                        return (
                            message.fromUser === userId ?
                                <CardContent className="flex flex-row justify-end">
                                    {decryptText(message.message)}
                                </CardContent>
                                :
                                <CardContent className="flex flex-row justify-end bg-accent w-fit p-2 m-0 rounded-md">
                                    {decryptText(message.message)}
                                </CardContent>
                        )
                    })}
                    <ChatInput
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                        textareaRef={textareaRef}
                    />
                </ScrollArea>
            </CardContent>
        </Card>
    )
};