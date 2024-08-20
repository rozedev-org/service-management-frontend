/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Text, VStack, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useCustomer } from '../../hook/useCustomer'
import ModalDeleteCustomers from '../components/ModalDeleteCustomers'

export default function DeleteCustomerPage({
  params,
}: {
  params: { id: number }
}) {
  const { customer, fetchCustomer, isLoading } = useCustomer(params.id)

  useEffect(() => {
    fetchCustomer()
  }, [])
  return (
    <CardContainer title='Eliminar Cliente' isLoading={isLoading}>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del cliente : {customer.name}
        </Text>
        <Stack
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2}
        >
          <ModalDeleteCustomers params={params} />
        </Stack>
      </VStack>
    </CardContainer>
  )
}
