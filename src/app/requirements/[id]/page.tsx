/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Text, Avatar, VStack, Stack, HStack } from '@chakra-ui/react'
import { useRequirement } from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { ReqTableOptions } from '../components/TableOptions'
import { useEffect } from 'react'

export default function ReqPage({ params }: { params: { id: number } }) {
  const { requirement, fetchReq, isLoading } = useRequirement(params.id)

  useEffect(() => {
    fetchReq()
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title={`Detalle del Requerimiento ${params.id}`}
      optionsButton={<ReqTableOptions id={params.id} />}
    >
      <Stack display='flex' alignItems='end' opacity='65%'>
        <Text>
          Fecha de Creacion:{' '}
          {new Date(requirement?.createdAt || '').toLocaleDateString()}
        </Text>
        <Text>
          Fecha de Actualizacion:{' '}
          {new Date(requirement?.updatedAt || '').toLocaleDateString()}
        </Text>
      </Stack>
      <VStack display='flex' alignItems='start'>
        <Stack w='100%'>
          <Text borderBottomWidth={2}>Realizar servicio tecnico</Text>
          <Text>Descripcion: {requirement?.title}</Text>
        </Stack>
        <Stack w='100%' paddingTop={20}>
          <Text borderBottomWidth={2}>Responsable</Text>
          <HStack>
            <Avatar name={requirement?.user?.userName} size={'md'} p='1' />
            <Text size='md'>{requirement?.user?.userName}</Text>
          </HStack>
        </Stack>
      </VStack>
    </CardContainer>
  )
}
