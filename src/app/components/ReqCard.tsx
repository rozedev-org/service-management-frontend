import { HStack, Avatar, Text, Stack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { ReqCardProps } from '../types/reqCard.types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function ReqCard({
  Reqid,
  username,
  title,
  updatedAt,
  createdAt,
}: ReqCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: Reqid })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <HStack key={`home-key-${Reqid}`} bg='#FFFFFF' borderRadius='20px' p={2}>
        <Avatar name={username} w={'30px'} h={'30px'} />
        <Stack w={'10rem'}>
          <ReqModal
            title={title}
            Reqid={Reqid}
            username={username}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        </Stack>
        <Link href={`/requirements/${Reqid}`}>
          <Text fontSize={10} ml={'auto'}>
            REQ-{Reqid}
          </Text>
        </Link>
      </HStack>
    </div>
  )
}
