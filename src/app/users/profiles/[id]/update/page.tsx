/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useProfile, useProfileUpdateForm } from '../../hooks/useProfile'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import ProfileModalUpdate from '../components/ProfileModalUpdate'

export default function UpdateProfilePage({
  params,
}: {
  params: { id: number }
}) {
  const { fetchProfile, profile, isLoading } = useProfile()
  const { ProfileUpdateForm } = useProfileUpdateForm(profile)
  const router = useRouter()
  const handleUpdate = async () => {
    await ProfileUpdateForm.handleSubmit()
    router.push(appRoutes.home.users.profile.getOne.url(params.id))
  }

  useEffect(() => {
    fetchProfile(params.id)
  }, [])
  return (
    <CardContainer title='Actualizar Perfil' isLoading={isLoading}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ProfileUpdateForm.handleSubmit()
        }}
      >
        <VStack>
          {/* name */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {ProfileUpdateForm.Field({
              name: 'name',
              children: (field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              ),
            })}
          </FormControl>
          <ProfileModalUpdate handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
