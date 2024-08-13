/* eslint-disable react/no-children-prop */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tooltip,
  Button,
  Select,
  ButtonGroup,
  IconButton,
  Heading,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import {
  useReqTypeUpdateForm,
  useRequirementType,
} from '../../hook/useRequirementsTypes'
import { ReqTypeModaleUpdate } from '../components/ReqTypeModaleUpdate'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

export default function ReqTypeUpdatePage({
  params,
}: {
  params: { id: number }
}) {
  const { isLoading, fetchReqType, reqType } = useRequirementType()
  const { updateReqTypeForm } = useReqTypeUpdateForm(reqType)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqTypeForm.handleSubmit()
    router.push(appRoutes.home.requirements.reqTypes.getOne.url(params.id))
  }
  useEffect(() => {
    fetchReqType(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CardContainer
      title='Actualizar Tipo de Requerimiento'
      isLoading={isLoading}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateReqTypeForm.handleSubmit()
        }}
      >
        {/* Name input */}
        <updateReqTypeForm.Field name='name'>
          {(field) => (
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                onBlur={field.handleBlur}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
          )}
        </updateReqTypeForm.Field>

        {/* Requirement Type Fields */}
        <updateReqTypeForm.Field name='requirementTypeField' mode='array'>
          {(field) => {
            return (
              <div>
                {field.state.value.map((_, i) => {
                  return (
                    // New req field
                    <div key={i}>
                      <Heading as='h3' size='sm' pt='20px'>
                        <HStack>
                          <Text> Campo {i + 1}</Text>
                          <Tooltip label='Eliminar este campo'>
                            {/* Button to Delete selected field */}
                            <Button
                              leftIcon={<CloseIcon />}
                              ml={'10px'}
                              variant='link'
                              colorScheme='red'
                              size={'xs'}
                              onClick={() => field.removeValue(i)}
                            />
                          </Tooltip>
                        </HStack>
                      </Heading>
                      {/* Title field */}
                      <updateReqTypeForm.Field
                        name={`requirementTypeField[${i}].title`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel>Titulo</FormLabel>
                              {/* Title input */}
                              <Input
                                onBlur={subField.handleBlur}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                            </FormControl>
                          )
                        }}
                      </updateReqTypeForm.Field>

                      {/* Type field */}
                      <updateReqTypeForm.Field
                        name={`requirementTypeField[${i}].type`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel pt='20px'>Tipo de Campo</FormLabel>
                              {/* Type input */}
                              <Select
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                defaultValue={subField.state.value}
                              >
                                <option value='' disabled hidden>
                                  Selecciona un tipo
                                </option>
                                <option value='date'>Fecha</option>
                                <option value='email'>Email</option>
                                <option value='number'>
                                  Numero de telefono
                                </option>
                                <option value='text'>Texto</option>
                              </Select>
                            </FormControl>
                          )
                        }}
                      </updateReqTypeForm.Field>

                      {/* order field */}
                      <updateReqTypeForm.Field
                        name={`requirementTypeField[${i}].order`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel>Orden</FormLabel>
                              {/* Title input */}
                              <Input
                                type='number'
                                onBlur={subField.handleBlur}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                          )
                        }}
                      </updateReqTypeForm.Field>
                    </div>
                  )
                })}

                <updateReqTypeForm.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Stack mt='10px'>
                      <ButtonGroup size='sm' isAttached variant='outline'>
                        {/* Update Modal button */}
                        <ReqTypeModaleUpdate handleAction={handleUpdate} />
                        <Tooltip label='Añadir un nuevo campo'>
                          {/* Button to add a new field */}
                          <IconButton
                            onClick={() =>
                              field.pushValue({
                                title: '',
                                type: '',
                                requirementTypeId:
                                  field.state.value[0].requirementTypeId,
                                order: field.state.value.length + 1,
                              })
                            }
                            aria-label='Add a new field'
                            icon={<AddIcon />}
                          />
                        </Tooltip>
                      </ButtonGroup>
                    </Stack>
                  )}
                />
              </div>
            )
          }}
        </updateReqTypeForm.Field>
      </form>
    </CardContainer>
  )
}
