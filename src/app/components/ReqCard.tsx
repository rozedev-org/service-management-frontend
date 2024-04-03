import { HStack, Avatar, Text, Button, Stack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { ReqCardProps } from '../types/reqCard.types'

export default function ReqCard({
  id,
  username,
  title,
  updatedAt,
  createdAt,
}: ReqCardProps) {
  return (
    <>
      <HStack key={`home-key-${id}`} bg='#FFFFFF' borderRadius='20px' p={2}>
        {/* Avatar icon */}
        <Avatar name={username} w={'30px'} h={'30px'} />

        {/* Req link */}
        <Stack w={'10rem'}>
          <ReqModal
            title={title}
            id={id}
            username={username}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        </Stack>
        <Link href={`/requirements/${id}`}></Link>
        <Text fontSize={10} ml={'auto'}>
          REQ-{id}
        </Text>
      </HStack>
    </>
  )
}
