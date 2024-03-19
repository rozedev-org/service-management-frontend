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
import ModalButtons from './components/ModalButtons'

export default function UserPage({ params }: { params: { id: number } }) {
  const userQuery = useUser(params.id)
  return (
    <main style={{ alignItems: 'center' }}>
      <Card>
        <CardHeader display='flex' flexDirection='column' alignItems='center'>
          <Avatar name={userQuery.data?.userName} size={'sm'} p='7' />
          <Heading size='md'>Usuario : {userQuery.data?.userName}</Heading>
          <Text>ID del Usuario : {userQuery.data?.id}</Text>
        </CardHeader>
        <CardBody>
          <Text>Nombre y Apellido:</Text>
          <Text>{userQuery.data?.firstName}</Text>
          <Text>{userQuery.data?.lastName}</Text>
        </CardBody>
        <CardFooter>
          <ModalButtons params={params} />
        </CardFooter>
      </Card>
    </main>
  )
}
