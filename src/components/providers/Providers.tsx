"use client"

import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode;
}

export const Providers = ({children}: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
