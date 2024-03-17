import { CustomBreadcrum } from '@/components/Breadcrum/CustomBreadcrum'
import { VStack } from '@chakra-ui/react'

export interface MainProps {
  children: React.ReactNode
}
export const Main = (props: MainProps) => {
  return (
    <VStack alignItems={'start'} p={'30px'} w={'100%'} h={'100vh'}>
      <CustomBreadcrum />
      {props.children}
    </VStack>
  )
}
