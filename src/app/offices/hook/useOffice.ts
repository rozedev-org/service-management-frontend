import { appRoutes } from '@/appRoutes'
import { usePaginated } from '@/common/hooks/usePaginated'
import {
  PaginationParams,
  PaginatedResponse,
} from '@/common/interfaces/response.interface'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useNewData } from '@/states/useNewData'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { toast } from 'sonner'
import { newOffice, OfficeEntity } from '../types/office.types'
import { useRouter } from 'next/navigation'
import {
  CitiesEntity,
  StatesEntity,
  TownsEntity,
} from '../types/locations.types'

export const useOffices = () => {
  const fetchOffices = async (queryPamas: PaginationParams) => {
    setIsLoading(true)
    const response = await axiosInstace.get<PaginatedResponse<OfficeEntity>>(
      `/locations/offices`,
      { params: queryPamas }
    )
    setOffice(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
    return response.data
  }

  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<OfficeEntity>(fetchOffices)

  const [office, setOffice] = useState<OfficeEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return {
    fetchOffices,
    office,
    isLoading,
    setOffice,
    meta,
    handlePageChange,
    handlePerRowsChange,
  }
}

export const useOffice = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [office, setOffice] = useState<OfficeEntity>({
    id: 0,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    townId: 0,
  })
  const fetchoffice = async () => {
    const response = await axiosInstace.get<OfficeEntity>(
      `/locations/offices/${id}`
    )
    setOffice(response.data)
    setIsLoading(false)
    return response.data
  }

  return { office, setOffice, fetchoffice, isLoading }
}
export const useCreateofficeForm = () => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

  const officeForm = useForm<newOffice>({
    defaultValues: {
      name: '',
      townId: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.post<OfficeEntity>(
          `/locations/offices`,
          value
        )
        router.push(appRoutes.home.offices.getOne.url(response.data.id))
        toast.success(`Se ha creado la sucursal : ${response.data.name}`, {
          action: {
            label: 'Crear otra sucursal',
            onClick: () => router.push(appRoutes.home.offices.add.url(0)),
          },
        })
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            'Ha ocurrido un error al crear la sucursal'
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear la sucursal, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })
  return { officeForm, onError, errorMessage, setOnError }
}

export const useUpdateofficeForm = (office?: OfficeEntity) => {
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setIsCreating } = useNewData()

  const updateofficeForm = useForm<newOffice>({
    defaultValues: {
      name: office?.name || '',
      townId: office?.townId || 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axiosInstace.put<OfficeEntity>(
          `/locations/offices/${office?.id}`,
          value
        )
        router.push(appRoutes.home.offices.getOne.url(response.data.id))
        toast.success(`Se ha actualizado la sucursal`)
      } catch (error: any) {
        toast.error(
          error.response?.data.message ||
            `Ocurrió un error al actualizar la sucursal`
        )
        setOnError(true)
        setErrorMessage(
          error.response?.data.message ||
            'Ocurrió un error al intentar crear la sucursal, por favor intente nuevamente'
        )
      }
      setIsCreating(false)
    },
  })

  return { updateofficeForm, onError, errorMessage }
}

export const useGetStates = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [state, setState] = useState<StatesEntity[]>()
  const fetchStates = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<OfficeEntity>>(
      `/locations/state`,
      { params: queryPamas }
    )
    setState(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
    return response.data
  }
  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<OfficeEntity>(fetchStates)
  return { state, setState, fetchStates, isLoading }
}
export const useGetCities = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [city, setCity] = useState<CitiesEntity[]>()
  const fetchCities = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<CitiesEntity>>(
      `/locations/city`,
      { params: queryPamas }
    )
    setCity(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
    return response.data
  }
  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<CitiesEntity>(fetchCities)
  return { city, setCity, fetchCities, isLoading }
}

export const useGetTowns = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [town, setTown] = useState<TownsEntity[]>()
  const fetchTowns = async (queryPamas: PaginationParams) => {
    const response = await axiosInstace.get<PaginatedResponse<TownsEntity>>(
      `/locations/town`,
      { params: queryPamas }
    )
    setTown(response.data.data)
    setMeta(response.data.meta)
    setIsLoading(false)
    return response.data
  }
  const { setMeta, meta, handlePageChange, handlePerRowsChange } =
    usePaginated<TownsEntity>(fetchTowns)
  return { town, setTown, fetchTowns, isLoading }
}
