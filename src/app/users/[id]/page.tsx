'use client'
import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Avatar,
} from '@chakra-ui/react'
import { useUser } from '../hook/useUser'
import ModalUpdate from './components/ModalUpdate'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { deleteUser } from '@/api/user.api'
import { useRouter } from 'next/navigation'
import ModalDelete from './components/ModalDelete'

export default function UserPage({ params }: { params: { id: number } }) {
  const userQuery = useUser(params.id)
  const router = useRouter()

  const handleDelete = async () => {
    await deleteUser(params.id)
    router.push('/users')
  }

  return (
    <>
      <CardContainer title={`Detalle del usuario ${params.id}`}>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Avatar name={userQuery.data?.userName} size={'md'} p='7' />
            <Heading size='md'>Usuario: {userQuery.data?.userName}</Heading>
            <Text>ID del Usuario : {userQuery.data?.id}</Text>
          </CardHeader>
          <CardBody>
            <Text>Nombre: {userQuery.data?.firstName}</Text>
            <Text>Apellido: {userQuery.data?.lastName}</Text>
          </CardBody>
          <CardFooter>
            <ModalDelete params={params} />
            <ModalUpdate params={params} />
          </CardFooter>
        </Card>
      </CardContainer>
    </>
  )
}
