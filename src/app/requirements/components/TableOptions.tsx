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

interface ReqTableOptionsProps {
  id: number
}
export const ReqTableOptions = ({ id }: ReqTableOptionsProps) => {
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
        <MenuItem icon={<Icon as={SlControlPlay} />}>Detalle</MenuItem>
      </MenuList>
    </Menu>
  )
}
