'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import ReqStateColumn from './components/ReqStateColumn'
import { HStack } from '@chakra-ui/react'
import { useRequirements } from './requirements/hook/useRequirements'

export default function Home() {
  const requirementsQuery = useRequirements()

  return (
    <CardContainer title='Dashboard'>
      <HStack display={'flex'} justifyContent={'center'}>
        <ReqStateColumn
          title='Por Hacer'
          requirements={requirementsQuery.data?.data || []}
        />
        <ReqStateColumn title='Dev ✨' requirements={[]} />
      </HStack>
    </CardContainer>
  )
}
