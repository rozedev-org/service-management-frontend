import { CustomBreadcrum } from '@/components/Breadcrum/CustomBreadcrum'
import { VStack } from '@chakra-ui/react'

export interface ContentProps {
  children: React.ReactNode
}
export const Content = (props: ContentProps) => {
  return (
    <VStack
      alignItems={'start'}
      p={'30px'}
      pt={[0, 0, '30px']}
      w={'100%'}
      h={'100vh'}
    >
      <CustomBreadcrum />
      {props.children}
    </VStack>
  )
}
