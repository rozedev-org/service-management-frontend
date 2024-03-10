import { HStack, Avatar, IconButton, Box, Text } from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export const Profile = () => {
  return (
    <HStack justifyContent={'center'} alignItems={'center'}>
      <Avatar name='Juan Jimenez' size={'sm'} />
      <Box>
        <Text fontSize={'sm'}>Juan Jimenez</Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          juancarlo14071@gmail.com
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
  )
}
