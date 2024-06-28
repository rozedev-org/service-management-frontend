'use client'
import { HStack, Avatar, Text, Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import ReqModal from './ReqModal'
import { appRoutes } from '@/appRoutes'
import { RequirementEntity } from '@/app/requirements/types/requirements.types'
import { GlobalStyles } from '@/constants/Colors'
import { AiOutlineUser } from 'react-icons/ai'

interface ReqCardProps {
  requirement: RequirementEntity
}
export default function ReqCard(props: ReqCardProps) {
  const { id, user } = props.requirement

  return (
    <HStack
      // w={['100%', '18rem', '18rem', '18rem', '18rem', '18rem']}
      w={'100%'}
      key={`home-key-${id}`}
      // bg={GlobalStyles().BG_COLOR_PRIMARY}
      borderRadius='20px'
      p={2}
      minH={['3.5rem']}
      // _hover={{ bg: GlobalStyles().BG_COLOR_PRIMARY_HOVER }}
      // color={GlobalStyles().TEXT_COLOR_PRIMARY}
    >
      <Avatar
        name={user?.userName || ''}
        w={'30px'}
        h={'30px'}
        icon={<AiOutlineUser fontSize='1.5rem' />}
        {...(!user?.userName && { bg: '#34495E' })}
      />
      {/* Modal que muestra el detalle del requerimiento */}
      <Box>
        <ReqModal requirement={props.requirement} />
      </Box>

      <Link href={appRoutes.home.requirements.getOne.url(id)} ml={'auto'}>
        <Text fontSize={10}>REQ-{id}</Text>
      </Link>
    </HStack>
  )
}
