'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tooltip,
  Button,
  Select,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import {
  useReqTypeUpdateForm,
  useRequirementType,
} from '../../hook/useRequirementsTypes'
import { ReqTypeModaleUpdate } from '../components/ReqTypeModaleUpdate'
import { CloseIcon } from '@chakra-ui/icons'

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
        <>
          <updateReqTypeForm.Field name='requirementTypeField' mode='array'>
            {(field) => {
              return (
                <div key={`reqtypeform-array-${field.state.value}`}>
                  <FormControl isRequired>
                    <FormLabel>Titulo</FormLabel>
                    {updateReqTypeForm.Field({
                      name: 'name',
                      children: (field) => (
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      ),
                    })}
                  </FormControl>
                  {field.state.value.map((data, i) => {
                    return (
                      <>
                        <Stack>
                          <Text display='flex' justifyContent='left' pt='20px'>
                            Campo {i + 1}
                          </Text>
                        </Stack>
                        <updateReqTypeForm.Field
                          key={`reqtypeform-field-type-${i}`}
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
                                  defaultValue='null'
                                >
                                  <option value='null' disabled hidden>
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
                        <updateReqTypeForm.Field
                          key={`reqtypeform-field-title-${i}`}
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
                        </updateReqTypeForm.Field>
                      </>
                    )
                  })}
                </div>
              )
            }}
          </updateReqTypeForm.Field>
          <ReqTypeModaleUpdate handleAction={handleUpdate} />
        </>
      </form>
    </CardContainer>
  )
}
