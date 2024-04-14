import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

export const AddReqStateButton = () => {
  return (
    <Tooltip label='Crear Estado de Requerimiento'>
      <Link href={appRoutes.home.settings.reqState.add.url(0)}>
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
