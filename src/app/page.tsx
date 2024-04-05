'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import ReqStateColumn from './components/ReqStateColumn'
import { HStack } from '@chakra-ui/react'
import { useRequirements } from './requirements/hook/useRequirements'
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensors,
  PointerSensor,
  useSensor,
  MouseSensor,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

export default function Home() {
  const requirementsQuery = useRequirements()

  const [requirements, setRequirements] = useState(
    requirementsQuery.data?.data || []
  )

  useEffect(() => {
    if (requirementsQuery.data?.data) {
      setRequirements(requirementsQuery.data.data)
    }
  }, [requirementsQuery.data?.data])

  const getReqPos = (id: number) =>
    requirements?.findIndex((req) => req.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setRequirements((requirements) => {
        const originalPos = getReqPos(Number(active.id))
        const newPos = getReqPos(Number(over?.id))
        return arrayMove(requirements, originalPos, newPos)
      })
      return requirements
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  )
  return (
    <CardContainer title='Dashboard'>
      <HStack display={'flex'} justifyContent={'center'}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <ReqStateColumn title='Por Hacer' requirements={requirements || []} />
          <ReqStateColumn title='Dev ✨' requirements={[]} />
        </DndContext>
      </HStack>
    </CardContainer>
  )
}
