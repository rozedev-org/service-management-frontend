import axios from 'axios'
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { NewReq, RequirementsEntity } from '../types/req.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { config } from '@/config'

/**
 * Custom hook for fetching requirements data.
 * @returns The requirements query object.
 */
export const useRequirements = () => {
  const fetchReq = async () => {
    try {
      const response = await axios.get<PaginatedResponse<RequirementsEntity>>(
        `${config.bff.url}/requirements?page=${1}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` || '',
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const requirementsQuery = useQuery({
    queryKey: ['requirements'],
    queryFn: () => fetchReq(),
  })
  return requirementsQuery
}

/**
 * Custom hook to fetch a requirement by its ID.
 * @param id - The ID of the requirement to fetch.
 * @returns The requirement query object.
 */
export const useRequirement = (id: number) => {
  const fetchReq = async () => {
    const response = await axios.get<RequirementsEntity>(
      `${config.bff.url}/requirements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` || '',
        },
      }
    )
    return response.data
  }
  const requirementQuery = useQuery({
    queryKey: ['requirement'],
    queryFn: () => fetchReq(),
  })
  return requirementQuery
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
      userId: 0,
      stateId: 1,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post<RequirementsEntity>(
          `${config.bff.url}/requirements`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
          }
        )
        router.push(`/requirements/${response.data.id}`)
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
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.put<RequirementsEntity>(
          `${config.bff.url}/requirements/${req?.id}`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
          }
        )
        router.push(`/requirements/${response.data.id}`)
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
