'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import React, { useEffect, useState } from 'react'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <CardContainer title='Login' isLoading={isLoading}>
      <LoginForm />
    </CardContainer>
  )
}
