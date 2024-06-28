'use client'
import { VStack, Text } from '@chakra-ui/react'
import ReqCard from './ReqCard'
import { RequirementEntity } from '@/app/requirements/types/requirements.types'
import { GlobalStyles } from '@/constants/Colors'

export default function ReqStateColumn(props: {
  id: number
  title: string
  requirements: RequirementEntity[]
}) {
  const { title } = props

  return (
    <VStack
      // w={['74vw', '330px']}
      w={'328px'}
      h={'100%'}
      alignItems='start'
      borderRadius='20px'
      padding='10px'
      boxShadow={'2xl'}
    >
      {/*Titulo*/}
      <Text
        // color={GlobalStyles().TEXT_COLOR_PRIMARY}
        p={2}
      >
        {title}
      </Text>

      <VStack
        h={'100%'}
        w={['250px', '250px', '306px', '306px', '306px', '306px']}
        p={2}
        data-test-id='req-cards-stack'
        overflowY={props.requirements.length > 3 ? 'scroll' : 'hidden'}
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
