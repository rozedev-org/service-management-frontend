/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useBoard } from './hook/useBoard'
import ReqStateColumn from './components/ReqStateColumn'
import { useEffect } from 'react'
import { useRefreshSignal } from './states/useRefreshSignal'
import { HStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const AddReqDrawer = dynamic(
  () => import('./components/AddReqDrawer').then((mod) => mod.AddReqDrawer),
  { ssr: false }
)

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
        overflow={'scroll'}
        overflowY={'hidden'}
        h={['57vh', '75vh']}
        p={6}
        w={['18rem', '18rem', '22rem', '43rem', '68rem', '136rem']}
        borderRadius='20px'
        gap={4}
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
