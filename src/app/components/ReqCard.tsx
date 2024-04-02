import { HStack, Avatar, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

interface ReqCardProps {
  id: number
  username: string
  title: string
}

export default function ReqCard({ id, username, title }: ReqCardProps) {
  return (
    <>
      <HStack key={`home-key-${id}`} bg='#FFFFFF' borderRadius='20px' p={2}>
        {/* Avatar icon */}
        <Avatar name={username} w={'30px'} h={'30px'} />

        {/* Req link */}
        <Link href={`/requirements/${id}`}>
          <HStack w={'10rem'}>
            <Text fontSize={14}>{title}</Text>
          </HStack>
        </Link>
        <Text fontSize={10} ml={'auto'}>
          REQ-{id}
        </Text>
      </HStack>
    </>
  )
}
