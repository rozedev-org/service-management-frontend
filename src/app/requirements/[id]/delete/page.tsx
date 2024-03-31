'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { useRequirement } from '../../hook/useRequirements'
import ModalDeleteReq from '../components/ModalDeleteReq'

export default function DeleteUserPage({ params }: { params: { id: number } }) {
  const requirementsQuery = useRequirement(params.id)

  return (
    <CardContainer title='Eliminar Requerimiento'>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del requerimiento
        </Text>
        <Text>{requirementsQuery.data?.title}</Text>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>
              Usuario responsable: {requirementsQuery.data?.user?.userName}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Nombre del responsable: {requirementsQuery.data?.user?.firstName}
            </Text>
            <Text>
              Apellido del responsable: {requirementsQuery.data?.user?.lastName}
            </Text>
          </CardBody>
          <CardFooter>
            <ModalDeleteReq params={params} />
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
