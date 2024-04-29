import axios from 'axios'
import { config } from '@/config'
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import {
  NewReq,
  NewReqState,
  ReqStateEntity,
  RequirementsEntity,
} from '@/app/requirements/types/req.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useForm } from '@tanstack/react-form'
import { axiosInstace } from '@/common/utils/axiosIntance'

export const useRequirementsState = () => {
  const fetchReqState = async () => {
    const response = await axiosInstace.get<PaginatedResponse<ReqStateEntity>>(
      `/req-state?page=${1}`,
      {}
    )
    return response.data
  }

  const [reqsStateQuery, setReqsStateQuery] = useState<ReqStateEntity[]>([])
  return { reqsStateQuery, setReqsStateQuery, fetchReqState }
}
export const useRequirementState = (id: number) => {
  const [reqState, setReqState] = useState<ReqStateEntity>({
    id: 0,
    title: '',
    secuence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const fetchReqState = async () => {
    const response = await axiosInstace.get<ReqStateEntity>(
      `/req-state/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` || '',
        },
      }
    )
    setReqState(response.data)
    return response.data
  }
  return { reqState, setReqState, fetchReqState }
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
          `/req-state`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
          }
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
          `/req-state/${state?.id}`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
          }
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
