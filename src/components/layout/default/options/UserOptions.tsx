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
    href: '/board',
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
    name: 'Login',
    icon: <BiFileBlank />,
    isEnabled: true,
    href: '/login',
  },
  {
    name: 'History',
    icon: <BiHistory />,
    isEnabled: false,
    href: '/users',
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
}

export const UserOptions = (props: UserOptionsProps) => {
  const filteredOptions = UserOptionsList.filter((option) =>
    option.name.toLocaleLowerCase().includes(props.optionFilter)
  )

  return (
    <VStack w={'full'} gap={1}>
      {filteredOptions.map(
        (option, index) =>
          option.isEnabled && (
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
              >
                {option.name}
              </Button>
            </Link>
          )
      )}
    </VStack>
  )
}
