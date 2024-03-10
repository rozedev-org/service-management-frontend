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
} from 'react-icons/bi'
import { Link } from '@chakra-ui/next-js'

interface UserOptionsListInterface {
  name: string
  icon: ReactElement<any, string | JSXElementConstructor<any>>
  isEnabled: boolean
  href: string
}
const UserOptionsList: UserOptionsListInterface[] = [
  {
    name: 'Inicio',
    icon: <BiHome />,
    isEnabled: true,
    href: '/',
  },
  {
    name: 'Usuarios',
    icon: <BiUser />,
    isEnabled: true,
    href: '/users',
  },

  {
    name: 'Analysis',
    icon: <BiSolidPieChartAlt2 />,
    isEnabled: false,
    href: '/users',
  },
  {
    name: 'Documents',
    icon: <BiFileBlank />,
    isEnabled: false,
    href: '/users',
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

export const UserOptions = () => {
  return (
    <VStack w={'full'} gap={1}>
      {UserOptionsList.map(
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
