'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { HStack, VStack, Text, Stack, Avatar } from '@chakra-ui/react'
import { useRequirements } from './requirements/hook/useRequirements'
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  const requirementsQuery = useRequirements()
  return (
    <CardContainer title='Dashboard'>
      <HStack display='flex' justifyContent='center'>
        <VStack
          w={'22rem'}
          p={4}
          pt={2}
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
                >
                  {/* Avatar icon */}
                  <Avatar name={req.user?.userName} w={'30px'} h={'30px'} />

                  {/* Req link */}
                  <Link href={`/requirements/${req.id}`}>
                    <HStack w={'10rem'}>
                      <Text fontSize={14}>{req.title}</Text>
                    </HStack>
                  </Link>
                  <Text fontSize={10} ml={'auto'}>
                    REQ-{req.id}
                  </Text>
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
