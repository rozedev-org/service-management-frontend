import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'

export const useLoginForm = () => {
  const [onError, setOnError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { login, setIsLoggedIn } = useUserSession()

  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      const onLogin = await login(value.username, value.password)
      if (onLogin) {
        router.push(appRoutes.home.url(0))
        setIsLoggedIn(true)
        setLoading(false)
      } else {
        setOnError(true)
        setErrorMessage(
          'Ocurrió un error al intentar iniciar sesión, por favor intente nuevamente'
        )
        setLoading(false)
      }
    },
  })

  return { loginForm, onError, errorMessage, loading, setOnError }
}
