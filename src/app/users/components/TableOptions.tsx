import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import {
  Menu,
  MenuButton,
  IconButton,
  Icon,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { SlControlPlay } from 'react-icons/sl'

interface UserTableOptionsProps {
  id: number
}
export const UserTableOptions = ({ id }: UserTableOptionsProps) => {
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
        <Link href={appRoutes.home.users.getOne.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Detalle</MenuItem>
        </Link>
        <Link href={appRoutes.home.users.update.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Editar</MenuItem>
        </Link>
        <Link href={appRoutes.home.users.delete.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Eliminar</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  )
}
