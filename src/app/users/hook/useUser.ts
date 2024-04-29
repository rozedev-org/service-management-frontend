import { NewUser, UserEntity } from '@/app/users/types/user.types'
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { AxiosErrorHandler } from '@/common/utils/axios-error-handler'
import { ErrorDictionarProps } from '@/common/utils/error-dictionary'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { appRoutes } from '@/appRoutes'
import { config } from '@/config'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { BoardEntity } from '@/app/board/types/board.types'

export const useUsers = () => {
  const fetchUsers = async () => {
    // try {
    const response = await axiosInstace.get<PaginatedResponse<UserEntity[]>>(
      `/users?page=${1}`
    )
    setUser(response.data)
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

  const [user, setUser] = useState<UserEntity[]>([])

  return { fetchUsers, user, setUser }
}

export const useUser = (id: number) => {
  const [onError, setOnError] = useState(false)
  const [user, setUser] = useState<UserEntity>({
    id: 0,
    userName: '',
    lastName: '',
    firstName: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const fetchUser = async () => {
    // try {

    const response = await axiosInstace.get<UserEntity>(`/users/${id}`)
    setUser(response.data)
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

  return { user, setUser, fetchUser }
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
        const response = await axiosInstace.post<UserEntity>(`/users`, value)
        router.push(appRoutes.home.users.getOne.url(response.data.id))
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
        const response = await axiosInstace.put<UserEntity>(
          `/users/${user?.id}`,
          value
        )
        router.push(appRoutes.home.users.getOne.url(response.data.id))
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

export const useUserReqDetail = (id: number) => {
  const fetchBoard = async () => {
    try {
      const response = await axiosInstace.get<BoardEntity[]>(
        `/users/${id}/requirements`,
        {
          withCredentials: true,
        }
      )
      setuserDetail(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const [userDetail, setuserDetail] = useState<BoardEntity[]>([])

  return { userDetail, setuserDetail, fetchBoard }
}
