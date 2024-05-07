import { VStack, Button } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'
import {
  BiSolidDashboard,
  BiSolidPieChartAlt2,
  BiFileBlank,
  BiHistory,
  BiBookmark,
  BiSolidUser,
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
  showOnLogged: boolean
}
const UserOptionsList: UserOptionsListInterface[] = [
  {
    name: 'Dashboard',
    icon: <BiHome />,
    isEnabled: true,
    href: appRoutes.home.url(0),
    showOnLogged: true,
  },
  {
    name: 'Tablero',
    icon: <BiTask />,
    isEnabled: true,
    href: appRoutes.home.board.url(0),
    showOnLogged: true,
  },
  {
    name: 'Usuarios',
    icon: <BiUser />,
    isEnabled: true,
    href: appRoutes.home.users.url(),
    showOnLogged: true,
  },
  {
    name: 'Requerimientos',
    icon: <BiSolidPieChartAlt2 />,
    isEnabled: true,
    href: appRoutes.home.requirements.url(),
    showOnLogged: true,
  },

  {
    name: 'Login',
    icon: <BiFileBlank />,
    isEnabled: true,
    href: appRoutes.home.login.url(0),
    showOnLogged: false,
  },
  {
    name: 'History',
    icon: <BiHistory />,
    isEnabled: false,
    href: '/users',
    showOnLogged: true,
  },
  {
    name: 'Favorites',
    icon: <BiBookmark />,
    isEnabled: false,
    href: '/users',
    showOnLogged: true,
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
  const handleButtonOption = () => {
    if (isLoggedIn === false) {
      appRoutes.home.url(0)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <VStack w={'full'} gap={1}>
      {filteredOptions.map(
        (option, index) =>
          option.isEnabled &&
          option.showOnLogged === isLoggedIn && (
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
                onClick={handleButtonOption}
              >
                {option.name}
              </Button>
            </Link>
          )
      )}
    </VStack>
  )
}
