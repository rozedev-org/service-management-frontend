import { ReqActionsActions } from '../types/requirements.types'
import { config } from '@/config'
import { useState } from 'react'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useRefreshSignal } from '@/app/board/states/useRefreshSignal'
import { toast } from 'sonner'

/**
 * Custom hook to fetch requirement actions.
 * @param reqId - The ID of the requirement.
 * @returns The result of the query to fetch requirement actions.
 */
export const useReqActions = (reqId: number) => {
  const fetchReqActions = async () => {
    try {
      const response = await axiosInstace.get<ReqActionsActions>(
        `/requirements/actions/${reqId}`
      )
      setReqActions(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateReqAction = async (newReqStateId: number) => {
    try {
      await axiosInstace.put(`/requirements/${reqId}`, {
        stateId: newReqStateId,
      })
      await fetchReqActions()
      toast.success(`Se ha actualizado el estado del requerimiento`)
    } catch (error) {
      console.log(error)
      toast.error(
        `Ha ocurrido un error al actualizar el estado del requerimiento`
      )
    }
  }

  const [reqActions, setReqActions] = useState<ReqActionsActions>({
    current: {
      id: 0,
      title: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      secuence: 0,
    },
    remaining: [],
  })
  return { reqActions, fetchReqActions, updateReqAction }
}
