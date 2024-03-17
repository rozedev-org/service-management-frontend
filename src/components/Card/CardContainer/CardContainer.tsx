import { Card, CardHeader, HStack, Heading, CardBody } from '@chakra-ui/react'

interface CardContainerProps {
  children?: React.ReactNode
  title: string
  searchInput?: JSX.Element
  optionsButton?: JSX.Element
}
export const CardContainer = (props: CardContainerProps) => {
  return (
    <Card borderRadius={'20px'} w={'100%'} h={'100%'} bg={'white'}>
      <CardHeader>
        <HStack>
          <Heading as={'h2'} fontSize={'22px'}>
            {props.title}
          </Heading>
          {props.optionsButton && props.optionsButton}
          {props.searchInput && props.searchInput}
        </HStack>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  )
}
