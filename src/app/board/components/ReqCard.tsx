import { HStack, Avatar, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Requirement } from '../types/board.types'
import { LegacyRef, RefAttributes } from 'react'
import { appRoutes } from '@/appRoutes'

interface ReqCardProps {
  requirement: Requirement
  ref: LegacyRef<HTMLDivElement>
}
export default function ReqCard(props: ReqCardProps) {
  const { id, user } = props.requirement
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // opacity: isDragging ? 0 : 1,
  }
  return (
    // div necesario para el dnd kit
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => {}}
    >
      {/* Stack de requerimientos */}
      <HStack
        key={`home-key-${id}`}
        bg='#FFFFFF'
        borderRadius='20px'
        p={2}
        minW={['14.5rem ', '288px']}
        minH={['3.5rem', '56px']}
        _hover={{ bg: '#c1c1c1' }}
      >
        <Avatar name={user.userName} w={'30px'} h={'30px'} />
        {/* Modal que muestra el detalle del requerimiento */}
        <ReqModal requirement={props.requirement} />
        <Link href={appRoutes.home.requirements.getOne.url(id)} ml={'auto'}>
          <Text fontSize={10}>REQ-{id}</Text>
        </Link>
      </HStack>
    </div>
  )
}
