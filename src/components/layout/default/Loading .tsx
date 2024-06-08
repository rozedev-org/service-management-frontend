'use client'
import { Flex, Spinner } from '@chakra-ui/react'

export const LoadItem = () => {
  return (
    <>
      <Flex
        position='fixed'
        top='0'
        left='0'
        width='100%'
        height='100%'
        align='center'
        justify='center'
        bg='rgba(0, 0, 0, 0.5)'
        zIndex='9999'
      >
        <Spinner
          size='xl'
          thickness='4px'
          emptyColor='gray.200'
          color='blue.500'
        />
      </Flex>
    </>
  )
}
