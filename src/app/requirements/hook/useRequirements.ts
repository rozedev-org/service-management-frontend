import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import { NewReq, RequirementsEntity } from '../types/req.types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { usePaginated } from '@/common/hooks/usePaginated'

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
    const response = await axiosInstace.get<RequirementsEntity>(
      `/requirements/${id}`
    )
    setRequirement(response.data)
    setIsLoading(false)
    return response.data
  }
  const [requirement, setRequirement] = useState<RequirementsEntity>()
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
  const router = useRouter()

  const ReqForm = useForm<NewReq>({
    defaultValues: {
      title: '',
      userId: null,
      stateId: 0,
      reqTypeId: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<RequirementsEntity>(
          `/requirements`,
          value
        )
        router.push(appRoutes.home.requirements.getOne.url(response.data.id))
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el requerimiento, por favor intente nuevamente'
        )
      }
    },
  })

  return { ReqForm, onError, errorMessage }
}

/**
 * Custom hook for updating a requirement form.
 * @param req - The requirement entity to be updated.
 * @returns An object containing the updateReqForm, onError, and errorMessage.
 */
export const useUpdateReqForm = (req?: RequirementsEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const updateReqForm = useForm<NewReq>({
    defaultValues: {
      title: req?.title || '',
      userId: req?.userId || null,
      stateId: req?.stateId || 1,
      reqTypeId: req?.reqTypeId || 1,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<RequirementsEntity>(
          `/requirements/${req?.id}`,
          value
        )
        router.push(appRoutes.home.requirements.getOne.url(response.data.id))
      } catch (error: any) {
        setOnError(true)
        setErrorMessage(
          error.response.data.message ||
            'Ocurrió un error al intentar actualizar el requerimiento, por favor intente nuevamente'
        )
      }
    },
  })
  return { updateReqForm, onError, errorMessage }
}
