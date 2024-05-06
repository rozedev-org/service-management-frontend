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

export default function ReqTypeButton() {
  return (
    <Box marginRight={'auto'}>
      <Menu>
        <MenuButton
          as={IconButton}
          variant={'ghost'}
          fontSize='20px'
          bg={'gray.100'}
          icon={<BiDotsVerticalRounded />}
        />
        <MenuList>
          <Link href={appRoutes.home.requirements.reqTypes.url(0)}>
            <MenuItem>Tipos de Requerimiento</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  )
}
