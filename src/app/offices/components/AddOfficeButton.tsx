import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import { Tooltip, IconButton } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

export default function AddOfficeButton() {
  return (
    <Tooltip label='Crear Sucursal'>
      <Link href={appRoutes.home.offices.add.url(0)}>
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
