/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useOffice } from '../hook/useOffice'
import { appRoutes } from '@/appRoutes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Card,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  Text,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useEffect } from 'react'
import ModalDeleteOffice from './components/ModalDeleteOffice'

export default function OfficeDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const { isLoading, fetchoffice, office } = useOffice(params.id)
  useEffect(() => {
    fetchoffice()
  }, [])
  return (
    <>
      <CardContainer
        title={`Detalle de la sucursal ${params.id}`}
        isLoading={isLoading}
      >
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>Sucursal: {office.name}</Heading>
            <Text>ID de la Sucursal : {office.id}</Text>
          </CardHeader>
          <CardFooter>
            <ModalDeleteOffice params={params} />
            <Link href={appRoutes.home.offices.update.url(params.id)}>
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
