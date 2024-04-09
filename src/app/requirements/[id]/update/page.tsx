'use client'

import { useRouter } from 'next/navigation'
import { useRequirement, useUpdateReqForm } from '../../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useUsers } from '@/app/users/hook/useUser'
import ModalUpdateReq from '../components/ModalUpdateReq'
import { appRoutes } from '@/appRoutes'

export default function UpdateReqPage({ params }: { params: { id: number } }) {
  const userQuery = useUsers()
  const usuarios = userQuery.data?.data
  const requirementsQuery = useRequirement(params.id)
  const { updateReqForm } = useUpdateReqForm(requirementsQuery.data)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqForm.handleSubmit()
    router.push(appRoutes.home.requirements.getOne.url(params.id))
  }
  return (
    <CardContainer title='Actualizar Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateReqForm.handleSubmit()
        }}
      >
        <VStack>
          <FormControl isRequired>
            <FormLabel>Responsable</FormLabel>
            {updateReqForm.Field({
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
            <FormLabel>Titulo del Requerimiento</FormLabel>
            {updateReqForm.Field({
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

          <Stack>Modal de actualizacion</Stack>
          <ModalUpdateReq handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
