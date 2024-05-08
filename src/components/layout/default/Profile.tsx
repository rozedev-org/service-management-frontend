/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from '@/app/users/hook/useUser'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useUserSession } from '@/states/useUserId'
import { mobileOnCloseType } from '@/types/mobileOnCloseType'
import {
  HStack,
  Avatar,
  IconButton,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
export const Profile = (props: mobileOnCloseType) => {
  const router = useRouter()
  const { setId, id, setIsLoggedIn } = useUserSession()
  const { user, fetchUser } = useUser(id)
  useEffect(() => {
    if (id && id !== 0) {
      fetchUser()
    }
  }, [id])

  const handleLogout = () => {
    axiosInstace.post(`/auth/logout`)
    router.push(appRoutes.home.login.url(0))
    setIsLoggedIn(false)
    const loggedId = id
    if (loggedId) {
      localStorage.setItem('userID', '')
      setId(0)
    }
    window.location.reload()
  }

  return (
    <>
      {id !== 0 && (
        <HStack
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          w={'100%'}
        >
          <Avatar name={`${user.firstName} ${user.lastName}`} size={'sm'} />
          <Box>
            <Text fontSize={'sm'}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              {user.userName}
            </Text>
          </Box>
          <Box marginLeft={'auto'}>
            <Menu>
              <MenuButton
                size={'full'}
                as={IconButton}
                variant={'ghost'}
                fontSize='20px'
                icon={<BiDotsVerticalRounded />}
              />
              <MenuList>
                <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      )}
    </>
  )
}
