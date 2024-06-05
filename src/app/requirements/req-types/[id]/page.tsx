/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import {
  useReqTypeUpdateForm,
  useRequirementType,
} from '../hook/useRequirementsTypes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ReqTypeTableOptions } from './components/ReqTypeTableOptions'
import { ReqTypeModaleUpdate } from './components/ReqTypeModaleUpdate'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'

export default function ReqTypesDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const [edited, setEdited] = useState(false)
  const { fetchReqType, reqType, setReqType } = useRequirementType()
  const { updateReqTypeForm } = useReqTypeUpdateForm(reqType)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqTypeForm.handleSubmit()
    router.push(appRoutes.home.requirements.reqTypes.url(0))
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
            <VStack>
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
                                  <>
                                    <FormLabel>
                                      {reqType?.requirementTypeField[i].type ===
                                        'date' && <Text>Fecha</Text>}
                                      {reqType?.requirementTypeField[i].type ===
                                        'email' && (
                                        <Text>Correo Electronico</Text>
                                      )}
                                      {reqType?.requirementTypeField[i].type ===
                                        'number' && (
                                        <Text>Numero Telefonico</Text>
                                      )}
                                      {reqType?.requirementTypeField[i].type ===
                                        'text' && <Text>Texto</Text>}
                                      {reqType?.requirementTypeField[i].type ===
                                        'checkbox' && <Text>Chequeo</Text>}
                                    </FormLabel>
                                    <Editable
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
                                  </>
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
        {edited === true ? (
          <ReqTypeModaleUpdate handleAction={handleUpdate} />
        ) : null}
      </VStack>
    </CardContainer>
  )
}
