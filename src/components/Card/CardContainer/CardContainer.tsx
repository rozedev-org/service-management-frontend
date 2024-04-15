import { Card, CardHeader, HStack, Heading, CardBody } from '@chakra-ui/react'

interface CardContainerProps {
  children?: React.ReactNode
  title: string
  searchInput?: JSX.Element
  optionsButton?: JSX.Element
  aditionalHeaderItems?: JSX.Element
  hasHeader?: boolean
}
export const CardContainer = (props: CardContainerProps) => {
  return (
    <Card
      borderRadius={'20px'}
      w={'100%'}
      h={['80vh', '80vh', '85vh']}
      bg={'white'}
    >
      <CardHeader>
        <HStack>
          {props.title && props.title}
          <Heading as={'h2'} fontSize={'22px'}>
            {props.title}
          </Heading>
          {props.optionsButton && props.optionsButton}
          {props.searchInput && props.searchInput}
          {props.aditionalHeaderItems && props.aditionalHeaderItems}
        </HStack>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  )
}
