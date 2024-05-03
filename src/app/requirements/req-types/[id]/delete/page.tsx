'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  VStack,
  CardHeader,
  Heading,
  CardFooter,
  Text,
  Stack,
} from '@chakra-ui/react'
import { useRequirementType } from '../../hook/useRequirementsTypes'
import { useEffect } from 'react'
import { ReqTypeModalDelete } from '../components/ReqTypeModalDelete'

export default function ReqTypesDeletePage({
  params,
}: {
  params: { id: number }
}) {
  const { reqType, fetchReqType } = useRequirementType(params.id)
  useEffect(() => {
    fetchReqType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CardContainer title='Eliminar Tipo de Requerimiento'>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del Tipo de requerimiento
        </Text>
        <Stack
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2}
        >
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>Titulo: {reqType?.name}</Heading>
          </CardHeader>
          <CardFooter>
            <ReqTypeModalDelete params={params} />
          </CardFooter>
        </Stack>
      </VStack>
    </CardContainer>
  )
}
