import { VStack, Button } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'
import {
  BiSolidPieChartAlt2,
  BiMale,
  BiBookmark,
  BiHome,
  BiUser,
  BiTask,
} from 'react-icons/bi'
import { Link } from '@chakra-ui/next-js'
import { appRoutes } from '@/appRoutes'
import { mobileOnCloseType } from '@/types/mobileOnCloseType'
import { useUserSession } from '@/states/useUserId'
interface UserOptionsListInterface {
  name: string
  icon: ReactElement<any, string | JSXElementConstructor<any>>
  isEnabled: boolean
  href: string
}
const UserOptionsList: UserOptionsListInterface[] = [
  {
    name: 'Dashboard',
    icon: <BiHome />,
    isEnabled: true,
    href: appRoutes.home.url(0),
  },
  {
    name: 'Tablero',
    icon: <BiTask />,
    isEnabled: true,
    href: appRoutes.home.board.url(0),
  },
  {
    name: 'Usuarios',
    icon: <BiUser />,
    isEnabled: true,
    href: appRoutes.home.users.url(),
  },
  {
    name: 'Requerimientos',
    icon: <BiSolidPieChartAlt2 />,
    isEnabled: true,
    href: appRoutes.home.requirements.url(),
  },
  {
    name: 'Clientes',
    icon: <BiMale />,
    isEnabled: true,
    href: '/customers',
  },
  {
    name: 'Favorites',
    icon: <BiBookmark />,
    isEnabled: false,
    href: '/users',
  },
]

interface UserOptionsProps {
  optionFilter: string
  onClose: mobileOnCloseType['onClose']
}

export const UserOptions = (props: UserOptionsProps) => {
  const { isLoggedIn } = useUserSession()
  const filteredOptions = UserOptionsList.filter((option) =>
    option.name.toLocaleLowerCase().includes(props.optionFilter)
  )
  const { onClose } = props

  return (
    <VStack w={'full'} gap={1}>
      {filteredOptions.map(
        (option, index) =>
          option.isEnabled &&
          isLoggedIn && (
            <Link
              color={'gray.600'}
              key={`user option - ${index}`}
              href={option.href}
              w={'full'}
              justifyContent={'start'}
            >
              <Button
                leftIcon={option.icon}
                variant='ghost'
                w={'full'}
                justifyContent={'start'}
                onClick={onClose}
              >
                {option.name}
              </Button>
            </Link>
          )
      )}
    </VStack>
  )
}
