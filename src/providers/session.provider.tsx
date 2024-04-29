'use client'

import { useUserSession } from '@/states/useUserId'
import { useEffect } from 'react'

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { setId, setIsLoggedIn, sessionTimeout } = useUserSession()

  useEffect(() => {}, [])

  return children
}
