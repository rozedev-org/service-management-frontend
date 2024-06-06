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
  Button,
  Icon,
} from '@chakra-ui/react'
import { useRequirement, useUpdateReqForm } from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { ReqTableOptions } from '../components/TableOptions'
import { useEffect, useState } from 'react'
import ModalUpdateReq from './components/ModalUpdateReq'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { FaBeer } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'

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
        <Stack w='100%' paddingTop={10}>
          <Text>Detalle</Text>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void updateReqForm.handleSubmit()
            }}
          >
            <VStack overflow={'scroll'} h={'200px'}>
              <FormControl>
                <updateReqForm.Field name='requirementFieldValue' mode='array'>
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
                                  <Stack
                                    borderWidth={'3px'}
                                    borderColor={'gray.200'}
                                    p={4}
                                    spacing={4}
                                    borderRadius={'5px'}
                                  >
                                    <FormLabel>
                                      <Text>
                                        {
                                          requirement?.requirementFieldValue[i]
                                            .requirementTypeField.title
                                        }
                                      </Text>
                                    </FormLabel>
                                    <Stack
                                      borderRadius={'5px'}
                                      _hover={{ bg: '#edf0f9' }}
                                    >
                                      <Editable
                                        defaultValue={
                                          requirement?.requirementFieldValue[i]
                                            .value
                                        }
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
                                    </Stack>
                                  </Stack>
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
            </VStack>
          </form>
          <ModalUpdateReq handleAction={handleUpdate} show={!edited} />
          {/* {edited === true ? (
            <ModalUpdateReq handleAction={handleUpdate} />
          ) : null} */}
        </Stack>
      </VStack>
    </CardContainer>
  )
}
