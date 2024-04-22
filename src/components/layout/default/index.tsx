'use client'
import { Stack } from '@chakra-ui/react'
import { MobileSideBar } from './MobileSideBar'
import { Sidebar } from './Sidebar'
import { Content } from './Content'

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <Stack
      flexDirection={['column', 'column', 'row']}
      minH={'100vh'}
      alignItems={'start'}
      bg={'#f4f7fe'}
    >
      <MobileSideBar />
      <Sidebar />
      <Content>{children}</Content>
    </Stack>
  )
}
