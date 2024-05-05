/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  Stack,
  ButtonGroup,
  IconButton,
  Tooltip,
  Heading,
} from '@chakra-ui/react'
import {
  useCreateReqTypeForm,
  useRequirementsTypes,
} from '../hook/useRequirementsTypes'
import { useEffect } from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

export default function ReqTypesAddPage() {
  const { reqTypeForm } = useCreateReqTypeForm()
  const { fetchReqTypes } = useRequirementsTypes()
  useEffect(() => {
    fetchReqTypes()
  }, [])

  return (
    <CardContainer title='Crear tipo de Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          reqTypeForm.handleSubmit()
        }}
      >
        {/* Name input */}
        <reqTypeForm.Field name='name'>
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
        </reqTypeForm.Field>

        {/* Requirement Type Fields */}
        <reqTypeForm.Field name='requirementTypeField' mode='array'>
          {(field) => {
            return (
              <div>
                {field.state.value.map((_, i) => {
                  return (
                    // New req field
                    <div key={i}>
                      <Heading as='h3' size='sm' pt='20px'>
                        Campo {i + 1}
                      </Heading>
                      {/* Type input */}
                      <reqTypeForm.Field
                        name={`requirementTypeField[${i}].type`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel pt='20px'>
                                Tipo de Campo
                                <Tooltip label='Eliminar este campo'>
                                  <Button
                                    leftIcon={<CloseIcon />}
                                    ml={'10px'}
                                    variant='link'
                                    colorScheme='red'
                                    size={'xs'}
                                    onClick={() => field.removeValue(i)}
                                  />
                                </Tooltip>
                              </FormLabel>
                              <Select
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                defaultValue=''
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
                      </reqTypeForm.Field>
                      {/* Title input */}
                      <reqTypeForm.Field
                        name={`requirementTypeField[${i}].title`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel>Titulo</FormLabel>
                              <Input
                                // type='text'
                                onBlur={subField.handleBlur}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                            </FormControl>
                          )
                        }}
                      </reqTypeForm.Field>
                    </div>
                  )
                })}

                <reqTypeForm.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Stack mt='10px'>
                      <ButtonGroup size='sm' isAttached variant='outline'>
                        <Button type='submit' disabled={!canSubmit}>
                          {isSubmitting ? '...' : 'Enviar'}
                        </Button>
                        <Tooltip label='Añadir un nuevo campo'>
                          <IconButton
                            onClick={() =>
                              field.pushValue({ title: '', type: '' })
                            }
                            aria-label='Add to friends'
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
        </reqTypeForm.Field>
      </form>
    </CardContainer>
  )
}
