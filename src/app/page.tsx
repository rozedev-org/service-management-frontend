'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { HStack, VStack, Text, Stack, Avatar } from '@chakra-ui/react'
import { useRequirements } from './requirements/hook/useRequirements'
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  const requirementsQuery = useRequirements()
  console.log(requirementsQuery)
  return (
    <CardContainer title='Dashboard'>
      <HStack display='flex' justifyContent='center'>
        <VStack
          width='23%'
          height='700px'
          bg={'#F4F7FE'}
          alignItems='start'
          borderRadius='20px'
        >
          <VStack margin='10px' alignItems='start'>
            <Stack>
              <Text p={2}>Por Hacer</Text>
            </Stack>
            <Stack>
              {requirementsQuery.data?.data.map((req) => (
                <HStack
                  key={`home-key-${req.id}`}
                  bg='#FFFFFF'
                  borderRadius='20px'
                  p={2}
                  w={'16vw'}
                >
                  <Avatar name={req.user?.userName} w={'30px'} h={'30px'} />
                  <Link href={`/requirements/${req.id}`}>
                    <HStack>
                      <Text>{req.title}</Text>
                      <Text>REQ-{req.id}</Text>
                    </HStack>
                  </Link>
                </HStack>
              ))}
            </Stack>
          </VStack>
        </VStack>
        <VStack
          width='23%'
          height='700px'
          bg={'#F4F7FE'}
          alignItems='start'
          borderRadius='10px'
        >
          <VStack margin='10px'>
            <Stack borderRadius='10px' w='16vw'>
              <Text>123</Text>
            </Stack>
          </VStack>
        </VStack>
        <VStack
          width='23%'
          height='700px'
          bg={'#F4F7FE'}
          alignItems='start'
          borderRadius='10px'
        >
          <VStack margin='10px'>
            <Stack borderRadius='10px' w='16vw'>
              <Text>123</Text>
            </Stack>
          </VStack>
        </VStack>
        <VStack
          width='23%'
          height='700px'
          bg={'#F4F7FE'}
          alignItems='start'
          borderRadius='10px'
        >
          <VStack margin='10px'>
            <Stack borderRadius='10px' w='16vw'>
              <Text>123</Text>
            </Stack>
          </VStack>
        </VStack>
      </HStack>
    </CardContainer>
  )
}
