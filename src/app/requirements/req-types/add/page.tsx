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
  Box,
  VStack,
  Divider,
  HStack,
} from '@chakra-ui/react'
import {
  useCreateReqTypeForm,
  useRequirementsTypes,
} from '../hook/useRequirementsTypes'
import { useEffect } from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function ReqTypesAddPage() {
  const { reqTypeForm } = useCreateReqTypeForm()
  const { fetchReqTypes } = useRequirementsTypes()
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    }
    fetchReqTypes(queryPamas)
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
              <VStack h={'70vh'} mt={4}>
                {/* field array */}
                <Box
                  h={'100%'}
                  w={'100%'}
                  overflow={'scroll'}
                  overflowX={'hidden'}
                  p={2}
                >
                  {field.state.value.map((_, i) => {
                    return (
                      // New req field
                      <VStack
                        key={i}
                        gap={2}
                        alignItems={'start'}
                        shadow={'xs'}
                        p={2}
                        // mt={4}
                        borderRadius={'md'}
                        mb={4}
                      >
                        <Heading as='h3' size='sm'>
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
                        <Divider />
                        {/* Title field */}
                        <reqTypeForm.Field
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
                        </reqTypeForm.Field>

                        {/* Type field */}
                        <reqTypeForm.Field
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
                                  <option value='checkbox'>Check</option>
                                </Select>
                              </FormControl>
                            )
                          }}
                        </reqTypeForm.Field>

                        {/* order field */}
                        <reqTypeForm.Field
                          name={`requirementTypeField[${i}].order`}
                        >
                          {(subField) => {
                            return (
                              <FormControl isRequired>
                                <FormLabel pt='20px'>Order</FormLabel>
                                {/* Type input */}
                                <Input
                                  type='number'
                                  min={0}
                                  onChange={(e) =>
                                    subField.handleChange(
                                      Number(e.target.value)
                                    )
                                  }
                                />
                              </FormControl>
                            )
                          }}
                        </reqTypeForm.Field>
                      </VStack>
                    )
                  })}
                </Box>
                {/* Submit and add button */}
                <Box mt={'auto'} w={'100%'}>
                  <reqTypeForm.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Stack mt='10px'>
                        <ButtonGroup size='sm' isAttached variant='outline'>
                          {/* Submit button */}
                          <Button type='submit' disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Enviar'}
                          </Button>
                          <Tooltip label='Añadir un nuevo campo'>
                            {/* Button to add a new field */}
                            <IconButton
                              onClick={() =>
                                field.pushValue({
                                  title: '',
                                  type: '',
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
                </Box>
              </VStack>
            )
          }}
        </reqTypeForm.Field>
      </form>
    </CardContainer>
  )
}
