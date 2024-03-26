import { Link } from '@chakra-ui/next-js'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

export const AddReqButton = () => {
  return (
    <Tooltip label='Crear Requerimientos'>
      <Link href={'/requirements/add'}>
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
