'use client'
import {
  Card,
  CardHeader,
  HStack,
  Heading,
  CardBody,
  Stack,
  Spinner,
} from '@chakra-ui/react'

interface CardContainerProps {
  children?: React.ReactNode
  title: string
  searchInput?: JSX.Element
  optionsButton?: JSX.Element
  aditionalHeaderItems?: JSX.Element
  hasHeader?: boolean
  isLoading?: boolean
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
      <CardBody h={['80vh', '80vh', '85vh']}>
        {props.isLoading && (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
          >
            <Spinner size={'xl'} />
          </Stack>
        )}
        {props.children}
      </CardBody>
    </Card>
  )
}
