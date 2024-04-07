import { Heading } from '@chakra-ui/react'

interface BoardLayoutProps {
  children: React.ReactNode
}
export default function BoardLayout(props: BoardLayoutProps) {
  return (
    <>
      <Heading as={'h1'} fontSize={'34px'}>
        Tablero
      </Heading>
      {props.children}
    </>
  )
}
