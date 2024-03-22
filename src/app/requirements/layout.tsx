import { Heading } from '@chakra-ui/react'

interface UserLayoutProps {
  children: React.ReactNode
}
export default function UserLayout(props: UserLayoutProps) {
  return (
    <>
      <Heading as={'h1'} fontSize={'34px'}>
        Requerimientos
      </Heading>
      {props.children}
    </>
  )
}
