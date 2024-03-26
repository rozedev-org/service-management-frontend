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
import { useRequirement } from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'

export default function ReqPage({ params }: { params: { id: number } }) {
  const requirementsQuery = useRequirement(params.id)
  const req = requirementsQuery
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
            <Avatar name={req.data?.user?.userName} size={'md'} p='7' />
            <Heading size='md'>Responsable: {req.data?.user?.userName}</Heading>
            <Text>ID del requerimiento : {req.data?.id}</Text>
          </CardHeader>
          <CardBody>
            <Text>Requerimiento: {req.data?.title}</Text>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </CardContainer>
    </>
  )
}
