import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useForm } from '@tanstack/react-form'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { usePaginated } from '@/common/hooks/usePaginated'
import {
  ReqStateEntity,
  NewReqState,
} from '@/app/requirements/types/requirement-state.type'
import { RequirementsEntity } from '@/app/requirements/types/requirements.types'
import { useNewData } from '@/states/useNewData'
import { toast } from 'sonner'

export const useRequirementsState = () => {
  const fetchReqState = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<ReqStateEntity>>(
      `/requirements/state`,
      { params: queryPamas }
    )
    setReqsState(response.data.data)
    setMeta(response.data.meta)

    setIsLoading(false)

    return response.data
  }

  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<ReqStateEntity>(fetchReqState)
  const [reqsState, setReqsState] = useState<ReqStateEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    reqsState,
    setReqsState,
    fetchReqState,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}
export const useRequirementState = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reqState, setReqState] = useState<ReqStateEntity>({
    id: 0,
    title: '',
    secuence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const fetchReqState = async () => {
    const response = await axiosInstace.get<ReqStateEntity>(
      `/requirements/state/${id}`
    )
    setReqState(response.data)
    setIsLoading(false)
    return response.data
  }
  return { reqState, setReqState, fetchReqState, isLoading }
}
export const useCreateReqStateForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()
  const ReqStateForm = useForm<NewReqState>({
    defaultValues: {
      title: '',
      secuence: 1,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<RequirementsEntity>(
          `/requirements/state`,
          value
        )
        router.push(
          appRoutes.home.settings.reqState.getOne.url(response.data.id)
        )
        toast.success(`Se ha creado el estado ${response.data.title}`, {
          action: {
            label: 'Crear otro estado',
            onClick: () =>
              router.push(appRoutes.home.settings.reqState.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear el estado'
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el requerimiento, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })

  return { ReqStateForm, onError, errorMessage }
}

export const useReqUpdateForm = (state?: ReqStateEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()
  const updateReqStateForm = useForm<NewReqState>({
    defaultValues: {
      title: state?.title || '',
      secuence: state?.secuence || 1,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<ReqStateEntity>(
          `/requirements/state/${state?.id}`,
          value
        )
        router.push(
          appRoutes.home.settings.reqState.getOne.url(response.data.id)
        )
        toast.success(`Se ha actualizado el estado`)
      } catch (error: any) {
        toast.error(
          error.response.data.message ||
            `Ha ocurrido un error al actualizar el estado `
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
  return { updateReqStateForm, onError, errorMessage }
}
