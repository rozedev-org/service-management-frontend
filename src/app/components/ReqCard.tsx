import { HStack, Avatar, Text, Stack, Button } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { ReqCardProps } from '../types/reqCard.types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

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
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => {
        console.log('me ejecute mmg desde hstack')
      }}
    >
      <HStack
        key={`home-key-${Reqid}`}
        bg='#FFFFFF'
        borderRadius='20px'
        p={2}
        minW={'288px'}
      >
        <Avatar name={username} w={'30px'} h={'30px'} />
        <ReqModal
          title={title}
          Reqid={Reqid}
          username={username}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
        <Link
          href={`/requirements/${Reqid}`}
          ml={'auto'}
          onClick={() => {
            console.log('hola')
          }}
        >
          <Text fontSize={10}>REQ-{Reqid}</Text>
        </Link>
      </HStack>
    </div>
  )
}
