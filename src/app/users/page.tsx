'use client'
import { CustomTable } from '@/components/table/CustomTable'
import { User, useUser } from '@/hook/useUser'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  IconButton,
} from '@chakra-ui/react'
import { usersColumns } from './types/columnDef'
import { SearchInput } from '@/components/input/SearchInput'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'

export default function Users() {
  const userQuery = useUser()

  const UserTable = CustomTable<User>({
    columns: usersColumns,
    data: userQuery.data?.data,
  })

  return (
    <>
      <Breadcrumb fontSize={'14px'} color={'gray.700'} lineHeight={'25.6px'}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Usuarios</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as={'h1'} fontSize={'34px'}>
        Usuarios
      </Heading>

      <CardContainer
        title='Lista de Usuarios'
        optionsButton={
          <IconButton
            variant={'ghost'}
            fontSize='20px'
            icon={<BiDotsHorizontalRounded />}
            aria-label={''}
            bg={'gray.100'}
          />
        }
        searchInput={<SearchInput maxW={'320px'} ml={'auto'} />}
      >
        {UserTable}
      </CardContainer>
    </>
  )
}
