'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Box, Button, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function DeleteUserPage({ params }: { params: { id: number } }) {
  const router = useRouter()
  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/service-manager-service/v1/users/${params.id}`
    )
    router.push('/users')
  }

  return (
    <CardContainer title='Eliminar Usuario'>
      <VStack justifyContent={'center'} alignItems={'start'}>
        <Box>Confirmar la eliminacion del usuario {params.id}</Box>
        <Button onClick={handleDelete}>Eliminar</Button>
      </VStack>
    </CardContainer>
  )
}
