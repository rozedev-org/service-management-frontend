import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useState } from 'react'
import {
  NewReqType,
  ReqTypeEntity,
  ReqTypeFieldEntity,
} from '../../types/req.types'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { appRoutes } from '@/appRoutes'

export const useRequirementsTypes = () => {
  const fetchReqType = async () => {
    const response = await axiosInstace.get<PaginatedResponse<ReqTypeEntity>>(
      `/requirements/type?page=${1}`
    )
    setReqType(response.data.data)
    setIsLoading(false)
    return response.data
  }
  const [reqType, setReqType] = useState<ReqTypeEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return { reqType, setReqType, fetchReqType, isLoading }
}

export const useRequirementType = (id: number) => {
  const fetchReqType = async () => {
    const response = await axiosInstace.get<ReqTypeEntity>(
      `/requirements/type/${id}`
    )
    setReqType(response.data)
    setIsLoading(false)
    return response.data
  }
  const [reqType, setReqType] = useState<ReqTypeEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return { fetchReqType, reqType, setReqType, isLoading }
}

export const useCreateReqTypeForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const ReqTypeForm = useForm<NewReqType>({
    defaultValues: {
      name: '',
      requirementTypeField: [],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<ReqTypeFieldEntity>(
          `/requirements/type`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
          }
        )
        router.push(
          appRoutes.home.requirements.reqTypes.getOne.url(response.data.id)
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
  return { onError, errorMessage, ReqTypeForm }
}
