import {
  PaginatedResponse,
  PaginationParams,
} from '@/common/interfaces/response.interface'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { CustomerEntity, NewCustomer } from '../types/customer.types'
import { usePaginated } from '@/common/hooks/usePaginated'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNewData } from '@/states/useNewData'
import { useForm } from '@tanstack/react-form'
import { appRoutes } from '@/appRoutes'
import { toast } from 'sonner'

export const useCustomers = () => {
  const fetchCustomers = async (queryPamas: PaginationParams) => {
    setIsLoading(true)
    const response = await axiosInstace.get<PaginatedResponse<CustomerEntity>>(
      `/customers`,
      { params: queryPamas }
    )
    setCustomer(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
    return response.data
  }

  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<CustomerEntity>(fetchCustomers)

  const [customer, setCustomer] = useState<CustomerEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    fetchCustomers,
    customer,
    isLoading,
    setCustomer,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

export const useCustomer = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [customer, setCustomer] = useState<CustomerEntity>({
    id: 0,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const fetchCustomer = async () => {
    const response = await axiosInstace.get<CustomerEntity>(`/customers/${id}`)
    setCustomer(response.data)
    setIsLoading(false)
    return response.data
  }

  return { customer, setCustomer, fetchCustomer, isLoading }
}
export const useCreateCustomerForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

  const customerForm = useForm<NewCustomer>({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<CustomerEntity>(
          `/customers`,
          value
        )
        router.push(appRoutes.home.customers.getOne.url(response.data.id))
        toast.success(`Se ha creado el cliente : ${response.data.name}`, {
          action: {
            label: 'Crear otro cliente',
            onClick: () => router.push(appRoutes.home.customers.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear el cliente'
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el cliente, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { customerForm, onError, errorMessage, setOnError }
}

export const useUpdateCustomerForm = (customer?: CustomerEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

  const updateCustomerForm = useForm<NewCustomer>({
    defaultValues: {
      name: customer?.name || '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<CustomerEntity>(
          `/customers/${customer?.id}`,
          value
        )
        router.push(appRoutes.home.customers.getOne.url(response.data.id))
        toast.success(`Se ha actualizado el cliente`)
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            `Ocurrió un error al actualizar el cliente`
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear el cliente, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })

  return { updateCustomerForm, onError, errorMessage }
}
