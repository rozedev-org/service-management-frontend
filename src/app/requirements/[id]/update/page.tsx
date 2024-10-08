/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation'
import { useRequirement, useUpdateReqForm } from '../../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
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
import { useEffect } from 'react'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function UpdateReqPage({ params }: { params: { id: number } }) {
  const { fetchUsers, user, isLoading: isLoadingUser } = useUsers()
  const {
    fetchReq,
    requirement,
    isLoading: isLoadingRequirement,
  } = useRequirement(params.id)
  const { updateReqForm } = useUpdateReqForm(requirement)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqForm.handleSubmit()
    router.push(appRoutes.home.requirements.getOne.url(params.id))
  }
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    }
    fetchUsers(queryPamas)

    fetchReq()
  }, [])

  return (
    <CardContainer
      title='Actualizar Requerimiento'
      isLoading={isLoadingRequirement}
    >
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
                  isDisabled={isLoadingUser}
                  placeholder='Selecciona al responsable'
                  onChange={(e) =>
                    field.handleChange(Number(e.currentTarget.value))
                  }
                >
                  {user?.map((data) => (
                    <option key={`select-form-id-${data.id}`} value={data.id}>
                      {data.userName}
                    </option>
                  ))}
                </Select>
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
