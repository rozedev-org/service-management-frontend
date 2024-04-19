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
import { RequirementsEntity } from '@/app/requirements/types/req.types'

export default function ReqStateColumn(props: {
  id: number
  title: string
  requirements: RequirementsEntity[]
}) {
  const { title, id } = props
  const [requirements, setRequirements] = useState<RequirementsEntity[]>(
    props.requirements
  )

  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <VStack
      w={['74vw', '320px']}
      h={'100%'}
      bg={'#F4F7FE'}
      alignItems='start'
      borderRadius='20px'
      padding='10px'
    >
      {/* Titulo de la comuna */}
      <Text p={2}>{title}</Text>
      <SortableContext
        id={id.toString()}
        items={requirements}
        strategy={verticalListSortingStrategy}
      >
        <VStack
          data-test-id='req-cards-stack'
          overflowY={'scroll'}
          overflowX={'hidden'}
        >
          {requirements.map((req) => (
            // Card que muestra el requerimiento
            <ReqCard
              ref={setNodeRef}
              key={`req-card-${req.id}`}
              requirement={req}
            />
          ))}
        </VStack>
      </SortableContext>
    </VStack>
  )
}
