import { NewUser, UserEntity } from '@/app/users/types/user.types'
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { AxiosErrorHandler } from '@/common/utils/axios-error-handler'
import { ErrorDictionarProps } from '@/common/utils/error-dictionary'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { appRoutes } from '@/appRoutes'
import { config } from '@/config'

export const useUsers = () => {
  const fetchUsers = async () => {
    // try {
    const response = await axios.get<PaginatedResponse<UserEntity>>(
      `${config.bff.url}/users?page=${1}`
    )
    return response.data
    // } catch (error: any) {
    //   const errorDictionarProps: ErrorDictionarProps = {
    //     errorType: 'internal',
    //     resource: 'usuarios',
    //     definiteArticles: 'los',
    //   }
    //   AxiosErrorHandler(error, errorDictionarProps)
    // }
  }

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return usersQuery
}

export const useUser = (id: number) => {
  const fetchUsers = async () => {
    // try {
    const response = await axios.get<UserEntity>(
      `${config.bff.url}/users/${id}`
    )
    return response.data
    // } catch (error: any) {
    //   const errorDictionarProps: ErrorDictionarProps = {
    //     errorType: 'internal',
    //     resource: 'usuarios',
    //     definiteArticles: 'los',
    //   }
    //   AxiosErrorHandler(error, errorDictionarProps)
    // }
  }

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUsers(),
  })

  return userQuery
}
export const useCreateUserForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const userForm = useForm<NewUser>({
    defaultValues: {
      userName: '',
      lastName: '',
      firstName: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post<UserEntity>(
          `${config.bff.url}/users`,
          value
        )
        router.push(`/users/${response.data.id}`)
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
    },
  })

  return { userForm, onError, errorMessage }
}

export const useUpdateUserForm = (user?: UserEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const updateUserForm = useForm<NewUser>({
    defaultValues: {
      userName: user?.userName || '',
      lastName: user?.lastName || '',
      firstName: user?.firstName || '',
      password: user?.password || '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.put<UserEntity>(
          `${config.bff.url}/users/${user?.id}`,
          value
        )
        router.push(`/users/${response.data.id}`)
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
    },
  })

  return { updateUserForm, onError, errorMessage }
}
