import { NewUser, UserEntity } from '@/app/users/types/user.types'
import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { BoardEntity } from '@/app/board/types/board.types'
import { usePaginated } from '@/common/hooks/usePaginated'
import { useNewData } from '@/states/useNewData'
import { toast } from 'sonner'

export const useUsers = () => {
  const fetchUsers = async (queryPamas: PaginationParams) => {
    // try {
    setIsLoading(true)

    const response = await axiosInstace.get<PaginatedResponse<UserEntity>>(
      `/users`,
      { params: queryPamas }
    )
    setUser(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
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

  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<UserEntity>(fetchUsers)

  const [user, setUser] = useState<UserEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    fetchUsers,
    user,
    isLoading,
    setUser,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

export const useUser = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
    setIsLoading(false)
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

  return { user, setUser, fetchUser, isLoading }
}
export const useCreateUserForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

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
        toast.success(`Se ha creado el usuario : ${response.data.userName}`, {
          action: {
            label: 'Crear otro usuario',
            onClick: () => router.push(appRoutes.home.users.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear el usuario'
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { userForm, onError, errorMessage, setOnError }
}

export const useUpdateUserForm = (user?: UserEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { creating, setIsCreating } = useNewData()

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
        toast.success(`Se ha actualizado el usuario`)
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            `Ocurrió un error al actualizar el usuario`
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })

  return { updateUserForm, onError, errorMessage }
}

export const useUserReqDetail = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const fetchBoard = async () => {
    try {
      const response = await axiosInstace.get<BoardEntity[]>(
        `/users/${id}/requirements`,
        {
          withCredentials: true,
        }
      )
      setuserDetail(response.data)
      setIsLoading(false)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const [userDetail, setuserDetail] = useState<BoardEntity[]>([])

  return { userDetail, setuserDetail, fetchBoard, isLoading }
}
