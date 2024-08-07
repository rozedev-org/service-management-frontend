import { appRoutes } from '@/appRoutes'
import {
  Menu,
  MenuButton,
  IconButton,
  Icon,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { SlControlPlay } from 'react-icons/sl'

interface ReqTypeTableOptionsProps {
  id: number
}
export const ReqTypeTableOptions = ({ id }: ReqTypeTableOptionsProps) => {
  return (
    <Menu direction='ltr'>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        fontSize='20px'
        bg={'gray.100'}
        icon={<Icon as={BiDotsVerticalRounded} />}
      ></MenuButton>
      <MenuList>
        <Link href={appRoutes.home.requirements.reqTypes.getOne.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Detalle</MenuItem>
        </Link>
        <Link href={appRoutes.home.requirements.reqTypes.update.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Editar</MenuItem>
        </Link>
        <Link href={appRoutes.home.requirements.reqTypes.delete.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Eliminar</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  )
}
