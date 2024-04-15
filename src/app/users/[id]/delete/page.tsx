/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Avatar,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { useUser } from '../../hook/useUser'
import ModalDelete from '../components/ModalDelete'
import { useEffect } from 'react'

export default function DeleteUserPage({ params }: { params: { id: number } }) {
  const { user, fetchUser } = useUser(params.id)

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <CardContainer title='Eliminar Usuario'>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del usuario :{user.userName}
        </Text>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Avatar name={user.userName} size={'md'} p='7' />
            <Heading size='md'>Usuario: {user.userName}</Heading>
            <Text>ID del Usuario : {user.id}</Text>
          </CardHeader>
          <CardBody>
            <Text>Nombre: {user.firstName}</Text>
            <Text>Apellido: {user.lastName}</Text>
          </CardBody>
          <CardFooter>
            <ModalDelete params={params} />
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
