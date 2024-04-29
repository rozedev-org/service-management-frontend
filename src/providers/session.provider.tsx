/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { setId, setIsLoggedIn, sessionTimeout, isLoggedIn } = useUserSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(appRoutes.home.login.url(0))
    }
  }, [isLoggedIn])

  return children
}
