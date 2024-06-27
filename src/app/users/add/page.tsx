'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCreateUserForm } from '../hook/useUser'
import { useNewData } from '@/states/useNewData'
import { LoadItem } from '@/components/layout/default/Loading '
import { useEffect, useState } from 'react'

export default function AddUser() {
  const { creating, setIsCreating } = useNewData()
  const { userForm, onError, errorMessage, setOnError } = useCreateUserForm()
  const [validating, setValidating] = useState(false)
  const [firstNameInput, setFirstNameInput] = useState(false)
  const [lastNameInput, setLastNameInput] = useState(false)
  const [userNameInput, setUserNameInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState(false)
  const handleSubmit = () => {
    setIsCreating(true)
    userForm.handleSubmit()
  }
  useEffect(() => {
    if (firstNameInput && lastNameInput && userNameInput && passwordInput) {
      setValidating(true)
    } else {
      setValidating(false)
    }
  }, [firstNameInput, lastNameInput, userNameInput, passwordInput])

  return (
    <CardContainer title='Crear Usuario'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void userForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Firstname */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {userForm.Field({
              name: 'firstName',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1 && value.length <= 29) {
                    setFirstNameInput(true)
                    return undefined
                  }
                  if (value.length === 30) {
                    setFirstNameInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setFirstNameInput(false)
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

          {/* Lastname */}
          <FormControl isRequired>
            <FormLabel>Apellido</FormLabel>
            {userForm.Field({
              name: 'lastName',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1 && value.length <= 29) {
                    setLastNameInput(true)
                    return undefined
                  }
                  if (value.length === 30) {
                    setLastNameInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setLastNameInput(false)
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

          {/* Username */}
          <FormControl isRequired>
            <FormLabel>Nombre de usuario</FormLabel>
            {userForm.Field({
              name: 'userName',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 1 && value.length <= 29) {
                    setUserNameInput(true)
                    return undefined
                  }
                  if (value.length === 30) {
                    setUserNameInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setUserNameInput(false)
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
                      setOnError(false)
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

          {/* Password */}
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            {userForm.Field({
              name: 'password',
              validators: {
                onChange: ({ value }) => {
                  if (value.length >= 8 && value.length <= 63) {
                    setPasswordInput(true)
                    return undefined
                  }
                  if (value.length === 64) {
                    setPasswordInput(true)
                    return 'Se han alcanzado el limite de caracteres permitidos'
                  } else {
                    setPasswordInput(false)
                    return 'La contraseña debe tener un minimo de 8 caracteres'
                  }
                },
              },
              children: (field) => (
                <>
                  <Input
                    maxLength={64}
                    type='password'
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
            {onError && <Text color={'red'}>{errorMessage}</Text>}
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
