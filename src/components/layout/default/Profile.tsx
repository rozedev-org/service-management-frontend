import { useUser } from '@/app/users/hook/useUser'
import { HStack, Avatar, IconButton, Box, Text } from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export const Profile = () => {
  const Userid = Number(localStorage.getItem('userID'))
  const userQuery = useUser(Userid)
  return (
    <>
      {Userid === 0 ? (
        <></>
      ) : (
        <HStack justifyContent={'center'} alignItems={'center'}>
          <Avatar
            name={`${userQuery.data?.firstName} ${userQuery.data?.lastName}`}
            size={'sm'}
          />
          <Box>
            <Text fontSize={'sm'}>
              {userQuery.data?.firstName} {userQuery.data?.lastName}
            </Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              {userQuery.data?.userName}
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
