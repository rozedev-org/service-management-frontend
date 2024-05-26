import { appRoutes } from '@/appRoutes'
import { useUserSession } from '@/states/useUserId'
import { mobileOnCloseType } from '@/types/mobileOnCloseType'
import { Link } from '@chakra-ui/next-js'
import { VStack, Button, useColorMode } from '@chakra-ui/react'
import { BiHelpCircle, BiCog } from 'react-icons/bi'
export const ManagementOptions = (props: mobileOnCloseType) => {
  const { isLoggedIn } = useUserSession()
  return (
    isLoggedIn && (
      <VStack w={'full'} gap={1} alignItems={'flex-start'}>
        <Button justifyContent={'start'} w={'full'} leftIcon={<BiHelpCircle />}>
          Help Center
        </Button>

        <Link href={appRoutes.home.settings.url(0)}>
          <Button
            justifyContent={'start'}
            w={'full'}
            leftIcon={<BiCog />}
            onClick={props.onClose}
          >
            Configuraciones
          </Button>
        </Link>
      </VStack>
    )
  )
}
