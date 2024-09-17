/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useCustomer } from '../hook/useCustomer'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Card,
  CardHeader,
  Avatar,
  Heading,
  CardFooter,
  Text,
  Button,
} from '@chakra-ui/react'
import ModalDeleteCustomers from './components/ModalDeleteCustomers'
import ModalUpdateCustomers from './components/ModalUpdateCustomers'
import { Link } from '@chakra-ui/next-js'
import { appRoutes } from '@/appRoutes'

export default function CustomerDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const { customer, fetchCustomer, isLoading } = useCustomer(params.id)

  useEffect(() => {
    fetchCustomer()
  }, [])

  return (
    <>
      <CardContainer
        title={`Detalle del cliente ${params.id}`}
        isLoading={isLoading}
      >
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Avatar name={customer.name} size={'md'} p='7' />
            <Heading size='md'>Cliente: {customer.name}</Heading>
            <Text>ID del Cliente : {customer.id}</Text>
          </CardHeader>
          <CardFooter>
            <ModalDeleteCustomers params={params} />
            <Link href={appRoutes.home.customers.update.url(params.id)}>
              <Button colorScheme='blue' margin='10px'>
                Actualizar
              </Button>
            </Link>
            {/* <ModalUpdateCustomers handleAction={} /> */}
          </CardFooter>
        </Card>
      </CardContainer>
    </>
  )
}
