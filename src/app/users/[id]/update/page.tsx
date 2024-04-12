/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useUser, useUpdateUserForm } from '../../hook/useUser'
import ModalUpdate from '../components/ModalUpdate'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'

export default function UpdateUserPage({ params }: { params: { id: number } }) {
  const { user, fetchUser } = useUser(params.id)
  const { updateUserForm } = useUpdateUserForm(user)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateUserForm.handleSubmit()
    router.push(appRoutes.home.users.getOne.url(params.id))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <CardContainer title='Actualizar Usuario'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateUserForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Firstname */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {updateUserForm.Field({
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
            {updateUserForm.Field({
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
            {updateUserForm.Field({
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
            {updateUserForm.Field({
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
          <ModalUpdate handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
