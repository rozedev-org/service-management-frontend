
import axios from 'axios'
import { config } from '@/config'
import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import {
  NewReqState,
  ReqStateEntity,
  RequirementsEntity,
} from '@/app/requirements/types/req.types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useForm } from '@tanstack/react-form'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { usePaginated } from '@/common/hooks/usePaginated'

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
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el requerimiento, por favor intente nuevamente'
        )
      }
    },
  })

  return { ReqStateForm, onError, errorMessage }
}

export const useReqUpdateForm = (state?: ReqStateEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
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
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
    },
  })
  return { updateReqStateForm, onError, errorMessage }
}
