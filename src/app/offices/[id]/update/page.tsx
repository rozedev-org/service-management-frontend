/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { appRoutes } from '@/appRoutes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useGetCities,
  useGetStates,
  useGetTowns,
  useOffice,
  useUpdateofficeForm,
} from '../../hook/useOffice'
import { useRouter } from 'next/navigation'
import ModalUpdateOffice from '../components/ModalUpdateOffice'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function OfficeUpdatePage({
  params,
}: {
  params: { id: number }
}) {
  const { state, fetchStates, isLoading: isLoadingState } = useGetStates()
  const { city, fetchCities, isLoading: isLoadingCity } = useGetCities()
  const { town, fetchTowns, isLoading: isLoadingTown } = useGetTowns()
  const { isLoading, fetchoffice, office } = useOffice(params.id)
  const { updateofficeForm } = useUpdateofficeForm(office)
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null)
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)

  const filteredCities = city?.filter(
    (data) => data.stateId === selectedStateId
  )
  const filteredTowns = town?.filter((data) => data.cityId === selectedCityId)

  const router = useRouter()
  const handleUpdate = async () => {
    await updateofficeForm.handleSubmit()
    router.push(appRoutes.home.offices.getOne.url(params.id))
  }

  useEffect(() => {
    fetchoffice()
  }, [])
  const queryPamas: PaginationParams = {
    page: 1,
    take: 10,
    getAll: true,
  }
  useEffect(() => {
    fetchStates(queryPamas)
  }, [])
  return (
    <CardContainer title='Actualizar Sucursal'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateofficeForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {updateofficeForm.Field({
              name: 'name',
              children: (field) => (
                <>
                  <Input
                    maxLength={30}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{field.state.meta.errors}</Text>
                  ) : null}
                </>
              ),
            })}
          </FormControl>
          <FormControl>
            <FormLabel>Estado</FormLabel>
            <Select
              defaultValue=''
              isDisabled={isLoadingState}
              onChange={async (e) => {
                await fetchCities(queryPamas)
                setSelectedStateId(Number(e.target.value))
                setSelectedCityId(null)
              }}
            >
              <option value='' disabled hidden>
                Seleccione el Estado
              </option>
              {state?.map((data) => (
                <option key={`select-form-id-${data.id}`} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {filteredCities && (
            <FormControl>
              <FormLabel>Municipio</FormLabel>
              <Select
                defaultValue=''
                isDisabled={isLoadingCity}
                onChange={async (e) => {
                  await fetchTowns(queryPamas)
                  setSelectedCityId(Number(e.target.value))
                }}
              >
                <option value='' hidden>
                  Seleccione el Municipio
                </option>
                {filteredCities?.map((data) => (
                  <option key={`select-form-id-${data.id}`} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          {/* Town */}
          {filteredTowns && (
            <FormControl isRequired>
              <FormLabel>Parroquia</FormLabel>
              {updateofficeForm.Field({
                name: 'townId',
                children: (field) => (
                  <>
                    <Select
                      defaultValue=''
                      isDisabled={isLoadingTown}
                      onChange={async (e) => {
                        field.handleChange(Number(e.target.value))
                      }}
                    >
                      <option value='' hidden>
                        Seleccione la Parroquia
                      </option>
                      {filteredTowns?.map((data) => (
                        <option
                          key={`select-form-id-${data.id}`}
                          value={data.id}
                        >
                          {data.name}
                        </option>
                      ))}
                    </Select>

                    {field.state.meta.errors ? (
                      <Text color={'red'}>{field.state.meta.errors}</Text>
                    ) : null}
                  </>
                ),
              })}
            </FormControl>
          )}
          <ModalUpdateOffice handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
