/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useBoard } from './hook/useBoard'
import ReqStateColumn from './components/ReqStateColumn'
import { HStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRefreshSignal } from './states/useRefreshSignal'
import { AddReqDrawer } from './components/AddReqDrawer'

export default function BoardPage() {
  const { boardState, fetchBoard, isLoading } = useBoard()
  const { onRefresh, setOnRefresh } = useRefreshSignal()

  useEffect(() => {
    fetchBoard()
  }, [])

  useEffect(() => {
    if (onRefresh) {
      fetchBoard()
      setOnRefresh(false)
    }
  }, [onRefresh])

  return (
    <CardContainer
      title='Listado de Requerimientos'
      isLoading={isLoading}
      optionsButton={<AddReqDrawer />}
    >
      <HStack
        data-test-id='req-state-columns-stack'
        display={'flex'}
        justifyContent={'left'}
        alignItems={'flex-start'}
        w={['70vw', '74vw']}
        overflow={'scroll'}
        overflowY={'hidden'}
        h={['57vh', '73vh']}
      >
        {boardState.map((board) => (
          <ReqStateColumn
            key={`req-state-column-${board.id}`}
            title={board.title}
            requirements={board.requirement}
            id={board.id}
          />
        ))}
      </HStack>
    </CardContainer>
  )
}
