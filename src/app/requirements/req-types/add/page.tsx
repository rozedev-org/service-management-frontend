/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Select,
  InputGroup,
  InputLeftAddon,
  Stack,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import {
  useCreateReqTypeForm,
  useRequirementsTypes,
} from '../hook/useRequirementsTypes'
import { useForm } from '@tanstack/react-form'
import { useEffect } from 'react'
import { stat } from 'fs'
import { AddIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'

export default function ReqTypesAddPage() {
  const { ReqTypeForm } = useCreateReqTypeForm()
  const { reqTypeQuery, fetchReqType } = useRequirementsTypes()
  useEffect(() => {
    fetchReqType()
  }, [])

  return (
    <CardContainer title='Crear tipo de Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          ReqTypeForm.handleSubmit()
        }}
      >
        <ReqTypeForm.Field name='requirementTypeField' mode='array'>
          {(field) => {
            return (
              <div>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  {ReqTypeForm.Field({
                    name: 'name',
                    children: (field) => (
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    ),
                  })}
                </FormControl>
                {field.state.value.map((_, i) => {
                  return (
                    <>
                      <Stack>
                        <Text display='flex' justifyContent='left' pt='20px'>
                          Campo {i + 1}
                        </Text>
                      </Stack>

                      <ReqTypeForm.Field
                        key={i}
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
                      </ReqTypeForm.Field>
                      <ReqTypeForm.Field
                        key={i}
                        name={`requirementTypeField[${i}].title`}
                      >
                        {(subField) => {
                          return (
                            <FormControl isRequired>
                              <FormLabel>Titulo</FormLabel>
                              <Input
                                type={field.state.value[i].type}
                                onBlur={subField.handleBlur}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                            </FormControl>
                          )
                        }}
                      </ReqTypeForm.Field>
                    </>
                  )
                })}
                <ReqTypeForm.Subscribe
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
        </ReqTypeForm.Field>
      </form>
    </CardContainer>
  )
}
{
  /* <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqTypeForm.handleSubmit()
        }}
      >
        {reqTypeQuery.map((req, reqIndex) =>
          req.requirementTypeField.map((data, dataIndex) => (
            <>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Titulo</FormLabel>
                  {ReqTypeForm.Field({
                    name: 'requirementTypeField',
                    children: (field) => (
                      <Input name={field.name} onBlur={field.handleBlur} />
                    ),
                  })}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tipo</FormLabel>
                  {ReqTypeForm.Field({
                    name: 'requirementTypeField',
                    children: (field) => (
                      <Select>
                        <option value='date'>Date</option>
                        <option value='email'>Email</option>
                        <option value='number'>Number</option>
                        <option value='text'>Text</option>
                      </Select>
                    ),
                  })}
                </FormControl>
              </VStack>
            </>
          ))
        )}
      </form> */
}
