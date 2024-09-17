import { Heading } from '@chakra-ui/react'

interface OfficeLayoutProps {
  children: React.ReactNode
}
export default function OfficeLayout(props: OfficeLayoutProps) {
  return (
    <>
      <Heading as={'h1'} fontSize={'34px'}>
        Sucursales
      </Heading>
      {props.children}
    </>
  )
}
