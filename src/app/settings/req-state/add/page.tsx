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
} from '@chakra-ui/react'
import {
  useCreateReqStateForm,
  useRequirementsState,
} from '../hook/useRequirementState'
import { LoadItem } from '@/components/layout/default/Loading '
import { useNewData } from '@/states/useNewData'
import { useEffect, useState } from 'react'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function ReqStateAddPage() {
  const { creating, setIsCreating } = useNewData()
  const { fetchReqState, reqsState } = useRequirementsState()
  const { ReqStateForm, errorMessage } = useCreateReqStateForm()
  const handleSubmit = () => {
    ReqStateForm.handleSubmit()
    setIsCreating(true)
  }
  const [validating, setValidating] = useState(false)
  const [stateTitleInput, SetStateTitleInput] = useState(false)
  const [stateSecuenceInput, SetStateSecuenceInput] = useState(false)
  const [stateTypeInput, SetStateTypeInput] = useState(false)
  const queryPamas: PaginationParams = {
    page: 1,
    take: 5,
    getAll: true,
  }
  useEffect(() => {
    if (stateTitleInput && stateSecuenceInput && stateTypeInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [stateTitleInput, stateSecuenceInput, stateTypeInput])
  useEffect(() => {
    fetchReqState(queryPamas)
  }, [])

  return (
    <CardContainer title='Crear Estado de Requerimientos'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqStateForm.handleSubmit()
        }}
      >
        <VStack>
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {ReqStateForm.Field({
              name: 'title',
              validators: {
                onChange: ({ value }) => {
                  if (value.length > 0 && value.length < 31) {
                    SetStateTitleInput(true)
                    return undefined
                  } else if (value.length === 0) {
                    SetStateTitleInput(false)
                    return 'El título no puede estar vacío'
                  }
                },
              },
              children: (field) => (
                <>
                  <Input
                    maxLength={30}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{field.state.meta.errors}</Text>
                  ) : null}
                </>
              ),
            })}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Secuencia</FormLabel>
            {ReqStateForm.Field({
              name: 'secuence',
              validators: {
                onChange: ({ value }) => {
                  if (value !== 0 && value < 100) {
                    SetStateSecuenceInput(true)
                    return undefined
                  } else {
                    SetStateSecuenceInput(false)
                  }
                },
              },
              children: (field) => (
                <>
                  <Input
                    min={1}
                    type='number'
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value))
                    }}
                  />
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{errorMessage}</Text>
                  ) : null}
                </>
              ),
            })}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Tipo</FormLabel>
            {ReqStateForm.Field({
              name: 'stateType',
              validators: {
                onChange: ({ value }) => {
                  if (value.length !== 0) {
                    SetStateTypeInput(true)
                    return undefined
                  } else {
                    SetStateTypeInput(false)
                  }
                },
              },
              children: (field) => (
                <>
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
                </>
              ),
            })}
          </FormControl>
          {creating && <LoadItem />}
          <Button isDisabled={!validating} onClick={handleSubmit}>
            Guardar
          </Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
