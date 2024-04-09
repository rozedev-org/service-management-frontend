import { IconButton, Tooltip } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import { Link } from '@chakra-ui/next-js'
import { appRoutes } from '@/appRoutes'

export const AddUserButton = () => {
  return (
    <Tooltip label='Crear usuario'>
      <Link href={appRoutes.home.users.add.url(0)}>
        <IconButton
          variant={'ghost'}
          fontSize='20px'
          icon={<BiPlus />}
          aria-label={''}
          bg={'gray.100'}
        />
      </Link>
    </Tooltip>
  )
}
