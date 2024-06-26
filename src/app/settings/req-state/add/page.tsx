'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useCreateReqStateForm } from '../hook/useRequirementState'
import { LoadItem } from '@/components/layout/default/Loading '
import { useNewData } from '@/states/useNewData'
import { useEffect, useState } from 'react'

export default function ReqStateAddPage() {
  const { creating, setIsCreating } = useNewData()
  const { ReqStateForm } = useCreateReqStateForm()
  const handleSubmit = () => {
    ReqStateForm.handleSubmit()
    setIsCreating(true)
  }
  const [validating, setValidating] = useState(false)
  const [stateTitleInput, SetStateTitleInput] = useState(false)
  const [stateSecuenceInput, SetStateSecuenceInput] = useState(false)

  useEffect(() => {
    if (stateTitleInput && stateSecuenceInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [stateTitleInput, stateSecuenceInput])
  return (
    <CardContainer title='Crear Requerimiento'>
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
                  if (value.length >= 1) {
                    SetStateTitleInput(true)
                    return undefined
                  } else {
                    SetStateTitleInput(false)
                    return 'El título no puede estar vacío'
                  }
                },
              },
              children: (field) => (
                <>
                  <Input
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
                  const numValue = value
                  if (numValue >= 1) {
                    SetStateSecuenceInput(true)
                    return undefined
                  } else {
                    SetStateSecuenceInput(false)
                    return 'La secuencia debe ser mayor a 1'
                  }
                },
              },
              children: (field) => (
                <>
                  <Input
                    min={0}
                    type='number'
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{field.state.meta.errors}</Text>
                  ) : null}
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
