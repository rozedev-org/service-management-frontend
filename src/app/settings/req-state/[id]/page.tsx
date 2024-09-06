'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useRequirementState } from '../hook/useRequirementState'
import { ReqStateTableOptions } from '../components/ReqStateTableOptions'
import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import ReqStateModalDelete from './components/ReqStateModalDelete'
import Link from 'next/link'

export default function ReqStateDetailsPage({
  params,
}: {
  params: { id: number }
}) {
  const { reqState, fetchReqState, isLoading } = useRequirementState(params.id)

  useEffect(() => {
    fetchReqState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title={`Detalle del Estado de Requerimiento ${params.id}`}
      optionsButton={<ReqStateTableOptions id={params.id} />}
    >
      <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
        <CardHeader
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2}
        >
          <Heading size='md'>Titulo: {reqState?.title}</Heading>
          <Text>ID : {reqState?.id}</Text>
        </CardHeader>
        <CardBody>
          <Text>Secuencia: {reqState?.secuence}</Text>
          <Text>Tipo: {reqState?.stateType}</Text>
        </CardBody>
        <CardFooter>
          <ReqStateModalDelete params={params} />
          <Link href={appRoutes.home.settings.reqState.update.url(params.id)}>
            <Button colorScheme='blue' margin='10px'>
              Actualizar
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </CardContainer>
  )
}
