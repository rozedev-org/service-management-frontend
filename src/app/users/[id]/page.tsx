/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Avatar,
  Button,
  Link,
} from '@chakra-ui/react'
import { useUser } from '../hook/useUser'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import ModalDelete from './components/ModalDelete'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'

export default function UserPage({ params }: { params: { id: number } }) {
  const { user, fetchUser } = useUser(params.id)

  useEffect(() => {
    fetchUser()
  }, [])

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
            <Link href={appRoutes.home.users.update.url(params.id)}>
              <Button colorScheme='blue' margin='10px'>
                Actualizar
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </CardContainer>
    </>
  )
}
