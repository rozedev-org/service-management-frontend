'use client'
import { Stack } from '@chakra-ui/react'
import { MobileSideBar } from './MobileSideBar'
import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { useUserSession } from '@/states/useUserId'
import { cookies } from 'next/headers'

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { isLoggedIn } = useUserSession()
  // const cookieStore = cookies()

  // const isLoggedIn =
  //   cookieStore.get('isLoggedIn')?.value === 'true' ? true : false
  return (
    <Stack
      flexDirection={['column', 'column', 'row']}
      minH={'100vh'}
      alignItems={'start'}
      bg={'#f4f7fe'}
    >
      {isLoggedIn === true && (
        <>
          <MobileSideBar />
          <Sidebar />
        </>
      )}

      <Content>{children}</Content>
    </Stack>
  )
}
