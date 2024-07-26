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
import { appRoutes } from '@/appRoutes'

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
        <Link href={appRoutes.home.requirements.getOne.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Detalle</MenuItem>
        </Link>
        <Link href={appRoutes.home.requirements.delete.url(id)}>
          <MenuItem icon={<Icon as={SlControlPlay} />}>Eliminar</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  )
}
