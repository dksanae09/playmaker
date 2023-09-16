'use client'

import React, { ReactNode, createContext, useState } from 'react'
import { Doc, Id } from '../../convex/_generated/dataModel'

interface PlaygroundContextType {
    userId: Id<"users"> | undefined,
    setUserId: (userId: Id<"users"> | undefined) => void,
    playground: Doc<"playgrounds"> | undefined,
    setPlayground: (playground: Doc<"playgrounds"> | undefined) => void,
}

export const PlaygroundContext = createContext<PlaygroundContextType>({
    userId: undefined,
    setUserId: () => { },
    playground: undefined,
    setPlayground: () => { },
})

interface PlaygroundContextProps {
    children: ReactNode,
    initial?: PlaygroundContextType,
}

export default function PlaygroundContextProvider({ children, initial }: PlaygroundContextProps) {
    const [userId, setUserId] = useState<Id<"users"> | undefined>(initial?.userId ?? undefined)
    const [playground, setPlayground] = useState<Doc<"playgrounds"> | undefined>(initial?.playground ?? undefined)

    return (
        <PlaygroundContext.Provider value={{ userId, setUserId, playground, setPlayground }}>
            {children}
        </PlaygroundContext.Provider>
    )
}
