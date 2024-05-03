/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect } from 'react'

export default function AddReq() {
  const { ReqForm, onError, errorMessage } = useCreateReqForm()
  const { user, fetchUsers } = useUsers()
  useEffect(() => {
    fetchUsers()
  }, [])
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
          <FormControl>
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
                  {user.map((data) => (
                    <option key={`select-form-id-${data.id}`} value={data.id}>
                      {data.userName}
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
