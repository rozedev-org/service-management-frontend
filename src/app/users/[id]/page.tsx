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

export default function UserPage({ params }: { params: { id: number } }) {
  const userQuery = useUser(params.id)

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
