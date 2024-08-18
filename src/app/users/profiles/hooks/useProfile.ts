import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import { axiosInstace } from '@/common/utils/axiosIntance'
import {
  NewProfile,
  ProfileEntity,
  UpdateProfile,
} from '../types/profile.types'
import { usePaginated } from '@/common/hooks/usePaginated'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { appRoutes } from '@/appRoutes'
import { toast } from 'sonner'
import { useNewData } from '@/states/useNewData'

export const useProfiles = () => {
  const fetchProfiles = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<ProfileEntity>>(
      `/profiles`,
      { params: queryPamas }
    )
    setProfile(response.data.data)
    setMeta(response.data.meta)
    return response.data
  }
  const { handlePageChange, handlePerRowsChange, meta, page, setMeta } =
    usePaginated<ProfileEntity>(fetchProfiles)

  const [profile, setProfile] = useState<ProfileEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  return {
    profile,
    setProfile,
    fetchProfiles,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

export const useProfile = () => {
  const fetchProfile = async (id: number) => {
    setIsLoading(true)
    const response = await axiosInstace.get<ProfileEntity>(`/profiles/${id}`)
    setProfile(response.data)
    setIsLoading(false)
    return response.data
  }
  const [profile, setProfile] = useState<ProfileEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return { fetchProfile, profile, setProfile, isLoading }
}

export const useCreateProfile = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

  const ProfileForm = useForm<NewProfile>({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<ProfileEntity>(
          `/profiles`,
          value
        )
        router.push(appRoutes.home.users.profile.getOne.url(response.data.id))
        toast.success(`Se ha creado correctamente`, {
          action: {
            label: 'Crear nuevamente',
            onClick: () => router.push(appRoutes.home.users.profile.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear el perfil'
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { onError, errorMessage, ProfileForm }
}

export const useProfileUpdateForm = (state?: ProfileEntity) => {
  const [loading, setLoading] = useState(false)
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setIsCreating } = useNewData()
  const ProfileUpdateForm = useForm<UpdateProfile>({
    defaultValues: {
      name: state?.name || '',
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const response = await axiosInstace.put<ProfileEntity>(
          `/profiles/${state?.id}`,
          value
        )
        setLoading(false)
        toast.success(`Se ha actualizado correctamente`)
      } catch (error: any) {
        toast.error(error.response?.data.message || `Ocurrió un error`)
        setLoading(false)
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { ProfileUpdateForm, onError, errorMessage, loading, setLoading }
}
