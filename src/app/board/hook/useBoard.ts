import { config } from '@/config'
import { BoardEntity } from '../types/board.types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useBoard = () => {
  const fetchBoard = async () => {
    try {
      const response = await axios.get<BoardEntity[]>(
        `${config.bff.url}/board?page=${1}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` || '',
          },
        }
      )
      setBoardState(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const boardQuery = useQuery({
    queryKey: ['board'],
    queryFn: () => fetchBoard(),
    retry: false,
  })

  const [boardState, setBoardState] = useState<BoardEntity[]>([])

  return { boardQuery, boardState, setBoardState }
}
