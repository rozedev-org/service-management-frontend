/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useCreateReqForm } from '../hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { useEffect } from 'react'
import {
  useRequirementType,
  useRequirementsTypes,
} from '../req-types/hook/useRequirementsTypes'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useReqId } from '@/states/useReqId'

export default function AddReq() {
  const router = useRouter()
  const { id, setId } = useReqId()
  const { ReqForm } = useCreateReqForm()
  const { user, fetchUsers, isLoading: isLoadingUsers } = useUsers()
  const {
    fetchReqTypes,
    reqTypes,
    isLoading: isLoadingReqTypes,
  } = useRequirementsTypes()

  const {
    fetchReqType,
    isLoading: isLoadingReqType,
    reqType,
  } = useRequirementType()

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    }
    fetchUsers(queryPamas)
    fetchReqTypes(queryPamas)
  }, [])

  useEffect(() => {
    if (id !== 0) {
      router.push(appRoutes.home.requirements.getOne.url(id))
      setId(0)
    }
  }, [id])

  return (
    <CardContainer title='Crear Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqForm.handleSubmit()
        }}
      >
        <VStack>
          <FormControl>
            <FormLabel>Responsable</FormLabel>
            {ReqForm.Field({
              name: 'userId',
              children: (field) => (
                <Select
                  isDisabled={isLoadingUsers}
                  placeholder='Selecciona al responsable'
                  onChange={(e) =>
                    field.handleChange(Number(e.currentTarget.value))
                  }
                >
                  {user.map((data) => (
                    <option key={`select-form-id-${data.id}`} value={data.id}>
                      {data.userName}
                    </option>
                  ))}
                </Select>
              ),
            })}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {ReqForm.Field({
              name: 'title',
              children: (field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              ),
            })}
          </FormControl>

          {/* <FormControl isRequired>
            <FormLabel>Tipo de Requerimiento</FormLabel>
            {ReqForm.Field({
              name: 'reqTypeId',
              children: (field) => (
                <Select
                  defaultValue=''
                  isDisabled={isLoadingReqTypes}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={async (e) => {
                    field.handleChange(Number(e.target.value))
                    await fetchReqType(Number(e.target.value))
                  }}
                >
                  <option value='' disabled hidden>
                    Seleccione el tipo de requerimiento
                  </option>
                  {reqTypes.map((data) => (
                    <option key={`select-form-id-${data.id}`} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </Select>
              ),
            })}
          </FormControl>
          {isLoadingReqType && <Spinner />}
          {reqType && (
            <Heading as='h3' size='sm' pt='20px' mr={'auto'}>
              Detalle de requerimiento
            </Heading>
          )}

          {reqType?.requirementTypeField.map((field, i) => (
            <FormControl key={`req-typ-${i}`}>
              <FormLabel>{field.title}</FormLabel>
              <Input type={field.type} />
            </FormControl>
          ))} */}
          <Button type='submit'>Guardar</Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
