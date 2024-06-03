/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Text,
  Avatar,
  VStack,
  Stack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import { useRequirement, useUpdateReqForm } from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { ReqTableOptions } from '../components/TableOptions'
import { useEffect, useState } from 'react'
import ModalUpdateReq from './components/ModalUpdateReq'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'

export default function ReqPage({ params }: { params: { id: number } }) {
  const { requirement, fetchReq, isLoading } = useRequirement(params.id)
  const { updateReqForm } = useUpdateReqForm(requirement)
  const [edited, setEdited] = useState(false)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqForm.handleSubmit()
    router.push(appRoutes.home.requirements.url())
  }
  useEffect(() => {
    fetchReq()
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title={`Detalle del Requerimiento ${params.id}`}
      optionsButton={<ReqTableOptions id={params.id} />}
    >
      <Stack display='flex' alignItems='end' opacity='65%'>
        <Text>
          Fecha de Creacion:{' '}
          {new Date(requirement?.createdAt || '').toLocaleDateString()}
        </Text>
        <Text>
          Fecha de Actualizacion:{' '}
          {new Date(requirement?.updatedAt || '').toLocaleDateString()}
        </Text>
      </Stack>
      <VStack display='flex' alignItems='start'>
        <Stack w='100%'>
          <Text borderBottomWidth={2}>Realizar servicio tecnico</Text>
          <Text>Descripcion: {requirement?.title}</Text>
        </Stack>
        <Stack w='100%' paddingTop={20}>
          <Text borderBottomWidth={2}>Responsable</Text>
          <HStack>
            <Avatar name={requirement?.user?.userName} size={'md'} p='1' />
            <Text size='md'>{requirement?.user?.userName}</Text>
          </HStack>
        </Stack>
        <Stack w='100%' paddingTop={20}>
          <Text borderBottomWidth={2}>Detalle</Text>

          {requirement?.requirementFieldValue.map((reqField) => (
            <Stack key={`req-form-field-${reqField.id}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  void updateReqForm.handleSubmit()
                }}
              >
                <VStack>
                  <FormControl>
                    <FormLabel>
                      <Text>{reqField.requirementTypeField.title}</Text>
                    </FormLabel>
                    <updateReqForm.Field
                      name='requirementFieldValue'
                      mode='array'
                    >
                      {(field) => {
                        return (
                          <>
                            {field.state.value.map((_, i) => {
                              return (
                                <updateReqForm.Field
                                  key={i}
                                  name={`requirementFieldValue[${i}].value`}
                                >
                                  {(subField) => {
                                    return (
                                      <>
                                        <Editable
                                          defaultValue={reqField.value}
                                          onBlur={subField.handleBlur}
                                          onChange={() => {
                                            setEdited(true)
                                          }}
                                        >
                                          <EditablePreview />
                                          <EditableInput
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Editable>
                                      </>
                                    )
                                  }}
                                </updateReqForm.Field>
                              )
                            })}
                          </>
                        )
                      }}
                    </updateReqForm.Field>
                  </FormControl>
                  {/* <Editable
                          defaultValue={reqField.value}
                          onBlur={field.handleBlur}
                          onChange={() => {
                            setEdited(true)
                          }}
                        >
                          <EditablePreview />
                          <EditableInput
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </Editable> */}
                </VStack>
              </form>
            </Stack>
          ))}
        </Stack>
        {edited === true ? (
          <ModalUpdateReq handleAction={handleUpdate} />
        ) : null}
      </VStack>
    </CardContainer>
  )
}
