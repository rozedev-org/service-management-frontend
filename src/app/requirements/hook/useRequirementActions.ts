import axios from 'axios'
import { ReqActionsActions } from '../types/req.types'
import { config } from '@/config'
import { useState } from 'react'

/**
 * Custom hook to fetch requirement actions.
 * @param reqId - The ID of the requirement.
 * @returns The result of the query to fetch requirement actions.
 */
export const useReqActions = (reqId: number) => {
  const fetchReqActions = async () => {
    try {
      const response = await axios.get<ReqActionsActions>(
        `${config.bff.url}/requirements/actions/${reqId}`
      )
      setReqActions(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateReqAction = async (newReqStateId: number) => {
    try {
      await axios.put(`${config.bff.url}/requirements/${reqId}`, {
        stateId: newReqStateId,
      })

      await fetchReqActions()
    } catch (error) {
      console.log(error)
    }
  }

  const [reqActions, setReqActions] = useState<ReqActionsActions>({
    current: { id: 0, title: '', createdAt: '', updatedAt: '', secuence: 0 },
    remaining: [],
  })

  return { reqActions, fetchReqActions, updateReqAction }
}
