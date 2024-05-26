/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  Checkbox,
  Divider,
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

  useEffect(() => {
    if (reqType) {
      const fieldsValues = reqType.requirementTypeField.map((field) => {
        return {
          requirementTypeFieldId: field.id,
          value: '',
        }
      })
      ReqForm.setFieldValue('requirementFieldValue', fieldsValues)
    }
  }, [reqType])

  return (
    <CardContainer title='Crear Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqForm.handleSubmit()
        }}
      >
        <VStack h={'70vh'} overflow={'scroll'} overflowX={'hidden'} p={2}>
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

          <FormControl isRequired>
            <FormLabel>Tipo de Requerimiento</FormLabel>
            {ReqForm.Field({
              name: 'requirementTypeId',
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

          <ReqForm.Field name='requirementFieldValue' mode='array'>
            {(field) => {
              return (
                <VStack>
                  {field.state.value.map((_, i) => (
                    <VStack
                      key={i}
                      gap={2}
                      alignItems={'start'}
                      shadow={'xs'}
                      p={2}
                      borderRadius={'md'}
                      mb={4}
                    >
                      <Heading as='h3' size='sm'>
                        Campo {i + 1}
                      </Heading>
                      <Divider />
                      <ReqForm.Field name={`requirementFieldValue[${i}].value`}>
                        {(subField) => {
                          const reqTypeField =
                            reqType?.requirementTypeField.find(
                              (value) =>
                                value.id ===
                                field.state.value[i].requirementTypeFieldId
                            )

                          const inputType = reqTypeField?.type || 'text'

                          return (
                            <FormControl isRequired>
                              <FormLabel>{reqTypeField?.title}</FormLabel>

                              {/* For checkbox input type */}
                              {inputType === 'checkbox' && (
                                <Checkbox
                                  onBlur={subField.handleBlur}
                                  value={subField.state.value}
                                  onChange={(e) => {
                                    subField.handleChange(
                                      String(e.target.checked)
                                    )
                                  }}
                                ></Checkbox>
                              )}

                              {/* For text input type */}
                              {inputType === 'text' && (
                                <Input
                                  type={'text'}
                                  onBlur={subField.handleBlur}
                                  value={subField.state.value}
                                  onChange={(e) => {
                                    subField.handleChange(e.target.value)
                                  }}
                                />
                              )}

                              {/* For text input date */}
                              {inputType === 'date' && (
                                <Input
                                  type={'datetime-local'}
                                  onBlur={subField.handleBlur}
                                  value={subField.state.value}
                                  onChange={(e) => {
                                    subField.handleChange(e.target.value)
                                  }}
                                />
                              )}
                            </FormControl>
                          )
                        }}
                      </ReqForm.Field>
                    </VStack>
                  ))}
                </VStack>
              )
            }}
          </ReqForm.Field>

          {/* {reqType?.requirementTypeField.map((field, i) => (
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
