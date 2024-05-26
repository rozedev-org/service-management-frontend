import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'
import { mobileOnCloseType } from '@/types/mobileOnCloseType'
import { Link } from '@chakra-ui/next-js'
import { VStack, Button, useColorMode } from '@chakra-ui/react'
import { BiHelpCircle, BiCog } from 'react-icons/bi'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
export const ManagementOptions = (props: mobileOnCloseType) => {
  const { isLoggedIn } = useUserSession()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    isLoggedIn && (
      <VStack w={'full'} gap={1} alignItems={'flex-start'}>
        <Button
          color={'gray.600'}
          justifyContent={'start'}
          w={'full'}
          leftIcon={<BiHelpCircle />}
          variant='ghost'
        >
          Help Center
        </Button>

        <Link href={appRoutes.home.settings.url(0)}>
          <Button
            color={'gray.600'}
            justifyContent={'start'}
            w={'full'}
            leftIcon={<BiCog />}
            variant='ghost'
            onClick={props.onClose}
          >
            Configuraciones
          </Button>
        </Link>

        <Button
          color={'gray.600'}
          justifyContent={'start'}
          w={'full'}
          leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant='ghost'
          onClick={toggleColorMode}
        >
          Cambiar Modo
        </Button>
      </VStack>
    )
  )
}
