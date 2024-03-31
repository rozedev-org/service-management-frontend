'use client'
import { Text, Avatar, VStack, Stack, HStack } from '@chakra-ui/react'
import { useRequirement } from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { ReqTableOptions } from '../components/TableOptions'

export default function ReqPage({ params }: { params: { id: number } }) {
  const requirementsQuery = useRequirement(params.id)
  const req = requirementsQuery
  return (
    <>
      <CardContainer
        title={`Detalle del Requerimiento ${params.id}`}
        optionsButton={<ReqTableOptions id={params.id} />}
      >
        <Stack display='flex' alignItems='end' opacity='65%'>
          <Text>Fecha de Creacion: {JSON.stringify(req.data?.createdAt)}</Text>
          <Text>
            Fecha de Actualizacion: {JSON.stringify(req.data?.updatedAt)}
          </Text>
        </Stack>
        <VStack display='flex' alignItems='start'>
          <Stack w='100%'>
            <Text borderBottomWidth={2}>Realizar servicio tecnico</Text>
            <Text>Descripcion: {req.data?.title}</Text>
          </Stack>
          <Stack w='100%' paddingTop={20}>
            <Text borderBottomWidth={2}>Responsable</Text>
            <HStack>
              <Avatar name={req.data?.user?.userName} size={'md'} p='1' />
              <Text size='md'>{req.data?.user?.userName}</Text>
            </HStack>
          </Stack>
        </VStack>
      </CardContainer>
    </>
  )
}
