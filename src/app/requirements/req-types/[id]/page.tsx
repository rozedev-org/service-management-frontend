/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import {
  useReqTypeUpdateForm,
  useRequirementType,
} from '../hook/useRequirementsTypes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { ReqTypeTableOptions } from './components/ReqTypeTableOptions'
import { ReqTypeModaleUpdate } from './components/ReqTypeModaleUpdate'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { LoadItem } from '@/components/layout/default/Loading '

export default function ReqTypesDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const [edited, setEdited] = useState(false)
  const { fetchReqType, reqType, setReqType } = useRequirementType()
  const { updateReqTypeForm, loading } = useReqTypeUpdateForm(reqType)
  const handleUpdate = async () => {
    setEdited(!edited)
    await updateReqTypeForm.handleSubmit()
  }
  useEffect(() => {
    fetchReqType(params.id)
  }, [])

  return (
    <CardContainer
      title={`Detalle del Tipo de Requerimiento ${params.id}`}
      optionsButton={<ReqTypeTableOptions id={params.id} />}
    >
      <VStack display='flex' alignItems='start'>
        <Stack w='100%'>
          <Text borderBottomWidth={2}>Titulo del Tipo: {reqType?.name}</Text>
        </Stack>
        <Stack w='100%'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void updateReqTypeForm.handleSubmit()
            }}
          >
            <VStack h={'60vh'} overflow={'auto'}>
              <FormControl>
                <updateReqTypeForm.Field
                  name='requirementTypeField'
                  mode='array'
                >
                  {(field) => {
                    return (
                      <>
                        {field.state.value.map((_, i) => {
                          return (
                            <updateReqTypeForm.Field
                              key={i}
                              name={`requirementTypeField[${i}].title`}
                            >
                              {(subField) => {
                                return (
                                  <VStack
                                    w={'98%'}
                                    borderWidth={'3px'}
                                    borderColor={'gray.200'}
                                    m={2}
                                    p={4}
                                    spacing={4}
                                    borderRadius={'5px'}
                                    alignItems={'baseline'}
                                  >
                                    <FormLabel>
                                      {reqType?.requirementTypeField[i].type ===
                                        'date' && <Text as={'b'}>Fecha</Text>}
                                      {reqType?.requirementTypeField[i].type ===
                                        'email' && (
                                        <Text as={'b'}>Correo Electronico</Text>
                                      )}
                                      {reqType?.requirementTypeField[i].type ===
                                        'number' && (
                                        <Text as={'b'}>Numero Telefonico</Text>
                                      )}
                                      {reqType?.requirementTypeField[i].type ===
                                        'text' && <Text as={'b'}>Texto</Text>}
                                      {reqType?.requirementTypeField[i].type ===
                                        'checkbox' && (
                                        <Text as={'b'}>Chequeo</Text>
                                      )}
                                    </FormLabel>
                                    <Editable
                                      w={'100%'}
                                      borderRadius={'5px'}
                                      _hover={{ bg: '#edf0f9' }}
                                      defaultValue={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={() => {
                                        setEdited(true)
                                      }}
                                    >
                                      <EditablePreview />
                                      <EditableInput
                                        onChange={(e) =>
                                          subField.handleChange(e.target.value)
                                        }
                                      />
                                    </Editable>
                                    <HStack spacing={2} ml={'auto'}>
                                      <IconButton
                                        ml={'auto'}
                                        size='sm'
                                        icon={<EditIcon />}
                                        aria-label={''}
                                      />
                                      <IconButton
                                        ml={'auto'}
                                        size='sm'
                                        icon={<DeleteIcon />}
                                        aria-label={''}
                                      />
                                    </HStack>
                                  </VStack>
                                )
                              }}
                            </updateReqTypeForm.Field>
                          )
                        })}
                      </>
                    )
                  }}
                </updateReqTypeForm.Field>
              </FormControl>
            </VStack>
          </form>
        </Stack>
        <ReqTypeModaleUpdate
          handleAction={handleUpdate}
          buttonEnable={!edited}
          buttonLoading={loading}
        />
      </VStack>
      {loading && <LoadItem />}
    </CardContainer>
  )
}
