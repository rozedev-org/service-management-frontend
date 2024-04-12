/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useUserId } from '@/hook/useUserId'

export function Providers({ children }: { children: React.ReactNode }) {
  const { setId } = useUserId()

  useEffect(() => {
    const userId = Number(localStorage.getItem('userID'))

    if (userId && userId !== 0) {
      setId(userId)
    }
  }, [])

  const queryClient = new QueryClient()
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  )
}
