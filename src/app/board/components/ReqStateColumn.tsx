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
    <HStack display='flex' justifyContent='center'>
      <VStack
        w={'22rem'}
        p={4}
        pt={2}
        height='700px'
        bg={'#F4F7FE'}
        alignItems='start'
        borderRadius='20px'
      >
        <VStack margin='10px' alignItems='start'>
          <Stack>
            <Text p={2}>{title}</Text>
          </Stack>
          <Stack gap={'12px'}>
            <SortableContext
              id={id.toString()}
              items={requirements}
              strategy={verticalListSortingStrategy}
            >
              {requirements.map((req) => (
                <ReqCard
                  ref={setNodeRef}
                  key={`req-card-${req.id}`}
                  requirement={req}
                />
              ))}
            </SortableContext>
          </Stack>
        </VStack>
      </VStack>
    </HStack>
  )
}
