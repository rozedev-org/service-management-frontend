import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import {
  NewReq,
  RequirementEntity,
  RequirementsEntity,
} from '../types/requirements.types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { usePaginated } from '@/common/hooks/usePaginated'
import { useReqId } from '@/states/useReqId'
import { useNewData } from '@/states/useNewData'

/**
 * Custom hook for fetching requirements data.
 * @returns The requirements query object.
 */
export const useRequirements = () => {
  const fetchReqs = async (queryPamas: PaginationParams) => {
    try {
      const response = await axiosInstace.get<
        PaginatedResponse<RequirementsEntity>
      >(`/requirements`, { params: queryPamas })
      setRequirements(response.data.data)
      setMeta(response.data.meta)

      setIsLoading(false)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<RequirementsEntity>(fetchReqs)

  const [requirements, setRequirements] = useState<RequirementsEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    fetchReqs,
    requirements,
    setRequirements,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

/**
 * Custom hook to fetch a requirement by its ID.
 * @param id - The ID of the requirement to fetch.
 * @returns The requirement query object.
 */
export const useRequirement = (id: number) => {
  const fetchReq = async () => {
    const response = await axiosInstace.get<RequirementEntity>(
      `/requirements/${id}`
    )
    setRequirement(response.data)
    setIsLoading(false)
    return response.data
  }
  const [requirement, setRequirement] = useState<RequirementEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return { fetchReq, requirement, setRequirement, isLoading }
}

/**
 * Custom hook for creating a requirement form.
 * @returns An object containing the `ReqForm`, `onError`, and `errorMessage`.
 */
export const useCreateReqForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setIsCreating } = useNewData()
  const { setId } = useReqId()
  const ReqForm = useForm<NewReq>({
    defaultValues: {
      title: '',
      userId: null,
      stateId: 1,
      requirementTypeId: 0,
      requirementFieldValue: [],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<RequirementsEntity>(
          `/requirements`,
          value
        )
        setId(response.data.id)
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el requerimiento, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })

  return { ReqForm, onError, errorMessage }
}

/**
 * Custom hook for updating a requirement form.
 * @param req - The requirement entity to be updated.
 * @returns An object containing the updateReqForm, onError, and errorMessage.
 */
export const useUpdateReqForm = (req?: RequirementEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setIsCreating } = useNewData()
  const updateReqForm = useForm<NewReq>({
    defaultValues: {
      title: req?.title || '',
      userId: req?.userId || null,
      stateId: req?.stateId || 1,
      requirementTypeId: req?.requirementTypeId || 0,
      requirementFieldValue:
        req?.requirementFieldValue && Array.isArray(req.requirementFieldValue)
          ? req.requirementFieldValue.map((field) => ({
              requirementTypeFieldId: field.requirementTypeField.id,
              value: field.value,
            }))
          : [],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<RequirementsEntity>(
          `/requirements/${req?.id}`,
          value
        )
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response.data.message ||
            'Ocurrió un error al intentar actualizar el requerimiento, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { updateReqForm, onError, errorMessage }
}
