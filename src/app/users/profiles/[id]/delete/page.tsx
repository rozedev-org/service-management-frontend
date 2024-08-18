/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Text, VStack, Card, CardHeader, CardFooter } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useProfile } from '../../hooks/useProfile'
import ProfileModalDelete from '../components/ProfileModalDelete'

export default function DeleteProfilePage({
  params,
}: {
  params: { id: number }
}) {
  const { profile, fetchProfile, isLoading } = useProfile()

  useEffect(() => {
    fetchProfile(params.id)
  }, [])

  return (
    <CardContainer title='Eliminar Perfil' isLoading={isLoading}>
      <VStack display={'flex'} alignItems={'center'}>
        <Text fontWeight='bold'>
          Confirmar la eliminacion del Perfil :{profile?.name}
        </Text>
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Text>ID del Perfil : {profile?.id}</Text>
          </CardHeader>
          <CardFooter>
            <ProfileModalDelete params={params} />
          </CardFooter>
        </Card>
      </VStack>
    </CardContainer>
  )
}
