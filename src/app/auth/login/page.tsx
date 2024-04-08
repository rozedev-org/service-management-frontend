'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import React from 'react'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  return (
    <CardContainer title='Login'>
      <LoginForm />
    </CardContainer>
  )
}
