'use client'

import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  VStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react'
import { useRequirementState } from '../../hook/useRequirementState'
import { useEffect } from 'react'
import ReqStateModalDelete from '../components/ReqStateModalDelete'

export default function ReqStateDeletePage({
  params,
}: {
  params: { id: number }
}) {
  const { reqState, fetchReqState, isLoading } = useRequirementState(params.id)
  const state = reqState
  useEffect(() => {
    fetchReqState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CardContainer title='Eliminar Requerimiento' isLoading={isLoading}>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del estado del requerimiento
        </Text>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>Titulo del Estado: {state.title}</Heading>
          </CardHeader>
          <CardBody>
            <Text>Secuencia del Estado: {state.secuence}</Text>
          </CardBody>
          <CardFooter>
            <ReqStateModalDelete params={params} />
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
