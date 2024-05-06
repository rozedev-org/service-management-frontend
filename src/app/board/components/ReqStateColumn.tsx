'use client'
import { HStack, VStack, Stack, Text } from '@chakra-ui/react'
import ReqCard from './ReqCard'
import { RequirementsEntity } from '@/app/requirements/types/req.types'

export default function ReqStateColumn(props: {
  id: number
  title: string
  requirements: RequirementsEntity[]
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
          <ReqCard key={`req-card-${req.id}`} requirement={req} />
        ))}
      </VStack>
    </VStack>
  )
}
