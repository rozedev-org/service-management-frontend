import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'
import { FormikHelpers, useFormik } from 'formik'
export const useLoginFormOld = () => {
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

interface InitialLoginValues {
  username: string
  password: string
}

export const useLoginForm = () => {
  const { login, setIsLoggedIn } = useUserSession()
  const [loading, setLoading] = useState(false)
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const initialValues: InitialLoginValues = {
    username: '',
    password: '',
  }

  const onSubmit = async (
    values: InitialLoginValues,
    actions: FormikHelpers<InitialLoginValues>
  ) => {
    const { username, password } = values
    const onLogin = await login(username, password)
    if (onLogin) {
      router.push(appRoutes.home.url(0))
      setIsLoggedIn(true)
      setLoading(false)
    } else {
      actions.setErrors({
        password: 'Usuario o contraseña incorrectos',
        username: 'Usuario o contraseña incorrectos',
      })

      setOnError(true)
      setErrorMessage(
        'Ocurrió un error al intentar iniciar sesión, por favor intente nuevamente'
      )
      setLoading(false)
    }
  }

  const loginForm = useFormik<InitialLoginValues>({
    initialValues,
    onSubmit,
  })

  return { loginForm, onError, errorMessage, loading, setOnError }
}