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
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useCreateReqForm } from '../hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { useEffect, useState } from 'react'
import {
  useRequirementType,
  useRequirementsTypes,
} from '../req-types/hook/useRequirementsTypes'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useReqId } from '@/states/useReqId'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { useNewData } from '@/states/useNewData'
import { LoadItem } from '@/components/layout/default/Loading '

export default function AddReq() {
  const router = useRouter()
  const { creating, setIsCreating } = useNewData()
  const { id, setId } = useReqId()
  const { ReqForm } = useCreateReqForm()
  const { user, fetchUsers, isLoading: isLoadingUsers } = useUsers()
  const [reqErrorMessages, setReqErrorMessages] = useState('')
  const [validating, setValidating] = useState(false)
  const [titleInput, setTitleInput] = useState(false)
  const [selectInput, setSelectInput] = useState(false)
  const [fields, setFields] = useState<string[]>([])
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
        const value = field.type === 'checkbox' ? 'false' : ''
        return {
          requirementTypeFieldId: field.id,
          value,
        }
      })
      ReqForm.setFieldValue('requirementFieldValue', fieldsValues)
    }
  }, [reqType])

  //  Funciones para validar los inputs
  useEffect(() => {
    if (titleInput && selectInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [titleInput, selectInput])

  useEffect(() => {
    setFields(reqType?.requirementTypeField.map(() => '') || [])
  }, [reqType])

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields]
    newFields[index] = value
    setFields(newFields)

    const allFieldsValid = newFields.every((field) => field.length > 0)
    setSelectInput(allFieldsValid)
  }

  const hanldeSubmit = () => {
    ReqForm.handleSubmit()
    setIsCreating(true)
  }
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
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1) {
                    setTitleInput(true)
                    return undefined
                  } else {
                    setTitleInput(false)
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
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <>
                      <Text color={'salmon'}>
                        {field.state.meta.errors.join(', ')}
                      </Text>
                    </>
                  ) : null}
                </>
              ),
            })}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tipo de Requerimiento</FormLabel>
            {ReqForm.Field({
              name: 'requirementTypeId',
              validators: {
                onChange: ({ value }) => {
                  if (value !== 0) {
                    setSelectInput(false)
                    return undefined
                  } else {
                    return 'Seleccione un tipo'
                  }
                },
              },
              children: (field) => (
                <>
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
                  {field.state.meta.errors ? (
                    <>
                      <Text color={'salmon'}>
                        {field.state.meta.errors.join(', ')}
                      </Text>
                    </>
                  ) : null}
                </>
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
                <VStack w={'100%'} pt={2}>
                  {field.state.value.map((_, i) => (
                    <VStack
                      w={'100%'}
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
                      <ReqForm.Field
                        name={`requirementFieldValue[${i}].value`}
                        validators={{
                          onChange: ({ value }) => {
                            if (value === '') {
                              setReqErrorMessages('Complete todos los campos')
                            } else {
                              setReqErrorMessages('')
                              return undefined
                            }
                          },
                        }}
                      >
                        {(subField) => {
                          const reqTypeField =
                            reqType?.requirementTypeField.find(
                              (value) =>
                                value.id ===
                                field.state.value[i].requirementTypeFieldId
                            )

                          const inputType = reqTypeField?.type || 'text'

                          return (
                            <>
                              <FormControl isRequired>
                                <FormLabel>{reqTypeField?.title}</FormLabel>

                                {inputType === 'text' && (
                                  <Input
                                    maxLength={500}
                                    type={'text'}
                                    onBlur={subField.handleBlur}
                                    value={subField.state.value}
                                    onChange={(e) => {
                                      subField.handleChange(e.target.value)
                                      handleFieldChange(i, e.target.value)
                                    }}
                                  />
                                )}

                                {inputType === 'date' && (
                                  <Input
                                    type={'datetime-local'}
                                    onBlur={subField.handleBlur}
                                    value={subField.state.value}
                                    onChange={(e) => {
                                      subField.handleChange(e.target.value)
                                      handleFieldChange(i, e.target.value)
                                    }}
                                  />
                                )}
                                {inputType === 'email' && (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                      <EmailIcon color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                      maxLength={50}
                                      type={'email'}
                                      onBlur={subField.handleBlur}
                                      value={subField.state.value}
                                      onChange={(e) => {
                                        subField.handleChange(e.target.value)
                                        handleFieldChange(i, e.target.value)
                                      }}
                                    />
                                  </InputGroup>
                                )}
                                {inputType === 'number' && (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                      <PhoneIcon color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                      maxLength={15}
                                      type={'tel'}
                                      onBlur={subField.handleBlur}
                                      value={subField.state.value}
                                      onChange={(e) => {
                                        subField.handleChange(e.target.value)
                                        handleFieldChange(i, e.target.value)
                                      }}
                                    />
                                  </InputGroup>
                                )}

                                {inputType === 'checkbox' && (
                                  <Checkbox
                                    onBlur={subField.handleBlur}
                                    value={subField.state.value}
                                    onChange={(e) => {
                                      subField.handleChange(
                                        String(e.target.checked)
                                      )
                                      handleFieldChange(
                                        i,
                                        String(e.target.value)
                                      )
                                    }}
                                  />
                                )}
                              </FormControl>
                            </>
                          )
                        }}
                      </ReqForm.Field>
                    </VStack>
                  ))}
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{reqErrorMessages}</Text>
                  ) : null}
                </VStack>
              )
            }}
          </ReqForm.Field>
          {creating && <LoadItem />}
          <Button isDisabled={!validating} onClick={hanldeSubmit}>
            Guardar
          </Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
