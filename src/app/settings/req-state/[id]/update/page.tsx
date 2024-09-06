'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { VStack, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import {
  useReqUpdateForm,
  useRequirementState,
} from '../../hook/useRequirementState'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import ReqStateModalUpdate from '../components/ReqStateModalUpdate'

export default function ReqStateUpdatePage({
  params,
}: {
  params: { id: number }
}) {
  const { reqState, fetchReqState, isLoading } = useRequirementState(params.id)
  const { updateReqStateForm } = useReqUpdateForm(reqState)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqStateForm.handleSubmit()
    router.push(appRoutes.home.settings.reqState.getOne.url(params.id))
  }
  useEffect(() => {
    fetchReqState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CardContainer title='Actualizar Estado' isLoading={isLoading}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateReqStateForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Titulo */}
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {updateReqStateForm.Field({
              name: 'title',
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

          {/* Secuencia */}
          <FormControl isRequired>
            <FormLabel>Secuencia</FormLabel>
            {updateReqStateForm.Field({
              name: 'secuence',
              children: (field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              ),
            })}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Tipo</FormLabel>
            {updateReqStateForm.Field({
              name: 'stateType',
              children: (field) => (
                <Select
                  defaultValue=''
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                >
                  <option value='' disabled hidden>
                    Seleccione el tipo de estado
                  </option>
                  <option value={'Started'}>{'Inicio'}</option>
                  <option value={'In Process'}>{'Transitorio'}</option>
                  <option value={'Done'}>{'Finalizacion'}</option>
                </Select>
              ),
            })}
          </FormControl>
          <ReqStateModalUpdate handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
