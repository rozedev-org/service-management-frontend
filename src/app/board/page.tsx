'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useBoard } from './hook/useBoard'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import ReqStateColumn from './components/ReqStateColumn'
import { HStack, border } from '@chakra-ui/react'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import ReqCard from './components/ReqCard'
import { useState } from 'react'

export default function BoardPage() {
  const { boardQuery, boardState, setBoardState } = useBoard()
  const [activeReq, setActiveReq] = useState<null | string>(null)

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveReq(active.id as string)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // // Find the containers
    // const activeContainer = findBoardSectionContainer(
    //   boardSections,
    //   active.id as string
    // );
    // const overContainer = findBoardSectionContainer(
    //   boardSections,
    //   over?.id as string
    // );
    // if (
    //   !activeContainer ||
    //   !overContainer ||
    //   activeContainer === overContainer
    // ) {
    //   return;
    // }
    // setBoardSections((boardSection) => {
    //   const activeItems = boardSection[activeContainer];
    //   const overItems = boardSection[overContainer];
    //   // Find the indexes for the items
    //   const activeIndex = activeItems.findIndex(
    //     (item) => item.id === active.id
    //   );
    //   const overIndex = overItems.findIndex((item) => item.id !== over?.id);
    //   return {
    //     ...boardSection,
    //     [activeContainer]: [
    //       ...boardSection[activeContainer].filter(
    //         (item) => item.id !== active.id
    //       ),
    //     ],
    //     [overContainer]: [
    //       ...boardSection[overContainer].slice(0, overIndex),
    //       boardSections[activeContainer][activeIndex],
    //       ...boardSection[overContainer].slice(
    //         overIndex,
    //         boardSection[overContainer].length
    //       ),
    //     ],
    //   };
    // });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // const { active, over } = event
    // const reqId = active.id as string
    // const currentColumnStateId = active?.data.current?.sortable
    //   .containerId as string
    // const currentColumnStateIndex = boardState.findIndex(
    //   (b) => b.id === Number(currentColumnStateId)
    // )
    // const reqIndex = boardState[currentColumnStateIndex].Requirement.findIndex(
    //   (r) => r.id === Number(reqId)
    // )
    // const req = boardState[currentColumnStateIndex].Requirement[reqIndex]
    // const movedColumnStateId = over?.data.current?.sortable
    //   .containerId as string
    // setBoardState((board) => {
    //   let updatedBoard = board
    //   updatedBoard.forEach((b) => {
    //     if (b.id === Number(movedColumnStateId)) {
    //       b.Requirement.push(req)
    //     }
    //     if (b.id === Number(currentColumnStateId)) {
    //       b.Requirement.splice(reqIndex, 1)
    //     }
    //   })
    //   return updatedBoard
    // })
    // if (active.id !== over?.id) {
    //   setRequirements((requirements) => {
    //     const originalPos = getReqPos(Number(active.id))
    //     const newPos = getReqPos(Number(over?.id))
    //     return arrayMove(requirements, originalPos, newPos)
    //   })
    //   return requirements
    // }
  }
  // const getReqPos = (id: number) =>
  //   requirements?.findIndex((req) => req.id === id)

  // const sensors = useSensors(
  //   useSensor(MouseSensor, {
  //     activationConstraint: { distance: 5 },
  //   }),

  // )

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  }

  const sensors = useSensors(
    // useSensor(PointerSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  // const requirement = boardState.length ? boardState[0].requirement[0] : null

  return (
    <CardContainer title='Listado de Requerimientos'>
      {boardQuery.isSuccess && (
        <DndContext
          // collisionDetection={closestCenter}
          // collisionDetection={closestCorners}
          // onDragEnd={handleDragEnd}
          sensors={sensors}
          // onDragOver={handleDragOver}
          // onDragStart={handleDragStart}
        >
          <HStack
            data-test-id='req-state-columns-stack'
            display={'flex'}
            justifyContent={'left'}
            alignItems={'flex-start'}
            w={['70vw', '81vw']}
            overflow={'scroll'}
            overflowY={'hidden'}
            h={['57vh', '75vh']}
          >
            {boardState.map((board) => (
              <ReqStateColumn
                key={`req-state-column-${board.id}`}
                title={board.title}
                requirements={board.Requirement}
                id={board.id}
              />
            ))}
            {/* 
            <DragOverlay dropAnimation={dropAnimation}>
              {requirement ? <ReqCard requirement={requirement} /> : null}
            </DragOverlay> */}
          </HStack>
        </DndContext>
      )}
    </CardContainer>
  )
}
