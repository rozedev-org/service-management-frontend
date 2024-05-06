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
  const { validateSession, isExpired } = useUserSession()

  const router = useRouter()

  const handleValidateSession = async () => {
    const result = await validateSession()
    if (!result) {
      router.push(appRoutes.home.login.url(0))
    }
  }
  useEffect(() => {
    handleValidateSession()
  }, [])

  useEffect(() => {
    if (isExpired) {
      router.push(appRoutes.home.login.url(0))
    }
  }, [isExpired])

  return children
}
