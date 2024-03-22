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
    name: 'Requerimientos',
    icon: <BiSolidPieChartAlt2 />,
    isEnabled: true,
    href: '/requirements',
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
