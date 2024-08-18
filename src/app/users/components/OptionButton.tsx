import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export default function OptionsButton() {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          variant={'ghost'}
          fontSize='20px'
          bg={'gray.100'}
          icon={<BiDotsVerticalRounded />}
        />
        <MenuList>
          <Link href={appRoutes.home.users.profile.url(0)}>
            <MenuItem>Perfiles</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  )
}
