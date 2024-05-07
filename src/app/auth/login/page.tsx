/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import React, { useEffect, useState } from 'react'
import { LoginForm } from './components/LoginForm'
import { useUserSession } from '@/states/useUserId'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { isLoggedIn } = useUserSession()
  const router = useRouter()
  useEffect(() => {
    if (isLoggedIn) {
      router.push(appRoutes.home.url(0))
    }
    setIsLoading(false)
  }, [isLoggedIn])

  return (
    <CardContainer title='Login' isLoading={isLoading}>
      <LoginForm />
    </CardContainer>
  )
}
