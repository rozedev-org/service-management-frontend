'use client'
import { VStack, Text } from '@chakra-ui/react'
import { RequirementEntity } from '@/app/requirements/types/requirements.types'
import ReqModal from './ReqModal'

export default function ReqStateColumn(props: {
  id: number
  title: string
  requirements: RequirementEntity[]
}) {
  const { title } = props

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
      <VStack
        data-test-id='req-cards-stack'
        overflowY={'scroll'}
        overflowX={'hidden'}
      >
        {props.requirements.map((req) => (
          // Card que muestra el requerimiento
          <ReqModal key={`req-modal-${req.id}`} requirement={req} />
        ))}
      </VStack>
    </VStack>
  )
}
