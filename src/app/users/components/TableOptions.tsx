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
export const UserTableOptions = (props: UserTableOptionsProps) => {
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
        <MenuItem icon={<Icon as={SlControlPlay} />}>Editar</MenuItem>
        <MenuItem icon={<Icon as={SlControlPlay} />}>Eliminar</MenuItem>
      </MenuList>
    </Menu>
  )
}
