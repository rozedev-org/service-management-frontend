import { NewUser, User } from '@/app/users/types/user.types'
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { AxiosErrorHandler } from '@/common/utils/axios-error-handler'
import { ErrorDictionarProps } from '@/common/utils/error-dictionary'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useUser = () => {
  const fetchUsers = async () => {
    // try {
    const response = await axios.get<PaginatedResponse<User>>(
      `http://localhost:8000/api/service-manager-service/v1/users?page=${1}`
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
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return userQuery
}

export const useUserForm = () => {
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
        const response = await axios.post<User>(
          `http://localhost:8000/api/service-manager-service/v1/users`,
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
