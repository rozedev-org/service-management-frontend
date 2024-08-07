'use client'
import { HStack, Avatar, Text, Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { appRoutes } from '@/appRoutes'
import { RequirementEntity } from '@/app/requirements/types/requirements.types'

interface ReqCardProps {
  requirement: RequirementEntity
}
export default function ReqCard(props: ReqCardProps) {
  const { id, user } = props.requirement

  return (
    <Box w={['10rem', '19rem']}>
      {/* Stack de requerimientos */}
      <HStack
        key={`home-key-${id}`}
        bg='#FFFFFF'
        borderRadius='20px'
        p={2}
        minH={['3.5rem', '56px']}
        _hover={{ bg: '#c1c1c1' }}
      >
        <Avatar name={user?.userName || ''} w={'30px'} h={'30px'} />
        {/* Modal que muestra el detalle del requerimiento */}
        <Box textOverflow={'ellipsis'} overflow={'hidden'}>
          <ReqModal requirement={props.requirement} />
        </Box>

        <Link href={appRoutes.home.requirements.getOne.url(id)} ml={'auto'}>
          <Text fontSize={10}>REQ-{id}</Text>
        </Link>
      </HStack>
    </Box>
  )
}
