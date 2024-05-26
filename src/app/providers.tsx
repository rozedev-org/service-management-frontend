/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useUserSession } from '@/states/useUserId'
import { UserSessionProvider } from '@/providers/session.provider'
import dynamic from 'next/dynamic'
const ChakraProvider = dynamic(
  () => import('@chakra-ui/react').then((mod) => mod.ChakraProvider),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  const { setId } = useUserSession()

  useEffect(() => {
    const userId = Number(localStorage.getItem('userID'))
    if (userId && userId !== 0) {
      setId(userId)
    }
  }, [])

  const queryClient = new QueryClient()
  return (
    <ChakraProvider theme={theme}>
      <UserSessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </UserSessionProvider>
    </ChakraProvider>
  )
}
