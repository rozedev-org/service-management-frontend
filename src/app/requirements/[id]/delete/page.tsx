/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect } from 'react'

export default function DeleteUserPage({ params }: { params: { id: number } }) {
  const { requirement, fetchReq, isLoading } = useRequirement(params.id)

  useEffect(() => {
    fetchReq()
  }, [])

  return (
    <CardContainer title='Eliminar Requerimiento' isLoading={isLoading}>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del requerimiento
        </Text>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>
              Usuario responsable: {requirement?.user?.userName}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Nombre del responsable: {requirement?.user?.firstName}</Text>
            <Text>Apellido del responsable: {requirement?.user?.lastName}</Text>
          </CardBody>
          <CardFooter>
            <ModalDeleteReq params={params} />
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
