'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Avatar,
  Box,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '../../hook/useUser'
import ModalDelete from '../components/ModalDelete'

export default function DeleteUserPage({ params }: { params: { id: number } }) {
  const router = useRouter()
  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/service-manager-service/v1/users/${params.id}`
    )
    router.push('/users')
  }
  const userQuery = useUser(params.id)

  return (
    <CardContainer title='Eliminar Usuario'>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del usuario :{userQuery.data?.userName}
        </Text>
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
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
