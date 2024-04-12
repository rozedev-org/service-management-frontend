'use'
import { useUser } from '@/app/users/hook/useUser'
import { useUserId } from '@/hook/useUserId'
import { HStack, Avatar, IconButton, Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export const Profile = () => {
  const { id } = useUserId()
  const { user, fetchUser } = useUser(id)
  useEffect(() => {
    if (id && id !== 0) {
      fetchUser()
    }
  }, [id])

  return (
    <>
      {id !== 0 && (
        <HStack justifyContent={'center'} alignItems={'center'}>
          <Avatar name={`${user.firstName} ${user.lastName}`} size={'sm'} />
          <Box>
            <Text fontSize={'sm'}>
              {user.firstName} {user.lastName}
            </Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              {user.userName}
            </Text>
          </Box>

          <IconButton
            mr={'auto'}
            variant={'ghost'}
            fontSize='20px'
            icon={<BiDotsVerticalRounded />}
            aria-label={''}
          />
        </HStack>
      )}
    </>
  )
}
