'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { LoadItem } from '@/components/layout/default/Loading '
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import { useCreateProfile } from '../hooks/useProfile'
import { useNewData } from '@/states/useNewData'
import { useEffect, useState } from 'react'

export default function AddProfilePage() {
  const { creating, setIsCreating } = useNewData()
  const { ProfileForm, errorMessage, onError } = useCreateProfile()
  const [validating, setValidating] = useState(false)
  const [nameInput, setNameInput] = useState(false)
  const handleSubmit = () => {
    setIsCreating(true)
    ProfileForm.handleSubmit()
  }
  useEffect(() => {
    if (nameInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [nameInput])

  return (
    <CardContainer title='Crear Perfil'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ProfileForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {ProfileForm.Field({
              name: 'name',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1 && value.length <= 29) {
                    setNameInput(true)
                    return undefined
                  }
                  if (value.length === 30) {
                    setNameInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setNameInput(false)
                    return 'Este campo no puede estar vacio'
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
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {field.state.meta.errors ? (
                    <Text color={'red'}>{field.state.meta.errors}</Text>
                  ) : null}
                </>
              ),
            })}
          </FormControl>

          {creating && <LoadItem />}

          <Button
            isDisabled={!validating}
            isLoading={creating}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
