import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useContext } from "react";

export default function ChatView() {
    const { userId, playground } = useContext(PlaygroundContext);
    const getMessages = useQuery(api.messages.get, { playgroundId: playground?._id || null })
    const styleMsg = 'bg-primary text-secondary';

    return (
        <div className='flex flex-col'>
            Messages here!
            {getMessages?.map((message) => {
                return (
                    <div className={message.fromUser === userId ? '' : styleMsg} key={message._id}>
                        {message.message}
                    </div>
                )
            })}
        </div>
    )
};