import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { SlControlPlay } from 'react-icons/sl'
import { User } from './user.types'

const columnHelper = createColumnHelper<User>()

export const usersColumns = [
  columnHelper.display({
    id: 'user-actions',
    cell: (props) => (
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
    ),
    header: '',
  }),

  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('firstName', {
    cell: (row) => row.getValue(),
    header: 'Nombre',
  }),
  columnHelper.accessor('lastName', {
    cell: (row) => row.getValue(),
    header: 'Apellido',
  }),
]
