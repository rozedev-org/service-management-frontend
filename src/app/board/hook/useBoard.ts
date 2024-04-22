import { config } from '@/config'
import { BoardEntity } from '../types/board.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { axiosInstace } from '@/common/utils/axiosIntance'

export const useBoard = () => {
  const fetchBoard = async () => {
    try {
      const response = await axiosInstace.get<BoardEntity[]>(
        `/board?page=${1}`,
        {
          withCredentials: true,
        }
      )
      setBoardState(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const [boardState, setBoardState] = useState<BoardEntity[]>([])

  return { boardState, setBoardState, fetchBoard }
}
