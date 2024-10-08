/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateReqForm } from '@/app/requirements/hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { PaginationParams } from '@/common/interfaces/response.interface'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  IconButton,
  HStack,
  Heading,
  Checkbox,
  Divider,
  Spinner,
  InputLeftElement,
  InputGroup,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useRefreshSignal } from '../states/useRefreshSignal'
import { useReqId } from '@/states/useReqId'
import {
  useRequirementType,
  useRequirementsTypes,
} from '@/app/requirements/req-types/hook/useRequirementsTypes'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { LoadItem } from '@/components/layout/default/Loading '
import { useNewData } from '@/states/useNewData'

export const AddReqDrawer = () => {
  const { creating, setIsCreating } = useNewData()
  const { setId, id } = useReqId()
  const { setOnRefresh } = useRefreshSignal()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ReqForm } = useCreateReqForm()
  const { user, fetchUsers } = useUsers()
  const [reqErrorMessages, setReqErrorMessages] = useState('')
  const [validating, setValidating] = useState(false)
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
    setReqType,
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
    if (selectInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [selectInput])

  useEffect(() => {
    setFields(reqType?.requirementTypeField.map(() => '') || [])
  }, [reqType])

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields]
    newFields[index] = value
    setFields(newFields)

    const allFieldsValid = newFields.every((field, i) => {
      const isOptionalType = reqType?.requirementTypeField[i].isOptional
      return isOptionalType || field.length > 0
    })
    setSelectInput(allFieldsValid)
  }

  // Funciones para Cerrar el Drawer
  const handleCloseDrawer = async () => {
    setIsCreating(true)
    await ReqForm.handleSubmit()
    onClose()
    setOnRefresh(true)
  }

  const onCloseDrawer = () => {
    onClose()
    setSelectInput(false)
    setValidating(false)
    setReqType(undefined)
  }
  return (
    <>
      <Tooltip label='Crear Requerimiento'>
        <IconButton
          variant={'ghost'}
          fontSize='20px'
          icon={<BiPlus />}
          aria-label={''}
          bg={'gray.100'}
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer isOpen={isOpen} placement='right' onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crear Requerimiento</DrawerHeader>

          <DrawerBody>
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
                        placeholder='Selecciona al responsable'
                        onChange={(e) =>
                          field.handleChange(Number(e.currentTarget.value))
                        }
                      >
                        {user.map((data) => (
                          <option
                            key={`select-form-id-${data.id}`}
                            value={data.id}
                          >
                            {data.userName}
                          </option>
                        ))}
                      </Select>
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
                            <option
                              key={`select-form-id-${data.id}`}
                              value={data.id}
                            >
                              {data.name}
                            </option>
                          ))}
                        </Select>
                        {field.state.meta.errors ? (
                          <Text color={'salmon'}>
                            {field.state.meta.errors.join(', ')}
                          </Text>
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
                      <VStack>
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
                            <Divider />
                            <ReqForm.Field
                              name={`requirementFieldValue[${i}].value`}
                              validators={{
                                onChange: ({ value }) => {
                                  if (
                                    value === '' &&
                                    !reqType?.requirementTypeField[i].isOptional
                                  ) {
                                    setReqErrorMessages(
                                      'Complete todos los campos requeridos'
                                    )
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
                                      field.state.value[i]
                                        .requirementTypeFieldId
                                  )

                                const inputType = reqTypeField?.type || 'text'
                                const isOptionalType =
                                  reqType?.requirementTypeField[i].isOptional
                                return (
                                  <FormControl isRequired={!isOptionalType}>
                                    <FormLabel>{reqTypeField?.title}</FormLabel>

                                    {inputType === 'text' && (
                                      <Input
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
                                    {inputType === 'mail' && (
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
                                            subField.handleChange(
                                              e.target.value
                                            )
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
                                            subField.handleChange(
                                              e.target.value
                                            )
                                            handleFieldChange(i, e.target.value)
                                          }}
                                        />
                                      </InputGroup>
                                    )}

                                    {inputType === 'checkbox' && (
                                      <Checkbox
                                        defaultValue={'false'}
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

                                    {inputType === 'list' && (
                                      <Select
                                        value={subField.state.value}
                                        onChange={(e) => {
                                          subField.handleChange(
                                            String(e.target.value)
                                          )
                                          handleFieldChange(
                                            i,
                                            String(e.target.value)
                                          )
                                        }}
                                      >
                                        <option></option>
                                        {reqTypeField?.options.map((option) => (
                                          <option key={option.name}>
                                            {option.name}
                                          </option>
                                        ))}
                                      </Select>
                                    )}

                                    {inputType === 'user' && (
                                      <Select
                                        value={subField.state.value}
                                        onChange={(e) => {
                                          subField.handleChange(
                                            String(e.target.value)
                                          )
                                          handleFieldChange(
                                            i,
                                            String(e.target.value)
                                          )
                                        }}
                                      >
                                        <option></option>

                                        {reqTypeField?.options.map((option) => (
                                          <option key={option.id}>
                                            {option.userName} -{' '}
                                            {option.firstName} {option.lastName}
                                          </option>
                                        ))}
                                      </Select>
                                    )}

                                    {inputType === 'customer' && (
                                      <Select
                                        value={subField.state.value}
                                        onChange={(e) => {
                                          subField.handleChange(
                                            String(e.target.value)
                                          )
                                          handleFieldChange(
                                            i,
                                            String(e.target.value)
                                          )
                                        }}
                                      >
                                        <option></option>
                                        {reqTypeField?.options.map((option) => (
                                          <option key={option.id}>
                                            {option.name}
                                          </option>
                                        ))}
                                      </Select>
                                    )}
                                  </FormControl>
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
              </VStack>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Button
                isDisabled={!validating}
                colorScheme='blue'
                onClick={handleCloseDrawer}
              >
                Crear
              </Button>
              <Button variant='outline' mr={3} onClick={onCloseDrawer}>
                Cerrar
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {creating && <LoadItem />}
    </>
  )
}
