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
  const { ReqStateForm, errorMessage } = useCreateReqStateForm()
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
          {creating && <LoadItem />}
          <Button isDisabled={!validating} onClick={handleSubmit}>
            Guardar
          </Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
