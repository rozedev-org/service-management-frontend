import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { AxiosErrorHandler } from '@/common/utils/axios-error-handler'
import { ErrorDictionarProps } from '@/common/utils/error-dictionary'
import axios from 'axios'
import { useState } from 'react'

export interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
  password: string
}

export const useUser = () => {
  const [users, setUsers] = useState<PaginatedResponse<User>>({
    data: [],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  })

  const fetchUsers = async (page: number) => {
    try {
      const response = await axios.get<PaginatedResponse<User>>(
        `http://localhost:8000/api/service-manager-service/v1/users?page=${page}`
      )
      setUsers(response.data)
    } catch (error: any) {
      const errorDictionarProps: ErrorDictionarProps = {
        errorType: 'internal',
        resource: 'usuarios',
        definiteArticles: 'los',
      }
      AxiosErrorHandler(error, errorDictionarProps)
    }
  }

  return { users, fetchUsers }
}
