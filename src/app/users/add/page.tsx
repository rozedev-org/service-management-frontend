'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useCreateUserForm } from '../hook/useUser'

export default function AddUser() {
  const { userForm } = useCreateUserForm()

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

          {/* Lastname */}
          <FormControl isRequired>
            <FormLabel>Apellido</FormLabel>
            {userForm.Field({
              name: 'lastName',
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

          {/* Username */}
          <FormControl isRequired>
            <FormLabel>Nombre de usuario</FormLabel>
            {userForm.Field({
              name: 'userName',
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

          {/* Password */}
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            {userForm.Field({
              name: 'password',
              children: (field) => (
                <Input
                  type='password'
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              ),
            })}
          </FormControl>

          <Button type='submit'>Guardar</Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
