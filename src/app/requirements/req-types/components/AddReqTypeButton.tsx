import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

export const AddReqTypeButton = () => {
  return (
    <Tooltip label='Crear Lista de Requerimiento'>
      <Link href={appRoutes.home.requirements.reqTypes.add.url(0)}>
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
