/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  useCreateofficeForm,
  useGetCities,
  useGetStates,
  useGetTowns,
} from '../hook/useOffice'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { LoadItem } from '@/components/layout/default/Loading '
import { useNewData } from '@/states/useNewData'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Select,
} from '@chakra-ui/react'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function OfficeAddPage() {
  const { creating, setIsCreating } = useNewData()
  const { state, fetchStates, isLoading: isLoadingState } = useGetStates()
  const { city, fetchCities, isLoading: isLoadingCity } = useGetCities()
  const { town, fetchTowns, isLoading: isLoadingTown } = useGetTowns()
  const { officeForm } = useCreateofficeForm()

  const [validating, setValidating] = useState(false)
  const [nameInput, setNameInput] = useState(false)
  const [townInput, setTownInput] = useState(false)

  const [selectedStateId, setSelectedStateId] = useState<number | null>(null)
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)

  const filteredCities = city?.filter(
    (data) => data.stateId === selectedStateId
  )
  const filteredTowns = town?.filter((data) => data.cityId === selectedCityId)

  const handleSubmit = () => {
    setIsCreating(true)
    officeForm.handleSubmit()
  }
  useEffect(() => {
    if (nameInput && townInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [nameInput, townInput])

  const queryPamas: PaginationParams = {
    page: 1,
    take: 10,
    getAll: true,
  }
  useEffect(() => {
    fetchStates(queryPamas)
  }, [])

  return (
    <CardContainer title='Crear Sucursal'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void officeForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {officeForm.Field({
              name: 'name',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1 && value.length <= 29) {
                    setNameInput(true)
                    return undefined
                  }
                  if (value.length === 30) {
                    setNameInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setNameInput(false)
                    return 'Este campo no puede estar vacio'
                  }
                },
              },
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
          <FormControl isRequired>
            <FormLabel>Estado</FormLabel>
            <Select
              defaultValue=''
              isDisabled={isLoadingState}
              onChange={async (e) => {
                await fetchCities(queryPamas)
                setSelectedStateId(Number(e.target.value))
                setSelectedCityId(null)
                setTownInput(false)
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
            <FormControl isRequired>
              <FormLabel>Municipio</FormLabel>
              <Select
                defaultValue=''
                isDisabled={isLoadingCity}
                onChange={async (e) => {
                  await fetchTowns(queryPamas)
                  setSelectedCityId(Number(e.target.value))
                  setTownInput(false)
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
              {officeForm.Field({
                name: 'townId',
                validators: {
                  onChange: ({ value }) => {
                    if (value !== 0) {
                      setTownInput(true)
                      return undefined
                    } else {
                      setTownInput(false)
                      return 'Este campo no puede estar vacio'
                    }
                  },
                },
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
          {creating && <LoadItem />}
          <Button
            isDisabled={!validating}
            isLoading={creating}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
