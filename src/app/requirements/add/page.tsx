'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react'
import { useCreateReqForm } from '../hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'

export default function AddReq() {
  const { ReqForm, onError, errorMessage } = useCreateReqForm()
  const userQuery = useUsers()
  const usuarios = userQuery.data?.data

  return (
    <CardContainer title='Crear Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqForm.handleSubmit()
        }}
      >
        <VStack>
          <FormControl isRequired>
            <FormLabel>Responsable</FormLabel>
            {ReqForm.Field({
              name: 'userId',
              children: (field) => (
                <Select
                  placeholder='Selecciona al responsable'
                  onChange={(e) =>
                    field.handleChange(Number(e.currentTarget.value))
                  }
                >
                  {usuarios?.map((user) => (
                    <option key={`select-form-id-${user.id}`} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </Select>
              ),
            })}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {ReqForm.Field({
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
          <Button type='submit'>Guardar</Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
