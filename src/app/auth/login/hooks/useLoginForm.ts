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
  const { setId, setSessionExpiration, setIsLoggedIn } = useUserSession()

  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<LoginEntity>(
          `/auth/login`,
          value
        )
        setId(response.data.user.id)
        setIsLoggedIn(true)
        setSessionExpiration(response.data.expiresIn)
        debugger
        router.push(appRoutes.home.url(0))
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar iniciar sesión, por favor intente nuevamente'
        )
      }
    },
  })

  return { loginForm, onError, errorMessage }
}
