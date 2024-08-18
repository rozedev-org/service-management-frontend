/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { appRoutes } from '@/appRoutes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Card,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ProfileModalDelete from './components/ProfileModalDelete'
import { useProfile } from '../hooks/useProfile'

export default function ProfileDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const { profile, fetchProfile, isLoading } = useProfile()
  useEffect(() => {
    fetchProfile(params.id)
  }, [])
  return (
    <>
      <CardContainer
        title={`Detalle del perfil ${params.id}`}
        isLoading={isLoading}
      >
        <Card display='flex' flexDirection='column' alignItems='center' gap={2}>
          <CardHeader
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
          >
            <Heading size='md'>Perfil: {profile?.name}</Heading>
            <Text>ID del perfil : {profile?.id}</Text>
          </CardHeader>
          <CardFooter>
            <ProfileModalDelete params={params} />
            <Link href={appRoutes.home.users.profile.update.url(params.id)}>
              <Button colorScheme='blue' margin='10px'>
                Actualizar
              </Button>
            </Link>
          </CardFooter>
          {isLoading === true ? <Spinner /> : null}
        </Card>
      </CardContainer>
    </>
  )
}
