import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";

export default function ChatView({ userId, playground }: { userId: Id<"users">, playground: Doc<"playgrounds"> }) {
    const getMessages = useQuery(api.messages.get, { playgroundId: playground._id })
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