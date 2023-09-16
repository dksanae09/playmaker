import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useContext } from "react";
import { decryptText } from "@/utils/encryptdecrpyt";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatScroll from "@/utils/useChatScroll";

export default function ChatView() {
    const { userId, playground } = useContext(PlaygroundContext);
    const getMessages = useQuery(api.messages.get, { playgroundId: playground?._id || null })
    const chatRef = useChatScroll(getMessages)

    return (
        <Card>
            <CardContent className="py-2">
                <ScrollArea ref={chatRef} className="h-[400px] flex flex-col-reverse rounded-md p-4">
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
                </ScrollArea>
            </CardContent>
        </Card>
    )
};