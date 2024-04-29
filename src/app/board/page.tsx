'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useBoard } from './hook/useBoard'
import ReqStateColumn from './components/ReqStateColumn'
import { HStack } from '@chakra-ui/react'

export default function BoardPage() {
  const { boardQuery, boardState } = useBoard()

  return (
    <CardContainer title='Listado de Requerimientos'>
      {boardQuery.isSuccess && (
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
        </HStack>
      )}
    </CardContainer>
  )
}
