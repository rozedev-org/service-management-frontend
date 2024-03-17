/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomTable } from '@/components/table/CustomTable'
import { useUser } from '@/hook/useUser'
import { Heading, VStack } from '@chakra-ui/react'
import { usersColumns } from './types/columnDef'

export default function Users() {
  const userQuery = useUser()

  return (
    <>
      <Heading as={'h1'} fontSize={'2rem'}>
        Usuarios
      </Heading>
      <CustomTable columns={usersColumns} data={userQuery.data?.data} />
    </>
  )
}
