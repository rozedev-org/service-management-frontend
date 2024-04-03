import { HStack, VStack, Stack, Text } from '@chakra-ui/react'
import ReqCard from './ReqCard'
import { RequirementsEntity } from '../requirements/types/req.types'

export default function ReqStateColumn({
  title,
  requirements,
}: {
  title: string
  requirements: RequirementsEntity[]
}) {
  return (
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
            <Text p={2}>{title}</Text>
          </Stack>
          <Stack>
            {requirements.map((req) => (
              <ReqCard
                key={`req-card-${req.id}`}
                id={req.id}
                username={req.user?.userName ? req.user.userName : ''}
                title={req.title}
                createdAt={req.createdAt}
                updatedAt={req.updatedAt}
              />
            ))}
          </Stack>
        </VStack>
      </VStack>
    </HStack>
  )
}
