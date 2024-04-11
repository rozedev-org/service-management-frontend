import { HStack, VStack, Stack, Text } from '@chakra-ui/react'
import ReqCard from './ReqCard'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Requirement } from '../types/board.types'
import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

export default function ReqStateColumn(props: {
  id: number
  title: string
  requirements: Requirement[]
}) {
  const { title, id } = props
  const [requirements, setRequirements] = useState<Requirement[]>(
    props.requirements
  )

  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    //Stack de columnas
    <HStack display='flex' justifyContent='center'>
      {/* Columna */}
      <VStack
        w={['16rem', '320px']}
        h={['37rem', '727px']}
        bg={'#F4F7FE'}
        alignItems='start'
        borderRadius='20px'
      >
        <VStack padding='10px' alignItems='start'>
          {/* Titulo de la comuna */}
          <Text p={2}>{title}</Text>
          <SortableContext
            id={id.toString()}
            items={requirements}
            strategy={verticalListSortingStrategy}
          >
            {requirements.map((req) => (
              // Card que muestra el requerimiento
              <ReqCard
                ref={setNodeRef}
                key={`req-card-${req.id}`}
                requirement={req}
              />
            ))}
          </SortableContext>
        </VStack>
      </VStack>
    </HStack>
  )
}
