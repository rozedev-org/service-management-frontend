import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoginEntity } from '../types/login.types'
import { config } from '@/config'
import axios from 'axios'
import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'
import { axiosInstace } from '@/common/utils/axiosIntance'

export const useLoginForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { login } = useUserSession()

  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const onLogin = await login(value.username, value.password)
      if (onLogin) {
        router.push(appRoutes.home.url(0))
      } else {
        setOnError(true)
        setErrorMessage(
          'Ocurrió un error al intentar iniciar sesión, por favor intente nuevamente'
        )
      }
    },
  })

  return { loginForm, onError, errorMessage }
}
