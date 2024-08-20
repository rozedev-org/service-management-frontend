/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { VStack, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useOffice } from '../../hook/useOffice'
import ModalDeleteOffice from '../components/ModalDeleteOffice'

export default function OfficeDeletePage({
  params,
}: {
  params: { id: number }
}) {
  const { isLoading, fetchoffice, office } = useOffice(params.id)

  useEffect(() => {
    fetchoffice()
  }, [])
  return (
    <CardContainer title='Eliminar Sucursal' isLoading={isLoading}>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del sucursal : {office.name}
        </Text>
        <Stack
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2}
        >
          <ModalDeleteOffice params={params} />
        </Stack>
      </VStack>
    </CardContainer>
  )
}
