import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { AxiosErrorHandler } from '@/common/utils/axios-error-handler'
import { ErrorDictionarProps } from '@/common/utils/error-dictionary'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
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
  const fetchUsers = async () => {
    // try {
    const response = await axios.get<PaginatedResponse<User>>(
      `http://localhost:8000/api/service-manager-service/v1/users?page=${1}`
    )
    return response.data
    // } catch (error: any) {
    //   const errorDictionarProps: ErrorDictionarProps = {
    //     errorType: 'internal',
    //     resource: 'usuarios',
    //     definiteArticles: 'los',
    //   }
    //   AxiosErrorHandler(error, errorDictionarProps)
    // }
  }

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return userQuery
}
