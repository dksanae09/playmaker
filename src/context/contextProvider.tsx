"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./themeProvider"

export default function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
        </ThemeProvider>
    )
};