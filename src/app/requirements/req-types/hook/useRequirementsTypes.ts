import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { appRoutes } from '@/appRoutes'
import { usePaginated } from '@/common/hooks/usePaginated'
import { ReqTypeFieldEntity } from '../../types/requirement-type-field'
import {
  ReqTypeEntity,
  NewReqType,
  UpdateReqType,
} from '../../types/requirement-type.types'

export const useRequirementsTypes = () => {
  const fetchReqTypes = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<ReqTypeEntity>>(
      `/requirements/type`,
      { params: queryPamas }
    )
    setReqType(response.data.data)
    setMeta(response.data.meta)

    setIsLoading(false)
    return response.data
  }
  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<ReqTypeEntity>(fetchReqTypes)

  const [reqTypes, setReqType] = useState<ReqTypeEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    reqTypes,
    setReqType,
    fetchReqTypes,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

export const useRequirementType = () => {
  const fetchReqType = async (id: number) => {
    setIsLoading(true)
    const response = await axiosInstace.get<ReqTypeEntity>(
      `/requirements/type/${id}`
    )
    setReqType(response.data)
    setIsLoading(false)
    return response.data
  }
  const [reqType, setReqType] = useState<ReqTypeEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return { fetchReqType, reqType, setReqType, isLoading }
}

export const useCreateReqTypeForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const reqTypeForm = useForm<NewReqType>({
    defaultValues: {
      name: '',
      requirementTypeField: [{ title: '', type: '', order: 0 }],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<ReqTypeFieldEntity>(
          `/requirements/type`,
          value
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
  return { onError, errorMessage, reqTypeForm }
}

export const useReqTypeUpdateForm = (state?: ReqTypeEntity) => {
  const [loading, setLoading] = useState(false)
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const updateReqTypeForm = useForm<UpdateReqType>({
    defaultValues: {
      name: state?.name || '',
      requirementTypeField: state?.requirementTypeField || [],
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const response = await axiosInstace.put<ReqTypeEntity>(
          `/requirements/type/${state?.id}`,
          value
        )
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el usuario, por favor intente nuevamente'
        )
      }
    },
  })
  return { updateReqTypeForm, onError, errorMessage, loading, setLoading }
}
