import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { fonts } from './fonts'
import { HStack } from '@chakra-ui/react'
import { Sidebar } from '@/components/layout/default/Sidebar'
import { Content } from '@/components/layout/default/Content'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={fonts.dm_Sans.className}>
      <body>
        <Providers>
          <HStack minH={'100vh'} alignItems={'start'} bg={'#f4f7fe'}>
            <Sidebar />
            <Content>{children}</Content>
          </HStack>
        </Providers>
      </body>
    </html>
  )
}
