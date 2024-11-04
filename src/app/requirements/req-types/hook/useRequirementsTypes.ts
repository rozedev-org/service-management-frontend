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
import { toast } from 'sonner'

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

export const useCreateReqTypeForm = (dataTable: NewReqType) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const reqTypeForm = useForm<NewReqType>({
    defaultValues: {
      name: '',
      requirementTypeField: [
        { title: '', type: '', order: 0, isOptional: false, isRequired: false },
      ],
    },
    onSubmit: async () => {
      try {
        const response = await axiosInstace.post<ReqTypeFieldEntity>(
          `/requirements/type`,
          dataTable
        )
        router.push(
          appRoutes.home.requirements.reqTypes.getOne.url(response.data.id)
        )
        toast.success(`Se ha creado correctamente`, {
          action: {
            label: 'Crear nuevamente',
            onClick: () =>
              router.push(appRoutes.home.requirements.reqTypes.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear el tipo'
        )
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

export const useReqTypeUpdateForm = (dataTable?: ReqTypeEntity) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const updateReqTypeForm = useForm<UpdateReqType>({
    defaultValues: {
      name: dataTable?.name || '',
      requirementTypeField: dataTable?.requirementTypeField || [],
    },
    onSubmit: async () => {
      setIsLoading(true)
      try {
        const { id, ...dataToUpdate } = dataTable!
        const response = await axiosInstace.put<UpdateReqType>(
          `/requirements/type/${dataTable?.id}`,
          dataToUpdate
        )
        setIsLoading(false)
        toast.success(`Se ha actualizado correctamente`)
        router.push(appRoutes.home.requirements.reqTypes.getOne.url(id))
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            `Ocurrió un error al actualizar el tipo`
        )
        setIsLoading(false)
      }
    },
  })
  return { updateReqTypeForm, isLoading }
}
